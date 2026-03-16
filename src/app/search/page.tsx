'use client'
import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { MOCK_FREELANCERS, MOCK_WORKERS, MOCK_JOBS } from '@/lib/data'
import { cn, getWeightTierInfo } from '@/lib/utils'

type Tab = 'all' | 'freelancers' | 'workers' | 'jobs'

function SearchContent() {
  const params = useSearchParams()
  const [query, setQuery] = useState(params?.get('q') ?? '')
  const [tab, setTab] = useState<Tab>('all')
  const [loading, setLoading] = useState(false)

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: 'all',         label: 'All results', count: MOCK_FREELANCERS.length + MOCK_WORKERS.length + MOCK_JOBS.length },
    { id: 'freelancers', label: 'Freelancers',  count: MOCK_FREELANCERS.length },
    { id: 'workers',     label: 'Onsite workers', count: MOCK_WORKERS.length },
    { id: 'jobs',        label: 'Jobs',          count: MOCK_JOBS.length },
  ]

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => setLoading(false), 600)
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[#f5f3ee]">
        {/* Search header */}
        <div className="bg-white border-b border-[rgba(20,18,14,.06)] sticky top-16 z-20">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-5">
            <form onSubmit={handleSearch} className="flex gap-3 mb-5">
              <div className="flex-1 flex items-center gap-3 bg-[#f5f3ee] rounded-xl border border-[rgba(20,18,14,.08)] px-4 focus-within:border-[rgba(20,18,14,.25)] transition-all">
                <span className="text-lg text-[#7a756c]">🔍</span>
                <input value={query} onChange={e => setQuery(e.target.value)}
                  placeholder="Search skills, names or job titles…"
                  className="flex-1 bg-transparent py-3 text-[#14120e] outline-none text-base placeholder:text-[#b0a99e]" />
              </div>
              <button type="submit" className="px-7 py-3 bg-[#14120e] text-white rounded-xl text-sm font-semibold hover:bg-[#1a6b3c] transition-all">
                {loading ? 'Searching…' : 'Search'}
              </button>
            </form>
            {/* Tabs */}
            <div className="flex gap-1 overflow-x-auto scrollbar-none">
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className={cn('flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all',
                    tab === t.id ? 'bg-[#14120e] text-white' : 'text-[#7a756c] hover:text-[#14120e] hover:bg-[#f5f3ee]')}>
                  {t.label}
                  <span className={cn('text-[11px] font-bold px-1.5 py-0.5 rounded-full', tab === t.id ? 'bg-white/20 text-white' : 'bg-[#f5f3ee] text-[#7a756c]')}>{t.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-10">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="w-10 h-10 rounded-full border-3 border-[rgba(20,18,14,.1)] border-t-[#14120e] animate-spin" style={{borderWidth:3}} />
              <p className="text-sm text-[#7a756c]">Searching…</p>
            </div>
          ) : (
            <div className="flex flex-col gap-12">

              {/* Freelancers */}
              {(tab === 'all' || tab === 'freelancers') && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display font-bold text-xl text-[#14120e] tracking-tight">Freelancers</h2>
                    {tab === 'all' && <Link href="/freelancers" className="text-sm text-[#1a6b3c] font-medium hover:underline">See all →</Link>}
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {MOCK_FREELANCERS.slice(0, tab === 'all' ? 4 : 8).map(fl => (
                      <Link key={fl.id} href={`/freelancers/${fl.id}`}>
                        <div className="bg-white rounded-2xl border border-[rgba(20,18,14,.06)] p-5 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(20,18,14,.1)] transition-all cursor-pointer group">
                          <div className="w-14 h-14 rounded-full bg-[#ece9e3] flex items-center justify-center font-bold text-lg text-[#7a756c] mb-3 relative">
                            {fl.name.split(' ').map(n=>n[0]).join('')}
                            {fl.isOnline && <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#1a6b3c] border-2 border-white" />}
                          </div>
                          <div className="font-semibold text-sm text-[#14120e] group-hover:text-[#1a6b3c] transition-all">{fl.name}</div>
                          <div className="text-xs text-[#7a756c] mt-0.5 mb-2 truncate">{fl.title}</div>
                          <div className="flex items-center gap-1 mb-3">
                            <span className="stars text-xs">{'★'.repeat(Math.floor(fl.rating))}</span>
                            <span className="text-xs font-semibold text-[#14120e]">{fl.rating}</span>
                            <span className="text-xs text-[#7a756c]">({fl.reviewCount})</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {fl.skills.slice(0,2).map(s => <span key={s} className="px-2 py-0.5 bg-[#f5f3ee] rounded text-[11px] font-medium text-[#3a3630]">{s}</span>)}
                          </div>
                          <div className="font-display font-bold text-base text-[#14120e]">${fl.hourlyRateMin}<span className="font-sans text-xs font-normal text-[#7a756c]">/hr</span></div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Onsite workers */}
              {(tab === 'all' || tab === 'workers') && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display font-bold text-xl text-[#14120e] tracking-tight">Onsite workers</h2>
                    {tab === 'all' && <Link href="/onsite" className="text-sm text-[#1a6b3c] font-medium hover:underline">See all →</Link>}
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {MOCK_WORKERS.slice(0, tab === 'all' ? 3 : 6).map(w => {
                      const tier = getWeightTierInfo(w.weightTier)
                      return (
                        <div key={w.id} className="bg-white rounded-2xl border border-[rgba(20,18,14,.06)] p-5 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(20,18,14,.1)] transition-all">
                          <div className="flex items-start gap-3 mb-3">
                            <div className="w-12 h-12 rounded-full bg-[#ece9e3] flex items-center justify-center text-xl shrink-0 relative overflow-hidden">
                              <span className="filter blur-sm select-none">👷</span>
                              <div className="absolute inset-0 bg-[rgba(20,18,14,.3)] flex items-center justify-center">
                                <span className="text-white text-sm">🔒</span>
                              </div>
                            </div>
                            <div>
                              <div className="font-semibold text-sm text-[#14120e]">Worker #{w.workerCode}</div>
                              <div className="text-xs text-[#7a756c]">Photo hidden until hire</div>
                            </div>
                            {w.isVerified && <span className="ml-auto text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#e8f5ee] text-[#1a6b3c]">Verified</span>}
                          </div>
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold border mb-3" style={{background:tier.bgColor, borderColor:tier.color+'40', color:tier.color}}>
                            {tier.icon} {tier.label}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-[#7a756c]">
                            <span>📍 {w.radiusKm}km radius</span>
                            <span>⭐ {w.rating} ({w.reviewCount})</span>
                          </div>
                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-[rgba(20,18,14,.06)]">
                            <div className="font-display font-bold text-lg text-[#14120e]">${tier.ratePerHour}<span className="font-sans text-xs font-normal text-[#7a756c]">/hr</span></div>
                            <Link href="/onsite"><button className="px-4 py-1.5 bg-[#14120e] text-white text-xs font-semibold rounded-full hover:bg-[#1a6b3c] transition-all">Book</button></Link>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Jobs */}
              {(tab === 'all' || tab === 'jobs') && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display font-bold text-xl text-[#14120e] tracking-tight">Open jobs</h2>
                    {tab === 'all' && <Link href="/jobs" className="text-sm text-[#1a6b3c] font-medium hover:underline">See all →</Link>}
                  </div>
                  <div className="flex flex-col gap-3">
                    {MOCK_JOBS.slice(0, tab === 'all' ? 3 : 6).map(job => (
                      <div key={job.id} className="bg-white rounded-2xl border border-[rgba(20,18,14,.06)] p-5 hover:shadow-[0_4px_20px_rgba(20,18,14,.08)] transition-all flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#f5f3ee] flex items-center justify-center text-xl shrink-0">
                          {job.type === 'freelance' ? '💼' : '🔧'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-start gap-2 mb-1">
                            <div className="font-semibold text-[#14120e] text-sm">{job.title}</div>
                            {job.isUrgent && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#fde8e8] text-[#c94040]">Urgent</span>}
                          </div>
                          <div className="text-xs text-[#7a756c] mb-2">{job.clientName} · Posted {job.postedAt} · {job.proposalCount} proposals</div>
                          <div className="flex flex-wrap gap-1.5">
                            {job.skills.slice(0,4).map(s => <span key={s} className="px-2.5 py-1 bg-[#f5f3ee] rounded-lg text-xs font-medium text-[#3a3630]">{s}</span>)}
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="font-display font-bold text-lg text-[#14120e]">${job.budget.min}–${job.budget.max}</div>
                          <div className="text-xs text-[#7a756c] capitalize">{job.budget.type}</div>
                          <Link href="/register"><button className="mt-2 px-4 py-1.5 bg-[#14120e] text-white text-xs font-semibold rounded-full hover:bg-[#1a6b3c] transition-all">Apply</button></Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Empty */}
              {query && tab === 'all' && MOCK_FREELANCERS.length === 0 && (
                <div className="text-center py-24">
                  <div className="text-5xl mb-4">🔍</div>
                  <h3 className="font-semibold text-[#14120e] mb-2">No results for "{query}"</h3>
                  <p className="text-[#7a756c] text-sm">Try different keywords or browse our categories</p>
                  <Link href="/freelancers"><button className="mt-6 px-6 py-2.5 rounded-full bg-[#14120e] text-white text-sm font-medium hover:bg-[#1a6b3c] transition-all">Browse freelancers</button></Link>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f5f3ee] flex items-center justify-center"><div className="text-[#7a756c]">Loading...</div></div>}>
      <SearchContent />
    </Suspense>
  )
}
