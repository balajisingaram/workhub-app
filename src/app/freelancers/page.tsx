'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { MOCK_FREELANCERS } from '@/lib/data'
import { cn } from '@/lib/utils'
import type { Freelancer } from '@/types'

const CATEGORIES = ['All', 'Design & Creative', 'Development & IT', 'Digital Marketing', 'Writing & Translation', 'Finance & Accounting', 'Data Science', 'Video & Animation']
const SKILLS = ['Figma', 'React', 'Node.js', 'Python', 'SEO', 'Copywriting', 'After Effects', 'Branding', 'TypeScript', 'Adobe XD']

function Stars({ r }: { r: number }) {
  return <span className="stars text-xs">{'★'.repeat(Math.floor(r))}{'☆'.repeat(5 - Math.floor(r))}</span>
}

function FreelancerCard({ fl, view }: { fl: Freelancer; view: 'grid' | 'list' }) {
  const [saved, setSaved] = useState(false)

  if (view === 'list') {
    return (
      <Link href={`/freelancers/${fl.id}`}>
        <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border2)] p-5 hover:shadow-medium hover:-translate-y-0.5 transition-smooth cursor-pointer group flex gap-5 items-start">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-[var(--bg2)] flex items-center justify-center text-2xl font-bold text-[var(--ink3)] shrink-0 relative">
            {fl.name.split(' ').map(n => n[0]).join('')}
            {fl.isOnline && <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[var(--accent)] border-2 border-white" />}
          </div>
          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-semibold text-[var(--ink)] flex items-center gap-2">
                  {fl.name}
                  {fl.isTopRated && <span className="px-2 py-0.5 bg-[#fdf0e0] text-[#c2620a] text-[10px] font-bold rounded-full">Top Rated</span>}
                  {fl.isVerified && <span className="px-2 py-0.5 bg-[var(--accent-light)] text-[var(--accent)] text-[10px] font-bold rounded-full">Verified</span>}
                </div>
                <div className="text-sm text-[var(--ink3)] mt-0.5">{fl.title}</div>
              </div>
              <button onClick={e => { e.preventDefault(); setSaved(!saved) }}
                className={cn('w-8 h-8 rounded-full flex items-center justify-center text-sm transition-smooth border shrink-0',
                  saved ? 'bg-[#fde8e8] border-[#c94040] text-[#c94040]' : 'bg-[var(--bg)] border-[var(--border2)] text-[var(--ink4)] hover:border-[#c94040] hover:text-[#c94040]')}>
                {saved ? '♥' : '♡'}
              </button>
            </div>
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <div className="flex items-center gap-1"><Stars r={fl.rating} /><span className="text-xs font-semibold text-[var(--ink)]">{fl.rating}</span><span className="text-xs text-[var(--ink3)]">({fl.reviewCount})</span></div>
              <span className="text-[var(--ink4)] text-xs">·</span>
              <span className="text-xs text-[var(--ink3)]">{fl.jobsCompleted} jobs</span>
              <span className="text-[var(--ink4)] text-xs">·</span>
              <span className="text-xs text-[var(--ink3)]">{fl.location}</span>
              <span className="text-[var(--ink4)] text-xs">·</span>
              <span className="text-xs text-[var(--ink3)]">Responds {fl.responseTime}</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {fl.skills.slice(0, 5).map(s => (
                <span key={s} className="px-2.5 py-1 bg-[var(--bg)] rounded-lg text-xs font-medium text-[var(--ink2)]">{s}</span>
              ))}
            </div>
          </div>
          <div className="shrink-0 text-right">
            <div className="font-display font-bold text-xl text-[var(--ink)]">${fl.hourlyRateMin}<span className="font-sans text-xs font-normal text-[var(--ink3)]">/hr</span></div>
            <span className="inline-block mt-2 px-4 py-2 bg-[var(--ink)] text-white text-xs font-semibold rounded-full group-hover:bg-[var(--accent)] transition-smooth">View Profile</span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/freelancers/${fl.id}`}>
      <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border2)] p-6 hover:shadow-medium hover:-translate-y-1 transition-smooth cursor-pointer group relative h-full flex flex-col">
        <button onClick={e => { e.preventDefault(); setSaved(!saved) }}
          className={cn('absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-sm transition-smooth border',
            saved ? 'bg-[#fde8e8] border-[#c94040] text-[#c94040]' : 'bg-[var(--bg)] border-[var(--border2)] text-[var(--ink4)] hover:border-[#c94040] hover:text-[#c94040]')}>
          {saved ? '♥' : '♡'}
        </button>
        <div className="w-16 h-16 rounded-full bg-[var(--bg2)] flex items-center justify-center text-2xl font-bold text-[var(--ink3)] mb-4 relative">
          {fl.name.split(' ').map(n => n[0]).join('')}
          {fl.isOnline && <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[var(--accent)] border-2 border-white" />}
        </div>
        <div className="font-semibold text-sm text-[var(--ink)] mb-0.5">{fl.name}</div>
        <div className="text-xs text-[var(--ink3)] mb-3 line-clamp-1">{fl.title}</div>
        <div className="flex items-center gap-1 mb-3">
          <Stars r={fl.rating} />
          <span className="text-xs font-semibold text-[var(--ink)]">{fl.rating}</span>
          <span className="text-xs text-[var(--ink3)]">({fl.reviewCount})</span>
        </div>
        <div className="flex flex-wrap gap-1 mb-4 flex-1">
          {fl.skills.slice(0, 3).map(s => (
            <span key={s} className="px-2 py-0.5 bg-[var(--bg)] rounded text-[11px] font-medium text-[var(--ink2)]">{s}</span>
          ))}
        </div>
        {fl.isTopRated && (
          <div className="flex gap-1.5 mb-4">
            <span className="px-2 py-0.5 bg-[#fdf0e0] text-[#c2620a] text-[10px] font-bold rounded-full">Top Rated</span>
            {fl.isVerified && <span className="px-2 py-0.5 bg-[var(--accent-light)] text-[var(--accent)] text-[10px] font-bold rounded-full">Verified</span>}
          </div>
        )}
        <div className="flex justify-between items-center pt-4 border-t border-[var(--border2)] mt-auto">
          <div className="font-display font-bold text-lg text-[var(--ink)]">
            ${fl.hourlyRateMin}<span className="font-sans text-xs font-normal text-[var(--ink3)]">/hr</span>
          </div>
          <span className="px-3 py-1.5 bg-[var(--ink)] text-white text-xs font-semibold rounded-full group-hover:bg-[var(--accent)] transition-smooth">View</span>
        </div>
      </div>
    </Link>
  )
}

export default function FreelancersPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('Best match')
  const [minRate, setMinRate] = useState(0)
  const [maxRate, setMaxRate] = useState(200)
  const [searchQ, setSearchQ] = useState('')
  const [onlineOnly, setOnlineOnly] = useState(false)
  const [topRatedOnly, setTopRatedOnly] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filtered = MOCK_FREELANCERS.filter(fl => {
    if (searchQ && !fl.name.toLowerCase().includes(searchQ.toLowerCase()) && !fl.title.toLowerCase().includes(searchQ.toLowerCase()) && !fl.skills.some(s => s.toLowerCase().includes(searchQ.toLowerCase()))) return false
    if (onlineOnly && !fl.isOnline) return false
    if (topRatedOnly && !fl.isTopRated) return false
    if (fl.hourlyRateMin < minRate || fl.hourlyRateMax > maxRate) return false
    if (selectedSkills.length > 0 && !selectedSkills.some(s => fl.skills.includes(s))) return false
    return true
  })

  const toggleSkill = (s: string) =>
    setSelectedSkills(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[var(--bg)]">
        {/* Page header */}
        <div className="bg-[var(--surface)] border-b border-[var(--border2)]">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-10">
            <h1 className="font-display font-black display-sm text-[var(--ink)] mb-2">Find freelancers</h1>
            <p className="text-[var(--ink3)]">Browse {MOCK_FREELANCERS.length}+ verified professionals ready to work</p>
            {/* Category chips */}
            <div className="flex flex-wrap gap-2 mt-6">
              {CATEGORIES.map(cat => (
                <button key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn('px-4 py-2 rounded-full text-sm font-medium border transition-smooth',
                    activeCategory === cat
                      ? 'bg-[var(--ink)] text-white border-[var(--ink)]'
                      : 'bg-[var(--surface)] text-[var(--ink3)] border-[var(--border)] hover:border-[var(--ink3)] hover:text-[var(--ink)]')}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-8">
          <div className="flex gap-8">
            {/* Sidebar filters */}
            <aside className={cn(
              'w-64 shrink-0 flex-col gap-5',
              filtersOpen ? 'flex' : 'hidden lg:flex'
            )}>
              {/* Search */}
              <div>
                <div className="text-xs font-bold text-[var(--ink3)] uppercase tracking-widest mb-3">Search</div>
                <input value={searchQ} onChange={e => setSearchQ(e.target.value)}
                  placeholder="Skills, names, keywords…"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] text-sm outline-none focus:border-[var(--ink3)] bg-[var(--surface)] transition-smooth" />
              </div>

              {/* Hourly rate */}
              <div>
                <div className="text-xs font-bold text-[var(--ink3)] uppercase tracking-widest mb-3">Hourly rate</div>
                <div className="flex items-center gap-3 mb-3">
                  <input type="number" value={minRate} onChange={e => setMinRate(+e.target.value)} min={0} max={maxRate}
                    className="w-20 px-2.5 py-2 rounded-xl border border-[var(--border)] text-sm outline-none focus:border-[var(--ink3)] text-center" />
                  <span className="text-[var(--ink3)] text-sm">—</span>
                  <input type="number" value={maxRate} onChange={e => setMaxRate(+e.target.value)} min={minRate} max={500}
                    className="w-20 px-2.5 py-2 rounded-xl border border-[var(--border)] text-sm outline-none focus:border-[var(--ink3)] text-center" />
                  <span className="text-sm text-[var(--ink3)]">/hr</span>
                </div>
                <input type="range" min={0} max={500} value={maxRate} onChange={e => setMaxRate(+e.target.value)} className="w-full" />
              </div>

              {/* Toggle filters */}
              <div>
                <div className="text-xs font-bold text-[var(--ink3)] uppercase tracking-widest mb-3">Quick filters</div>
                <div className="flex flex-col gap-2.5">
                  {[
                    { label: 'Online now', state: onlineOnly, set: setOnlineOnly },
                    { label: 'Top rated only', state: topRatedOnly, set: setTopRatedOnly },
                  ].map(f => (
                    <label key={f.label} className="flex items-center gap-2.5 cursor-pointer group">
                      <input type="checkbox" checked={f.state} onChange={() => f.set(!f.state)} className="mt-0" />
                      <span className="text-sm text-[var(--ink2)] group-hover:text-[var(--ink)] transition-smooth">{f.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <div className="text-xs font-bold text-[var(--ink3)] uppercase tracking-widest mb-3">Skills</div>
                <div className="flex flex-wrap gap-1.5">
                  {SKILLS.map(s => (
                    <button key={s} onClick={() => toggleSkill(s)}
                      className={cn('px-3 py-1.5 rounded-full text-xs font-medium border transition-smooth',
                        selectedSkills.includes(s)
                          ? 'bg-[var(--ink)] text-white border-[var(--ink)]'
                          : 'bg-[var(--surface)] text-[var(--ink2)] border-[var(--border)] hover:border-[var(--ink3)]')}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {(searchQ || selectedSkills.length > 0 || onlineOnly || topRatedOnly) && (
                <button onClick={() => { setSearchQ(''); setSelectedSkills([]); setOnlineOnly(false); setTopRatedOnly(false) }}
                  className="text-sm text-[var(--coral-brand,#c94040)] font-medium hover:underline text-left">
                  Clear all filters
                </button>
              )}
            </aside>

            {/* Main content */}
            <div className="flex-1 min-w-0">
              {/* Toolbar */}
              <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
                <div className="text-sm text-[var(--ink3)]">
                  <span className="font-semibold text-[var(--ink)]">{filtered.length}</span> freelancers found
                </div>
                <div className="flex items-center gap-3">
                  <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                    className="text-sm border border-[var(--border)] rounded-xl px-3 py-2 bg-[var(--surface)] outline-none focus:border-[var(--ink3)] text-[var(--ink2)]">
                    {['Best match', 'Highest rated', 'Most reviews', 'Lowest rate', 'Highest rate'].map(o => <option key={o}>{o}</option>)}
                  </select>
                  <div className="flex gap-1 bg-[var(--surface)] border border-[var(--border)] rounded-xl p-1">
                    {(['grid', 'list'] as const).map(v => (
                      <button key={v} onClick={() => setView(v)}
                        className={cn('w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-smooth',
                          view === v ? 'bg-[var(--ink)] text-white' : 'text-[var(--ink3)] hover:bg-[var(--bg2)]')}>
                        {v === 'grid' ? '⊞' : '≡'}
                      </button>
                    ))}
                  </div>
                  <button onClick={() => setFiltersOpen(!filtersOpen)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border)] text-sm text-[var(--ink2)] bg-[var(--surface)]">
                    ⚙ Filters
                  </button>
                </div>
              </div>

              {/* Results */}
              {filtered.length === 0 ? (
                <div className="text-center py-24">
                  <div className="text-5xl mb-4">🔍</div>
                  <h3 className="font-semibold text-[var(--ink)] mb-2">No freelancers found</h3>
                  <p className="text-[var(--ink3)] text-sm">Try adjusting your filters</p>
                </div>
              ) : view === 'grid' ? (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filtered.map(fl => <FreelancerCard key={fl.id} fl={fl} view="grid" />)}
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {filtered.map(fl => <FreelancerCard key={fl.id} fl={fl} view="list" />)}
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
