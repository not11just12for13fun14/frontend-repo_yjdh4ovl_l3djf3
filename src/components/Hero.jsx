import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section id="top" className="relative h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/cEecEwR6Ehj4iT8T/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Title moved to upper-left over the darker gradient area */}
      <div className="absolute z-10 top-0 left-0 p-6 md:p-8 pointer-events-none">
        <h1 className="text-left text-3xl md:text-5xl font-semibold tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] w-fit">
          Patrick Somerville
        </h1>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/15 to-white/0" />
    </section>
  )
}
