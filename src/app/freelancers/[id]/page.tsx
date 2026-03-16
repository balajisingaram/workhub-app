'use client'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { MOCK_FREELANCERS, MOCK_REVIEWS } from '@/lib/data'
import { cn, formatRate } from '@/lib/utils'

function Stars({ r, size = 14 }: { r: number; size?: number }) {
  return <span className="stars" style={{ fontSize: size }}>{'★'.repeat(Math.floor(r))}{'☆'.repeat(5 - Math.floor(r))}</span>
}

function VerifyBadge({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-[var(--ink2)]">
      <div className="w-5 h-5 rounded-full bg-[var(--accent)] flex items-center justify-center text-white text-[10px] font-bold shrink-0">✓</div>
      {label}
    </div>
  )
}

export default function FreelancerProfilePage({ params }: { params: { id: string } }) {
  const fl = MOCK_FREELANCERS.find(f => f.id === params.id) ?? MOCK_FREELANCERS[0]
  const [activeTab, setActiveTab] = useState<'about'|'services'|'portfolio'|'reviews'|'resume'>('about')
  const [saved, setSaved] = useState(false)
  const [meetingOpen, setMeetingOpen] = useState(false)
  const [hireOpen, setHireOpen] = useState(false)

  const tabs = [
    { id: 'about',     label: 'About' },
    { id: 'services',  label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'reviews',   label: `Reviews (${fl.reviewCount})` },
    { id: 'resume',    label: 'Education & Experience' },
  ] as const

  const scheduleOptions = [
    { icon: '🎥', label: 'Zoom interview', sub: 'Video call via Zoom' },
    { icon: '📅', label: 'Google Meet', sub: 'Video call via Meet' },
    { icon: '💼', label: 'Microsoft Teams', sub: 'Teams video meeting' },
    { icon: '🗓️', label: 'Book via Cal.com', sub: 'Pick a time slot' },
  ]

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[var(--bg)]">
        {/* Breadcrumb */}
        <div className="bg-[var(--surface)] border-b border-[var(--border2)]">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-4 flex items-center gap-2 text-sm text-[var(--ink3)]">
            <Link href="/" className="hover:text-[var(--ink)] transition-smooth">Home</Link>
            <span>/</span>
            <Link href="/freelancers" className="hover:text-[var(--ink)] transition-smooth">Freelancers</Link>
            <span>/</span>
            <span className="text-[var(--ink)]">{fl.name}</span>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-10">
          <div className="grid lg:grid-cols-[1fr_320px] gap-8">

            {/* ── LEFT MAIN ── */}
            <div>
              {/* Profile hero */}
              <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border2)] p-8 mb-6">
                <div className="flex gap-6 items-start">
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--bg2)] to-[var(--bg3)] flex items-center justify-center text-3xl font-display font-black text-[var(--ink3)] border-4 border-white shadow-medium">
                      {fl.name.split(' ').map(n=>n[0]).join('')}
                    </div>
                    {fl.isOnline && (
                      <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-[var(--accent)] border-3 border-white border-[3px] shadow-soft" />
                    )}
                  </div>
                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h1 className="font-display font-black text-2xl text-[var(--ink)] tracking-tight mb-1 flex items-center gap-2 flex-wrap">
                          {fl.name}
                          {fl.isTopRated && <span className="px-2.5 py-0.5 bg-[#fdf0e0] text-[#c2620a] text-xs font-bold rounded-full">Top Rated</span>}
                          {fl.isVerified && <span className="px-2.5 py-0.5 bg-[var(--accent-light)] text-[var(--accent)] text-xs font-bold rounded-full">Verified</span>}
                        </h1>
                        <p className="text-[var(--ink3)] font-medium mb-3">{fl.title}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--ink3)]">
                          <div className="flex items-center gap-1">
                            <Stars r={fl.rating} />
                            <span className="font-semibold text-[var(--ink)] ml-1">{fl.rating}</span>
                            <span>({fl.reviewCount} reviews)</span>
                          </div>
                          <span>📍 {fl.location}</span>
                          <span>🕐 {fl.timezone}</span>
                          {fl.isOnline
                            ? <span className="text-[var(--accent)] font-medium flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] inline-block" />Online now</span>
                            : <span className="text-[var(--ink3)]">Offline</span>}
                        </div>
                      </div>
                      <button onClick={() => setSaved(!saved)}
                        className={cn('flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-smooth',
                          saved ? 'bg-[#fde8e8] border-[#c94040] text-[#c94040]' : 'bg-[var(--bg)] border-[var(--border)] text-[var(--ink3)] hover:border-[#c94040] hover:text-[#c94040]')}>
                        {saved ? '♥ Saved' : '♡ Save'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Skill tags */}
                <div className="flex flex-wrap gap-2 mt-5">
                  {fl.skills.map(s => (
                    <span key={s} className="px-3 py-1.5 bg-[var(--bg)] rounded-full text-xs font-medium text-[var(--ink2)] border border-[var(--border2)]">{s}</span>
                  ))}
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-[var(--border2)]">
                  {[
                    { val: fl.jobsCompleted, lbl: 'Jobs done' },
                    { val: `${fl.reviewCount}`, lbl: 'Reviews' },
                    { val: fl.responseTime, lbl: 'Response time' },
                    { val: fl.availability === 'available' ? 'Available' : fl.availability === 'busy' ? 'Busy' : 'Unavailable', lbl: 'Status' },
                  ].map(s => (
                    <div key={s.lbl} className="text-center">
                      <div className="font-display font-bold text-lg text-[var(--ink)]">{s.val}</div>
                      <div className="text-xs text-[var(--ink3)]">{s.lbl}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tabs */}
              <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border2)] overflow-hidden">
                {/* Tab bar */}
                <div className="flex border-b border-[var(--border2)] overflow-x-auto scrollbar-none">
                  {tabs.map(t => (
                    <button key={t.id} onClick={() => setActiveTab(t.id)}
                      className={cn('px-6 py-4 text-sm font-medium whitespace-nowrap transition-smooth border-b-2',
                        activeTab === t.id
                          ? 'border-[var(--ink)] text-[var(--ink)] bg-[var(--bg2)]'
                          : 'border-transparent text-[var(--ink3)] hover:text-[var(--ink)] hover:bg-[var(--bg2)]')}>
                      {t.label}
                    </button>
                  ))}
                </div>

                <div className="p-8">
                  {/* ABOUT */}
                  {activeTab === 'about' && (
                    <div>
                      <h3 className="font-semibold text-[var(--ink)] mb-4">About {fl.name.split(' ')[0]}</h3>
                      <p className="text-[var(--ink2)] leading-relaxed mb-8">{fl.bio}</p>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {[
                          { lbl: 'English level', val: fl.englishLevel },
                          { lbl: 'Location', val: fl.location },
                          { lbl: 'Timezone', val: fl.timezone },
                          { lbl: 'Hourly rate', val: formatRate(fl.hourlyRateMin, fl.hourlyRateMax) },
                        ].map(i => (
                          <div key={i.lbl} className="flex flex-col gap-0.5">
                            <div className="text-xs text-[var(--ink3)] font-medium">{i.lbl}</div>
                            <div className="text-sm font-semibold text-[var(--ink)]">{i.val}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SERVICES */}
                  {activeTab === 'services' && (
                    <div className="flex flex-col gap-4">
                      {fl.services.map(svc => (
                        <div key={svc.id} className={cn('border rounded-2xl p-6 transition-smooth hover:shadow-soft', svc.isFeatured ? 'border-[var(--ink)]' : 'border-[var(--border2)]')}>
                          {svc.isFeatured && <span className="inline-block mb-3 px-3 py-0.5 bg-[var(--ink)] text-white text-[11px] font-bold rounded-full">Featured</span>}
                          <div className="flex justify-between items-start gap-4">
                            <div className="flex-1">
                              <h4 className="font-semibold text-[var(--ink)] mb-2">{svc.title}</h4>
                              <p className="text-sm text-[var(--ink3)] mb-3">{svc.description}</p>
                              <div className="flex items-center gap-3 text-xs text-[var(--ink3)]">
                                <div className="flex items-center gap-1"><Stars r={svc.rating} size={12} /><span className="font-semibold text-[var(--ink)]">{svc.rating}</span><span>({svc.reviewCount})</span></div>
                                <span>·</span>
                                <span>📅 {svc.deliveryDays} day delivery</span>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <div className="font-display font-bold text-2xl text-[var(--ink)]">${svc.price}</div>
                              <button onClick={() => setHireOpen(true)}
                                className="mt-2 px-5 py-2 bg-[var(--accent)] text-white text-xs font-semibold rounded-full hover:-translate-y-px hover:bg-[var(--ink)] transition-smooth">
                                Order now
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* PORTFOLIO */}
                  {activeTab === 'portfolio' && (
                    <div>
                      {fl.portfolioItems.length > 0 ? (
                        <div className="grid sm:grid-cols-2 gap-4">
                          {fl.portfolioItems.map(p => (
                            <div key={p.id} className="rounded-2xl overflow-hidden border border-[var(--border2)] group cursor-pointer">
                              <div className="h-40 bg-[var(--bg2)] overflow-hidden">
                                <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                              </div>
                              <div className="p-4">
                                <div className="font-medium text-sm text-[var(--ink)]">{p.title}</div>
                                <div className="text-xs text-[var(--ink3)] mt-0.5">{p.category}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-16 text-[var(--ink3)]">No portfolio items yet</div>
                      )}
                    </div>
                  )}

                  {/* REVIEWS */}
                  {activeTab === 'reviews' && (
                    <div>
                      {/* Rating summary */}
                      <div className="flex items-center gap-8 mb-8 p-6 bg-[var(--bg)] rounded-2xl">
                        <div className="text-center">
                          <div className="font-display font-black text-5xl text-[var(--ink)]">{fl.rating}</div>
                          <Stars r={fl.rating} size={18} />
                          <div className="text-xs text-[var(--ink3)] mt-1">{fl.reviewCount} reviews</div>
                        </div>
                        <div className="flex-1">
                          {[5,4,3,2,1].map(star => (
                            <div key={star} className="flex items-center gap-3 mb-1.5">
                              <span className="text-xs text-[var(--ink3)] w-4">{star}★</span>
                              <div className="flex-1 h-2 bg-[var(--bg3)] rounded-full overflow-hidden">
                                <div className="h-full bg-[#f5a623] rounded-full" style={{ width: star === 5 ? '70%' : star === 4 ? '20%' : '5%' }} />
                              </div>
                              <span className="text-xs text-[var(--ink3)] w-6">{star === 5 ? '70%' : star === 4 ? '20%' : '5%'}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-5">
                        {MOCK_REVIEWS.map(r => (
                          <div key={r.id} className="border-b border-[var(--border2)] pb-5 last:border-0">
                            <div className="flex items-start justify-between gap-4 mb-3">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[var(--bg2)] flex items-center justify-center text-lg">{r.authorAvatar}</div>
                                <div>
                                  <div className="font-semibold text-sm text-[var(--ink)]">{r.authorName}</div>
                                  <div className="text-xs text-[var(--ink3)]">{r.jobTitle}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <Stars r={r.rating} size={13} />
                                <div className="text-xs text-[var(--ink3)] mt-0.5">{r.date}</div>
                              </div>
                            </div>
                            <p className="text-sm text-[var(--ink2)] leading-relaxed">{r.comment}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* RESUME */}
                  {activeTab === 'resume' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div>
                        <h3 className="font-semibold text-[var(--ink)] mb-4 flex items-center gap-2">🎓 Education</h3>
                        {fl.education.length > 0 ? fl.education.map(e => (
                          <div key={e.id} className="flex gap-4 mb-5">
                            <div className="w-10 h-10 rounded-xl bg-[var(--bg)] border border-[var(--border2)] flex items-center justify-center font-bold text-sm text-[var(--ink3)] shrink-0">
                              {e.degree[0]}
                            </div>
                            <div>
                              <div className="font-semibold text-sm text-[var(--ink)]">{e.degree}</div>
                              <div className="text-xs text-[var(--ink3)] mb-1">{e.institution} · {e.year}</div>
                              <p className="text-xs text-[var(--ink3)] leading-relaxed">{e.description}</p>
                            </div>
                          </div>
                        )) : <p className="text-sm text-[var(--ink3)]">No education added</p>}
                      </div>
                      <div>
                        <h3 className="font-semibold text-[var(--ink)] mb-4 flex items-center gap-2">💼 Experience</h3>
                        {fl.experience.length > 0 ? fl.experience.map(e => (
                          <div key={e.id} className="flex gap-4 mb-5">
                            <div className="w-10 h-10 rounded-xl bg-[var(--bg)] border border-[var(--border2)] flex items-center justify-center font-bold text-sm text-[var(--ink3)] shrink-0">
                              {e.company[0]}
                            </div>
                            <div>
                              <div className="font-semibold text-sm text-[var(--ink)]">{e.title}</div>
                              <div className="text-xs text-[var(--ink3)] mb-1">{e.company} · {e.period}</div>
                              <p className="text-xs text-[var(--ink3)] leading-relaxed">{e.description}</p>
                            </div>
                          </div>
                        )) : <p className="text-sm text-[var(--ink3)]">No experience added</p>}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ── RIGHT SIDEBAR ── */}
            <aside className="flex flex-col gap-5">
              {/* Rate + actions */}
              <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border2)] p-6 sticky top-20">
                <div className="font-display font-black text-3xl text-[var(--ink)] mb-0.5">
                  ${fl.hourlyRateMin}–${fl.hourlyRateMax}
                  <span className="font-sans text-sm font-normal text-[var(--ink3)]">/hr</span>
                </div>
                <div className="text-xs text-[var(--ink3)] mb-6">Starting from ${fl.hourlyRateMin}/hr</div>

                <div className="flex flex-col gap-3">
                  <button onClick={() => setHireOpen(true)}
                    className="w-full py-3.5 rounded-full bg-[var(--ink)] text-white font-semibold text-sm hover:bg-[var(--accent)] hover:-translate-y-px transition-smooth shadow-soft">
                    Hire {fl.name.split(' ')[0]}
                  </button>
                  <button
                    className="w-full py-3.5 rounded-full border border-[var(--border)] text-[var(--ink2)] font-medium text-sm hover:border-[var(--ink3)] hover:bg-[var(--bg2)] transition-smooth">
                    Send message
                  </button>
                  <button onClick={() => setMeetingOpen(true)}
                    className="w-full py-3.5 rounded-full bg-[#2D8CFF] text-white font-medium text-sm hover:-translate-y-px transition-smooth">
                    🎥 Interview via Zoom/Meet
                  </button>
                </div>

                <div className="mt-5 pt-5 border-t border-[var(--border2)]">
                  <div className="text-xs font-bold text-[var(--ink3)] uppercase tracking-widest mb-3">Profile details</div>
                  <div className="flex flex-col gap-2.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--ink3)]">Location</span>
                      <span className="font-medium text-[var(--ink)]">{fl.location}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--ink3)]">English level</span>
                      <span className="font-medium text-[var(--ink)]">{fl.englishLevel}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--ink3)]">Response time</span>
                      <span className="font-medium text-[var(--ink)]">{fl.responseTime}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--ink3)]">Jobs done</span>
                      <span className="font-medium text-[var(--ink)]">{fl.jobsCompleted}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[var(--border2)]">
                  <div className="text-xs font-bold text-[var(--ink3)] uppercase tracking-widest mb-3">Verification</div>
                  <div className="flex flex-col gap-2">
                    <VerifyBadge label="Email verified" />
                    <VerifyBadge label="ID verified (Onfido)" />
                    <VerifyBadge label="Payment method linked" />
                  </div>
                </div>
              </div>

              {/* Related */}
              <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border2)] p-5">
                <div className="text-xs font-bold text-[var(--ink3)] uppercase tracking-widest mb-4">Related freelancers</div>
                <div className="flex flex-col gap-4">
                  {MOCK_FREELANCERS.filter(f => f.id !== fl.id).slice(0, 3).map(f => (
                    <Link key={f.id} href={`/freelancers/${f.id}`}>
                      <div className="flex items-center gap-3 hover:bg-[var(--bg)] p-2 rounded-xl transition-smooth cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-[var(--bg2)] flex items-center justify-center text-sm font-bold text-[var(--ink3)] shrink-0">
                          {f.name.split(' ').map(n=>n[0]).join('')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-[var(--ink)] truncate">{f.name}</div>
                          <div className="text-xs text-[var(--ink3)] truncate">{f.title}</div>
                        </div>
                        <div className="text-xs font-semibold text-[var(--ink)] shrink-0">${f.hourlyRateMin}/hr</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />

      {/* ── MEETING MODAL ── */}
      {meetingOpen && (
        <div className="modal-backdrop fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
          onClick={e => { if (e.target === e.currentTarget) setMeetingOpen(false) }}>
          <div className="bg-[var(--surface)] rounded-3xl p-8 w-full max-w-[400px] shadow-large animate-scale-in relative">
            <button onClick={() => setMeetingOpen(false)} className="absolute right-4 top-4 w-8 h-8 rounded-full bg-[var(--bg)] flex items-center justify-center text-sm text-[var(--ink3)] hover:bg-[var(--bg3)] transition-smooth">✕</button>
            <h2 className="font-display font-bold text-xl mb-1">Schedule an interview</h2>
            <p className="text-sm text-[var(--ink3)] mb-6">Choose your preferred meeting platform</p>
            <div className="flex flex-col gap-3">
              {scheduleOptions.map(o => (
                <button key={o.label}
                  className="flex items-center gap-4 p-4 rounded-2xl border border-[var(--border2)] hover:border-[var(--ink3)] hover:bg-[var(--bg)] transition-smooth text-left group">
                  <span className="text-2xl">{o.icon}</span>
                  <div>
                    <div className="font-semibold text-sm text-[var(--ink)] group-hover:text-[var(--accent)]">{o.label}</div>
                    <div className="text-xs text-[var(--ink3)]">{o.sub}</div>
                  </div>
                  <span className="ml-auto text-[var(--ink4)] group-hover:text-[var(--ink)]">→</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── HIRE MODAL ── */}
      {hireOpen && (
        <div className="modal-backdrop fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
          onClick={e => { if (e.target === e.currentTarget) setHireOpen(false) }}>
          <div className="bg-[var(--surface)] rounded-3xl p-8 w-full max-w-[480px] shadow-large animate-scale-in relative">
            <button onClick={() => setHireOpen(false)} className="absolute right-4 top-4 w-8 h-8 rounded-full bg-[var(--bg)] flex items-center justify-center text-sm text-[var(--ink3)] hover:bg-[var(--bg3)] transition-smooth">✕</button>
            <h2 className="font-display font-bold text-xl mb-1">Hire {fl.name.split(' ')[0]}</h2>
            <p className="text-sm text-[var(--ink3)] mb-6">Describe your project and we'll set up an escrow agreement</p>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--ink2)] mb-1.5">Project title</label>
                <input type="text" placeholder="e.g. Redesign our web app dashboard" className="w-full px-4 py-3 rounded-xl border border-[var(--border)] text-sm outline-none focus:border-[var(--ink3)] bg-[var(--surface)]" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-[var(--ink2)] mb-1.5">Budget</label>
                  <input type="text" placeholder="$500" className="w-full px-4 py-3 rounded-xl border border-[var(--border)] text-sm outline-none focus:border-[var(--ink3)]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--ink2)] mb-1.5">Deadline</label>
                  <input type="date" className="w-full px-4 py-3 rounded-xl border border-[var(--border)] text-sm outline-none focus:border-[var(--ink3)]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--ink2)] mb-1.5">Project description</label>
                <textarea rows={3} placeholder="Describe what you need…" className="w-full px-4 py-3 rounded-xl border border-[var(--border)] text-sm outline-none focus:border-[var(--ink3)] resize-none" />
              </div>
              <div className="flex items-start gap-3 p-4 bg-[var(--accent-light)] rounded-xl">
                <span className="text-lg mt-0.5">🔒</span>
                <div className="text-xs text-[var(--accent)] leading-relaxed">
                  <strong>Escrow protected.</strong> Your payment is held securely and only released when you approve the delivered work. 100% refund if not satisfied.
                </div>
              </div>
              <Link href="/dashboard/client" onClick={() => setHireOpen(false)}>
                <button className="w-full py-3.5 rounded-full bg-[var(--ink)] text-white font-semibold text-sm hover:bg-[var(--accent)] transition-smooth">
                  Continue to payment →
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
