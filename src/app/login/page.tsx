'use client'
import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Role = 'client' | 'freelancer' | 'gig' | 'driver'

const ROLES: { id: Role; icon: string; label: string; sub: string; color: string; bg: string; dash: string }[] = [
  { id: 'client',     icon: '💼', label: 'Client',      sub: 'I hire talent',        color: '#1a6b3c', bg: '#e8f5ee', dash: '/dashboard/client' },
  { id: 'freelancer', icon: '💻', label: 'Freelancer',  sub: 'I do remote work',     color: '#5c44c2', bg: '#edeafa', dash: '/dashboard/freelancer' },
  { id: 'gig',        icon: '🔧', label: 'Gig Worker',  sub: 'I do onsite tasks',    color: '#c2620a', bg: '#fdf0e0', dash: '/dashboard/worker' },
  { id: 'driver',     icon: '🚗', label: 'Driver',      sub: 'I do delivery & trips', color: '#1a5a8a', bg: '#e5f0fa', dash: '/dashboard/worker' },
]

export default function LoginPage() {
  const [role, setRole]         = useState<Role>('client')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  const selected = ROLES.find(r => r.id === role)!

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password) { setError('Please enter your email and password.'); return }
    setLoading(true); setError('')
    setTimeout(() => { setLoading(false); window.location.href = selected.dash }, 1000)
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col w-[420px] bg-[var(--ink)] relative overflow-hidden p-12 shrink-0">
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-10" style={{ background: selected.color }} />
        <div className="absolute bottom-20 -left-8 w-40 h-40 rounded-full bg-[#5c44c2] opacity-8" />
        <Link href="/" className="font-display font-black text-[22px] text-white tracking-tight relative z-10">
          Gig<span style={{ color: '#7ee8a2' }}>Hub</span>
        </Link>
        <div className="flex-1 flex flex-col justify-center relative z-10">
          <div className="text-5xl mb-5">{selected.icon}</div>
          <h2 className="font-display font-black text-white text-2xl tracking-tight mb-3">
            Welcome back,<br />{selected.label}
          </h2>
          <p className="text-white/50 text-sm leading-relaxed">
            {role === 'client'     && 'Post jobs, review proposals, manage payments and hire the best talent.'}
            {role === 'freelancer' && 'Browse projects, submit proposals and get paid for your skills.'}
            {role === 'gig'        && 'Find onsite tasks near you and check in with GPS verification.'}
            {role === 'driver'     && 'Find delivery and transport jobs near you. Flexible hours, weekly pay.'}
          </p>
        </div>
        <div className="relative z-10 text-white/20 text-xs">© 2025 GigHub Inc.</div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex flex-col">
        <div className="h-14 flex items-center justify-between px-8 border-b border-[rgba(20,18,14,.06)] bg-white">
          <Link href="/" className="lg:hidden font-display font-black text-lg text-[var(--ink)]">Gig<span className="text-[var(--accent)]">Hub</span></Link>
          <div className="lg:ml-auto text-sm text-[var(--ink3)]">
            New here?{' '}<Link href="/register" className="font-semibold text-[var(--ink)] hover:text-[var(--accent)] transition-smooth">Create account</Link>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-[420px]">
            <h1 className="font-display font-black text-2xl text-[var(--ink)] tracking-tight mb-1">Log in to GigHub</h1>
            <p className="text-[var(--ink3)] text-sm mb-7">Choose your account type to continue</p>

            {/* Role selector — 2x2 grid */}
            <div className="grid grid-cols-2 gap-2.5 mb-7">
              {ROLES.map(r => (
                <button key={r.id} onClick={() => setRole(r.id)}
                  className={cn('p-4 rounded-2xl border-2 text-left transition-all', role === r.id ? 'border-current' : 'border-[rgba(20,18,14,.08)] hover:border-[rgba(20,18,14,.2)]')}
                  style={role === r.id ? { borderColor: r.color, background: r.bg } : {}}>
                  <div className="text-2xl mb-2">{r.icon}</div>
                  <div className="font-bold text-sm" style={{ color: role === r.id ? r.color : '#14120e' }}>{r.label}</div>
                  <div className="text-[11px] text-[var(--ink3)] mt-0.5">{r.sub}</div>
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold text-[var(--ink2)] mb-1.5">Email address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-[rgba(20,18,14,.1)] text-sm outline-none focus:border-[rgba(20,18,14,.3)] transition-all bg-white" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-sm font-semibold text-[var(--ink2)]">Password</label>
                  <span className="text-xs text-[var(--accent)] font-medium cursor-pointer hover:underline">Forgot password?</span>
                </div>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Your password"
                  className="w-full px-4 py-3 rounded-xl border border-[rgba(20,18,14,.1)] text-sm outline-none focus:border-[rgba(20,18,14,.3)] transition-all bg-white" />
              </div>
              {error && <div className="text-xs text-[#c94040] bg-[#fde8e8] px-4 py-3 rounded-xl border border-[rgba(201,64,64,.2)]">{error}</div>}
              <button type="submit" disabled={loading}
                className="w-full py-3.5 rounded-full text-white font-semibold text-sm transition-all disabled:opacity-60 mt-1"
                style={{ background: loading ? '#7a756c' : selected.color }}>
                {loading ? 'Signing in…' : `Log in as ${selected.label} →`}
              </button>
            </form>

            <div className="relative text-center text-xs text-[var(--ink3)] my-5">
              <div className="absolute inset-0 flex items-center"><div className="w-full h-px bg-[rgba(20,18,14,.08)]" /></div>
              <span className="relative bg-[var(--bg)] px-3">or continue with</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {['G  Google', 'in  LinkedIn'].map(s => (
                <button key={s} className="py-3 rounded-xl border border-[rgba(20,18,14,.1)] text-sm font-medium text-[var(--ink3)] bg-white hover:bg-[var(--bg)] hover:border-[rgba(20,18,14,.2)] transition-all">{s}</button>
              ))}
            </div>

            
            <p className="text-center text-xs text-[var(--ink4)] mt-6">
              For staff portals:{' '}
              <Link href="/portal/login" className="text-[var(--ink3)] hover:text-[var(--ink)] underline transition-smooth">Staff portal login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
