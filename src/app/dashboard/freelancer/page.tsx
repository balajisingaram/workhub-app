'use client'
import { useState } from 'react'
import Link from 'next/link'
import { MOCK_JOBS, MOCK_FREELANCERS } from '@/lib/data'
import { cn } from '@/lib/utils'

const NAV = [
  { id: 'overview',   icon: '⊞',  label: 'Overview' },
  { id: 'proposals',  icon: '📨', label: 'Proposals' },
  { id: 'active',     icon: '💼', label: 'Active jobs' },
  { id: 'earnings',   icon: '💰', label: 'Earnings' },
  { id: 'profile',    icon: '👤', label: 'My profile' },
  { id: 'messages',   icon: '💬', label: 'Messages', badge: '3' },
  { id: 'settings',   icon: '⚙️', label: 'Settings' },
]

const me = MOCK_FREELANCERS[0]

const PROPOSALS = [
  { id:'p1', title:'Senior UI/UX Designer — SaaS Dashboard', client:'TechCorp Inc',     budget:'$2,000–$3,500', status:'pending',   sent:'2h ago',  rate:'$65/hr' },
  { id:'p2', title:'Mobile App Design (iOS + Android)',       client:'HealthStart Ltd',  budget:'$1,500–$2,000', status:'viewed',    sent:'1d ago',  rate:'$60/hr' },
  { id:'p3', title:'Design System Creation in Figma',         client:'FinFlow',          budget:'$800–$1,200',   status:'shortlisted',sent:'3d ago', rate:'$70/hr' },
  { id:'p4', title:'Landing Page Redesign',                   client:'Shopify Store',    budget:'$500–$800',     status:'declined',  sent:'5d ago',  rate:'$55/hr' },
]

const EARNINGS = [
  { month:'Dec 2024', amount:4200, jobs:6 },
  { month:'Nov 2024', amount:3800, jobs:5 },
  { month:'Oct 2024', amount:5100, jobs:7 },
  { month:'Sep 2024', amount:2900, jobs:4 },
  { month:'Aug 2024', amount:4600, jobs:6 },
  { month:'Jul 2024', amount:3200, jobs:5 },
]

const maxEarning = Math.max(...EARNINGS.map(e => e.amount))

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending:     'bg-[#e5f0fa] text-[#1a5a8a]',
    viewed:      'bg-[#fdf0e0] text-[#c2620a]',
    shortlisted: 'bg-[var(--accent-light,#e8f5ee)] text-[#1a6b3c]',
    declined:    'bg-[#fde8e8] text-[#c94040]',
    active:      'bg-[var(--accent-light,#e8f5ee)] text-[#1a6b3c]',
    review:      'bg-[#edeafa] text-[#5c44c2]',
    completed:   'bg-[var(--bg2,#ece9e3)] text-[var(--ink3,#7a756c)]',
  }
  return (
    <span className={cn('px-2.5 py-1 rounded-full text-[11px] font-semibold', map[status] ?? map.pending)}>
      {status}
    </span>
  )
}

export default function FreelancerDashboard() {
  const [nav, setNav] = useState('overview')
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="min-h-screen flex bg-[#f5f3ee]">

      {/* ── SIDEBAR ── */}
      <aside className={cn(
        'fixed top-0 left-0 h-full z-40 hidden lg:flex flex-col bg-white border-r border-[rgba(20,18,14,.08)] transition-all duration-300',
        collapsed ? 'w-[72px]' : 'w-[220px]'
      )}>
        {/* Logo */}
        <div className="h-16 flex items-center px-5 border-b border-[rgba(20,18,14,.06)] shrink-0 gap-3">
          <Link href="/" className="font-display font-black text-[20px] tracking-tight text-[#14120e]">
            {collapsed ? 'W' : <><span>Work</span><span className="text-[#1a6b3c]">Hub</span></>}
          </Link>
          {!collapsed && (
            <button onClick={() => setCollapsed(true)} className="ml-auto text-[#b0a99e] hover:text-[#14120e] transition-all text-base">◂</button>
          )}
        </div>

        {/* Freelancer info */}
        {!collapsed && (
          <div className="px-4 py-4 border-b border-[rgba(20,18,14,.06)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#ece9e3] flex items-center justify-center font-bold text-sm text-[#7a756c] shrink-0">SJ</div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-[#14120e] truncate">{me.name}</div>
                <div className="text-xs text-[#7a756c]">Freelancer</div>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-[#ece9e3] rounded-full overflow-hidden">
                <div className="h-full bg-[#1a6b3c] rounded-full" style={{width:'78%'}} />
              </div>
              <span className="text-[11px] text-[#7a756c]">78% profile</span>
            </div>
          </div>
        )}

        <nav className="flex-1 py-3 px-2.5 flex flex-col gap-0.5">
          {NAV.map(item => (
            <button key={item.id} onClick={() => setNav(item.id)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left w-full relative',
                nav === item.id ? 'bg-[#14120e] text-white' : 'text-[#7a756c] hover:text-[#14120e] hover:bg-[#f5f3ee]'
              )}>
              <span className="text-base w-5 text-center shrink-0">{item.icon}</span>
              {!collapsed && <span className="flex-1">{item.label}</span>}
              {!collapsed && item.badge && (
                <span className="w-5 h-5 rounded-full bg-[#c94040] text-white text-[10px] font-bold flex items-center justify-center shrink-0">{item.badge}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Collapsed toggle */}
        {collapsed && (
          <div className="p-3 border-t border-[rgba(20,18,14,.06)]">
            <button onClick={() => setCollapsed(false)} className="w-full py-2 rounded-xl bg-[#f5f3ee] text-[#7a756c] hover:text-[#14120e] text-sm transition-all">▸</button>
          </div>
        )}
        {!collapsed && (
          <div className="p-4 border-t border-[rgba(20,18,14,.06)] flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#ece9e3] flex items-center justify-center text-xs font-bold text-[#7a756c] shrink-0">SJ</div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-medium text-[#14120e] truncate">{me.name}</div>
              <div className="text-[11px] text-[#7a756c]">{me.hourlyRateMin}–{me.hourlyRateMax}/hr</div>
            </div>
            <Link href="/"><span className="text-[#b0a99e] hover:text-[#14120e] text-sm transition-all">↩</span></Link>
          </div>
        )}
      </aside>

      {/* ── MAIN ── */}
      <div className={cn('flex-1 flex flex-col transition-all duration-300', collapsed ? 'lg:ml-[72px]' : 'lg:ml-[220px]')}>

        {/* Topbar */}
        <header className="h-16 bg-white border-b border-[rgba(20,18,14,.06)] flex items-center px-6 gap-4 sticky top-0 z-30">
          <div className="font-semibold text-[#14120e] capitalize">{nav === 'overview' ? `Hello, ${me.name.split(' ')[0]} 👋` : nav}</div>
          <div className="ml-auto flex items-center gap-3">
            {/* Availability toggle */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e8f5ee] border border-[rgba(26,107,60,.2)]">
              <span className="w-2 h-2 rounded-full bg-[#1a6b3c] animate-pulse" />
              <span className="text-xs font-semibold text-[#1a6b3c]">Available</span>
            </div>
            <button className="relative w-9 h-9 rounded-xl bg-[#f5f3ee] border border-[rgba(20,18,14,.08)] flex items-center justify-center text-sm text-[#7a756c] hover:bg-[#ece9e3] transition-all">
              🔔
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#c94040]" />
            </button>
            <Link href={`/freelancers/${me.id}`}>
              <button className="px-4 py-2 rounded-xl bg-[#14120e] text-white text-sm font-semibold hover:bg-[#1a6b3c] transition-all">View public profile</button>
            </Link>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8">

          {/* ── OVERVIEW ── */}
          {nav === 'overview' && (
            <div>
              <p className="text-[#7a756c] text-sm mb-8">Here's your freelancer activity at a glance.</p>

              {/* Stats */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { icon:'💰', label:'Total earned',       val:'$24,800', sub:'All time',      color:'#1a6b3c', bg:'#e8f5ee' },
                  { icon:'📋', label:'Jobs completed',     val:'94',      sub:'+6 this month', color:'#1a5a8a', bg:'#e5f0fa' },
                  { icon:'⭐', label:'Avg. rating',        val:'4.9',     sub:'128 reviews',   color:'#c2620a', bg:'#fdf0e0' },
                  { icon:'📨', label:'Open proposals',     val:'3',       sub:'2 viewed',      color:'#5c44c2', bg:'#edeafa' },
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-2xl border border-[rgba(20,18,14,.06)] p-6 hover:shadow-[0_4px_20px_rgba(20,18,14,.08)] transition-all">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-4" style={{background:s.bg}}>{s.icon}</div>
                    <div className="font-display font-black text-3xl tracking-tight mb-1" style={{color:s.color}}>{s.val}</div>
                    <div className="text-sm text-[#7a756c]">{s.label}</div>
                    <div className="text-xs text-[#b0a99e] mt-0.5">{s.sub}</div>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Earnings chart */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-[rgba(20,18,14,.06)] p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-semibold text-[#14120e]">Monthly earnings</h2>
                    <span className="text-xs text-[#7a756c]">Last 6 months</span>
                  </div>
                  <div className="flex items-end gap-3 h-40">
                    {EARNINGS.map(e => (
                      <div key={e.month} className="flex-1 flex flex-col items-center gap-2">
                        <div className="text-xs font-semibold text-[#14120e]">${(e.amount/1000).toFixed(1)}k</div>
                        <div className="w-full rounded-t-lg transition-all hover:opacity-80 cursor-default"
                          style={{height:`${(e.amount/maxEarning)*120}px`, background:'#1a6b3c', opacity: e.month === 'Dec 2024' ? 1 : 0.5}} />
                        <div className="text-[10px] text-[#b0a99e] text-center">{e.month.split(' ')[0]}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-[rgba(20,18,14,.06)] flex items-center justify-between">
                    <div><span className="font-display font-bold text-xl text-[#1a6b3c]">$23,800</span><span className="text-sm text-[#7a756c] ml-1">earned this year</span></div>
                    <button onClick={() => setNav('earnings')} className="text-xs text-[#1a6b3c] font-medium hover:underline">View breakdown →</button>
                  </div>
                </div>

                {/* Recent proposals */}
                <div className="bg-white rounded-2xl border border-[rgba(20,18,14,.06)] p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold text-[#14120e]">Recent proposals</h2>
                    <button onClick={() => setNav('proposals')} className="text-xs text-[#1a6b3c] font-medium hover:underline">All</button>
                  </div>
                  <div className="flex flex-col gap-3">
                    {PROPOSALS.slice(0,3).map(p => (
                      <div key={p.id} className="flex items-start justify-between gap-3 p-3 rounded-xl hover:bg-[#f5f3ee] transition-all">
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium text-[#14120e] truncate">{p.title}</div>
                          <div className="text-[11px] text-[#7a756c] mt-0.5">{p.client} · {p.sent}</div>
                        </div>
                        <StatusBadge status={p.status} />
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setNav('proposals')}
                    className="mt-4 w-full py-2.5 rounded-xl border border-dashed border-[rgba(20,18,14,.1)] text-sm text-[#7a756c] hover:border-[#14120e] hover:text-[#14120e] transition-all">
                    + Submit new proposal
                  </button>
                </div>
              </div>

              {/* Active jobs */}
              <div className="bg-white rounded-2xl border border-[rgba(20,18,14,.06)] p-6 mt-6">
                <div className="flex justify-between items-center mb-5">
                  <h2 className="font-semibold text-[#14120e]">Active jobs</h2>
                  <button onClick={() => setNav('active')} className="text-xs text-[#1a6b3c] font-medium hover:underline">View all</button>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { title:'SaaS Dashboard Redesign',    client:'TechCorp Inc',  progress:65, due:'Dec 20', budget:'$2,500', status:'in_progress' },
                    { title:'Mobile App UI — HealthStart', client:'HealthStart',  progress:30, due:'Jan 5',  budget:'$1,800', status:'in_progress' },
                  ].map(j => (
                    <div key={j.title} className="border border-[rgba(20,18,14,.06)] rounded-2xl p-5">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="font-medium text-sm text-[#14120e]">{j.title}</div>
                          <div className="text-xs text-[#7a756c] mt-0.5">{j.client} · Due {j.due}</div>
                        </div>
                        <StatusBadge status={j.status} />
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-[#f5f3ee] rounded-full overflow-hidden">
                          <div className="h-full bg-[#1a6b3c] rounded-full" style={{width:`${j.progress}%`}} />
                        </div>
                        <span className="text-xs font-semibold text-[#14120e]">{j.progress}%</span>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <span className="font-display font-bold text-base text-[#1a6b3c]">{j.budget}</span>
                        <button className="px-3 py-1.5 rounded-lg bg-[#f5f3ee] text-xs font-medium text-[#14120e] hover:bg-[#ece9e3] transition-all">Update progress</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── PROPOSALS ── */}
          {nav === 'proposals' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="font-display font-black text-2xl tracking-tight text-[#14120e] mb-1">My proposals</h1>
                  <p className="text-sm text-[#7a756c]">{PROPOSALS.length} proposals sent</p>
                </div>
                <Link href="/freelancers">
                  <button className="px-5 py-2.5 rounded-full bg-[#14120e] text-white text-sm font-semibold hover:bg-[#1a6b3c] transition-all">Browse new jobs</button>
                </Link>
              </div>
              <div className="bg-white rounded-2xl border border-[rgba(20,18,14,.06)] overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[rgba(20,18,14,.06)] bg-[#f5f3ee]">
                      {['Job title','Client','My rate','Budget','Status','Sent'].map(h => (
                        <th key={h} className="text-left p-4 text-xs font-bold text-[#7a756c] uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {PROPOSALS.map(p => (
                      <tr key={p.id} className="border-b border-[rgba(20,18,14,.06)] last:border-0 hover:bg-[#f5f3ee] transition-all">
                        <td className="p-4"><div className="font-medium text-sm text-[#14120e]">{p.title}</div></td>
                        <td className="p-4 text-sm text-[#7a756c]">{p.client}</td>
                        <td className="p-4 font-semibold text-sm text-[#1a6b3c]">{p.rate}</td>
                        <td className="p-4 text-sm text-[#7a756c]">{p.budget}</td>
                        <td className="p-4"><StatusBadge status={p.status} /></td>
                        <td className="p-4 text-sm text-[#7a756c]">{p.sent}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── EARNINGS ── */}
          {nav === 'earnings' && (
            <div>
              <h1 className="font-display font-black text-2xl tracking-tight text-[#14120e] mb-8">Earnings</h1>
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                {[
                  { label:'Available to withdraw', val:'$1,840', color:'#1a6b3c', bg:'#e8f5ee' },
                  { label:'This month',             val:'$4,200', color:'#1a5a8a', bg:'#e5f0fa' },
                  { label:'All time',               val:'$24,800',color:'#14120e', bg:'#f5f3ee' },
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-2xl border border-[rgba(20,18,14,.06)] p-6">
                    <div className="text-xs text-[#7a756c] mb-2">{s.label}</div>
                    <div className="font-display font-black text-3xl tracking-tight" style={{color:s.color}}>{s.val}</div>
                  </div>
                ))}
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <button className="py-3.5 rounded-full bg-[#14120e] text-white font-semibold text-sm hover:bg-[#1a6b3c] transition-all">Withdraw to bank account</button>
                <button className="py-3.5 rounded-full border border-[rgba(20,18,14,.1)] text-sm font-medium text-[#14120e] hover:bg-[#f5f3ee] transition-all">Download tax report (PDF)</button>
              </div>
              <div className="bg-white rounded-2xl border border-[rgba(20,18,14,.06)] overflow-hidden">
                <div className="p-6 border-b border-[rgba(20,18,14,.06)]"><h2 className="font-semibold text-[#14120e]">Monthly breakdown</h2></div>
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#f5f3ee] border-b border-[rgba(20,18,14,.06)]">
                      {['Month','Jobs','Gross earned','Platform fee (10%)','Net payout'].map(h => (
                        <th key={h} className="text-left p-4 text-xs font-bold text-[#7a756c] uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {EARNINGS.map(e => (
                      <tr key={e.month} className="border-b border-[rgba(20,18,14,.06)] last:border-0 hover:bg-[#f5f3ee] transition-all">
                        <td className="p-4 font-medium text-sm text-[#14120e]">{e.month}</td>
                        <td className="p-4 text-sm text-[#7a756c]">{e.jobs}</td>
                        <td className="p-4 font-semibold text-sm text-[#14120e]">${e.amount.toLocaleString()}</td>
                        <td className="p-4 text-sm text-[#c94040]">−${(e.amount*0.1).toLocaleString()}</td>
                        <td className="p-4 font-bold text-sm text-[#1a6b3c]">${(e.amount*0.9).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {nav !== 'overview' && nav !== 'proposals' && nav !== 'earnings' && (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <div className="text-5xl mb-4">{NAV.find(n=>n.id===nav)?.icon}</div>
              <h2 className="font-display font-bold text-xl text-[#14120e] mb-2 capitalize">{nav}</h2>
              <p className="text-[#7a756c] text-sm mb-6">Coming in the next build sprint</p>
              <button onClick={() => setNav('overview')} className="px-6 py-2.5 rounded-full bg-[#14120e] text-white text-sm font-medium hover:bg-[#1a6b3c] transition-all">Back to overview</button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
