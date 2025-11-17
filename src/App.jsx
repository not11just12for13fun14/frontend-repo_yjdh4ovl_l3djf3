import { useMemo } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SeasonSection from './components/SeasonSection'
import ChatPanel from './components/ChatPanel'

function App() {
  const seasons = useMemo(() => ([
    {
      id: 'spring',
      title: 'Spring — The Cradle',
      palette: ['#e3f2fd', '#f5f0e6', '#9b6b43', '#fff4b2'],
      content: (
        <>
          <p>
            Newness, longing, departure. A warm Midwestern horizon. Book pages and mile-marker icons guide you through
            The Cradle, Patrick’s debut. Subtle parallax drifts like roadside scenery.
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="#books" className="rounded-lg p-4 bg-white/70 border border-black/5 hover:bg-white transition">Explore the Books</a>
            <a href="#about" className="rounded-lg p-4 bg-white/70 border border-black/5 hover:bg-white transition">About Patrick</a>
          </div>
        </>
      )
    },
    {
      id: 'summer',
      title: 'Summer — This Bright River',
      palette: ['#fff7cc', '#1e3a5f', '#ffb26b', '#0f172a'],
      content: (
        <>
          <p>
            Memory, water, contradictions. Shimmering heat. Here, book pages and excerpts expand.
          </p>
          <ul className="mt-4 list-disc pl-6 opacity-80">
            <li>The Cradle (2009)</li>
            <li>This Bright River (2012)</li>
            <li>The Universe in Miniature in Miniature (2010)</li>
            <li>Trouble: Stories (2006)</li>
          </ul>
        </>
      )
    },
    {
      id: 'autumn',
      title: 'Autumn — Universe in Miniature in Miniature',
      palette: ['#1a1a1a', '#111827', '#ff6b6b', '#f7c4e4'],
      content: (
        <>
          <p>
            Surreal and playful. Model-world grids, miniature planets at the edges. This is where Dev and Space live.
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="#dev" className="rounded-lg p-4 bg-white/10 border border-white/10 text-white hover:bg-white/20 transition">Dev</a>
            <a href="#space" className="rounded-lg p-4 bg-white/10 border border-white/10 text-white hover:bg-white/20 transition">Space</a>
            <a href="#tv" className="rounded-lg p-4 bg-white/10 border border-white/10 text-white hover:bg-white/20 transition">TV Work</a>
          </div>
        </>
      )
    },
    {
      id: 'winter',
      title: 'Winter — Trouble',
      palette: ['#ffffff', '#b0b8c1', '#111827', '#c41e3a'],
      content: (
        <>
          <p>
            Stripped-down realism, quiet unease. Scroll slows and fades linger. Narrative tremors begin.
          </p>
          <p className="mt-4 italic opacity-70">“If you hear a page echo twice, don’t worry. That’s just me.” — Gary</p>
        </>
      )
    }
  ]), [])

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar onOpenChat={() => { const btn = document.querySelector('button:contains("Chat with Gary")') }} />
      <Hero />

      <main>
        <SeasonSection id="spring" title={seasons[0].title} palette={seasons[0].palette}>
          {seasons[0].content}
        </SeasonSection>

        <SeasonSection id="summer" title={seasons[1].title} palette={seasons[1].palette}>
          {seasons[1].content}
        </SeasonSection>

        <SeasonSection id="autumn" title={seasons[2].title} palette={seasons[2].palette}>
          {seasons[2].content}
        </SeasonSection>

        <SeasonSection id="winter" title={seasons[3].title} palette={seasons[3].palette}>
          {seasons[3].content}
        </SeasonSection>

        <section id="about" className="mx-auto max-w-6xl px-4 py-24">
          <h3 className="text-2xl font-semibold">About Patrick</h3>
          <p className="mt-4 max-w-3xl text-gray-700">Author of Trouble, The Cradle, This Bright River, and The Universe in Miniature in Miniature. Work in television includes Maniac and Station Eleven.</p>
        </section>

        <section id="books" className="mx-auto max-w-6xl px-4 py-24">
          <h3 className="text-2xl font-semibold">Books</h3>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <BookCard title="The Cradle" year="2009" desc="A tender Midwestern odyssey about promises and departures." />
            <BookCard title="This Bright River" year="2012" desc="A return to Wisconsin water and memory, a heat-haze of contradictions." />
            <BookCard title="The Universe in Miniature in Miniature" year="2010" desc="Cosmic play in small models, nested realities and tender jokes." />
            <BookCard title="Trouble: Stories" year="2006" desc="Stark rooms, winter light, difficult truths in quiet air." />
          </div>
        </section>

        <section id="tv" className="mx-auto max-w-6xl px-4 py-24">
          <h3 className="text-2xl font-semibold">TV Work</h3>
          <ul className="mt-4 space-y-2">
            <li>Maniac — Writer / Executive Producer</li>
            <li>Station Eleven — Creator / Showrunner</li>
          </ul>
        </section>

        <section id="dev" className="mx-auto max-w-6xl px-4 py-24">
          <h3 className="text-2xl font-semibold">Dev</h3>
          <p className="mt-4 max-w-3xl text-gray-700">Technical notes, experiments, and tools live here in the Autumn layer.</p>
        </section>

        <section id="space" className="mx-auto max-w-6xl px-4 py-24">
          <h3 className="text-2xl font-semibold">Space</h3>
          <p className="mt-4 max-w-3xl text-gray-700">A quiet place for future expansions, cosmic diagrams, and the Understory.</p>
        </section>
      </main>

      <ChatPanel />

      <footer className="border-t border-black/10 py-10 text-center text-sm text-gray-500">© {new Date().getFullYear()} Patrick Somerville</footer>
    </div>
  )
}

function BookCard({ title, year, desc }) {
  return (
    <div className="rounded-xl border border-black/10 p-5 bg-white/70 hover:bg-white transition shadow-sm">
      <div className="text-sm uppercase tracking-wide text-gray-500">{year}</div>
      <div className="mt-1 text-lg font-semibold">{title}</div>
      <p className="mt-2 text-gray-700">{desc}</p>
    </div>
  )
}

export default App
