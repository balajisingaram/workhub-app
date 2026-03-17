'use client'
import { useState } from 'react'
import Link from 'next/link'
import { MOCK_FREELANCERS, MOCK_WORKERS, MOCK_JOBS } from '@/lib/data'
import { cn } from '@/lib/utils'

const NAV = [
  { id: 'overview',   icon: '⊞',  label: 'Overview' },
  { id: 'users',      icon: '👥', label: 'All users',    badge: '248' },
  { id: 'kyc',        icon: '🪪', label: 'KYC queue',    badge: '12', badgeColor: '#c2620a' },
  { id: 'jobs',       icon: '📋', label: 'All jobs' },
  { id: 'payments',   icon: '💰', label: 'Payments' },
  { id: 'disputes',   icon: '⚠️', label: 'Disputes',     badge: '3',  badgeColor: '#c94040' },
  { id: 'enterprise', icon: '🏢', label: 'Enterprises' },
  { id: 'analytics',  icon: '📊', label: 'Analytics' },
  { id: 'settings',   icon: '⚙️', label: 'Settings' },
]

const ALL_USERS = [
  ...MOCK_FREELANCERS.slice(0,4).map(f => ({ id:f.id, name:f.name, role:'Freelancer', status:'active', joined:'Nov 2024', email:`${f.name.split(' ')[0].toLowerCase()}@example.com`, kyc:true })),
  ...MOCK_WORKERS.slice(0,4).map(w => ({ id:w.id, name:`Worker #${w.workerCode}`, role:'Onsite Worker', status:w.isVerified?'active':'pending', joined:'Dec 2024', email:`worker${w.workerCode}@example.com`, kyc:w.isVerified })),
  { id:'c1', name:'Michael Torres', role:'Client', status:'active', joined:'Oct 2024', email:'michael@techcorp.com', kyc:true },
  { id:'c2', name:'Lisa Chen',      role:'Client', status:'active', joined:'Nov 2024', email:'lisa@finflow.com',    kyc:true },
]

const KYC_QUEUE = [
  { id:'k1', name:'Worker #ON-9901', type:'Onsite Worker', doc:'National ID + Selfie', submitted:'2h ago',    tier:'heavy'   },
  { id:'k2', name:'Priya Nair',      type:'Freelancer',    doc:'Passport',             submitted:'4h ago',    tier:null      },
  { id:'k3', name:'Worker #ON-1234', type:'Onsite Worker', doc:'National ID + Selfie', submitted:'6h ago',    tier:'extreme' },
  { id:'k4', name:'Carlos Mendez',   type:'Freelancer',    doc:'Driver License',       submitted:'1d ago',    tier:null      },
]

const DISPUTES = [
  { id:'d1', job:'SaaS Dashboard Redesign', client:'Michael Torres', freelancer:'Sarah Johnson', amount:840,  status:'open',    reason:'Client claims work not delivered' },
  { id:'d2', job:'Mobile App UI',           client:'HealthStart',    freelancer:'Priya Nair',    amount:1200, status:'review',  reason:'Freelancer claims payment not released' },
  { id:'d3', job:'SEO Strategy',            client:'ShopMart',       freelancer:'James Wilson',  amount:480,  status:'resolved',reason:'Partial refund agreed' },
]

function StatCard({ icon, label, value, change, color, bg }: any) {
  return (
    <div className="bg-white rounded-2xl border border-[rgba(20,18,14,.06)] p-6 hover:shadow-[0_4px_20px_rgba(20,18,14,.08)] transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{background:bg}}>{icon}</div>
        {change && <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#e8f5ee] text-[#1a6b3c]">{change}</span>}
      </div>
      <div className="font-display font-black text-3xl tracking-tight mb-1" style={{color}}>{value}</div>
      <div className="text-sm text-[#7a756c]">{label}</div>
    </div>
  )
}

export default function AdminPanel() {
  const [nav, setNav]         = useState('overview')
  const [collapsed, setCollapsed] = useState(false)
  const [userFilter, setUserFilter] = useState('All')
  const [kycSelected, setKycSelected] = useState<string | null>(null)

  const filteredUsers = userFilter === 'All' ? ALL_USERS : ALL_USERS.filter(u => u.role === userFilter)

  return (
    <div className="min-h-screen flex bg-[#f5f3ee]">

      {/* SIDEBAR */}
      <aside className={cn(
        'fixed top-0 left-0 h-full z-40 hidden lg:flex flex-col bg-white border-r border-[rgba(20,18,14,.08)] transition-all duration-300',
        collapsed ? 'w-[72px]' : 'w-[220px]'
      )}>
        <div className="h-16 flex items-center px-5 border-b border-[rgba(20,18,14,.06)] shrink-0 gap-3">
          <Link href="/" className="font-display font-black text-[20px] tracking-tight text-[#14120e]">
            {collapsed ? 'W' : <><span>Work</span><span className="text-[#1a6b3c]">Hub</span></>}
          </Link>
          {!collapsed && (
            <>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#14120e] text-white ml-1">ADMIN</span>
              <button onClick={() => setCollapsed(true)} className="ml-auto text-[#b0a99e] hover:text-[#14120e] transition-all text-base">◂</button>
            </>
          )}
        </div>

        <nav className="flex-1 py-3 px-2.5 flex flex-col gap-0.5">
          {NAV.map(item => (
            <button key={item.id} onClick={() => setNav(item.id)}
              className={cn('flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left w-full',
                nav === item.id ? 'bg-[#14120e] text-white' : 'text-[#7a756c] hover:text-[#14120e] hover:bg-[#f5f3ee]')}>
              <span className="text-base w-5 text-center shrink-0">{item.icon}</span>
              {!collapsed && (
                <>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{background:(item.badgeColor||'#1a6b3c')+'20', color:item.badgeColor||'#1a6b3c'}}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          ))}
        </nav>

        <div className={cn('p-4 border-t border-[rgba(20,18,14,.06)]', collapsed ? 'flex justify-center' : 'flex items-center gap-3')}>
          {collapsed
            ? <button onClick={() => setCollapsed(false)} className="w-8 h-8 rounded-lg bg-[#f5f3ee] text-[#7a756c] text-sm">▸</button>
            : <>
                <div className="w-8 h-8 rounded-full bg-[#14120e] flex items-center justify-center text-white text-xs font-bold shrink-0">SA</div>
                <div><div className="text-xs font-medium text-[#14120e]">Super Admin</div><div className="text-[11px] text-[#7a756c]">Full access</div></div>
              </>}
        </div>
      </aside>

      {/* MAIN */}
      <div className={cn('flex-1 flex flex-col transition-all duration-300', collapsed ? 'lg:ml-[72px]' : 'lg:ml-[220px]')}>

        <header className="h-16 bg-white border-b border-[rgba(20,18,14,.06)] flex items-center px-6 gap-4 sticky top-0 z-30">
          <div className="font-semibold text-[#14120e] capitalize">{nav === 'overview' ? 'Admin Dashboard' : nav.replace('kyc','KYC queue')}</div>
          <div className="ml-auto flex items-center gap-3">
            <div className="relative">
              <input placeholder="Search users, jobs…" className="pl-9 pr-4 py-2 bg-[#f5f3ee] rounded-xl border border-[rgba(20,18,14,.06)] text-sm outline-none focus:border-[rgba(20,18,14,.2)] w-52 transition-all" />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#7a756c]">🔍</span>
            </div>
            <button className="relative w-9 h-9 rounded-xl bg-[#f5f3ee] border border-[rgba(20,18,14,.06)] flex items-center justify-center text-sm text-[#7a756c]">
              🔔<span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#c94040]" />
            </button>
            <Link href="/"><button className="px-4 py-2 rounded-xl border border-[rgba(20,18,14,.1)] text-sm font-medium text-[#7a756c] hover:bg-[#f5f3ee] transition-all">← Back to site</button></Link>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8">

          {/* ── OVERVIEW ── */}
          {nav === 'overview' && (
            <div>
              <div className="mb-8">
                <h1 className="font-display font-black text-2xl tracking-tight text-[#14120e] mb-1">Platform overview</h1>
                <p className="text-sm text-[#7a756c]">Real-time stats across all three modules.</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard icon="👥" label="Total users"         value="248"    change="+12 today" color="#14120e" bg="#f5f3ee" />
                <StatCard icon="💰" label="Platform revenue"   value="$8,420" change="This month" color="#1a6b3c" bg="#e8f5ee" />
                <StatCard icon="📋" label="Active jobs"        value="34"     change="+4 new"    color="#1a5a8a" bg="#e5f0fa" />
                <StatCard icon="⭐" label="Avg. platform rating" value="4.9"  color="#c2620a"    bg="#fdf0e0" />
              </div>

              <div className="grid lg:grid-cols-3 gap-6 mb-6">
                {/* User breakdown */}
                <div className="bg-white rounded-2xl border border-[rgba(20,18,14,.06)] p-6">
                  <h2 className="font-semibold text-[#14120e] mb-5">User breakdown</h2>
                  {[
                    { label:'Freelancers',    val:MOCK_FREELANCERS.length, pct:40, color:'#5c44c2' },
                    { label:'Onsite workers', val:MOCK_WORKERS.length,     pct:25, color:'#c2620a' },
                    { label:'Clients',        val:98,                      pct:28, color:'#1a6b3c' },
                    { label:'Enterprises',    val:12,                      pct:7,  color:'#c94040' },
                  ].map(s => (
                    <div key={s.label} className="mb-3 last:mb-0">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[#7a756c]">{s.label}</span>
                        <span className="font-semibold text-[#14120e]">{s.val}</span>
                      </div>
                      <div className="h-2 bg-[#f5f3ee] rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{width:`${s.pct}%`, background:s.color}} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Revenue */}
                <div className="bg-white rounded-2xl border border-[rgba(20,18,14,.06)] p-6">
                  <h2 className="font-semibold text-[#14120e] mb-5">Revenue by module</h2>
                  {[
                    { label:'Freelancer fees (10%)', val:'$5,200', pct:62, color:'#5c44c2' },
                    { label:'Onsite worker fees (8%)',val:'$1,960', pct:23, color:'#c2620a' },
                    { label:'Enterprise subs',        val:'$1,260', pct:15, color:'#c94040' },
                  ].map(r => (
                    <div key={r.label} className="mb-4 last:mb-0">
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-[#7a756c]">{r.label}</span>
                        <span className="font-semibold text-[#14120e]">{r.val}</span>
                      </div>
                      <div className="h-2 bg-[#f5f3ee] rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{width:`${r.pct}%`, background:r.color}} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Alerts */}
                <div className="bg-white rounded-2xl border border-[rgba(20,18,14,.06)] p-6">
                  <h2 className="font-semibold text-[#14120e] mb-5">Action required</h2>
                  <div className="flex flex-col gap-3">
                    <button onClick={() => setNav('kyc')} className="flex items-center gap-3 p-3 rounded-xl bg-[#fdf0e0] border border-[rgba(194,98,10,.2)] hover:border-[rgba(194,98,10,.4)] transition-all text-left w-full">
                      <span className="text-lg">🪪</span>
                      <div><div className="text-xs font-semibold text-[#c2620a]">12 KYC verifications pending</div><div className="text-[11px] text-[#7a756c] mt-0.5">Review ID documents</div></div>
                      <span className="ml-auto text-[#c2620a]">→</span>
                    </button>
                    <button onClick={() => setNav('disputes')} className="flex items-center gap-3 p-3 rounded-xl bg-[#fde8e8] border border-[rgba(201,64,64,.2)] hover:border-[rgba(201,64,64,.4)] transition-all text-left w-full">
                      <span className="text-lg">⚠️</span>
                      <div><div className="text-xs font-semibold text-[#c94040]">3 open disputes</div><div className="text-[11px] text-[#7a756c] mt-0.5">Escrow decisions required</div></div>
                      <span className="ml-auto text-[#c94040]">→</span>
                    </button>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-[#e5f0fa] border border-[rgba(26,90,138,.15)]">
                      <span className="text-lg">📧</span>
                      <div><div className="text-xs font-semibold text-[#1a5a8a]">6 unread support tickets</div><div className="text-[11px] text-[#7a756c] mt-0.5">Via help centre</div></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent users */}
              <div className="bg-white rounded-2xl border border-[rgba(20,18,14,.06)] p-6">
                <div className="flex justify-between items-center mb-5">
                  <h2 className="font-semibold text-[#14120e]">Recent users</h2>
                  <button onClick={() => setNav('users')} className="text-xs text-[#1a6b3c] font-medium hover:underline">View all</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead><tr className="border-b border-[rgba(20,18,14,.06)] bg-[#f5f3ee]">
                      {['User','Role','Status','KYC','Joined'].map(h => <th key={h} className="text-left p-3 text-xs font-bold text-[#7a756c] uppercase tracking-wider">{h}</th>)}
                    </tr></thead>
                    <tbody>
                      {ALL_USERS.slice(0,6).map(u => (
                        <tr key={u.id} className="border-b border-[rgba(20,18,14,.06)] last:border-0 hover:bg-[#f5f3ee] transition-all">
                          <td className="p-3"><div className="font-medium text-sm text-[#14120e]">{u.name}</div><div className="text-xs text-[#7a756c]">{u.email}</div></td>
                          <td className="p-3"><span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{background:u.role==='Freelancer'?'#edeafa':u.role==='Onsite Worker'?'#fdf0e0':u.role==='Client'?'#e8f5ee':'#fde8e8', color:u.role==='Freelancer'?'#5c44c2':u.role==='Onsite Worker'?'#c2620a':u.role==='Client'?'#1a6b3c':'#c94040'}}>{u.role}</span></td>
                          <td className="p-3"><span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full', u.status==='active'?'bg-[#e8f5ee] text-[#1a6b3c]':'bg-[#fdf0e0] text-[#c2620a]')}>{u.status}</span></td>
                          <td className="p-3">{u.kyc ? <span className="text-[#1a6b3c] text-xs font-semibold">✓ Verified</span> : <button className="text-xs font-semibold text-[#c2620a] hover:underline">Review</button>}</td>
                          <td className="p-3 text-sm text-[#7a756c]">{u.joined}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── KYC QUEUE ── */}
          {nav === 'kyc' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="font-display font-black text-2xl tracking-tight text-[#14120e] mb-1">KYC verification queue</h1>
                  <p className="text-sm text-[#7a756c]">{KYC_QUEUE.length} pending reviews — approve or reject identity documents</p>
                </div>
              </div>
              <div className="grid lg:grid-cols-2 gap-5">
                {KYC_QUEUE.map(item => (
                  <div key={item.id} className={cn('bg-white rounded-2xl border p-6 transition-all', kycSelected === item.id ? 'border-[#14120e] shadow-[0_4px_20px_rgba(20,18,14,.12)]' : 'border-[rgba(20,18,14,.06)]')}>
                    <div className="flex items-start gap-4 mb-5">
                      <div className="w-12 h-12 rounded-xl bg-[#f5f3ee] flex items-center justify-center text-2xl shrink-0">🪪</div>
                      <div className="flex-1">
                        <div className="font-semibold text-[#14120e]">{item.name}</div>
                        <div className="text-xs text-[#7a756c] mt-0.5">{item.type} · Submitted {item.submitted}</div>
                        <div className="text-xs font-medium text-[#1a5a8a] mt-1">Document: {item.doc}</div>
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#fdf0e0] text-[#c2620a]">Pending</span>
                    </div>
                    {/* Fake doc preview */}
                    <div className="bg-[#f5f3ee] rounded-xl h-28 flex items-center justify-center text-[#b0a99e] text-sm mb-5 border border-dashed border-[rgba(20,18,14,.1)]">
                      🖼️ ID document preview
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => setKycSelected(null)}
                        className="flex-1 py-2.5 rounded-xl bg-[#1a6b3c] text-white text-sm font-semibold hover:bg-[#14120e] transition-all">
                        ✓ Approve
                      </button>
                      <button onClick={() => setKycSelected(item.id)}
                        className="flex-1 py-2.5 rounded-xl bg-[#fde8e8] text-[#c94040] text-sm font-semibold hover:bg-[#c94040] hover:text-white transition-all">
                        ✕ Reject
                      </button>
                      <button className="px-4 py-2.5 rounded-xl border border-[rgba(20,18,14,.1)] text-[#7a756c] text-sm hover:bg-[#f5f3ee] transition-all">
                        Flag
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── DISPUTES ── */}
          {nav === 'disputes' && (
            <div>
              <h1 className="font-display font-black text-2xl tracking-tight text-[#14120e] mb-8">Dispute resolution</h1>
              <div className="flex flex-col gap-5">
                {DISPUTES.map(d => (
                  <div key={d.id} className="bg-white rounded-2xl border border-[rgba(20,18,14,.06)] p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="font-semibold text-[#14120e] mb-1">{d.job}</div>
                        <div className="text-xs text-[#7a756c]">Client: <strong className="text-[#14120e]">{d.client}</strong> · Freelancer: <strong className="text-[#14120e]">{d.freelancer}</strong></div>
                        <div className="text-xs text-[#7a756c] mt-1">Reason: {d.reason}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-display font-bold text-xl text-[#14120e]">${d.amount}</div>
                        <span className={cn('text-[11px] font-bold px-2.5 py-1 rounded-full', d.status==='open'?'bg-[#fde8e8] text-[#c94040]':d.status==='review'?'bg-[#fdf0e0] text-[#c2620a]':'bg-[#e8f5ee] text-[#1a6b3c]')}>
                          {d.status}
                        </span>
                      </div>
                    </div>
                    {d.status !== 'resolved' && (
                      <div className="flex gap-3 pt-4 border-t border-[rgba(20,18,14,.06)]">
                        <button className="flex-1 py-2.5 rounded-xl bg-[#1a6b3c] text-white text-sm font-semibold hover:bg-[#14120e] transition-all">Release to freelancer</button>
                        <button className="flex-1 py-2.5 rounded-xl bg-[#e5f0fa] text-[#1a5a8a] text-sm font-semibold hover:bg-[#1a5a8a] hover:text-white transition-all">Refund to client</button>
                        <button className="px-4 py-2.5 rounded-xl border border-[rgba(20,18,14,.1)] text-[#7a756c] text-sm hover:bg-[#f5f3ee] transition-all">View messages</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── USERS ── */}
          {nav === 'users' && (
            <div>
              <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <h1 className="font-display font-black text-2xl tracking-tight text-[#14120e]">All users</h1>
                <div className="flex gap-2 flex-wrap">
                  {['All','Freelancer','Onsite Worker','Client','Enterprise'].map(f => (
                    <button key={f} onClick={() => setUserFilter(f)}
                      className={cn('px-4 py-2 rounded-full text-sm font-medium border transition-all', userFilter===f ? 'bg-[#14120e] text-white border-[#14120e]' : 'bg-white text-[#7a756c] border-[rgba(20,18,14,.1)] hover:border-[#14120e]')}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-[rgba(20,18,14,.06)] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[700px]">
                    <thead><tr className="bg-[#f5f3ee] border-b border-[rgba(20,18,14,.06)]">
                      {['User','Role','Email','Status','KYC','Joined','Actions'].map(h => <th key={h} className="text-left p-4 text-xs font-bold text-[#7a756c] uppercase tracking-wider">{h}</th>)}
                    </tr></thead>
                    <tbody>
                      {filteredUsers.map(u => (
                        <tr key={u.id} className="border-b border-[rgba(20,18,14,.06)] last:border-0 hover:bg-[#f5f3ee] transition-all">
                          <td className="p-4 font-medium text-sm text-[#14120e]">{u.name}</td>
                          <td className="p-4"><span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{background:u.role==='Freelancer'?'#edeafa':u.role==='Onsite Worker'?'#fdf0e0':u.role==='Client'?'#e8f5ee':'#fde8e8', color:u.role==='Freelancer'?'#5c44c2':u.role==='Onsite Worker'?'#c2620a':u.role==='Client'?'#1a6b3c':'#c94040'}}>{u.role}</span></td>
                          <td className="p-4 text-sm text-[#7a756c]">{u.email}</td>
                          <td className="p-4"><span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full', u.status==='active'?'bg-[#e8f5ee] text-[#1a6b3c]':'bg-[#fdf0e0] text-[#c2620a]')}>{u.status}</span></td>
                          <td className="p-4">{u.kyc ? <span className="text-xs text-[#1a6b3c] font-semibold">✓</span> : <span className="text-xs text-[#c2620a] font-semibold">Pending</span>}</td>
                          <td className="p-4 text-sm text-[#7a756c]">{u.joined}</td>
                          <td className="p-4">
                            <div className="flex gap-1.5">
                              <button className="px-2.5 py-1.5 text-xs font-medium rounded-lg bg-[#f5f3ee] border border-[rgba(20,18,14,.06)] hover:border-[rgba(20,18,14,.2)] transition-all">View</button>
                              <button className="px-2.5 py-1.5 text-xs font-medium rounded-lg bg-[#fde8e8] border border-[rgba(201,64,64,.1)] text-[#c94040] hover:bg-[#c94040] hover:text-white transition-all">Suspend</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {!['overview','kyc','disputes','users'].includes(nav) && (
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
