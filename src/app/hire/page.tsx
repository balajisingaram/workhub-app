'use client'
import { useState } from 'react'
import Link from 'next/link'
import { MOCK_FREELANCERS, MOCK_WORKERS, MOCK_JOBS } from '@/lib/data'
import { cn, getWeightTierInfo } from '@/lib/utils'

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center nav-blur border-b border-[var(--border2)]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 w-full flex items-center gap-4">
        <Link href="/" className="font-display font-black text-[20px] tracking-tight text-[var(--ink)]">
          Gig<span className="text-[var(--accent)]">Hub</span>
        </Link>
        <span className="text-[var(--ink4)] text-sm mx-1">/</span>
        <span className="text-sm font-semibold text-[var(--ink)]">Hire Gig Work</span>
        <div className="flex-1" />
        <Link href="/find-jobs" className="text-sm text-[var(--ink3)] hover:text-[var(--ink)] transition-smooth hidden sm:block">Looking for work?</Link>
        <Link href="/hire/post-job">
          <button className="px-5 py-2 rounded-full bg-[var(--ink)] text-white text-sm font-semibold hover:bg-[var(--accent)] transition-smooth">
            + Post a job
          </button>
        </Link>
        <Link href="/hire/login">
          <button className="px-5 py-2 rounded-full border border-[var(--border)] text-sm font-medium text-[var(--ink2)] hover:bg-[var(--bg2)] transition-smooth">
            Log in
          </button>
        </Link>
      </div>
    </nav>
  )
}

type WorkerTab = 'freelancers' | 'gigs' | 'drivers'

function Stars({ r }: { r: number }) {
  return <span className="stars text-xs">{'★'.repeat(Math.floor(r))}{'☆'.repeat(5 - Math.floor(r))}</span>
}

export default function HirePage() {
  const [activeTab, setActiveTab] = useState<WorkerTab>('freelancers')
  const [search, setSearch] = useState('')

  const tabs: { id: WorkerTab; icon: string; label: string; count: number }[] = [
    { id: 'freelancers', icon: '💻', label: 'Freelancers',  count: MOCK_FREELANCERS.length },
    { id: 'gigs',        icon: '🔧', label: 'Gig workers',  count: MOCK_WORKERS.length },
    { id: 'drivers',     icon: '🚗', label: 'Drivers',      count: 3 },
  ]

  const MOCK_DRIVERS = [
    { id: 'd1', code: 'DR-1142', skills: ['Package delivery', 'Long distance', 'Cab runs'], vehicle: 'Sedan', radius: 40, rating: 4.8, reviews: 62, jobs: 74, tier: 'light' as const },
    { id: 'd2', code: 'DR-2287', skills: ['Logistics', 'Heavy goods', 'Warehouse runs'], vehicle: 'Truck', radius: 80, rating: 4.9, reviews: 98, jobs: 112, tier: 'heavy' as const },
    { id: 'd3', code: 'DR-3391', skills: ['Food delivery', 'Last-mile', 'E-commerce'], vehicle: 'Motorbike', radius: 25, rating: 4.7, reviews: 44, jobs: 51, tier: 'light' as const },
  ]

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[var(--bg)]">

        {/* Hero banner */}
        <div className="bg-[var(--ink)] text-white">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-14">
            <div className="max-w-2xl">
              <h1 className="font-display font-black mb-3" style={{ fontSize: 'clamp(30px,5vw,56px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
                Hire verified talent<br /><em className="text-[#7ee8a2] not-italic">for any job</em>
              </h1>
              <p className="text-white/55 text-base leading-relaxed mb-8">
                Freelancers for remote work, gig workers for onsite tasks, drivers for delivery and transport. All verified, all insured.
              </p>
              <div className="flex gap-3">
                <div className="flex-1 flex items-center gap-3 bg-white/10 rounded-xl border border-white/15 px-4 focus-within:border-white/30 transition-smooth">
                  <span className="text-white/40">🔍</span>
                  <input value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Search skills, job type or location…"
                    className="flex-1 bg-transparent py-3 text-white outline-none text-sm placeholder:text-white/30" />
                </div>
                <Link href="/hire/post-job">
                  <button className="px-6 py-3 bg-[var(--accent)] text-white rounded-xl text-sm font-semibold hover:bg-[var(--accent2)] transition-smooth whitespace-nowrap">
                    Post a job
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Tab bar */}
        <div className="bg-white border-b border-[var(--border2)] sticky top-16 z-20">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
            <div className="flex gap-1 overflow-x-auto scrollbar-none py-2">
              {tabs.map(t => (
                <button key={t.id} onClick={() => setActiveTab(t.id)}
                  className={cn('flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-smooth',
                    activeTab === t.id ? 'bg-[var(--ink)] text-white' : 'text-[var(--ink3)] hover:text-[var(--ink)] hover:bg-[var(--bg)]')}>
                  {t.icon} {t.label}
                  <span className={cn('text-[11px] font-bold px-1.5 py-0.5 rounded-full',
                    activeTab === t.id ? 'bg-white/20 text-white' : 'bg-[var(--bg)] text-[var(--ink3)]')}>{t.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-10">

          {/* ── FREELANCERS ── */}
          {activeTab === 'freelancers' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-bold text-xl text-[var(--ink)] tracking-tight">Remote freelancers</h2>
                <span className="text-sm text-[var(--ink3)]">{MOCK_FREELANCERS.length} available</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {MOCK_FREELANCERS.map(fl => (
                  <Link key={fl.id} href={`/freelancers/${fl.id}`}>
                    <div className="bg-white rounded-2xl border border-[var(--border2)] p-5 hover:-translate-y-1 hover:shadow-medium transition-smooth cursor-pointer group">
                      <div className="w-14 h-14 rounded-full bg-[var(--bg2)] flex items-center justify-center text-xl font-bold text-[var(--ink3)] mb-3 relative">
                        {fl.name.split(' ').map(n => n[0]).join('')}
                        {fl.isOnline && <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[var(--accent)] border-2 border-white" />}
                      </div>
                      <div className="font-semibold text-sm text-[var(--ink)] group-hover:text-[var(--accent)] transition-smooth">{fl.name}</div>
                      <div className="text-xs text-[var(--ink3)] mb-2 truncate">{fl.title}</div>
                      <div className="flex items-center gap-1 mb-3">
                        <Stars r={fl.rating} />
                        <span className="text-xs font-semibold text-[var(--ink)]">{fl.rating}</span>
                        <span className="text-xs text-[var(--ink3)]">({fl.reviewCount})</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {fl.skills.slice(0, 2).map(s => <span key={s} className="px-2 py-0.5 bg-[var(--bg)] rounded text-[11px] font-medium text-[var(--ink2)]">{s}</span>)}
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-[var(--border2)]">
                        <div className="font-display font-bold text-base text-[var(--ink)]">${fl.hourlyRateMin}<span className="font-sans text-xs font-normal text-[var(--ink3)]">/hr</span></div>
                        <span className="px-3 py-1.5 bg-[var(--ink)] text-white text-xs font-semibold rounded-full group-hover:bg-[var(--accent)] transition-smooth">Hire</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* ── GIG WORKERS ── */}
          {activeTab === 'gigs' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-bold text-xl text-[var(--ink)] tracking-tight">Onsite gig workers</h2>
                <span className="text-sm text-[var(--ink3)]">{MOCK_WORKERS.length} available near you</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {MOCK_WORKERS.map(w => {
                  const tier = getWeightTierInfo(w.weightTier)
                  return (
                    <div key={w.id} className="bg-white rounded-2xl border border-[var(--border2)] p-5 hover:-translate-y-0.5 hover:shadow-medium transition-smooth">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-[var(--bg2)] flex items-center justify-center text-xl relative overflow-hidden shrink-0">
                          <span className="filter blur-sm select-none">👷</span>
                          <div className="absolute inset-0 bg-[rgba(20,18,14,.3)] flex items-center justify-center">
                            <span className="text-white text-sm">🔒</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-sm text-[var(--ink)]">Worker #{w.workerCode}</div>
                          <div className="text-xs text-[var(--ink3)]">Photo revealed after payment</div>
                          <div className="flex items-center gap-1 mt-1">
                            <Stars r={w.rating} />
                            <span className="text-xs text-[var(--ink3)]">({w.reviewCount})</span>
                          </div>
                        </div>
                        {w.isVerified && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--accent-light)] text-[var(--accent)] shrink-0">Verified</span>}
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold border mb-3"
                        style={{ background: tier.bgColor, borderColor: tier.color + '40', color: tier.color }}>
                        {tier.icon} {tier.label} · {tier.range}
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {w.skills.slice(0, 2).map(s => <span key={s} className="px-2.5 py-1 bg-[var(--bg)] rounded-lg text-xs font-medium text-[var(--ink2)]">{s}</span>)}
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-[var(--border2)]">
                        <div className="font-display font-bold text-lg text-[var(--ink)]">${tier.ratePerHour}<span className="font-sans text-xs font-normal text-[var(--ink3)]">/hr</span></div>
                        <Link href="/onsite"><button className="px-4 py-1.5 bg-[var(--ink)] text-white text-xs font-semibold rounded-full hover:bg-[var(--accent)] transition-smooth">Book</button></Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── DRIVERS ── */}
          {activeTab === 'drivers' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-bold text-xl text-[var(--ink)] tracking-tight">Drivers</h2>
                <span className="text-sm text-[var(--ink3)]">3 available near you</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {MOCK_DRIVERS.map(d => {
                  const tier = getWeightTierInfo(d.tier)
                  return (
                    <div key={d.id} className="bg-white rounded-2xl border border-[var(--border2)] p-5 hover:-translate-y-0.5 hover:shadow-medium transition-smooth">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-[var(--bg2)] flex items-center justify-center text-xl relative overflow-hidden shrink-0">
                          <span className="filter blur-sm select-none">🚗</span>
                          <div className="absolute inset-0 bg-[rgba(20,18,14,.3)] flex items-center justify-center">
                            <span className="text-white text-sm">🔒</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-sm text-[var(--ink)]">Driver #{d.code}</div>
                          <div className="text-xs text-[var(--ink3)]">Identity hidden until booking</div>
                          <div className="flex items-center gap-1 mt-1">
                            <Stars r={d.rating} />
                            <span className="text-xs text-[var(--ink3)]">({d.reviews})</span>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--accent-light)] text-[var(--accent)] shrink-0">Verified</span>
                      </div>
                      <div className="flex items-center gap-2 mb-3 text-xs text-[var(--ink3)]">
                        <span>🚗 {d.vehicle}</span>
                        <span>·</span>
                        <span>📍 {d.radius}km radius</span>
                        <span>·</span>
                        <span>🏁 {d.jobs} trips</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {d.skills.map(s => <span key={s} className="px-2.5 py-1 bg-[#e5f0fa] rounded-lg text-xs font-medium text-[#1a5a8a]">{s}</span>)}
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-[var(--border2)]">
                        <div>
                          <div className="font-display font-bold text-lg text-[var(--ink)]">$12<span className="font-sans text-xs font-normal text-[var(--ink3)]">/hr</span></div>
                          <div className="text-[11px] text-[var(--ink3)]">+ distance charges</div>
                        </div>
                        <button className="px-4 py-1.5 bg-[#1a5a8a] text-white text-xs font-semibold rounded-full hover:bg-[var(--ink)] transition-smooth">Book driver</button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Post job CTA */}
          <div className="mt-12 bg-[var(--ink)] rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <div className="font-display font-bold text-xl text-white mb-1">Can't find what you need?</div>
              <div className="text-white/50 text-sm">Post a job and let workers come to you — usually within 30 minutes</div>
            </div>
            <Link href="/jobs/post">
              <button className="px-8 py-3.5 rounded-full bg-[var(--accent)] text-white font-semibold text-sm hover:bg-[var(--accent2)] transition-smooth whitespace-nowrap">
                Post a job now →
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
