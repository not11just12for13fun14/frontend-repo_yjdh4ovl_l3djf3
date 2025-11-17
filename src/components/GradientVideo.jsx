import { useEffect, useRef } from 'react'

// A looping, muted background video with a soft gradient overlay and subtle pan-zoom
export default function GradientVideo({ src, gradient = 'from-white/0 via-white/0 to-white', intensity = 0.25, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf
    const start = performance.now()
    const tick = (t) => {
      const p = (t - start) / 8000
      const scale = 1.02 + Math.sin(p) * 0.01
      const tx = Math.sin(p * 1.3) * 8
      const ty = Math.cos(p * 1.1) * 6
      el.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <video ref={ref} className="w-full h-full object-cover will-change-transform" autoPlay muted loop playsInline>
        <source src={src} type="video/mp4" />
      </video>
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${gradient}`} style={{ mixBlendMode: 'multiply', opacity: intensity }} />
    </div>
  )
}
