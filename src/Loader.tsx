import { useEffect } from 'react'

type LoaderProps = {
  onDone: () => void
}

export function Loader({ onDone }: LoaderProps) {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timeout = window.setTimeout(onDone, reduced ? 280 : 1500)
    return () => window.clearTimeout(timeout)
  }, [onDone])

  return (
    <div className="loader" role="status" aria-live="polite">
      <p className="loader-name">
        Bhaskar
        <span className="period">.</span>
        <span className="loader-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </p>
    </div>
  )
}
