import { useEffect, useMemo, useRef, useState } from 'react'

export default function ChatPanel() {
  const [open, setOpen] = useState(false)
  const [season, setSeason] = useState('spring')
  const [pages, setPages] = useState([])
  const [input, setInput] = useState('')
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const containerRef = useRef(null)

  const paperClass = useMemo(() => {
    const map = {
      spring: 'bg-[#fffef7]',
      summer: 'bg-[#fff9e6]',
      autumn: 'bg-[#1b1b1b] text-white',
      winter: 'bg-[#f6f7f8]'
    }
    return map[season] || map.spring
  }, [season])

  useEffect(() => {
    if (open && containerRef.current) {
      containerRef.current.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' })
    }
  }, [pages, open])

  const send = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const body = { message: input, season, depth: window.scrollY / (document.body.scrollHeight || 1) }
    setPages(p => [...p, { role: 'user', content: input }])
    setInput('')

    try {
      const res = await fetch(`${baseUrl}/api/chat`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      const data = await res.json()
      setPages(p => [...p, { role: 'gary', content: data.reply, page: data.page_number }])
    } catch (err) {
      setPages(p => [...p, { role: 'gary', content: 'Sorry, the line is a little snowy right now.' }])
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!open && (
        <button onClick={() => setOpen(true)} className="rounded-full bg-black text-white px-5 py-3 shadow-lg hover:bg-gray-900">
          Chat with Gary
        </button>
      )}
      {open && (
        <div className="w-[min(92vw,520px)] h-[70vh] rounded-xl shadow-2xl border border-black/10 overflow-hidden bg-white/90 backdrop-blur">
          <div className="flex items-center justify-between px-4 py-3 border-b border-black/10">
            <div className="text-sm font-semibold">Gary — Book-page mode</div>
            <div className="flex items-center gap-2">
              <select value={season} onChange={e => setSeason(e.target.value)} className="text-sm border rounded px-2 py-1">
                <option>spring</option>
                <option>summer</option>
                <option>autumn</option>
                <option>winter</option>
              </select>
              <button onClick={() => setOpen(false)} className="text-sm text-gray-600 hover:text-gray-900">Close</button>
            </div>
          </div>
          <div ref={containerRef} className="h-[calc(70vh-110px)] overflow-y-auto p-4 space-y-3 bg-neutral-50">
            {pages.map((p, i) => (
              <div key={i} className={`rounded-lg shadow-sm border border-black/5 p-4 ${paperClass} transition-colors`}> 
                <div className="text-[10px] uppercase tracking-wide opacity-60 mb-2">
                  {p.role === 'user' ? 'You' : 'Gary'}{p.page ? ` — Page ${p.page}` : ''}
                </div>
                <div className="whitespace-pre-wrap leading-relaxed">{p.content}</div>
              </div>
            ))}
          </div>
          <form onSubmit={send} className="flex gap-2 p-3 border-t border-black/10 bg-white/80 backdrop-blur">
            <input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask about the work, or just say hi." className="flex-1 rounded border px-3 py-2 text-sm" />
            <button className="rounded bg-black text-white px-4 text-sm">Send</button>
          </form>
        </div>
      )}
    </div>
  )
}
