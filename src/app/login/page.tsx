'use client'
import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Role = 'client' | 'freelancer' | 'worker' | 'enterprise' | 'admin'

const ROLES: { id: Role; icon: string; label: string }[] = [
  { id: 'client',     icon: '💼', label: 'Client' },
  { id: 'freelancer', icon: '💻', label: 'Freelancer' },
  { id: 'worker',     icon: '🔧', label: 'Worker' },
  { id: 'enterprise', icon: '🏢', label: 'Enterprise' },
  { id: 'admin',      icon: '🛡️', label: 'Admin' },
]

const DASHBOARD: Record<Role, string> = {
  client: '/dashboard/client',
  freelancer: '/dashboard/freelancer',
  worker: '/dashboard/worker',
  enterprise: '/dashboard/agency',
  admin: '/dashboard/admin',
}

export default function LoginPage() {
  const [role, setRole]       = useState<Role>('client')
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!email || !password) { setError('Please enter your email and password.'); return }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      window.location.href = DASHBOARD[role]
    }, 1000)
  }

  return (
    <div className="min-h-screen flex bg-[#f5f3ee]">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col w-[420px] bg-[#14120e] relative overflow-hidden p-12 shrink-0">
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[#1a6b3c] opacity-10" />
        <div className="absolute bottom-20 -left-8 w-40 h-40 rounded-full bg-[#5c44c2] opacity-8" />
        <Link href="/" className="font-display font-black text-[22px] text-white tracking-tight relative z-10">
          Work<span className="text-[#7ee8a2]">Hub</span>
        </Link>
        <div className="flex-1 flex flex-col justify-center relative z-10">
          <blockquote className="text-white/70 text-base leading-relaxed italic mb-6">
            "WorkHub doubled my monthly income in just 3 months. The escrow system means I always get paid on time."
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center font-bold text-white text-sm">AR</div>
            <div>
              <div className="font-semibold text-white text-sm">Anita Rajan</div>
              <div className="text-white/40 text-xs">Full-stack developer, Bangalore</div>
            </div>
          </div>
        </div>
        <div className="relative z-10 text-white/20 text-xs">© 2025 WorkHub Inc.</div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex flex-col">
        <div className="h-14 flex items-center justify-between px-8 border-b border-[rgba(20,18,14,.06)] bg-white">
          <Link href="/" className="lg:hidden font-display font-black text-lg text-[#14120e]">Work<span className="text-[#1a6b3c]">Hub</span></Link>
          <div className="lg:ml-auto text-sm text-[#7a756c]">
            Don't have an account?{' '}
            <Link href="/register" className="font-semibold text-[#14120e] hover:text-[#1a6b3c] transition-all">Sign up free</Link>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-[400px]">
            <h1 className="font-display font-black text-2xl text-[#14120e] tracking-tight mb-1">Welcome back</h1>
            <p className="text-[#7a756c] text-sm mb-8">Log in to your WorkHub account</p>

            {/* Role tabs */}
            <div className="flex gap-1 bg-white border border-[rgba(20,18,14,.08)] rounded-2xl p-1.5 mb-7">
              {ROLES.map(r => (
                <button key={r.id} onClick={() => setRole(r.id)}
                  className={cn('flex-1 flex flex-col items-center gap-0.5 py-2.5 rounded-xl text-[10px] font-semibold transition-all',
                    role === r.id ? 'bg-[#14120e] text-white shadow-sm' : 'text-[#7a756c] hover:text-[#14120e]')}>
                  <span className="text-base">{r.icon}</span>
                  {r.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#3a3630] mb-1.5">Email address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-[rgba(20,18,14,.1)] text-sm outline-none focus:border-[rgba(20,18,14,.3)] transition-all bg-white" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-sm font-semibold text-[#3a3630]">Password</label>
                  <Link href="#" className="text-xs text-[#1a6b3c] font-medium hover:underline">Forgot password?</Link>
                </div>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Your password"
                  className="w-full px-4 py-3 rounded-xl border border-[rgba(20,18,14,.1)] text-sm outline-none focus:border-[rgba(20,18,14,.3)] transition-all bg-white" />
              </div>

              {error && <div className="text-xs text-[#c94040] bg-[#fde8e8] px-4 py-3 rounded-xl border border-[rgba(201,64,64,.2)]">{error}</div>}

              <button type="submit" disabled={loading}
                className="w-full py-3.5 rounded-full bg-[#14120e] text-white font-semibold text-sm hover:bg-[#1a6b3c] transition-all disabled:opacity-60 mt-2">
                {loading ? 'Signing in…' : `Log in as ${ROLES.find(r=>r.id===role)?.label}`}
              </button>
            </form>

            <div className="relative text-center text-xs text-[#7a756c] my-5">
              <div className="absolute inset-0 flex items-center"><div className="w-full h-px bg-[rgba(20,18,14,.08)]"/></div>
              <span className="relative bg-[#f5f3ee] px-3">or continue with</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {['G  Google', 'in  LinkedIn'].map(s => (
                <button key={s} className="py-3 rounded-xl border border-[rgba(20,18,14,.1)] text-sm font-medium text-[#3a3630] bg-white hover:bg-[#f5f3ee] hover:border-[rgba(20,18,14,.2)] transition-all">{s}</button>
              ))}
            </div>

            <p className="text-center text-xs text-[#7a756c] mt-6">
              New to WorkHub?{' '}
              <Link href="/register" className="font-semibold text-[#14120e] hover:text-[#1a6b3c] transition-all">Create a free account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
