'use client'
import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function PortalLoginPage() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password) { setError('Please enter your email and password.'); return }
    setLoading(true); setError('')
    setTimeout(() => { setLoading(false); window.location.href = '/dashboard/agency' }, 1000)
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-4">
      <div className="fixed top-5 left-6">
        <Link href="/" className="text-xs text-[var(--ink4)] hover:text-[var(--ink3)] transition-smooth flex items-center gap-1.5">← Back to GigHub</Link>
      </div>

      <div className="w-full max-w-[400px]">
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-2xl bg-[var(--ink)] flex items-center justify-center font-display font-black text-xl text-white mx-auto mb-4">G</div>
          <h1 className="font-display font-black text-2xl text-[var(--ink)] tracking-tight mb-1">Staff portal</h1>
          <p className="text-sm text-[var(--ink3)]">Sign in to your private workforce management portal</p>
        </div>

        <div className="bg-white rounded-3xl border border-[var(--border2)] p-8 shadow-soft">
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold text-[var(--ink2)] mb-1.5">Work email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@yourcompany.com"
                className="w-full px-4 py-3 rounded-xl border border-[var(--border)] text-sm outline-none focus:border-[var(--ink3)] transition-smooth" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-semibold text-[var(--ink2)]">Password</label>
                <span className="text-xs text-[var(--accent)] font-medium cursor-pointer hover:underline">Forgot password?</span>
              </div>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Your password"
                className="w-full px-4 py-3 rounded-xl border border-[var(--border)] text-sm outline-none focus:border-[var(--ink3)] transition-smooth" />
            </div>
            {error && <div className="text-xs text-[#c94040] bg-[#fde8e8] px-4 py-3 rounded-xl">{error}</div>}
            <button type="submit" disabled={loading}
              className="w-full py-3.5 rounded-full bg-[var(--ink)] text-white font-semibold text-sm hover:bg-[var(--accent)] transition-smooth disabled:opacity-60 mt-1">
              {loading ? 'Signing in…' : 'Sign in →'}
            </button>
          </form>
          <div className="relative text-center text-xs text-[var(--ink3)] my-5">
            <div className="absolute inset-0 flex items-center"><div className="w-full h-px bg-[var(--border2)]" /></div>
            <span className="relative bg-white px-3">or</span>
          </div>
          <button className="w-full py-3 rounded-xl border border-[var(--border)] text-sm font-medium text-[var(--ink2)] hover:bg-[var(--bg)] hover:border-[var(--ink3)] transition-smooth flex items-center justify-center gap-2">
            <span>🏢</span> Sign in with company SSO
          </button>
        </div>

        <p className="text-center text-xs text-[var(--ink4)] mt-6 leading-relaxed">
          This portal is for authorised staff only.<br />
          Not staff? <Link href="/find-jobs" className="text-[var(--accent)] hover:underline">Find jobs on GigHub</Link>
        </p>
      </div>
    </div>
  )
}
