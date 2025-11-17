import { motion, useScroll, useTransform } from 'framer-motion'

export default function SeasonSection({ id, title, palette, children, behavior = 'parallax', minH = '120vh' }) {
  const { scrollYProgress } = useScroll({})
  const y = useTransform(scrollYProgress, [0, 1], [0, -200])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.9])

  let bg = `linear-gradient(180deg, ${palette[0]} 0%, ${palette[1] || palette[0]} 100%)`

  return (
    <section id={id} className="relative w-full" style={{ minHeight: minH }}>
      <motion.div style={{ y: behavior === 'parallax' ? y : 0, opacity }} className="absolute inset-0 -z-0" aria-hidden>
        <div className="absolute inset-0" style={{ background: bg }} />
        <div className="absolute inset-0 mix-blend-multiply" style={{ background: `radial-gradient(60% 60% at 50% 0%, ${palette[2] || '#00000010'} 0%, transparent 60%)` }} />
      </motion.div>
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-24">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight" style={{ color: palette[3] || '#111' }}>{title}</h2>
        <div className="mt-6 prose prose-invert max-w-none">
          {children}
        </div>
      </div>
    </section>
  )
}
