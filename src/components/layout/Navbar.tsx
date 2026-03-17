'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface NavbarProps {
  transparent?: boolean
  variant?: 'default' | 'dark'
}

export default function Navbar({ transparent = false, variant = 'default' }: NavbarProps) {
  const [scrolled,    setScrolled]    = useState(false)
  const [menuOpen,    setMenuOpen]    = useState(false)
  const [loginOpen,   setLoginOpen]   = useState(false)
  const [registerOpen,setRegisterOpen]= useState(false)
  const [activeRole,  setActiveRole]  = useState<'client'|'freelancer'|'worker'|'enterprise'>('client')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: 'Find freelancers', href: '/freelancers' },
    { label: 'Onsite workers',   href: '/onsite' },
    { label: 'Post a job',       href: '/jobs/post' },
    { label: 'Enterprise',       href: '/enterprise' },
    { label: 'Pricing',          href: '/pricing' },
  ]

  const roles = [
    { id: 'client',     icon: '💼', label: "I'm a Client",        sub: 'Hire talent' },
    { id: 'freelancer', icon: '💻', label: 'Freelancer',          sub: 'Remote work' },
    { id: 'worker',     icon: '🔧', label: 'Onsite Worker',       sub: 'Field jobs' },
    { id: 'enterprise', icon: '🏢', label: 'Enterprise / Agency', sub: 'Staff portal' },
  ]

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled || !transparent
          ? 'nav-blur border-b border-[var(--border2)] shadow-soft'
          : 'bg-transparent',
      )}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 h-16 flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="font-display font-black text-[22px] tracking-tight text-[var(--ink)] mr-8 shrink-0">
            Work<span className="text-[var(--accent)]">Hub</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1 flex-1">
            {navLinks.map(l => (
              <Link key={l.href} href={l.href}
                className="px-4 py-2 rounded-full text-sm font-medium text-[var(--ink3)] hover:text-[var(--ink)] hover:bg-[var(--bg3)] transition-smooth">
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3 ml-auto">
            <Link href="/login">
              <button className="px-5 py-2 rounded-full text-sm font-medium text-[var(--ink2)] border border-[var(--border)] hover:border-[var(--ink3)] hover:bg-[var(--bg2)] transition-smooth">
                Log in
              </button>
            </Link>
            <Link href="/register">
              <button className="px-5 py-2 rounded-full text-sm font-semibold text-white bg-[var(--ink)] hover:bg-[var(--ink2)] hover:-translate-y-px transition-smooth shadow-soft">
                Get started
              </button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden ml-auto w-9 h-9 rounded-xl bg-[var(--bg2)] flex items-center justify-center text-[var(--ink2)]">
            <span className="text-lg">{menuOpen ? '✕' : '☰'}</span>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden bg-[var(--bg)] border-t border-[var(--border2)] px-6 py-4 flex flex-col gap-1 animate-fade-in">
            {navLinks.map(l => (
              <Link key={l.href} href={l.href}
                className="px-4 py-3 rounded-xl text-sm font-medium text-[var(--ink2)] hover:bg-[var(--bg2)] transition-smooth">
                {l.label}
              </Link>
            ))}
            <div className="flex gap-3 mt-4">
              <button onClick={() => { setMenuOpen(false); setLoginOpen(true) }}
                className="flex-1 py-2.5 rounded-full text-sm font-medium border border-[var(--border)] text-[var(--ink2)] hover:bg-[var(--bg2)] transition-smooth">
                Log in
              </button>
              <button onClick={() => { setMenuOpen(false); setRegisterOpen(true) }}
                className="flex-1 py-2.5 rounded-full text-sm font-semibold bg-[var(--ink)] text-white hover:bg-[var(--accent)] transition-smooth">
                Get started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ── LOGIN MODAL ── */}
      {loginOpen && (
        <div className="modal-backdrop fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
          onClick={e => { if (e.target === e.currentTarget) setLoginOpen(false) }}>
          <div className="bg-[var(--surface)] rounded-3xl p-10 w-full max-w-[440px] shadow-large animate-scale-in">
            <button onClick={() => setLoginOpen(false)}
              className="absolute right-5 top-5 w-8 h-8 rounded-full bg-[var(--bg)] text-[var(--ink3)] hover:bg-[var(--bg3)] flex items-center justify-center transition-smooth text-sm">✕</button>

            <h2 className="font-display text-[28px] font-bold tracking-tight mb-1">Welcome back</h2>
            <p className="text-[var(--ink3)] text-sm mb-6">Log in to your WorkHub account</p>

            {/* Role tabs */}
            <div className="flex gap-1 bg-[var(--bg)] rounded-full p-1 mb-6">
              {['Client','Freelancer','Worker','Enterprise'].map((r,i) => {
                const id = ['client','freelancer','worker','enterprise'][i] as typeof activeRole
                return (
                  <button key={r} onClick={() => setActiveRole(id)}
                    className={cn('flex-1 py-2 rounded-full text-xs font-medium transition-smooth',
                      activeRole === id ? 'bg-white text-[var(--ink)] shadow-soft' : 'text-[var(--ink3)] hover:text-[var(--ink)]')}>
                    {r}
                  </button>
                )
              })}
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--ink2)] mb-1.5">Email</label>
                <input type="email" placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--ink)] text-sm outline-none focus:border-[var(--ink3)] transition-smooth" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--ink2)] mb-1.5">Password</label>
                <input type="password" placeholder="Your password"
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--ink)] text-sm outline-none focus:border-[var(--ink3)] transition-smooth" />
              </div>
              <div className="text-right">
                <span className="text-xs text-[var(--accent)] cursor-pointer font-medium">Forgot password?</span>
              </div>
              <Link href="/dashboard" onClick={() => setLoginOpen(false)}>
                <button className="w-full py-3.5 rounded-full bg-[var(--ink)] text-white text-sm font-semibold hover:bg-[var(--accent)] transition-smooth">
                  Log in →
                </button>
              </Link>
              <div className="relative text-center text-sm text-[var(--ink3)] my-1">
                <div className="absolute inset-0 flex items-center"><div className="w-full h-px bg-[var(--border)]"/></div>
                <span className="relative bg-[var(--surface)] px-3">or continue with</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {['G Google', 'in LinkedIn'].map(s => (
                  <button key={s} className="py-2.5 rounded-xl border border-[var(--border)] text-sm font-medium text-[var(--ink2)] hover:bg-[var(--bg2)] transition-smooth">
                    {s}
                  </button>
                ))}
              </div>
              <p className="text-center text-sm text-[var(--ink3)]">
                New here?{' '}
                <button onClick={() => { setLoginOpen(false); setRegisterOpen(true) }}
                  className="text-[var(--accent)] font-medium">Create account</button>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── REGISTER MODAL ── */}
      {registerOpen && (
        <div className="modal-backdrop fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
          onClick={e => { if (e.target === e.currentTarget) setRegisterOpen(false) }}>
          <div className="bg-[var(--surface)] rounded-3xl p-10 w-full max-w-[480px] shadow-large animate-scale-in relative">
            <button onClick={() => setRegisterOpen(false)}
              className="absolute right-5 top-5 w-8 h-8 rounded-full bg-[var(--bg)] text-[var(--ink3)] hover:bg-[var(--bg3)] flex items-center justify-center transition-smooth text-sm">✕</button>

            <h2 className="font-display text-[28px] font-bold tracking-tight mb-1">Create account</h2>
            <p className="text-[var(--ink3)] text-sm mb-6">Choose how you want to use WorkHub</p>

            {/* Role select */}
            <div className="grid grid-cols-2 gap-2.5 mb-6">
              {roles.map(r => (
                <button key={r.id}
                  onClick={() => setActiveRole(r.id as typeof activeRole)}
                  className={cn(
                    'p-4 rounded-2xl border text-center transition-smooth',
                    activeRole === r.id
                      ? 'border-[var(--ink)] bg-[var(--bg)]'
                      : 'border-[var(--border)] hover:border-[var(--ink3)] hover:bg-[var(--bg)]'
                  )}>
                  <div className="text-2xl mb-1.5">{r.icon}</div>
                  <div className="font-semibold text-sm text-[var(--ink)]">{r.label}</div>
                  <div className="text-xs text-[var(--ink3)] mt-0.5">{r.sub}</div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-sm font-medium text-[var(--ink2)] mb-1.5">First name</label>
                <input type="text" placeholder="John"
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border)] text-sm outline-none focus:border-[var(--ink3)] transition-smooth" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--ink2)] mb-1.5">Last name</label>
                <input type="text" placeholder="Smith"
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border)] text-sm outline-none focus:border-[var(--ink3)] transition-smooth" />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-[var(--ink2)] mb-1.5">Email address</label>
              <input type="email" placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-[var(--border)] text-sm outline-none focus:border-[var(--ink3)] transition-smooth" />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-[var(--ink2)] mb-1.5">Password</label>
              <input type="password" placeholder="Min. 8 characters"
                className="w-full px-4 py-3 rounded-xl border border-[var(--border)] text-sm outline-none focus:border-[var(--ink3)] transition-smooth" />
            </div>

            <Link href="/dashboard" onClick={() => setRegisterOpen(false)}>
              <button className="w-full py-3.5 rounded-full bg-[var(--ink)] text-white text-sm font-semibold hover:bg-[var(--accent)] transition-smooth">
                Create account →
              </button>
            </Link>
            <p className="text-center text-sm text-[var(--ink3)] mt-4">
              Already have an account?{' '}
              <button onClick={() => { setRegisterOpen(false); setLoginOpen(true) }}
                className="text-[var(--accent)] font-medium">Log in</button>
            </p>
          </div>
        </div>
      )}
    </>
  )
}
