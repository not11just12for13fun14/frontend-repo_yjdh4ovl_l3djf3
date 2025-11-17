import { useEffect, useMemo, useRef, useState } from 'react'

// Tiny floating audio toggle that follows the current season and plays subtle ambient loops
export default function MediaControls({ seasons = [] }) {
  const [enabled, setEnabled] = useState(false)
  const [current, setCurrent] = useState(seasons[0]?.id || 'spring')
  const audioRef = useRef(null)
  const nextAudioRef = useRef(null)

  const ambience = useMemo(() => ({
    spring: 'https://cdn.pixabay.com/download/audio/2022/10/18/audio_ba0e0c3a66.mp3?filename=forest-birds-ambient-nature-124008.mp3',
    summer: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_ba7e6c9e6e.mp3?filename=gentle-river-ambient-19138.mp3',
    autumn: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_1d1a0b8b6c.mp3?filename=wind-ambience-17338.mp3',
    winter: 'https://cdn.pixabay.com/download/audio/2021/11/26/audio_65a0f5b9a9.mp3?filename=wind-blowing-ambient-9872.mp3',
  }), [])

  useEffect(() => {
    const onScroll = () => {
      const offsets = seasons.map(s => {
        const el = document.getElementById(s.id)
        if (!el) return { id: s.id, d: Infinity }
        const rect = el.getBoundingClientRect()
        const d = Math.abs(rect.top + rect.height * 0.3 - window.innerHeight * 0.4)
        return { id: s.id, d }
      })
      offsets.sort((a, b) => a.d - b.d)
      const nearest = offsets[0]?.id
      if (nearest && nearest !== current) setCurrent(nearest)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [seasons, current])

  // Simple crossfade between season ambiences
  useEffect(() => {
    if (!enabled) return
    const main = audioRef.current
    const alt = nextAudioRef.current
    if (!main || !alt) return

    const nextSrc = ambience[current] || ambience.spring
    if (main.dataset.src === nextSrc) return

    alt.src = nextSrc
    alt.loop = true
    alt.volume = 0
    alt.play().catch(() => {})

    const start = performance.now()
    const dur = 800
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur)
      main.volume = 1 - p
      alt.volume = p
      if (p < 1) requestAnimationFrame(tick)
      else {
        main.pause()
        main.src = nextSrc
        main.volume = 1
        main.play().catch(() => {})
        alt.pause()
        alt.src = ''
      }
    }
    requestAnimationFrame(tick)
  }, [current, enabled, ambience])

  return (
    <div className="fixed left-6 bottom-6 z-50">
      <div className="rounded-full bg-white/80 backdrop-blur border border-black/10 shadow-lg px-3 py-2 flex items-center gap-3">
        <button onClick={() => {
          setEnabled(v => !v)
          const a = audioRef.current
          if (!a) return
          if (!enabled) {
            a.src = ambience[current] || ambience.spring
            a.loop = true
            a.volume = 1
            a.play().catch(() => {})
          } else {
            a.pause()
          }
        }} className="text-xs font-medium rounded-full px-3 py-1 bg-black text-white">
          {enabled ? 'Ambient: On' : 'Ambient: Off'}
        </button>
        <div className="text-xs text-gray-700">{current.charAt(0).toUpperCase() + current.slice(1)}</div>
      </div>
      <audio ref={audioRef} preload="none" />
      <audio ref={nextAudioRef} preload="none" />
    </div>
  )
}
