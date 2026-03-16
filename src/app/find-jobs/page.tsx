'use client'
import { useState } from 'react'
import Link from 'next/link'
import { MOCK_JOBS, MOCK_FREELANCERS } from '@/lib/data'
import { cn } from '@/lib/utils'

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center nav-blur border-b border-[var(--border2)]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 w-full flex items-center gap-4">
        <Link href="/" className="font-display font-black text-[20px] tracking-tight text-[var(--ink)]">
          Gig<span className="text-[var(--accent)]">Hub</span>
        </Link>
        <span className="text-[var(--ink4)] text-sm mx-1">/</span>
        <span className="text-sm font-semibold text-[var(--ink)]">Find Jobs</span>
        <div className="flex-1" />
        <Link href="/hire" className="text-sm text-[var(--ink3)] hover:text-[var(--ink)] transition-smooth hidden sm:block">Looking to hire?</Link>
        <Link href="/register">
          <button className="px-5 py-2 rounded-full bg-[var(--ink)] text-white text-sm font-semibold hover:bg-[var(--accent)] transition-smooth">
            Create profile
          </button>
        </Link>
        <Link href="/login">
          <button className="px-5 py-2 rounded-full border border-[var(--border)] text-sm font-medium text-[var(--ink2)] hover:bg-[var(--bg2)] transition-smooth">
            Log in
          </button>
        </Link>
      </div>
    </nav>
  )
}

type JobTab = 'all' | 'freelance' | 'gigs' | 'drivers'

const SAMPLE_JOBS = [
  { id: 'j1', type: 'freelance', icon: '💻', title: 'Senior React Developer — SaaS Dashboard', company: 'TechCorp Inc', budget: '$5,000–$8,000', budgetType: 'fixed', location: 'Remote', skills: ['React', 'TypeScript', 'Node.js'], posted: '2h ago', proposals: 14, urgent: true },
  { id: 'j2', type: 'freelance', icon: '🎨', title: 'Brand Identity Design for Fintech App', company: 'FinFlow Ltd', budget: '$800–$1,500', budgetType: 'fixed', location: 'Remote', skills: ['Branding', 'Figma', 'Logo Design'], posted: '5h ago', proposals: 8, urgent: false },
  { id: 'j3', type: 'gigs', icon: '🔧', title: 'Heavy Equipment Movers — Warehouse', company: 'Chennai Logistics', budget: '$26/hr', budgetType: 'hourly', location: 'Guindy, Chennai', skills: ['Heavy lifting', 'Warehouse'], posted: '1h ago', proposals: 6, urgent: true },
  { id: 'j4', type: 'freelance', icon: '📱', title: 'Mobile App UI Design (iOS + Android)', company: 'HealthStart', budget: '$1,200–$2,000', budgetType: 'fixed', location: 'Remote', skills: ['Figma', 'Mobile UI', 'Prototyping'], posted: '3h ago', proposals: 11, urgent: false },
  { id: 'j5', type: 'drivers', icon: '🚗', title: 'Daily Logistics Driver — Warehouse to Stores', company: 'QuickMart', budget: '$18/hr', budgetType: 'hourly', location: 'Anna Nagar, Chennai', skills: ['Driving', 'Logistics', 'Heavy vehicle'], posted: '30m ago', proposals: 4, urgent: true },
  { id: 'j6', type: 'gigs', icon: '📦', title: 'Office Furniture Installation — 2 days', company: 'Spaces Co', budget: '$12/hr', budgetType: 'hourly', location: 'Nungambakkam, Chennai', skills: ['Assembly', 'Light lifting'], posted: '4h ago', proposals: 9, urgent: false },
  { id: 'j7', type: 'freelance', icon: '✍️', title: 'SEO Content Writer — 20 articles/month', company: 'BloomAgency', budget: '$35–$50/hr', budgetType: 'hourly', location: 'Remote', skills: ['SEO Writing', 'Content Strategy'], posted: '6h ago', proposals: 19, urgent: false },
  { id: 'j8', type: 'drivers', icon: '🛵', title: 'Food Delivery Rider — Evenings', company: 'QuickEats', budget: '$12/hr + tips', budgetType: 'hourly', location: 'T Nagar, Chennai', skills: ['Bike riding', 'Navigation'], posted: '2h ago', proposals: 7, urgent: false },
  { id: 'j9', type: 'gigs', icon: '🏗️', title: 'Extreme Duty — Steel beams, construction site', company: 'BuildRight', budget: '$40/hr', budgetType: 'hourly', location: 'Ambattur, Chennai', skills: ['Heavy machinery', 'Construction'], posted: '1d ago', proposals: 3, urgent: true },
]

const TYPE_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  freelance: { bg: '#edeafa', text: '#5c44c2', label: 'Remote' },
  gigs:      { bg: '#e8f5ee', text: '#1a6b3c', label: 'Onsite' },
  drivers:   { bg: '#e5f0fa', text: '#1a5a8a', label: 'Driver' },
}

export default function FindJobsPage() {
  const [activeTab, setActiveTab] = useState<JobTab>('all')
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')

  const tabs: { id: JobTab; icon: string; label: string }[] = [
    { id: 'all',      icon: '🔍', label: 'All jobs' },
    { id: 'freelance',icon: '💻', label: 'Freelance' },
    { id: 'gigs',     icon: '🔧', label: 'Gig work' },
    { id: 'drivers',  icon: '🚗', label: 'Driving' },
  ]

  const filtered = SAMPLE_JOBS.filter(j => {
    if (activeTab !== 'all' && j.type !== activeTab) return false
    if (search && !j.title.toLowerCase().includes(search.toLowerCase()) && !j.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))) return false
    return true
  })

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[var(--bg)]">

        {/* Hero */}
        <div className="bg-[var(--bg2)] border-b border-[var(--border2)]">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-12">
            <h1 className="font-display font-black text-[var(--ink)] mb-3"
              style={{ fontSize: 'clamp(28px,5vw,52px)', letterSpacing: '-0.025em' }}>
              Find your next gig
            </h1>
            <p className="text-[var(--ink3)] text-base mb-7 max-w-lg">Freelance projects, onsite gig work and driving jobs — all in one place.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
              <div className="flex-1 flex items-center gap-3 bg-white rounded-xl border border-[var(--border)] px-4 focus-within:border-[var(--ink3)] transition-smooth">
                <span className="text-[var(--ink3)]">🔍</span>
                <input value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search skills or job title…"
                  className="flex-1 bg-transparent py-3 text-[var(--ink)] text-sm outline-none placeholder:text-[var(--ink4)]" />
              </div>
              <div className="flex items-center gap-3 bg-white rounded-xl border border-[var(--border)] px-4 focus-within:border-[var(--ink3)] transition-smooth sm:w-52">
                <span className="text-[var(--ink3)]">📍</span>
                <input value={location} onChange={e => setLocation(e.target.value)}
                  placeholder="City or remote…"
                  className="flex-1 bg-transparent py-3 text-[var(--ink)] text-sm outline-none placeholder:text-[var(--ink4)]" />
              </div>
              <button className="px-7 py-3 bg-[var(--ink)] text-white rounded-xl text-sm font-semibold hover:bg-[var(--accent)] transition-smooth">
                Search
              </button>
            </div>

            {/* Quick tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {['React developer', 'Gig worker', 'Delivery driver', 'Graphic designer', 'Data entry', 'Heavy lifting'].map(t => (
                <button key={t} onClick={() => setSearch(t)}
                  className="px-3 py-1.5 rounded-full bg-white border border-[var(--border2)] text-xs font-medium text-[var(--ink2)] hover:border-[var(--ink3)] transition-smooth">
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-[var(--border2)] sticky top-16 z-20">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
            <div className="flex gap-1 py-2">
              {tabs.map(t => (
                <button key={t.id} onClick={() => setActiveTab(t.id)}
                  className={cn('flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-smooth',
                    activeTab === t.id ? 'bg-[var(--ink)] text-white' : 'text-[var(--ink3)] hover:text-[var(--ink)] hover:bg-[var(--bg)]')}>
                  {t.icon} {t.label}
                </button>
              ))}
              <div className="ml-auto flex items-center text-sm text-[var(--ink3)]">
                <span className="font-semibold text-[var(--ink)]">{filtered.length}</span>&nbsp;jobs found
              </div>
            </div>
          </div>
        </div>

        {/* Jobs list */}
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-8">
          <div className="grid lg:grid-cols-3 gap-6">

            {/* Job cards */}
            <div className="lg:col-span-2 flex flex-col gap-3">
              {filtered.length === 0 ? (
                <div className="text-center py-24">
                  <div className="text-5xl mb-4">🔍</div>
                  <h3 className="font-semibold text-[var(--ink)] mb-2">No jobs found</h3>
                  <p className="text-[var(--ink3)] text-sm">Try different keywords or clear the search</p>
                </div>
              ) : filtered.map(job => {
                const tc = TYPE_COLORS[job.type]
                return (
                  <div key={job.id} className="bg-white rounded-2xl border border-[var(--border2)] p-5 hover:shadow-soft hover:-translate-y-0.5 transition-smooth cursor-pointer group">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
                        style={{ background: tc.bg }}>
                        {job.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-start gap-2 mb-1">
                          <div className="font-semibold text-sm text-[var(--ink)] group-hover:text-[var(--accent)] transition-smooth flex-1">{job.title}</div>
                          {job.urgent && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#fde8e8] text-[#c94040] shrink-0">Urgent</span>}
                        </div>
                        <div className="text-xs text-[var(--ink3)] mb-2">{job.company} · {job.location} · Posted {job.posted}</div>
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: tc.bg, color: tc.text }}>{tc.label}</span>
                          {job.skills.map(s => <span key={s} className="px-2.5 py-1 bg-[var(--bg)] rounded-lg text-xs font-medium text-[var(--ink2)]">{s}</span>)}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-display font-bold text-base text-[var(--ink)]">{job.budget}</div>
                        <div className="text-xs text-[var(--ink3)] capitalize mb-2">{job.budgetType}</div>
                        <Link href="/register">
                          <button className="px-4 py-1.5 bg-[var(--ink)] text-white text-xs font-semibold rounded-full hover:bg-[var(--accent)] transition-smooth">
                            Apply
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Right sidebar */}
            <div className="hidden lg:flex flex-col gap-5">
              {/* Create profile CTA */}
              <div className="bg-[var(--ink)] rounded-2xl p-6 text-white">
                <div className="text-2xl mb-3">👤</div>
                <div className="font-display font-bold text-lg mb-2 tracking-tight">Get hired faster</div>
                <p className="text-white/55 text-xs leading-relaxed mb-4">Create a free profile to apply to jobs, get direct messages from clients and show your portfolio.</p>
                <Link href="/register">
                  <button className="w-full py-3 rounded-full bg-[var(--accent)] text-white text-sm font-semibold hover:bg-[var(--accent2)] transition-smooth">
                    Create free profile →
                  </button>
                </Link>
              </div>

              {/* Top paying */}
              <div className="bg-white rounded-2xl border border-[var(--border2)] p-5">
                <div className="font-semibold text-sm text-[var(--ink)] mb-4">Top paying this week</div>
                <div className="flex flex-col gap-3">
                  {[
                    { title: 'Full Stack Developer', pay: '$80/hr', type: 'freelance', color: '#5c44c2', bg: '#edeafa' },
                    { title: 'Extreme duty mover', pay: '$40/hr', type: 'gigs', color: '#c94040', bg: '#fde8e8' },
                    { title: 'Long haul truck driver', pay: '$35/hr', type: 'drivers', color: '#1a5a8a', bg: '#e5f0fa' },
                  ].map(j => (
                    <div key={j.title} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ background: j.color }} />
                      <div className="flex-1 text-xs text-[var(--ink2)]">{j.title}</div>
                      <div className="font-semibold text-xs text-[var(--ink)]">{j.pay}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Job type legend */}
              <div className="bg-white rounded-2xl border border-[var(--border2)] p-5">
                <div className="font-semibold text-sm text-[var(--ink)] mb-4">Job types explained</div>
                <div className="flex flex-col gap-3 text-xs">
                  {[
                    { icon: '💻', label: 'Freelance', desc: 'Remote work, paid per project or hour', color: '#5c44c2' },
                    { icon: '🔧', label: 'Gig work', desc: 'Onsite physical tasks, paid per hour', color: '#1a6b3c' },
                    { icon: '🚗', label: 'Driving', desc: 'Transport and delivery, paid per hour or trip', color: '#1a5a8a' },
                  ].map(t => (
                    <div key={t.label} className="flex gap-2.5 items-start">
                      <span className="text-base leading-none mt-0.5">{t.icon}</span>
                      <div>
                        <div className="font-semibold text-[var(--ink)]" style={{ color: t.color }}>{t.label}</div>
                        <div className="text-[var(--ink3)] leading-relaxed">{t.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
