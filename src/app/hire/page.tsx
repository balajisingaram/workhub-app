'use client'
import { useState } from 'react'
import Link from 'next/link'
import { MOCK_FREELANCERS, MOCK_WORKERS, WEIGHT_TIERS } from '@/lib/data'
import { cn, getWeightTierInfo } from '@/lib/utils'
import { useLocation, CountrySelector } from '@/context/LocationContext'

function HireModal({ fl, onClose }: { fl: any; onClose: () => void }) {
  const { convertPrice } = useLocation()
  const [budget, setBudget] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  if (sent) return (
    <div className="modal-backdrop fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in" onClick={e => { if (e.target===e.currentTarget) onClose() }}>
      <div className="bg-white rounded-3xl p-10 w-full max-w-sm text-center shadow-large animate-scale-in">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="font-display font-black text-xl text-[var(--ink)] mb-2">Request sent!</h2>
        <p className="text-sm text-[var(--ink3)] mb-6">Your hire request has been sent to {fl.name}. They usually respond within {fl.responseTime}.</p>
        <button onClick={onClose} className="w-full py-3 rounded-full bg-[var(--ink)] text-white text-sm font-semibold hover:bg-[var(--accent)] transition-smooth">Done</button>
      </div>
    </div>
  )
  return (
    <div className="modal-backdrop fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in" onClick={e => { if (e.target===e.currentTarget) onClose() }}>
      <div className="bg-white rounded-3xl p-7 w-full max-w-md shadow-large animate-scale-in relative">
        <button onClick={onClose} className="absolute right-4 top-4 w-8 h-8 rounded-full bg-[var(--bg)] flex items-center justify-center text-sm text-[var(--ink3)] hover:bg-[var(--bg3)] transition-smooth">✕</button>
        <div className="flex items-center gap-3 mb-5">
          <img src={fl.avatarUrl} alt={fl.name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-soft"
            onError={e => { (e.target as any).src = `https://ui-avatars.com/api/?name=${fl.name}&background=ece9e3&color=7a756c&size=48` }} />
          <div>
            <div className="font-semibold text-[var(--ink)]">{fl.name}</div>
            <div className="text-xs text-[var(--ink3)]">{fl.title}</div>
          </div>
        </div>
        <h2 className="font-display font-bold text-xl tracking-tight mb-5">Hire {fl.name.split(' ')[0]}</h2>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold text-[var(--ink2)] mb-1.5">Your budget</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[var(--ink3)] font-medium">$</span>
              <input type="number" value={budget} onChange={e => setBudget(e.target.value)} placeholder="500"
                className="w-full pl-8 pr-4 py-3 rounded-xl border border-[rgba(20,18,14,.1)] text-sm outline-none focus:border-[rgba(20,18,14,.3)] transition-smooth" />
            </div>
            <div className="text-xs text-[var(--ink3)] mt-1">Suggested: {convertPrice(fl.hourlyRateMin)}–{convertPrice(fl.hourlyRateMax)}/hr</div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-[var(--ink2)] mb-1.5">Message to {fl.name.split(' ')[0]}</label>
            <textarea value={message} onChange={e => setMessage(e.target.value)} rows={4}
              placeholder={`Hi ${fl.name.split(' ')[0]}, I'd like to hire you for...`}
              className="w-full px-4 py-3 rounded-xl border border-[rgba(20,18,14,.1)] text-sm outline-none focus:border-[rgba(20,18,14,.3)] resize-none transition-smooth" />
          </div>
          <div className="flex items-start gap-3 p-3.5 bg-[var(--accent-light)] rounded-xl border border-[rgba(26,107,60,.15)]">
            <span>🔒</span>
            <div className="text-xs text-[var(--accent)] leading-relaxed"><strong>Escrow protected.</strong> Payment held securely — released only when you approve the work.</div>
          </div>
          <button onClick={() => { if (budget && message) setSent(true) }}
            className="w-full py-3.5 rounded-full bg-[var(--accent)] text-white font-semibold text-sm hover:bg-[var(--ink)] transition-smooth">
            Confirm booking →
          </button>
        </div>
      </div>
    </div>
  )
}

function BookWorkerModal({ worker, tier, onClose }: { worker: any; tier: any; onClose: () => void }) {
  const [done, setDone] = useState(false)
  if (done) return (
    <div className="modal-backdrop fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in" onClick={e => { if (e.target===e.currentTarget) onClose() }}>
      <div className="bg-white rounded-3xl p-10 w-full max-w-sm text-center shadow-large animate-scale-in">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="font-display font-black text-xl text-[var(--ink)] mb-2">Booking confirmed!</h2>
        <p className="text-sm text-[var(--ink3)] mb-2">The worker's full profile and contact details have been shared with you.</p>
        <p className="text-xs text-[var(--ink3)] mb-6">They will arrive at the location on the agreed date.</p>
        <button onClick={onClose} className="w-full py-3 rounded-full bg-[var(--ink)] text-white text-sm font-semibold hover:bg-[var(--accent)] transition-smooth">Done</button>
      </div>
    </div>
  )
  return (
    <div className="modal-backdrop fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in" onClick={e => { if (e.target===e.currentTarget) onClose() }}>
      <div className="bg-white rounded-3xl p-7 w-full max-w-md shadow-large animate-scale-in relative">
        <button onClick={onClose} className="absolute right-4 top-4 w-8 h-8 rounded-full bg-[var(--bg)] flex items-center justify-center text-sm text-[var(--ink3)] hover:bg-[var(--bg3)] transition-smooth">✕</button>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0" style={{background:tier.bgColor}}>{tier.icon}</div>
          <div><div className="font-semibold text-sm text-[var(--ink)]">{tier.label} worker</div><div className="text-xs text-[var(--ink3)]">${tier.ratePerHour}/hr · {tier.range}</div></div>
        </div>
        <h2 className="font-display font-bold text-xl tracking-tight mb-1">Book this worker</h2>
        <p className="text-sm text-[var(--ink3)] mb-5">Worker details revealed after booking confirmation</p>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold text-[var(--ink2)] mb-1.5">Job location</label>
            <input type="text" placeholder="e.g. 123 Main St, Chennai"
              className="w-full px-4 py-3 rounded-xl border border-[rgba(20,18,14,.1)] text-sm outline-none focus:border-[rgba(20,18,14,.3)] transition-smooth" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-[var(--ink2)] mb-1.5">Date</label>
              <input type="date" className="w-full px-4 py-3 rounded-xl border border-[rgba(20,18,14,.1)] text-sm outline-none focus:border-[rgba(20,18,14,.3)] transition-smooth" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[var(--ink2)] mb-1.5">Hours needed</label>
              <input type="number" placeholder="8" min={1}
                className="w-full px-4 py-3 rounded-xl border border-[rgba(20,18,14,.1)] text-sm outline-none focus:border-[rgba(20,18,14,.3)] transition-smooth" />
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#fdf0e0] rounded-xl border border-[rgba(194,98,10,.15)]">
            <span>📷</span>
            <div className="text-xs text-[#c2620a] leading-relaxed"><strong>Identity revealed after booking.</strong> Worker's full name, photo and contact details are shared immediately after you confirm.</div>
          </div>
          <button onClick={() => setDone(true)}
            className="w-full py-3.5 rounded-full text-white font-semibold text-sm transition-smooth" style={{background:tier.color}}>
            Confirm booking →
          </button>
        </div>
      </div>
    </div>
  )
}

type WorkerTab = 'freelancers' | 'gigs' | 'drivers'

const MOCK_DRIVERS = [
  { id:'d1', code:'DR-1142', skills:['Package delivery','Long distance','Cab runs'],   vehicle:'Sedan',    radius:40, rating:4.8, reviews:62, jobs:74,  tier:'light' as const },
  { id:'d2', code:'DR-2287', skills:['Logistics','Heavy goods','Warehouse runs'],       vehicle:'Truck',    radius:80, rating:4.9, reviews:98, jobs:112, tier:'heavy' as const },
  { id:'d3', code:'DR-3391', skills:['Food delivery','Last-mile','E-commerce runs'],   vehicle:'Motorbike',radius:25, rating:4.7, reviews:44, jobs:51,  tier:'light' as const },
]

function Stars({ r }: { r: number }) {
  return <span className="stars text-xs">{'★'.repeat(Math.floor(r))}{'☆'.repeat(5-Math.floor(r))}</span>
}

export default function HirePage() {
  const [activeTab, setActiveTab] = useState<WorkerTab>('freelancers')
  const [search, setSearch] = useState('')
  const [hireTarget, setHireTarget] = useState<any>(null)
  const [bookWorker, setBookWorker] = useState<{worker:any;tier:any}|null>(null)
  const { country, convertPrice } = useLocation()

  const tabs: {id:WorkerTab;icon:string;label:string;count:number}[] = [
    { id:'freelancers', icon:'💻', label:'Freelancers',  count: MOCK_FREELANCERS.length },
    ...(country.hasGigWorkers ? [{ id:'gigs' as WorkerTab, icon:'🔧', label:'Gig workers', count: MOCK_WORKERS.length }] : []),
    ...(country.hasDrivers    ? [{ id:'drivers' as WorkerTab, icon:'🚗', label:'Drivers',    count: MOCK_DRIVERS.length }] : []),
  ]

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center nav-blur border-b border-[var(--border2)]">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-10 w-full flex items-center gap-3">
          <Link href="/" className="font-display font-black text-[20px] tracking-tight text-[var(--ink)]">Gig<span className="text-[var(--accent)]">Hub</span></Link>
          <span className="text-[var(--ink4)] text-sm">/</span>
          <span className="text-sm font-semibold text-[var(--ink)] hidden sm:block">Hire Gig Work</span>
          <div className="flex-1" />
          <CountrySelector />
          <Link href="/find-jobs" className="text-sm text-[var(--ink3)] hover:text-[var(--ink)] transition-smooth hidden sm:block">Looking for work?</Link>
          <Link href="/jobs/post"><button className="px-4 py-2 rounded-full bg-[var(--ink)] text-white text-sm font-semibold hover:bg-[var(--accent)] transition-smooth">+ Post a job</button></Link>
          <Link href="/login"><button className="px-4 py-2 rounded-full border border-[var(--border)] text-sm font-medium text-[var(--ink2)] hover:bg-[var(--bg2)] transition-smooth hidden sm:block">Log in</button></Link>
        </div>
      </nav>

      <main className="pt-16 min-h-screen bg-[var(--bg)]">
        {/* Hero */}
        <div className="bg-[var(--ink)] text-white">
          <div className="max-w-[1280px] mx-auto px-5 lg:px-10 py-12 sm:py-14">
            <div className="max-w-2xl">
              <h1 className="font-display font-black mb-3" style={{fontSize:'clamp(26px,5vw,52px)',letterSpacing:'-0.03em',lineHeight:1.05}}>
                Hire verified talent<br /><em className="text-[#7ee8a2] not-italic">for any job</em>
              </h1>
              <p className="text-white/55 text-sm sm:text-base leading-relaxed mb-6">
                {country.hasGigWorkers
                  ? 'Freelancers for remote work, gig workers for onsite tasks, drivers for delivery — all verified.'
                  : 'Top freelancers for remote projects — design, development, marketing, writing and more.'}
              </p>
              <div className="flex gap-3 max-w-xl">
                <div className="flex-1 flex items-center gap-3 bg-white/10 rounded-xl border border-white/15 px-4 focus-within:border-white/30 transition-smooth">
                  <span className="text-white/40">🔍</span>
                  <input value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Search skills or name…"
                    className="flex-1 bg-transparent py-3 text-white text-sm outline-none placeholder:text-white/30" />
                </div>
                <Link href="/jobs/post">
                  <button className="px-5 py-3 bg-[var(--accent)] text-white rounded-xl text-sm font-semibold hover:bg-[#2d9c5e] transition-smooth whitespace-nowrap">Post a job</button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-[var(--border2)] sticky top-16 z-20">
          <div className="max-w-[1280px] mx-auto px-5 lg:px-10">
            <div className="flex gap-1 py-2 overflow-x-auto scrollbar-none">
              {tabs.map(t => (
                <button key={t.id} onClick={() => setActiveTab(t.id)}
                  className={cn('flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-smooth',
                    activeTab===t.id ? 'bg-[var(--ink)] text-white' : 'text-[var(--ink3)] hover:text-[var(--ink)] hover:bg-[var(--bg)]')}>
                  {t.icon} {t.label}
                  <span className={cn('text-[11px] font-bold px-1.5 py-0.5 rounded-full',
                    activeTab===t.id ? 'bg-white/20 text-white' : 'bg-[var(--bg)] text-[var(--ink3)]')}>{t.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-5 lg:px-10 py-8 sm:py-10">

          {/* ── FREELANCERS ── */}
          {activeTab === 'freelancers' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-bold text-lg sm:text-xl text-[var(--ink)] tracking-tight">Remote freelancers</h2>
                <span className="text-sm text-[var(--ink3)] hidden sm:block">{MOCK_FREELANCERS.length} available</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {MOCK_FREELANCERS.filter(fl => !search || fl.name.toLowerCase().includes(search.toLowerCase()) || fl.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))).map(fl => (
                  <div key={fl.id} className="bg-white rounded-2xl border border-[var(--border2)] p-4 sm:p-5 hover:-translate-y-1 hover:shadow-medium transition-smooth group flex flex-col">
                    <div className="relative mb-3">
                      <img src={fl.avatarUrl} alt={fl.name} className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-white shadow-soft"
                        onError={e => { (e.target as any).src = `https://ui-avatars.com/api/?name=${fl.name}&background=ece9e3&color=7a756c&size=64` }} />
                      {fl.isOnline && <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[var(--accent)] border-2 border-white" />}
                      {fl.isTopRated && <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#f5a623] flex items-center justify-center text-[10px]">⭐</div>}
                    </div>
                    <Link href={`/freelancers/${fl.id}`}>
                      <div className="font-semibold text-sm text-[var(--ink)] group-hover:text-[var(--accent)] transition-smooth leading-tight mb-0.5">{fl.name}</div>
                    </Link>
                    <div className="text-xs text-[var(--ink3)] mb-2 line-clamp-1">{fl.title}</div>
                    <div className="flex items-center gap-1 mb-2">
                      <Stars r={fl.rating} />
                      <span className="text-xs font-semibold text-[var(--ink)]">{fl.rating}</span>
                      <span className="text-xs text-[var(--ink3)] hidden sm:inline">({fl.reviewCount})</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3 flex-1">
                      {fl.skills.slice(0,2).map(s => <span key={s} className="px-2 py-0.5 bg-[var(--bg)] rounded text-[10px] sm:text-[11px] font-medium text-[var(--ink2)]">{s}</span>)}
                    </div>
                    <div className="flex items-center justify-between pt-2.5 border-t border-[var(--border2)]">
                      <div className="font-display font-bold text-sm sm:text-base text-[var(--ink)]">{convertPrice(fl.hourlyRateMin)}<span className="font-sans text-[10px] font-normal text-[var(--ink3)]">/hr</span></div>
                      <button onClick={() => setHireTarget(fl)}
                        className="px-2.5 sm:px-3 py-1.5 bg-[var(--ink)] text-white text-[10px] sm:text-xs font-semibold rounded-full group-hover:bg-[var(--accent)] transition-smooth">
                        Hire
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── GIG WORKERS — no personal info ── */}
          {activeTab === 'gigs' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display font-bold text-lg sm:text-xl text-[var(--ink)] tracking-tight">Onsite gig workers</h2>
                  <p className="text-xs text-[var(--ink3)] mt-0.5">Worker identity revealed after booking confirmation</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {MOCK_WORKERS.map(w => {
                  const tier = getWeightTierInfo(w.weightTier)
                  return (
                    <div key={w.id} className="bg-white rounded-2xl border border-[var(--border2)] p-5 hover:-translate-y-0.5 hover:shadow-medium transition-smooth">
                      {/* No name, no photo, no location — only tier, skills, rating, price */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0" style={{background:tier.bgColor}}>{tier.icon}</div>
                        <div>
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border" style={{background:tier.bgColor, borderColor:tier.color+'40', color:tier.color}}>
                            {tier.label} · {tier.range}
                          </div>
                          <div className="flex items-center gap-1 mt-1.5">
                            <Stars r={w.rating} />
                            <span className="text-xs font-semibold text-[var(--ink)]">{w.rating}</span>
                            <span className="text-xs text-[var(--ink3)]">({w.reviewCount})</span>
                            <span className="text-xs text-[var(--ink3)] ml-1">· {w.jobsCompleted} jobs</span>
                          </div>
                        </div>
                        {w.isVerified && <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--accent-light)] text-[var(--accent)]">Verified</span>}
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {w.skills.map(s => <span key={s} className="px-2.5 py-1 bg-[var(--bg)] rounded-lg text-xs font-medium text-[var(--ink2)]">{s}</span>)}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-[var(--ink3)] mb-4">
                        <span>📍 Within {w.radiusKm}km</span>
                        <span>🕐 {w.availableHours}</span>
                        {w.vehicleType && <span>🚗 {w.vehicleType}</span>}
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-[var(--border2)]">
                        <div>
                          <div className="font-display font-bold text-xl text-[var(--ink)]">${tier.ratePerHour}<span className="font-sans text-xs font-normal text-[var(--ink3)]">/hr</span></div>
                          <div className="text-[11px] text-[var(--ink3)]">Identity revealed on booking</div>
                        </div>
                        <button onClick={() => setBookWorker({worker:w, tier})}
                          className="px-4 py-2 text-white text-xs font-semibold rounded-full transition-smooth" style={{background:tier.color}}>
                          Book worker
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── DRIVERS — no personal info ── */}
          {activeTab === 'drivers' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display font-bold text-lg sm:text-xl text-[var(--ink)] tracking-tight">Drivers</h2>
                  <p className="text-xs text-[var(--ink3)] mt-0.5">Driver identity revealed after booking confirmation</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {MOCK_DRIVERS.map(d => {
                  const tier = getWeightTierInfo(d.tier)
                  return (
                    <div key={d.id} className="bg-white rounded-2xl border border-[var(--border2)] p-5 hover:-translate-y-0.5 hover:shadow-medium transition-smooth">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-[#e5f0fa] flex items-center justify-center text-2xl shrink-0">🚗</div>
                        <div>
                          <div className="text-sm font-semibold text-[var(--ink)]">{d.vehicle}</div>
                          <div className="flex items-center gap-1 mt-1">
                            <Stars r={d.rating} />
                            <span className="text-xs font-semibold text-[var(--ink)]">{d.rating}</span>
                            <span className="text-xs text-[var(--ink3)]">({d.reviews}) · {d.jobs} trips</span>
                          </div>
                        </div>
                        <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#e5f0fa] text-[#1a5a8a]">Verified</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {d.skills.map(s => <span key={s} className="px-2.5 py-1 bg-[#e5f0fa] rounded-lg text-xs font-medium text-[#1a5a8a]">{s}</span>)}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-[var(--ink3)] mb-4">
                        <span>📍 Within {d.radius}km</span>
                        <span>🔒 Identity hidden</span>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-[var(--border2)]">
                        <div>
                          <div className="font-display font-bold text-xl text-[var(--ink)]">$12<span className="font-sans text-xs font-normal text-[var(--ink3)]">/hr</span></div>
                          <div className="text-[11px] text-[var(--ink3)]">Identity revealed on booking</div>
                        </div>
                        <button onClick={() => setBookWorker({worker:d, tier})}
                          className="px-4 py-2 bg-[#1a5a8a] text-white text-xs font-semibold rounded-full hover:bg-[var(--ink)] transition-smooth">
                          Book driver
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Post job CTA */}
          <div className="mt-10 sm:mt-12 bg-[var(--ink)] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
            <div>
              <div className="font-display font-bold text-lg sm:text-xl text-white mb-1">Can't find what you need?</div>
              <div className="text-white/50 text-sm">Post a job and let workers come to you — usually within 30 minutes</div>
            </div>
            <Link href="/jobs/post">
              <button className="px-7 py-3.5 rounded-full bg-[var(--accent)] text-white font-semibold text-sm hover:bg-[#2d9c5e] transition-smooth whitespace-nowrap">Post a job now →</button>
            </Link>
          </div>
        </div>
      </main>

      {hireTarget && <HireModal fl={hireTarget} onClose={() => setHireTarget(null)} />}
      {bookWorker && <BookWorkerModal worker={bookWorker.worker} tier={bookWorker.tier} onClose={() => setBookWorker(null)} />}
    </>
  )
}
