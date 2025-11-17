import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section id="top" className="relative h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/cEecEwR6Ehj4iT8T/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 h-full flex items-end pointer-events-none">
        <div className="mx-auto max-w-6xl px-4 pb-12">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
            Patrick Somerville
          </h1>
          <p className="mt-3 text-white/90 max-w-xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
            Stories across seasons. An infinite scroll through books, TV, and the spaces between.
          </p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-white/0" />
    </section>
  )
}
