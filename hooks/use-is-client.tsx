import { useEffect, useState } from 'react'

export default function useIsClient() {
  const [isClient, setClient] = useState(false)

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setClient(true), [])

  return isClient
}
