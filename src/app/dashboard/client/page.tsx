'use client'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import { MOCK_JOBS, MOCK_FREELANCERS } from '@/lib/data'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { id: 'overview',     icon: '⊞',  label: 'Overview' },
  { id: 'jobs',         icon: '📋', label: 'My jobs' },
  { id: 'freelancers',  icon: '👥', label: 'Hired talent' },
  { id: 'payments',     icon: '💳', label: 'Payments' },
  { id: 'messages',     icon: '💬', label: 'Messages' },
  { id: 'settings',     icon: '⚙️', label: 'Settings' },
]

const ACTIVITY = [
  { icon: '✅', text: 'Sarah Johnson submitted deliverables', time: '2h ago', accent: 'green' },
  { icon: '💬', text: 'New message from Alex Chen', time: '4h ago', accent: 'blue' },
  { icon: '🔔', text: '6 new proposals on "React Developer"', time: '5h ago', accent: 'amber' },
  { icon: '💸', text: 'Escrow released — $840 to Maya Patel', time: '1d ago', accent: 'green' },
  { icon: '⭐', text: 'James Wilson left you a 5-star review', time: '2d ago', accent: 'amber' },
]

function StatCard({ icon, label, value, sub, accent }: { icon: string; label: string; value: string; sub?: string; accent?: string }) {
  return (
    <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border2)] p-6 hover:shadow-soft transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-[var(--bg)] flex items-center justify-center text-xl">{icon}</div>
        {sub && <span className="text-xs font-semibold text-[var(--accent)] bg-[var(--accent-light)] px-2 py-0.5 rounded-full">{sub}</span>}
      </div>
      <div className="font-display font-black text-3xl text-[var(--ink)] tracking-tight mb-1">{value}</div>
      <div className="text-sm text-[var(--ink3)]">{label}</div>
    </div>
  )
}

function JobRow({ job }: { job: (typeof MOCK_JOBS)[0] }) {
  const statusColors: Record<string, string> = {
    open:        'bg-[var(--blueL,#e5f0fa)] text-[var(--blue,#1a5a8a)]',
    in_progress: 'bg-[var(--amberL,#fdf0e0)] text-[var(--amber,#c2620a)]',
    review:      'bg-[var(--purpleL,#edeafa)] text-[var(--purple,#5c44c2)]',
    completed:   'bg-[var(--accent-light)] text-[var(--accent)]',
    cancelled:   'bg-[var(--coralL,#fde8e8)] text-[var(--coral,#c94040)]',
  }

  return (
    <div className="flex items-center gap-4 py-4 border-b border-[var(--border2)] last:border-0 hover:bg-[var(--bg)] px-3 -mx-3 rounded-xl transition-smooth cursor-pointer group">
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm text-[var(--ink)] group-hover:text-[var(--accent)] transition-smooth truncate">{job.title}</div>
        <div className="text-xs text-[var(--ink3)] mt-0.5">{job.postedAt} · {job.proposalCount} proposals</div>
      </div>
      <span className={cn('px-2.5 py-1 rounded-full text-[11px] font-semibold shrink-0', statusColors[job.status] ?? statusColors.open)}>
        {job.status.replace('_', ' ')}
      </span>
      <div className="text-sm font-semibold text-[var(--ink)] shrink-0">${job.budget.min}–${job.budget.max}</div>
    </div>
  )
}

export default function ClientDashboard() {
  const [activeNav, setActiveNav] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[var(--bg)] flex">
      {/* ── SIDEBAR ── */}
      <aside className={cn(
        'fixed top-0 left-0 h-full z-40 flex flex-col bg-[var(--surface)] border-r border-[var(--border2)] transition-all duration-300',
        sidebarOpen ? 'w-64' : 'w-20',
        'hidden lg:flex'
      )}>
        {/* Logo */}
        <div className="h-16 flex items-center px-5 border-b border-[var(--border2)] shrink-0">
          <Link href="/" className="font-display font-black text-lg text-[var(--ink)]">
            {sidebarOpen ? <><span>Work</span><span className="text-[var(--accent)]">Hub</span></> : 'W'}
          </Link>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="ml-auto text-[var(--ink3)] hover:text-[var(--ink)] transition-smooth text-lg">
            {sidebarOpen ? '◂' : '▸'}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 flex flex-col gap-1">
          {NAV_ITEMS.map(item => (
            <button key={item.id} onClick={() => setActiveNav(item.id)}
              className={cn(
                'flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-smooth text-left w-full',
                activeNav === item.id
                  ? 'bg-[var(--ink)] text-white'
                  : 'text-[var(--ink3)] hover:text-[var(--ink)] hover:bg-[var(--bg2)]'
              )}>
              <span className="text-lg w-5 flex-shrink-0 text-center">{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* User */}
        <div className={cn('p-4 border-t border-[var(--border2)]', sidebarOpen ? 'flex items-center gap-3' : 'flex justify-center')}>
          <div className="w-9 h-9 rounded-full bg-[var(--bg2)] flex items-center justify-center text-sm font-bold text-[var(--ink3)] shrink-0">MT</div>
          {sidebarOpen && (
            <div className="min-w-0">
              <div className="text-sm font-medium text-[var(--ink)] truncate">Michael Torres</div>
              <div className="text-xs text-[var(--ink3)] truncate">Client account</div>
            </div>
          )}
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className={cn('flex-1 flex flex-col min-h-screen transition-all duration-300', sidebarOpen ? 'lg:ml-64' : 'lg:ml-20')}>
        {/* Top bar */}
        <header className="h-16 bg-[var(--surface)] border-b border-[var(--border2)] flex items-center px-6 gap-4 sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-[var(--ink3)] text-xl">☰</button>
          <div className="font-semibold text-[var(--ink)] capitalize">{activeNav}</div>
          <div className="ml-auto flex items-center gap-3">
            <div className="relative">
              <input placeholder="Search…" className="pl-9 pr-4 py-2 bg-[var(--bg)] rounded-xl border border-[var(--border2)] text-sm outline-none focus:border-[var(--ink3)] w-48 transition-smooth" />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[var(--ink3)]">🔍</span>
            </div>
            <button className="relative w-9 h-9 rounded-xl bg-[var(--bg)] border border-[var(--border2)] flex items-center justify-center text-sm text-[var(--ink3)] hover:bg-[var(--bg3)] transition-smooth">
              🔔
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--coral-brand,#c94040)]" />
            </button>
            <Link href="/freelancers">
              <button className="px-4 py-2 rounded-xl bg-[var(--ink)] text-white text-sm font-semibold hover:bg-[var(--accent)] transition-smooth">+ Post job</button>
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 lg:p-8">
          {activeNav === 'overview' && (
            <div>
              {/* Welcome */}
              <div className="mb-8">
                <h1 className="font-display font-black text-2xl text-[var(--ink)] tracking-tight mb-1">Good morning, Michael 👋</h1>
                <p className="text-[var(--ink3)] text-sm">Here's what's happening with your projects today.</p>
              </div>

              {/* Stat cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard icon="📋" label="Active jobs"          value="4"     sub="+1 new" />
                <StatCard icon="👥" label="Hired freelancers"    value="12"    />
                <StatCard icon="💰" label="Total spent"          value="$8.4K" sub="This month" />
                <StatCard icon="⭐" label="Avg. rating given"    value="4.8"   />
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Active jobs */}
                <div className="lg:col-span-2 bg-[var(--surface)] rounded-2xl border border-[var(--border2)] p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="font-semibold text-[var(--ink)]">Active jobs</h2>
                    <button onClick={() => setActiveNav('jobs')} className="text-xs text-[var(--accent)] font-medium hover:underline">View all</button>
                  </div>
                  <div>
                    {MOCK_JOBS.slice(0, 4).map(j => <JobRow key={j.id} job={j} />)}
                  </div>
                  <Link href="/freelancers">
                    <button className="mt-5 w-full py-3 rounded-xl border border-dashed border-[var(--border)] text-sm text-[var(--ink3)] hover:border-[var(--ink3)] hover:text-[var(--ink)] hover:bg-[var(--bg)] transition-smooth">
                      + Post a new job
                    </button>
                  </Link>
                </div>

                {/* Activity */}
                <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border2)] p-6">
                  <h2 className="font-semibold text-[var(--ink)] mb-5">Recent activity</h2>
                  <div className="flex flex-col gap-4">
                    {ACTIVITY.map((a, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <div className={cn('w-8 h-8 rounded-xl flex items-center justify-center text-sm shrink-0',
                          a.accent === 'green' ? 'bg-[var(--accent-light)]'
                          : a.accent === 'blue' ? 'bg-[var(--blueL,#e5f0fa)]'
                          : 'bg-[var(--amberL,#fdf0e0)]')}>
                          {a.icon}
                        </div>
                        <div>
                          <div className="text-xs text-[var(--ink2)] leading-relaxed">{a.text}</div>
                          <div className="text-[11px] text-[var(--ink3)] mt-0.5">{a.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Top hired freelancers */}
              <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border2)] p-6 mt-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-semibold text-[var(--ink)]">Your hired talent</h2>
                  <button onClick={() => setActiveNav('freelancers')} className="text-xs text-[var(--accent)] font-medium hover:underline">View all</button>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {MOCK_FREELANCERS.slice(0, 4).map(fl => (
                    <Link key={fl.id} href={`/freelancers/${fl.id}`}>
                      <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--bg)] transition-smooth cursor-pointer group">
                        <div className="w-10 h-10 rounded-full bg-[var(--bg2)] flex items-center justify-center text-sm font-bold text-[var(--ink3)] shrink-0">
                          {fl.name.split(' ').map(n=>n[0]).join('')}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-[var(--ink)] truncate group-hover:text-[var(--accent)]">{fl.name}</div>
                          <div className="text-xs text-[var(--ink3)] truncate">{fl.title.split(' ').slice(0,2).join(' ')}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeNav === 'payments' && (
            <div>
              <h1 className="font-display font-black text-2xl text-[var(--ink)] mb-8">Payments</h1>
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                <StatCard icon="🔒" label="In escrow"    value="$1,200" />
                <StatCard icon="✅" label="Total paid"   value="$8,400" />
                <StatCard icon="💳" label="Wallet balance" value="$340" sub="Top up" />
              </div>
              <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border2)] overflow-hidden">
                <div className="p-6 border-b border-[var(--border2)]">
                  <h2 className="font-semibold text-[var(--ink)]">Transaction history</h2>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="text-xs font-bold text-[var(--ink3)] uppercase tracking-wider border-b border-[var(--border2)]">
                      <th className="text-left p-4 px-6">Description</th>
                      <th className="text-left p-4">Date</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-right p-4 px-6">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { desc: 'Escrow — Sarah Johnson · UI/UX Design',    date: 'Dec 12, 2024', status: 'released', amount: -840 },
                      { desc: 'Escrow — Alex Chen · Full Stack App',       date: 'Dec 10, 2024', status: 'held',     amount: -1299 },
                      { desc: 'Wallet top-up',                             date: 'Dec 8, 2024',  status: 'complete', amount: +500 },
                      { desc: 'Escrow — Maya Patel · Brand Identity',      date: 'Dec 5, 2024',  status: 'released', amount: -699 },
                      { desc: 'Refund — Cancelled project',               date: 'Nov 28, 2024', status: 'refunded', amount: +299 },
                    ].map((t,i) => (
                      <tr key={i} className="border-b border-[var(--border2)] last:border-0 hover:bg-[var(--bg)] transition-smooth">
                        <td className="p-4 px-6 text-sm text-[var(--ink)]">{t.desc}</td>
                        <td className="p-4 text-sm text-[var(--ink3)]">{t.date}</td>
                        <td className="p-4">
                          <span className={cn('px-2.5 py-1 rounded-full text-[11px] font-semibold',
                            t.status === 'released' ? 'bg-[var(--accent-light)] text-[var(--accent)]'
                            : t.status === 'held'     ? 'bg-[var(--amberL,#fdf0e0)] text-[var(--amber,#c2620a)]'
                            : t.status === 'refunded' ? 'bg-[var(--blueL,#e5f0fa)] text-[var(--blue,#1a5a8a)]'
                            : 'bg-[var(--bg2)] text-[var(--ink3)]')}>
                            {t.status}
                          </span>
                        </td>
                        <td className={cn('p-4 px-6 text-sm font-semibold text-right', t.amount > 0 ? 'text-[var(--accent)]' : 'text-[var(--ink)]')}>
                          {t.amount > 0 ? '+' : ''}${Math.abs(t.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeNav !== 'overview' && activeNav !== 'payments' && (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <div className="text-5xl mb-4">{NAV_ITEMS.find(n=>n.id===activeNav)?.icon}</div>
              <h2 className="font-display font-bold text-xl text-[var(--ink)] mb-2 capitalize">{activeNav}</h2>
              <p className="text-[var(--ink3)] text-sm mb-6">This section is coming in the next build</p>
              <button onClick={() => setActiveNav('overview')} className="px-6 py-2.5 rounded-full bg-[var(--ink)] text-white text-sm font-medium hover:bg-[var(--accent)] transition-smooth">
                Back to overview
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
