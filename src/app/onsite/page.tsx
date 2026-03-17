'use client'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { MOCK_WORKERS, WEIGHT_TIERS } from '@/lib/data'
import { cn, getWeightTierInfo } from '@/lib/utils'
import type { WeightTier, OnsiteWorker } from '@/types'

function Stars({ r }: { r: number }) {
  return <span className="stars text-xs">{'★'.repeat(Math.floor(r))}{'☆'.repeat(5 - Math.floor(r))}</span>
}

function WorkerCard({ worker }: { worker: OnsiteWorker }) {
  const [bookOpen, setBookOpen] = useState(false)
  const [paid, setPaid]         = useState(false)
  const tier = getWeightTierInfo(worker.weightTier)

  return (
    <>
      <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border2)] p-6 hover:shadow-medium hover:-translate-y-0.5 transition-smooth flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start gap-4">
          {/* Avatar — blurred until paid */}
          <div className="relative shrink-0">
            <div className={cn('w-16 h-16 rounded-full bg-[var(--bg2)] flex items-center justify-center text-2xl border-2 border-white shadow-soft overflow-hidden',
              !paid && 'filter blur-sm select-none pointer-events-none')}>
              {paid ? '👷' : '?'}
            </div>
            {!paid && (
              <div className="absolute inset-0 rounded-full bg-[var(--ink)]/40 flex items-center justify-center">
                <span className="text-white text-sm">🔒</span>
              </div>
            )}
            {worker.isOnline && paid && (
              <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-[var(--accent)] border-2 border-white" />
            )}
          </div>

          <div className="flex-1">
            <div className="font-semibold text-[var(--ink)] mb-0.5">
              {paid ? worker.name : `Worker #${worker.workerCode}`}
            </div>
            <div className="text-xs text-[var(--ink3)] mb-2">
              {paid ? worker.location : 'Location hidden until hire'}
            </div>
            <div className="flex items-center gap-1.5">
              <Stars r={worker.rating} />
              <span className="text-xs font-semibold text-[var(--ink)]">{worker.rating}</span>
              <span className="text-xs text-[var(--ink3)]">({worker.reviewCount})</span>
              <span className="text-[var(--ink4)] text-xs">·</span>
              <span className="text-xs text-[var(--ink3)]">{worker.jobsCompleted} jobs</span>
            </div>
          </div>

          {worker.isVerified && (
            <span className="px-2.5 py-1 bg-[var(--accent-light)] text-[var(--accent)] text-[10px] font-bold rounded-full shrink-0">Verified</span>
          )}
        </div>

        {/* Weight tier badge */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold"
            style={{ background: tier.bgColor, borderColor: tier.color + '40', color: tier.color }}>
            <span>{tier.icon}</span>
            {tier.label} · {tier.range}
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5">
          {worker.skills.slice(0, 3).map(s => (
            <span key={s} className="px-2.5 py-1 bg-[var(--bg)] rounded-lg text-xs font-medium text-[var(--ink2)]">{s}</span>
          ))}
        </div>

        {/* Availability */}
        <div className="grid grid-cols-2 gap-3 text-xs text-[var(--ink3)]">
          <div>
            <div className="font-medium text-[var(--ink)] mb-0.5">📍 Radius</div>
            <div>Within {worker.radiusKm} km</div>
          </div>
          <div>
            <div className="font-medium text-[var(--ink)] mb-0.5">🕐 Hours</div>
            <div>{worker.availableHours}</div>
          </div>
          <div>
            <div className="font-medium text-[var(--ink)] mb-0.5">📅 Available</div>
            <div>{worker.availableDays.slice(0,3).join(', ')}{worker.availableDays.length > 3 ? '…' : ''}</div>
          </div>
          {worker.vehicleType && (
            <div>
              <div className="font-medium text-[var(--ink)] mb-0.5">🚗 Vehicle</div>
              <div>{worker.vehicleType}</div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-[var(--border2)] mt-auto">
          <div>
            <div className="font-display font-bold text-xl text-[var(--ink)]">
              ${tier.ratePerHour}<span className="font-sans text-xs font-normal text-[var(--ink3)]">/hr</span>
            </div>
            <div className="text-[11px] text-[var(--ink3)]">{tier.label} rate</div>
          </div>
          {paid ? (
            <button className="px-5 py-2.5 bg-[var(--accent)] text-white text-xs font-semibold rounded-full hover:-translate-y-px transition-smooth">
              Book worker
            </button>
          ) : (
            <button onClick={() => setBookOpen(true)}
              className="px-5 py-2.5 bg-[var(--ink)] text-white text-xs font-semibold rounded-full hover:bg-[var(--accent)] hover:-translate-y-px transition-smooth">
              Pay to reveal & book
            </button>
          )}
        </div>
      </div>

      {/* Book / reveal modal */}
      {bookOpen && (
        <div className="modal-backdrop fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
          onClick={e => { if (e.target === e.currentTarget) setBookOpen(false) }}>
          <div className="bg-[var(--surface)] rounded-3xl p-8 w-full max-w-[440px] shadow-large animate-scale-in relative">
            <button onClick={() => setBookOpen(false)} className="absolute right-4 top-4 w-8 h-8 rounded-full bg-[var(--bg)] flex items-center justify-center text-sm text-[var(--ink3)] hover:bg-[var(--bg3)] transition-smooth">✕</button>
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">🔒</div>
              <h2 className="font-display font-bold text-xl mb-2">Reveal worker profile</h2>
              <p className="text-sm text-[var(--ink3)]">Pay a deposit to unlock the worker's full name, photo and contact details</p>
            </div>

            {/* Tier info */}
            <div className="flex items-center gap-3 p-4 rounded-2xl border mb-6" style={{ background: tier.bgColor, borderColor: tier.color + '40' }}>
              <span className="text-3xl">{tier.icon}</span>
              <div>
                <div className="font-semibold text-sm" style={{ color: tier.color }}>{tier.label}</div>
                <div className="text-xs text-[var(--ink3)]">{tier.range} · ${tier.ratePerHour}/hr</div>
              </div>
              <div className="ml-auto font-display font-black text-2xl" style={{ color: tier.color }}>${tier.ratePerHour}<span className="text-sm font-sans font-normal text-[var(--ink3)]">/hr</span></div>
            </div>

            <div className="flex flex-col gap-3 mb-6">
              <div>
                <label className="block text-sm font-medium text-[var(--ink2)] mb-1.5">Job location</label>
                <input type="text" placeholder="e.g. 123 Main St, Chennai" className="w-full px-4 py-3 rounded-xl border border-[var(--border)] text-sm outline-none focus:border-[var(--ink3)]" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-[var(--ink2)] mb-1.5">Date</label>
                  <input type="date" className="w-full px-4 py-3 rounded-xl border border-[var(--border)] text-sm outline-none focus:border-[var(--ink3)]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--ink2)] mb-1.5">Hours needed</label>
                  <input type="number" placeholder="8" min={1} className="w-full px-4 py-3 rounded-xl border border-[var(--border)] text-sm outline-none focus:border-[var(--ink3)]" />
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-[var(--amberL,#fdf0e0)] rounded-xl mb-6">
              <span className="text-base mt-0.5">📷</span>
              <div className="text-xs text-[var(--amber,#c2620a)] leading-relaxed">
                After payment is authorized, the worker's full profile, photo, name and contact details will be revealed to you immediately.
              </div>
            </div>

            <button onClick={() => { setPaid(true); setBookOpen(false) }}
              className="w-full py-3.5 rounded-full bg-[var(--ink)] text-white font-semibold text-sm hover:bg-[var(--accent)] transition-smooth">
              Authorize payment &amp; reveal profile →
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default function OnsitePage() {
  const [activeTier, setActiveTier] = useState<WeightTier | 'all'>('all')
  const [radius, setRadius] = useState(50)
  const [location, setLocation] = useState('Chennai, TN')
  const [availableToday, setAvailableToday] = useState(false)
  const [hasVehicle, setHasVehicle] = useState(false)

  const filtered = MOCK_WORKERS.filter(w => {
    if (activeTier !== 'all' && w.weightTier !== activeTier) return false
    if (w.radiusKm > radius) return false
    if (hasVehicle && !w.vehicleType) return false
    return true
  })

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[var(--bg)]">
        {/* Hero */}
        <div className="bg-[var(--ink)] text-white">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-[rgba(26,107,60,.3)] text-[#7ee8a2] text-xs font-bold tracking-widest uppercase mb-5">Onsite workers</span>
                <h1 className="font-display font-black display-lg text-white mb-4">
                  Find verified<br /><em className="text-[var(--accent2)] not-italic">field workers</em>
                </h1>
                <p className="text-white/60 text-base leading-relaxed mb-8 max-w-[420px]">
                  GPS-matched drivers, movers, and labour workers. Photos hidden until you pay. Check-in verified on arrival via GPS or QR code.
                </p>
                <div className="flex gap-3 flex-wrap">
                  {[
                    { icon: '🔒', text: 'Photo revealed after payment' },
                    { icon: '📍', text: 'GPS verified on arrival' },
                    { icon: '⭐', text: '4 weight capacity tiers' },
                  ].map(f => (
                    <div key={f.text} className="flex items-center gap-2 text-sm text-white/70">
                      <span>{f.icon}</span>{f.text}
                    </div>
                  ))}
                </div>
              </div>
              {/* Weight tiers */}
              <div className="grid grid-cols-2 gap-3">
                {WEIGHT_TIERS.map(t => (
                  <div key={t.tier}
                    onClick={() => setActiveTier(activeTier === t.tier ? 'all' : t.tier)}
                    className={cn('rounded-2xl p-5 border cursor-pointer transition-smooth',
                      activeTier === t.tier
                        ? 'border-white/40 bg-white/15'
                        : 'border-white/10 bg-white/5 hover:bg-white/10')}>
                    <div className="text-2xl mb-2">{t.icon}</div>
                    <div className="font-semibold text-sm text-white mb-0.5">{t.label}</div>
                    <div className="text-xs text-white/40 mb-2">{t.range}</div>
                    <div className="font-display font-bold text-lg" style={{ color: t.color }}>${t.ratePerHour}/hr</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-10">
          <div className="flex gap-8">
            {/* Sidebar */}
            <aside className="w-64 shrink-0 hidden lg:flex flex-col gap-5">
              {/* Location */}
              <div>
                <div className="text-xs font-bold text-[var(--ink3)] uppercase tracking-widest mb-3">Your location</div>
                <div className="flex gap-2">
                  <input value={location} onChange={e => setLocation(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-[var(--border)] text-sm outline-none focus:border-[var(--ink3)] bg-[var(--surface)]" />
                  <button className="px-3 py-2.5 rounded-xl bg-[var(--ink)] text-white text-sm">📍</button>
                </div>
              </div>

              {/* Radius */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <div className="text-xs font-bold text-[var(--ink3)] uppercase tracking-widest">Search radius</div>
                  <div className="text-sm font-semibold text-[var(--ink)]">{radius} km</div>
                </div>
                <input type="range" min={5} max={100} value={radius} onChange={e => setRadius(+e.target.value)} className="w-full" />
                <div className="flex justify-between text-xs text-[var(--ink3)] mt-1"><span>5 km</span><span>100 km</span></div>
              </div>

              {/* Weight tier */}
              <div>
                <div className="text-xs font-bold text-[var(--ink3)] uppercase tracking-widest mb-3">Weight tier</div>
                <div className="flex flex-col gap-2">
                  <button onClick={() => setActiveTier('all')}
                    className={cn('px-4 py-2.5 rounded-xl text-sm font-medium border text-left transition-smooth',
                      activeTier === 'all' ? 'bg-[var(--ink)] text-white border-[var(--ink)]' : 'border-[var(--border)] text-[var(--ink2)] hover:border-[var(--ink3)]')}>
                    All tiers
                  </button>
                  {WEIGHT_TIERS.map(t => (
                    <button key={t.tier} onClick={() => setActiveTier(activeTier === t.tier ? 'all' : t.tier)}
                      className={cn('px-4 py-2.5 rounded-xl text-sm font-medium border text-left flex items-center gap-2 transition-smooth',
                        activeTier === t.tier ? 'border-[var(--ink)] bg-[var(--bg2)]' : 'border-[var(--border)] hover:border-[var(--ink3)]')}
                      style={activeTier === t.tier ? { borderColor: t.color, background: t.bgColor, color: t.color } : {}}>
                      <span>{t.icon}</span>{t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick filters */}
              <div>
                <div className="text-xs font-bold text-[var(--ink3)] uppercase tracking-widest mb-3">Quick filters</div>
                <div className="flex flex-col gap-2.5">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" checked={availableToday} onChange={() => setAvailableToday(!availableToday)} />
                    <span className="text-sm text-[var(--ink2)]">Available today</span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" checked={hasVehicle} onChange={() => setHasVehicle(!hasVehicle)} />
                    <span className="text-sm text-[var(--ink2)]">Has own vehicle</span>
                  </label>
                </div>
              </div>
            </aside>

            {/* Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <div className="text-sm text-[var(--ink3)]">
                  <span className="font-semibold text-[var(--ink)]">{filtered.length}</span> workers found within {radius}km
                </div>
                <select className="text-sm border border-[var(--border)] rounded-xl px-3 py-2 bg-[var(--surface)] outline-none text-[var(--ink2)]">
                  {['Nearest first', 'Highest rated', 'Most jobs', 'Lowest rate'].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>

              {filtered.length === 0 ? (
                <div className="text-center py-24">
                  <div className="text-5xl mb-4">📍</div>
                  <h3 className="font-semibold text-[var(--ink)] mb-2">No workers in range</h3>
                  <p className="text-[var(--ink3)] text-sm">Try increasing your search radius</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filtered.map(w => <WorkerCard key={w.id} worker={w} />)}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
