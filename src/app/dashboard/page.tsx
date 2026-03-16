'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function DashboardPage() {
  const [role, setRole] = useState<string | null>(null)

  const roles = [
    { id: 'client',     icon: '💼', label: 'Client',           sub: 'Manage jobs & payments',   href: '/dashboard/client',     color: '#1a6b3c', bg: '#e8f5ee' },
    { id: 'freelancer', icon: '💻', label: 'Freelancer',       sub: 'Browse jobs & earnings',    href: '/dashboard/freelancer', color: '#5c44c2', bg: '#edeafa' },
    { id: 'worker',     icon: '🔧', label: 'Onsite Worker',    sub: 'Availability & check-ins',  href: '/dashboard/worker',     color: '#c2620a', bg: '#fdf0e0' },
    { id: 'agency',     icon: '🏢', label: 'Enterprise',       sub: 'Staff portal & shifts',     href: '/dashboard/agency',     color: '#c94040', bg: '#fde8e8' },
    { id: 'admin',      icon: '🛡️', label: 'Admin',            sub: 'Platform control',          href: '/dashboard/admin',      color: '#14120e', bg: '#f1efe8' },
  ]

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="text-center mb-10">
          <Link href="/" className="font-display font-black text-2xl tracking-tight text-[var(--ink)]">
            Work<span className="text-[var(--accent)]">Hub</span>
          </Link>
          <h1 className="font-display font-black text-3xl text-[var(--ink)] mt-6 mb-2 tracking-tight">Go to your dashboard</h1>
          <p className="text-[var(--ink3)] text-sm">Select your role to open the right dashboard</p>
        </div>

        <div className="flex flex-col gap-3">
          {roles.map(r => (
            <Link key={r.id} href={r.href}>
              <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border2)] p-5 flex items-center gap-4 hover:shadow-medium hover:-translate-y-0.5 transition-smooth cursor-pointer group">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0" style={{ background: r.bg }}>{r.icon}</div>
                <div className="flex-1">
                  <div className="font-semibold text-[var(--ink)] group-hover:text-[var(--accent)] transition-smooth">{r.label}</div>
                  <div className="text-xs text-[var(--ink3)] mt-0.5">{r.sub}</div>
                </div>
                <span className="text-[var(--ink4)] group-hover:text-[var(--ink)] transition-smooth">→</span>
              </div>
            </Link>
          ))}
        </div>

        <p className="text-center text-xs text-[var(--ink3)] mt-8">
          <Link href="/" className="hover:text-[var(--ink)] transition-smooth">← Back to homepage</Link>
        </p>
      </div>
    </div>
  )
}
