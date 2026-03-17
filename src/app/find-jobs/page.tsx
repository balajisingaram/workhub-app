'use client'
import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useLocation, CountrySelector } from '@/context/LocationContext'

type JobTab = 'all' | 'freelance' | 'gigs' | 'drivers'

const ALL_JOBS = [
  { id:'j1', type:'freelance', icon:'💻', title:'Senior React Developer — SaaS Dashboard',         company:'TechCorp Inc',       budget:'$5,000–$8,000', budgetType:'fixed',  location:'Remote',                 skills:['React','TypeScript','Node.js'],     posted:'2h ago',  proposals:14, urgent:true  },
  { id:'j2', type:'freelance', icon:'🎨', title:'Brand Identity Design for Fintech App',           company:'FinFlow Ltd',        budget:'$800–$1,500',   budgetType:'fixed',  location:'Remote',                 skills:['Branding','Figma','Logo Design'],   posted:'5h ago',  proposals:8,  urgent:false },
  { id:'j3', type:'gigs',      icon:'🔧', title:'Heavy Equipment Movers — Warehouse',              company:'Chennai Logistics',  budget:'$26/hr',        budgetType:'hourly', location:'Guindy, Chennai',        skills:['Heavy lifting','Warehouse'],        posted:'1h ago',  proposals:6,  urgent:true  },
  { id:'j4', type:'freelance', icon:'📱', title:'Mobile App UI Design (iOS + Android)',            company:'HealthStart',        budget:'$1,200–$2,000', budgetType:'fixed',  location:'Remote',                 skills:['Figma','Mobile UI','Prototyping'],  posted:'3h ago',  proposals:11, urgent:false },
  { id:'j5', type:'drivers',   icon:'🚗', title:'Daily Logistics Driver — Warehouse to Stores',   company:'QuickMart',          budget:'$18/hr',        budgetType:'hourly', location:'Anna Nagar, Chennai',    skills:['Driving','Logistics'],             posted:'30m ago', proposals:4,  urgent:true  },
  { id:'j6', type:'gigs',      icon:'📦', title:'Office Furniture Installation — 2 days',         company:'Spaces Co',          budget:'$12/hr',        budgetType:'hourly', location:'Nungambakkam, Chennai',  skills:['Assembly','Light lifting'],         posted:'4h ago',  proposals:9,  urgent:false },
  { id:'j7', type:'freelance', icon:'✍️', title:'SEO Content Writer — 20 articles/month',         company:'BloomCreative',        budget:'$35–$50/hr',    budgetType:'hourly', location:'Remote',                 skills:['SEO Writing','Content Strategy'],   posted:'6h ago',  proposals:19, urgent:false },
  { id:'j8', type:'drivers',   icon:'🛵', title:'Food Delivery Rider — Evenings & Weekends',      company:'QuickEats',          budget:'$12/hr + tips', budgetType:'hourly', location:'T Nagar, Chennai',       skills:['Bike riding','Navigation'],         posted:'2h ago',  proposals:7,  urgent:false },
  { id:'j9', type:'gigs',      icon:'🏗️', title:'Extreme Duty — Steel beams, construction site', company:'BuildRight',         budget:'$40/hr',        budgetType:'hourly', location:'Ambattur, Chennai',      skills:['Heavy machinery','Construction'],   posted:'1d ago',  proposals:3,  urgent:true  },
  { id:'j10',type:'freelance', icon:'📊', title:'Data Analyst — Monthly reporting dashboards',    company:'RetailMax',          budget:'$60–$80/hr',    budgetType:'hourly', location:'Remote',                 skills:['Python','Tableau','SQL'],           posted:'8h ago',  proposals:5,  urgent:false },
  { id:'j11',type:'drivers',   icon:'🚐', title:'Van Driver — Airport runs daily',                company:'Swift Transfers',    budget:'$22/hr',        budgetType:'hourly', location:'Porur, Chennai',         skills:['Van driving','Punctuality'],        posted:'3h ago',  proposals:9,  urgent:false },
  { id:'j12',type:'gigs',      icon:'🎪', title:'Event Setup Crew — Weekend event',               company:'EventPro',           budget:'$15/hr',        budgetType:'hourly', location:'OMR, Chennai',           skills:['Event setup','Physical work'],      posted:'12h ago', proposals:14, urgent:false },
]

const TYPE_META: Record<string, {bg:string;text:string;label:string}> = {
  freelance: { bg:'#edeafa', text:'#5c44c2', label:'Remote'  },
  gigs:      { bg:'#e8f5ee', text:'#1a6b3c', label:'Onsite'  },
  drivers:   { bg:'#e5f0fa', text:'#1a5a8a', label:'Driver'  },
}

function ApplyModal({ job, onClose }: { job: any; onClose: () => void }) {
  const [done, setDone] = useState(false)
  const tc = TYPE_META[job.type]
  if (done) return (
    <div className="modal-backdrop fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in" onClick={e => { if (e.target===e.currentTarget) onClose() }}>
      <div className="bg-white rounded-3xl p-10 w-full max-w-sm text-center shadow-large animate-scale-in">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="font-display font-black text-xl text-[var(--ink)] mb-2">Application sent!</h2>
        <p className="text-sm text-[var(--ink3)] mb-6">The client will review your application and get in touch.</p>
        <button onClick={onClose} className="w-full py-3 rounded-full bg-[var(--ink)] text-white text-sm font-semibold hover:bg-[var(--accent)] transition-smooth">Browse more jobs</button>
      </div>
    </div>
  )
  return (
    <div className="modal-backdrop fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in" onClick={e => { if (e.target===e.currentTarget) onClose() }}>
      <div className="bg-white rounded-3xl p-7 w-full max-w-md shadow-large animate-scale-in relative">
        <button onClick={onClose} className="absolute right-4 top-4 w-8 h-8 rounded-full bg-[var(--bg)] flex items-center justify-center text-sm text-[var(--ink3)] hover:bg-[var(--bg3)] transition-smooth">✕</button>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0" style={{background:tc.bg}}>{job.icon}</div>
          <div className="flex-1 min-w-0"><div className="font-semibold text-sm text-[var(--ink)] line-clamp-1">{job.title}</div><div className="text-xs text-[var(--ink3)]">{job.company}</div></div>
        </div>
        <h2 className="font-display font-bold text-xl mb-5 tracking-tight">Apply for this job</h2>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[var(--ink2)] mb-1.5">Your name</label>
              <input type="text" placeholder="John Smith" className="w-full px-3.5 py-2.5 rounded-xl border border-[rgba(20,18,14,.1)] text-sm outline-none focus:border-[rgba(20,18,14,.3)] transition-smooth" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[var(--ink2)] mb-1.5">Phone</label>
              <input type="tel" placeholder="+91 98765..." className="w-full px-3.5 py-2.5 rounded-xl border border-[rgba(20,18,14,.1)] text-sm outline-none focus:border-[rgba(20,18,14,.3)] transition-smooth" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-[var(--ink2)] mb-1.5">Your rate / bid</label>
            <input type="text" placeholder={`e.g. ${job.budget}`} className="w-full px-3.5 py-2.5 rounded-xl border border-[rgba(20,18,14,.1)] text-sm outline-none focus:border-[rgba(20,18,14,.3)] transition-smooth" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[var(--ink2)] mb-1.5">Why you're a good fit</label>
            <textarea rows={3} placeholder="Tell the client about your experience…" className="w-full px-3.5 py-2.5 rounded-xl border border-[rgba(20,18,14,.1)] text-sm outline-none focus:border-[rgba(20,18,14,.3)] resize-none transition-smooth" />
          </div>
          <div className="flex items-start gap-3 p-3.5 bg-[#e5f0fa] rounded-xl border border-[rgba(26,90,138,.15)]">
            <span>💡</span>
            <p className="text-xs text-[#1a5a8a] leading-relaxed"><strong>No account needed</strong> to apply. Create a free profile to get noticed faster and track your applications.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setDone(true)} className="flex-1 py-3 rounded-full bg-[var(--ink)] text-white text-sm font-semibold hover:bg-[var(--accent)] transition-smooth">
              Submit application →
            </button>
            <Link href="/register" onClick={onClose}>
              <button className="px-4 py-3 rounded-full border border-[var(--border)] text-xs font-medium text-[var(--ink2)] hover:bg-[var(--bg)] transition-smooth whitespace-nowrap">
                Create profile
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function FindJobsContent() {
  const params = useSearchParams()
  const initType = (params?.get('type') as JobTab) ?? 'all'
  const [tab, setTab] = useState<JobTab>(initType)
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')
  const [applyJob, setApplyJob] = useState<any>(null)
  const { country, convertPrice } = useLocation()

  const tabs: { id: JobTab; icon: string; label: string }[] = [
    { id:'all',       icon:'🔍', label:'All jobs'   },
    { id:'freelance', icon:'💻', label:'Freelance'  },
    ...(country.hasGigWorkers ? [{ id:'gigs' as JobTab, icon:'🔧', label:'Gig work' }] : []),
    ...(country.hasDrivers    ? [{ id:'drivers' as JobTab, icon:'🚗', label:'Driving' }] : []),
  ]

  const filtered = ALL_JOBS.filter(j => {
    if (!country.hasGigWorkers && j.type !== 'freelance') return false
    if (tab !== 'all' && j.type !== tab) return false
    if (search && !j.title.toLowerCase().includes(search.toLowerCase()) && !j.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))) return false
    return true
  })

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center nav-blur border-b border-[var(--border2)]">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-10 w-full flex items-center gap-3">
          <Link href="/" className="font-display font-black text-[20px] tracking-tight text-[var(--ink)]">Gig<span className="text-[var(--accent)]">Hub</span></Link>
          <span className="text-[var(--ink4)] text-sm">/</span>
          <span className="text-sm font-semibold text-[var(--ink)] hidden sm:block">Find Jobs</span>
          <div className="flex-1" />
          <CountrySelector />
          <Link href="/hire" className="text-sm text-[var(--ink3)] hover:text-[var(--ink)] transition-smooth hidden sm:block">Looking to hire?</Link>
          <Link href="/register"><button className="px-4 py-2 rounded-full bg-[var(--ink)] text-white text-sm font-semibold hover:bg-[var(--accent)] transition-smooth">Create profile</button></Link>
          <Link href="/login"><button className="px-4 py-2 rounded-full border border-[var(--border)] text-sm font-medium text-[var(--ink2)] hover:bg-[var(--bg2)] transition-smooth">Log in</button></Link>
        </div>
      </nav>

      <main className="pt-16 min-h-screen bg-[var(--bg)]">
        {/* Hero search */}
        <div className="bg-[var(--bg2)] border-b border-[var(--border2)]">
          <div className="max-w-[1280px] mx-auto px-5 lg:px-10 py-10 sm:py-12">
            <h1 className="font-display font-black text-[var(--ink)] mb-2" style={{fontSize:'clamp(24px,5vw,48px)',letterSpacing:'-0.025em'}}>Find your next gig</h1>
            <p className="text-[var(--ink3)] text-sm sm:text-base mb-6">
              {country.hasGigWorkers
                ? 'Freelance projects, onsite gig work and driving jobs — browse freely, apply instantly.'
                : 'Thousands of freelance projects — browse freely, apply instantly. No login needed.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
              <div className="flex-1 flex items-center gap-3 bg-white rounded-xl border border-[var(--border)] px-4 focus-within:border-[var(--ink3)] transition-smooth">
                <span className="text-[var(--ink3)]">🔍</span>
                <input value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search skills or job title…"
                  className="flex-1 bg-transparent py-3 text-[var(--ink)] text-sm outline-none placeholder:text-[var(--ink4)]" />
                {search && <button onClick={() => setSearch('')} className="text-[var(--ink4)] hover:text-[var(--ink3)] text-sm">✕</button>}
              </div>
              {country.hasGigWorkers && (
                <div className="flex items-center gap-3 bg-white rounded-xl border border-[var(--border)] px-4 focus-within:border-[var(--ink3)] transition-smooth sm:w-44">
                  <span className="text-[var(--ink3)]">📍</span>
                  <input value={location} onChange={e => setLocation(e.target.value)}
                    placeholder="City or remote…"
                    className="flex-1 bg-transparent py-3 text-[var(--ink)] text-sm outline-none placeholder:text-[var(--ink4)]" />
                </div>
              )}
            </div>
            {/* Quick tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {['React developer','UI/UX designer','Content writer','Data analyst', ...(country.hasGigWorkers ? ['Gig worker','Delivery driver'] : [])].map(t => (
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
          <div className="max-w-[1280px] mx-auto px-5 lg:px-10">
            <div className="flex items-center gap-1 py-2 overflow-x-auto scrollbar-none">
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className={cn('flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-smooth',
                    tab===t.id ? 'bg-[var(--ink)] text-white' : 'text-[var(--ink3)] hover:text-[var(--ink)] hover:bg-[var(--bg)]')}>
                  {t.icon} {t.label}
                </button>
              ))}
              <div className="ml-auto text-sm text-[var(--ink3)] pl-4 shrink-0">
                <span className="font-semibold text-[var(--ink)]">{filtered.length}</span> jobs found
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-[1280px] mx-auto px-5 lg:px-10 py-8">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Jobs list */}
            <div className="lg:col-span-2 flex flex-col gap-3">
              {filtered.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-5xl mb-4">🔍</div>
                  <h3 className="font-semibold text-[var(--ink)] mb-2">No jobs found</h3>
                  <p className="text-[var(--ink3)] text-sm">Try different keywords or clear the search</p>
                  <button onClick={() => setSearch('')} className="mt-4 px-5 py-2 rounded-full border border-[var(--border)] text-sm text-[var(--ink2)] hover:bg-white transition-smooth">Clear search</button>
                </div>
              ) : filtered.map(job => {
                const tc = TYPE_META[job.type]
                return (
                  <div key={job.id} className="bg-white rounded-2xl border border-[var(--border2)] p-4 sm:p-5 hover:shadow-soft hover:-translate-y-0.5 transition-smooth group">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center text-lg sm:text-xl shrink-0" style={{background:tc.bg}}>{job.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-start gap-1.5 mb-1">
                          <div className="font-semibold text-sm text-[var(--ink)] group-hover:text-[var(--accent)] transition-smooth flex-1 leading-tight">{job.title}</div>
                          {job.urgent && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#fde8e8] text-[#c94040] shrink-0">Urgent</span>}
                        </div>
                        <div className="text-xs text-[var(--ink3)] mb-2">{job.company} · {job.location} · {job.posted}</div>
                        <div className="flex flex-wrap gap-1.5">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{background:tc.bg,color:tc.text}}>{tc.label}</span>
                          {job.skills.slice(0,3).map(s => <span key={s} className="px-2.5 py-1 bg-[var(--bg)] rounded-lg text-xs font-medium text-[var(--ink2)]">{s}</span>)}
                        </div>
                      </div>
                      <div className="text-right shrink-0 ml-2">
                        <div className="font-display font-bold text-sm sm:text-base text-[var(--ink)] whitespace-nowrap">{job.budget}</div>
                        <div className="text-[10px] sm:text-xs text-[var(--ink3)] capitalize mb-2">{job.budgetType}</div>
                        <button onClick={() => setApplyJob(job)}
                          className="px-3 sm:px-4 py-1.5 bg-[var(--ink)] text-white text-xs font-semibold rounded-full hover:bg-[var(--accent)] transition-smooth">
                          Apply
                        </button>
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
                <p className="text-white/55 text-xs leading-relaxed mb-4">Create a free profile to get direct messages from clients and stand out from other applicants.</p>
                <Link href="/register"><button className="w-full py-3 rounded-full bg-[var(--accent)] text-white text-sm font-semibold hover:bg-[#2d9c5e] transition-smooth">Create free profile →</button></Link>
                <p className="text-center text-white/30 text-[11px] mt-3">No account needed to browse or apply</p>
              </div>

              {/* Top paying */}
              <div className="bg-white rounded-2xl border border-[var(--border2)] p-5">
                <div className="font-semibold text-sm text-[var(--ink)] mb-4">Top paying this week</div>
                <div className="flex flex-col gap-3">
                  {[
                    {title:'Full Stack Developer',pay:'$80/hr',color:'#5c44c2'},
                    ...(country.hasGigWorkers ? [{title:'Extreme duty mover',pay:'$40/hr',color:'#c94040'},{title:'Long haul truck driver',pay:'$35/hr',color:'#1a5a8a'}] : [
                      {title:'Data Scientist',pay:'$75/hr',color:'#c2620a'},
                      {title:'Product Designer',pay:'$65/hr',color:'#1a5a8a'},
                    ]),
                  ].map(j => (
                    <div key={j.title} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full shrink-0" style={{background:j.color}} />
                      <div className="flex-1 text-xs text-[var(--ink2)] truncate">{j.title}</div>
                      <div className="font-semibold text-xs text-[var(--ink)]">{j.pay}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* No signup needed note */}
              <div className="bg-[var(--accent-light)] rounded-2xl p-5 border border-[rgba(26,107,60,.15)]">
                <div className="text-lg mb-2">🆓</div>
                <div className="font-semibold text-sm text-[var(--accent)] mb-1">Free to browse & apply</div>
                <p className="text-xs text-[var(--ink3)] leading-relaxed">No login needed. Browse all jobs and apply directly. Create a profile to get more visibility.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {applyJob && <ApplyModal job={applyJob} onClose={() => setApplyJob(null)} />}
    </>
  )
}

export default function FindJobsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--bg)] flex items-center justify-center"><div className="text-[var(--ink3)] text-sm">Loading jobs…</div></div>}>
      <FindJobsContent />
    </Suspense>
  )
}
