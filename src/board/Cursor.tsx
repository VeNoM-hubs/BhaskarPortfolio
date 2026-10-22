import { useEffect, useRef } from 'react'

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)
  const ripples = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const root = document.querySelector('.app')
    if (!fine || !root) return

    root.classList.add('has-cursor')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const point = { x: -80, y: -80 }
    const ringPos = { x: -80, y: -80 }
    let text = ''
    let down = false
    let frame = 0

    const show = (visible: boolean) => {
      const opacity = visible ? '1' : '0'
      if (dot.current) dot.current.style.opacity = opacity
      if (ring.current) ring.current.style.opacity = opacity
    }

    const onMove = (event: PointerEvent) => {
      point.x = event.clientX
      point.y = event.clientY
      const node = event.target instanceof Element ? event.target.closest('[data-cursor]') : null
      text = node instanceof HTMLElement ? (node.dataset.cursor ?? '') : ''
      show(true)
    }

    const onDown = () => {
      down = true
      if (!ripples.current) return
      const burst = document.createElement('i')
      burst.className = 'cursor-ripple'
      burst.style.left = `${point.x}px`
      burst.style.top = `${point.y}px`
      ripples.current.appendChild(burst)
      window.setTimeout(() => burst.remove(), 480)
    }

    const onUp = () => {
      down = false
    }

    const tick = () => {
      const ease = reduce ? 1 : 0.16
      ringPos.x += (point.x - ringPos.x) * ease
      ringPos.y += (point.y - ringPos.y) * ease
      const scale = down ? 0.7 : 1
      if (dot.current) {
        dot.current.style.transform = `translate3d(${point.x}px, ${point.y}px, 0) translate(-50%, -50%) scale(${scale})`
      }
      if (ring.current) {
        ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-40%, -50%)`
        ring.current.classList.toggle('is-label', text.length > 0)
      }
      if (label.current && label.current.textContent !== text) label.current.textContent = text
      frame = window.requestAnimationFrame(tick)
    }

    const onLeave = () => show(false)

    show(false)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    document.documentElement.addEventListener('pointerleave', onLeave)
    frame = window.requestAnimationFrame(tick)

    return () => {
      root.classList.remove('has-cursor')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="cursor-layer" aria-hidden="true">
      <div ref={ring} className="cursor-ring">
        <span ref={label} />
      </div>
      <div ref={dot} className="cursor-dot" />
      <div ref={ripples} className="cursor-ripples" />
    </div>
  )
}
