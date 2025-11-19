import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section id="top" className="relative h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/cEecEwR6Ehj4iT8T/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Title moved to upper-left over the darker gradient area */}
      <div className="absolute z-20 top-0 left-0 p-6 md:p-8 pointer-events-none">
        <h1 className="text-left text-3xl md:text-5xl font-semibold tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] w-fit">
          Patrick Somerville
        </h1>
      </div>

      {/* Overlays to obscure any center text from the Spline scene */}
      <div className="pointer-events-none absolute inset-0 z-10">
        {/* Top-to-bottom soft fade for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/15 to-white/0" />
        {/* Center radial mask to hide large scene text like 'Sunsets' without affecting edges */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.66) 18%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.25) 48%, rgba(0,0,0,0.12) 60%, rgba(0,0,0,0.0) 75%)',
          }}
        />
        {/* Subtle backdrop blur over the very center for extra legibility */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[1200px] h-[40vh] rounded-[4rem] bg-black/10 backdrop-blur-sm" />
      </div>
    </section>
  )
}
