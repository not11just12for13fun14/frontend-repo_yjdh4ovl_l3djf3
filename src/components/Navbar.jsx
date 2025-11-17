import { useState } from 'react'
import { Menu, BookOpen, Sparkles, MessageSquare, Info } from 'lucide-react'

export default function Navbar({ onOpenChat }) {
  const [open, setOpen] = useState(false)

  const navItems = [
    { label: 'About', href: '#about', icon: Info },
    { label: 'Books', href: '#books', icon: BookOpen },
    { label: 'TV', href: '#tv', icon: Sparkles },
    { label: 'Dev', href: '#dev', icon: Sparkles },
    { label: 'Space', href: '#space', icon: Sparkles },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur bg-white/50 border-b border-black/5">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <a href="#top" className="font-semibold tracking-tight text-gray-800">
          Patrick Somerville
        </a>
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map(({ label, href }) => (
            <a key={label} href={href} className="text-sm text-gray-700 hover:text-gray-900 transition-colors">
              {label}
            </a>
          ))}
          <button onClick={onOpenChat} className="inline-flex items-center gap-2 rounded-full bg-black text-white text-sm px-4 py-2 hover:bg-gray-900 transition">
            <MessageSquare size={16} /> Chat
          </button>
        </nav>
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <Menu />
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-black/5 bg-white/80 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-3">
            {navItems.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} className="flex items-center gap-2 text-sm text-gray-800">
                <Icon size={16} /> {label}
              </a>
            ))}
            <button onClick={onOpenChat} className="inline-flex items-center gap-2 rounded-full bg-black text-white text-sm px-4 py-2 w-fit">
              <MessageSquare size={16} /> Chat
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
