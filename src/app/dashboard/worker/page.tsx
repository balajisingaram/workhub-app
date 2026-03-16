'use client'
import { useState } from 'react'
import Link from 'next/link'
import { MOCK_WORKERS, WEIGHT_TIERS } from '@/lib/data'
import { cn, getWeightTierInfo } from '@/lib/utils'

const NAV = [
  { id: 'overview',     icon: '⊞',  label: 'Overview' },
  { id: 'availability', icon: '📅', label: 'Availability' },
  { id: 'jobs',         icon: '🏁', label: 'My jobs' },
  { id: 'checkin',      icon: '📍', label: 'GPS check-in' },
  { id: 'earnings',     icon: '💰', label: 'Earnings' },
  { id: 'documents',    icon: '📄', label: 'My documents' },
  { id: 'settings',     icon: '⚙️', label: 'Settings' },
]

const me = MOCK_WORKERS[0]
const tier = getWeightTierInfo(me.weightTier)

const SHIFTS = [
  { id:'sh1', title:'Warehouse furniture move',  location:'Guindy, Chennai',     date:'Dec 14, 2024', hours:8, status:'completed', pay:208 },
  { id:'sh2', title:'Industrial equipment move', location:'Ambattur, Chennai',   date:'Dec 12, 2024', hours:6, status:'completed', pay:156 },
  { id:'sh3', title:'Office relocation labour',  location:'Anna Nagar, Chennai', date:'Dec 10, 2024', hours:5, status:'completed', pay:130 },
  { id:'sh4', title:'Construction site worker',  location:'Perambur, Chennai',   date:'Dec 8, 2024',  hours:9, status:'completed', pay:234 },
]

const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']

export default function WorkerDashboard() {
  const [nav, setNav]               = useState('overview')
  const [collapsed, setCollapsed]   = useState(false)
  const [activeDays, setActiveDays] = useState(['Mon','Tue','Wed','Thu','Fri'])
  const [radius, setRadius]         = useState(me.radiusKm)
  const [checkedIn, setCheckedIn]   = useState(false)
  const [checkingIn, setCheckingIn] = useState(false)
  const [online, setOnline]         = useState(me.isOnline)

  function handleCheckIn() {
    setCheckingIn(true)
    setTimeout(() => { setCheckingIn(false); setCheckedIn(true) }, 2000)
  }

  function toggleDay(day: string) {
    setActiveDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day])
  }

  return (
    <div className="min-h-screen flex bg-[#f5f3ee]">

      {/* SIDEBAR */}
      <aside className={cn(
        'fixed top-0 left-0 h-full z-40 hidden lg:flex flex-col transition-all duration-300 border-r',
        collapsed ? 'w-[72px]' : 'w-[220px]'
      )} style={{background:'#14120e', borderColor:'rgba(255,255,255,.08)'}}>
        <div className="h-16 flex items-center px-5 border-b shrink-0 gap-3" style={{borderColor:'rgba(255,255,255,.08)'}}>
          <Link href="/" className="font-display font-black text-[20px] tracking-tight text-white">
            {collapsed ? 'W' : <><span>Work</span><span style={{color:tier.color}}>Hub</span></>}
          </Link>
          {!collapsed && (
            <button onClick={() => setCollapsed(true)} className="ml-auto text-white/30 hover:text-white transition-all text-base">◂</button>
          )}
        </div>

        {!collapsed && (
          <div className="px-4 py-4 border-b" style={{borderColor:'rgba(255,255,255,.08)'}}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-sm text-white shrink-0">👷</div>
              <div>
                <div className="text-sm font-semibold text-white">Worker #{me.workerCode}</div>
                <div className="text-xs" style={{color:tier.color}}>{tier.label}</div>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 cursor-pointer" onClick={() => setOnline(!online)}>
              <div className={cn('w-9 h-5 rounded-full transition-all relative', online ? 'bg-[#1a6b3c]' : 'bg-white/20')}>
                <div className={cn('absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all', online ? 'left-4' : 'left-0.5')} />
              </div>
              <span className="text-xs" style={{color: online ? '#7ee8a2' : 'rgba(255,255,255,.4)'}}>{online ? 'Available' : 'Offline'}</span>
            </div>
          </div>
        )}

        <nav className="flex-1 py-3 px-2.5 flex flex-col gap-0.5">
          {NAV.map(item => (
            <button key={item.id} onClick={() => setNav(item.id)}
              className={cn('flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left w-full',
                nav === item.id ? 'bg-white/15 text-white' : 'text-white/50 hover:text-white hover:bg-white/8')}>
              <span className="text-base w-5 text-center shrink-0">{item.icon}</span>
              {!collapsed && item.label}
            </button>
          ))}
        </nav>

        {collapsed && (
          <div className="p-3 border-t" style={{borderColor:'rgba(255,255,255,.08)'}}>
            <button onClick={() => setCollapsed(false)} className="w-full py-2 rounded-xl bg-white/10 text-white/50 hover:text-white text-sm transition-all">▸</button>
          </div>
        )}
        {!collapsed && (
          <div className="p-4 border-t flex items-center gap-3" style={{borderColor:'rgba(255,255,255,.08)'}}>
            <Link href="/" className="text-white/30 hover:text-white text-sm transition-all">↩ Back to site</Link>
          </div>
        )}
      </aside>

      {/* MAIN */}
      <div className={cn('flex-1 flex flex-col transition-all duration-300', collapsed ? 'lg:ml-[72px]' : 'lg:ml-[220px]')}>

        <header className="h-16 bg-white border-b border-[rgba(20,18,14,.06)] flex items-center px-6 gap-4 sticky top-0 z-30">
          <div className="font-semibold text-[#14120e] capitalize">{nav === 'overview' ? 'Worker Dashboard' : nav}</div>
          <div className="ml-auto flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold"
              style={{background: tier.bgColor, borderColor: tier.color+'40', color: tier.color}}>
              {tier.icon} {tier.label}
            </div>
            <button className="w-9 h-9 rounded-xl bg-[#f5f3ee] border border-[rgba(20,18,14,.08)] flex items-center justify-center text-sm text-[#7a756c] hover:bg-[#ece9e3] transition-all">🔔</button>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8">

          {/* ── OVERVIEW ── */}
          {nav === 'overview' && (
            <div>
              <p className="text-[#7a756c] text-sm mb-8">Your onsite worker activity and current status.</p>

              {/* Quick action — GPS check in */}
              <div className="bg-[#14120e] rounded-2xl p-6 mb-8 flex items-center gap-6 relative overflow-hidden">
                <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full" style={{background: tier.color, opacity:.08}} />
                <div className="relative z-10 flex-1">
                  <div className="text-white font-semibold mb-1">Ready for today's shift?</div>
                  <div className="text-white/50 text-sm">Tap check-in when you arrive at the job site. GPS will verify your location.</div>
                </div>
                <button onClick={() => setNav('checkin')}
                  className="shrink-0 px-6 py-3 rounded-xl text-white font-semibold text-sm transition-all"
                  style={{background: tier.color}}>
                  {checkedIn ? '✅ Checked in' : '📍 GPS check-in'}
                </button>
              </div>

              {/* Stats */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { icon:'💰', label:'This month earnings', val:'$728',    color:'#1a6b3c', bg:'#e8f5ee' },
                  { icon:'🏁', label:'Jobs this month',     val:'4',       color:'#1a5a8a', bg:'#e5f0fa' },
                  { icon:'⭐', label:'Avg. rating',         val:me.rating, color:'#c2620a', bg:'#fdf0e0' },
                  { icon:'⏱️', label:'Avg. job hours',      val:'7.5h',    color:'#5c44c2', bg:'#edeafa' },
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-2xl border border-[rgba(20,18,14,.06)] p-6">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-4" style={{background:s.bg}}>{s.icon}</div>
                    <div className="font-display font-black text-3xl tracking-tight mb-1" style={{color:s.color}}>{s.val}</div>
                    <div className="text-sm text-[#7a756c]">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Recent shifts */}
              <div className="bg-white rounded-2xl border border-[rgba(20,18,14,.06)] p-6">
                <div className="flex justify-between items-center mb-5">
                  <h2 className="font-semibold text-[#14120e]">Recent shifts</h2>
                  <button onClick={() => setNav('jobs')} className="text-xs font-medium hover:underline" style={{color:tier.color}}>View all</button>
                </div>
                <div className="flex flex-col gap-3">
                  {SHIFTS.slice(0,3).map(s => (
                    <div key={s.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#f5f3ee] transition-all">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0" style={{background:tier.bgColor}}>{tier.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-[#14120e] truncate">{s.title}</div>
                        <div className="text-xs text-[#7a756c]">{s.location} · {s.date}</div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-semibold text-sm text-[#1a6b3c]">${s.pay}</div>
                        <div className="text-xs text-[#7a756c]">{s.hours}h</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── AVAILABILITY ── */}
          {nav === 'availability' && (
            <div className="max-w-xl">
              <h1 className="font-display font-black text-2xl tracking-tight text-[#14120e] mb-2">Availability settings</h1>
              <p className="text-[#7a756c] text-sm mb-8">Set when and how far you're willing to work. Clients will only see you if you match their job requirements.</p>

              {/* Days */}
              <div className="bg-white rounded-2xl border border-[rgba(20,18,14,.06)] p-6 mb-5">
                <h3 className="font-semibold text-[#14120e] mb-4">Available days</h3>
                <div className="flex gap-2 flex-wrap">
                  {DAYS.map(d => (
                    <button key={d} onClick={() => toggleDay(d)}
                      className={cn('w-12 h-12 rounded-xl text-sm font-semibold transition-all border', activeDays.includes(d) ? 'text-white border-transparent' : 'bg-[#f5f3ee] text-[#7a756c] border-[rgba(20,18,14,.06)] hover:border-[#14120e]')}
                      style={activeDays.includes(d) ? {background: tier.color, borderColor: tier.color} : {}}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hours */}
              <div className="bg-white rounded-2xl border border-[rgba(20,18,14,.06)] p-6 mb-5">
                <h3 className="font-semibold text-[#14120e] mb-4">Working hours</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#7a756c] mb-1.5">Start time</label>
                    <select className="w-full px-3.5 py-2.5 rounded-xl border border-[rgba(20,18,14,.1)] text-sm outline-none text-[#14120e] bg-[#f5f3ee]">
                      {['6:00 AM','7:00 AM','8:00 AM','9:00 AM','10:00 AM'].map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#7a756c] mb-1.5">End time</label>
                    <select className="w-full px-3.5 py-2.5 rounded-xl border border-[rgba(20,18,14,.1)] text-sm outline-none text-[#14120e] bg-[#f5f3ee]">
                      {['4:00 PM','5:00 PM','6:00 PM','7:00 PM','8:00 PM'].map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Radius */}
              <div className="bg-white rounded-2xl border border-[rgba(20,18,14,.06)] p-6 mb-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-[#14120e]">Service radius</h3>
                  <span className="font-display font-bold text-xl" style={{color:tier.color}}>{radius} km</span>
                </div>
                <input type="range" min={5} max={100} value={radius} onChange={e => setRadius(+e.target.value)} className="w-full" />
                <div className="flex justify-between text-xs text-[#b0a99e] mt-1"><span>5 km</span><span>100 km</span></div>
                <p className="text-xs text-[#7a756c] mt-3">Clients posting jobs within {radius}km of your location will see your profile in search results.</p>
              </div>

              <button className="w-full py-3.5 rounded-full text-white font-semibold text-sm transition-all" style={{background:tier.color}}>
                Save availability settings
              </button>
            </div>
          )}

          {/* ── GPS CHECK-IN ── */}
          {nav === 'checkin' && (
            <div className="max-w-md mx-auto text-center">
              <h1 className="font-display font-black text-2xl tracking-tight text-[#14120e] mb-2">GPS check-in</h1>
              <p className="text-[#7a756c] text-sm mb-10">Verify your arrival at the job site. We'll confirm your GPS coordinates match the job location.</p>

              <div className="bg-white rounded-3xl border border-[rgba(20,18,14,.06)] p-10 mb-6 shadow-[0_8px_40px_rgba(20,18,14,.08)]">
                {!checkedIn ? (
                  <>
                    <div className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center text-5xl border-4" style={{borderColor: tier.color+'40', background: tier.bgColor}}>📍</div>
                    <div className="font-semibold text-[#14120e] mb-1 text-lg">Today's job</div>
                    <div className="text-[#7a756c] text-sm mb-6">Warehouse furniture move<br />Guindy Industrial Estate, Chennai</div>

                    <div className="bg-[#f5f3ee] rounded-xl p-4 mb-6 text-left">
                      <div className="text-xs font-medium text-[#7a756c] mb-2">Job details</div>
                      <div className="flex justify-between text-sm mb-1.5"><span className="text-[#7a756c]">Client</span><span className="font-medium text-[#14120e]">Chennai Logistics</span></div>
                      <div className="flex justify-between text-sm mb-1.5"><span className="text-[#7a756c]">Hours</span><span className="font-medium text-[#14120e]">8h shift</span></div>
                      <div className="flex justify-between text-sm"><span className="text-[#7a756c]">Pay</span><span className="font-semibold" style={{color:tier.color}}>${tier.ratePerHour * 8}</span></div>
                    </div>

                    <button onClick={handleCheckIn} disabled={checkingIn}
                      className="w-full py-4 rounded-2xl text-white font-bold text-base transition-all disabled:opacity-70"
                      style={{background: tier.color}}>
                      {checkingIn ? '📡 Getting your location…' : '📍 Check in via GPS'}
                    </button>
                    <p className="text-xs text-[#b0a99e] mt-3">You must be within 200m of the job site to check in</p>
                  </>
                ) : (
                  <>
                    <div className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center text-5xl bg-[#e8f5ee] border-4 border-[rgba(26,107,60,.3)]">✅</div>
                    <div className="font-display font-bold text-2xl text-[#1a6b3c] mb-2">Checked in!</div>
                    <div className="text-[#7a756c] text-sm mb-4">Your arrival has been verified and recorded.</div>
                    <div className="bg-[#e8f5ee] rounded-xl p-4 text-left">
                      <div className="flex justify-between text-sm mb-1"><span className="text-[#7a756c]">Check-in time</span><span className="font-semibold text-[#1a6b3c]">8:02 AM</span></div>
                      <div className="flex justify-between text-sm"><span className="text-[#7a756c]">GPS verified</span><span className="font-semibold text-[#1a6b3c]">Within 45m ✓</span></div>
                    </div>
                    <button onClick={() => setCheckedIn(false)}
                      className="w-full mt-4 py-3.5 rounded-2xl bg-[#14120e] text-white font-semibold text-sm hover:bg-[#1a6b3c] transition-all">
                      Clock out when done
                    </button>
                  </>
                )}
              </div>

              <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[rgba(20,18,14,.06)] text-left">
                <span className="text-2xl">📱</span>
                <div className="text-xs text-[#7a756c]"><strong className="text-[#14120e]">Alternative:</strong> Scan the QR code at the job site entrance to check in without GPS.</div>
              </div>
            </div>
          )}

          {/* ── JOBS ── */}
          {nav === 'jobs' && (
            <div>
              <h1 className="font-display font-black text-2xl tracking-tight text-[#14120e] mb-8">My shifts</h1>
              <div className="bg-white rounded-2xl border border-[rgba(20,18,14,.06)] overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#f5f3ee] border-b border-[rgba(20,18,14,.06)]">
                      {['Job','Location','Date','Hours','Pay','Status'].map(h => (
                        <th key={h} className="text-left p-4 text-xs font-bold text-[#7a756c] uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {SHIFTS.map(s => (
                      <tr key={s.id} className="border-b border-[rgba(20,18,14,.06)] last:border-0 hover:bg-[#f5f3ee] transition-all">
                        <td className="p-4 font-medium text-sm text-[#14120e]">{s.title}</td>
                        <td className="p-4 text-sm text-[#7a756c]">{s.location}</td>
                        <td className="p-4 text-sm text-[#7a756c]">{s.date}</td>
                        <td className="p-4 text-sm text-[#7a756c]">{s.hours}h</td>
                        <td className="p-4 font-semibold text-sm text-[#1a6b3c]">${s.pay}</td>
                        <td className="p-4"><span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#e8f5ee] text-[#1a6b3c]">{s.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {nav !== 'overview' && nav !== 'availability' && nav !== 'checkin' && nav !== 'jobs' && (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <div className="text-5xl mb-4">{NAV.find(n=>n.id===nav)?.icon}</div>
              <h2 className="font-display font-bold text-xl text-[#14120e] mb-2 capitalize">{nav}</h2>
              <p className="text-[#7a756c] text-sm mb-6">Coming in the next build</p>
              <button onClick={() => setNav('overview')} className="px-6 py-2.5 rounded-full text-white text-sm font-medium transition-all" style={{background:tier.color}}>Back to overview</button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
