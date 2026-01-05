type Props = {
  nonce?: string
}

export default function ServiceWorkerScript({ nonce }: Props) {
  return (
    <script
      nonce={nonce}
      dangerouslySetInnerHTML={{
        __html: `(function(){navigator.serviceWorker.register('/sw.js',{scope:'/',updateViaCache:'none'})})();`,
      }}
    />
  )
}
