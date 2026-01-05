// Based on https://gist.github.com/adactio/3717b7da007a9363ddf21f584aae34af
const cacheName = 'files'

addEventListener('fetch', event => {
  const { request } = event
  if (request.method !== 'GET') return

  event.respondWith(
    (async () => {
      const networkResponsePromise = fetch(request)

      // Cache all network responses
      event.waitUntil(
        (async () => {
          const networkResponse = await networkResponsePromise
          const networkResponseClone = networkResponse.clone()
          const cache = await caches.open(cacheName)
          return cache.put(request, networkResponseClone)
        })(),
      )

      // Serve HTML requests network-first
      if (request.headers.get('Accept').includes('text/html')) {
        try {
          return await networkResponsePromise
        } catch (error) {
          return caches.match(request)
        }
      }

      // Serve cache-first otherwise
      const cachedResponse = await caches.match(request)
      return cachedResponse || (await networkResponsePromise)
    })(),
  )
})
