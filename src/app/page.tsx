'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useLocation, CountrySelector } from '@/context/LocationContext'
import { MOCK_FREELANCERS } from '@/lib/data'

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')), { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 20); window.addEventListener('scroll', fn, { passive: true }); return () => window.removeEventListener('scroll', fn) }, [])
  return (
    <nav className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-16 flex items-center', scrolled ? 'nav-blur border-b border-[var(--border2)] shadow-soft' : 'bg-transparent')}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 w-full flex items-center gap-3">
        <Link href="/" className="font-display font-black text-[22px] tracking-tight text-[var(--ink)]">Gig<span className="text-[var(--accent)]">Hub</span></Link>
        <div className="flex-1" />
        <CountrySelector />
        <Link href="/hire" className="hidden sm:block text-sm font-medium text-[var(--ink3)] hover:text-[var(--ink)] transition-smooth px-3 py-2 rounded-full hover:bg-[var(--bg2)]">Hire talent</Link>
        <Link href="/find-jobs" className="hidden sm:block text-sm font-medium text-[var(--ink3)] hover:text-[var(--ink)] transition-smooth px-3 py-2 rounded-full hover:bg-[var(--bg2)]">Find work</Link>
        <Link href="/login"><button className="px-4 py-2 rounded-full border border-[var(--border)] text-sm font-medium text-[var(--ink2)] hover:bg-[var(--bg2)] transition-smooth">Log in</button></Link>
        <Link href="/register"><button className="px-4 py-2 rounded-full bg-[var(--ink)] text-white text-sm font-semibold hover:bg-[var(--accent)] transition-smooth">Sign up</button></Link>
      </div>
    </nav>
  )
}

export default function HomePage() {
  useReveal()
  const { country, convertPrice } = useLocation()
  const isFullService = country.hasGigWorkers
  const [howTab, setHowTab] = useState<'hire'|'work'>('hire')
  const hireSteps = [{icon:'📝',t:'Post a job',d:'Describe what you need — remote project, gig task or driver.'},{icon:'👥',t:'Review applicants',d:'Browse verified profiles, ratings and reviews.'},{icon:'🔒',t:'Pay securely',d:'Funds held in escrow — released only when you approve.'},{icon:'⭐',t:'Rate & repeat',d:'Leave a review and build your trusted network.'}]
  const workSteps = [{icon:'👤',t:'Create profile',d:'Add your skills, rate, availability and location.'},{icon:'🔔',t:'Get job alerts',d:'Instant notifications when matching jobs are posted.'},{icon:'💬',t:'Apply and chat',d:'Send a proposal, message the client and get started.'},{icon:'💸',t:'Get paid',d:'Payment released to your wallet on approval.'}]

  return (
    <>
      <Navbar />
      <main>
        {/* HERO */}
        <section className="min-h-screen flex items-center justify-center pt-16 pb-8 relative overflow-hidden bg-[var(--bg)]">
          <div className="absolute inset-0 pointer-events-none" style={{background:'radial-gradient(ellipse 800px 600px at 50% 40%, rgba(26,107,60,.07) 0%, transparent 70%)'}} />
          <div className="max-w-[1100px] mx-auto px-6 lg:px-12 w-full text-center">
            <div className="inline-flex items-center gap-2 bg-[var(--accent-light)] text-[var(--accent)] border border-[rgba(26,107,60,.2)] rounded-full px-4 py-1.5 text-xs font-bold tracking-widest uppercase mb-8 animate-float-up">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse-dot" />{country.flag} Now available in {country.name}
            </div>
            <h1 className="font-display font-black text-[var(--ink)] animate-float-up delay-100 mb-6" style={{fontSize:'clamp(44px,8vw,96px)',letterSpacing:'-0.04em',lineHeight:1.0}}>
              Work your way.<br /><em className="text-[var(--accent)] not-italic">Hire smarter.</em>
            </h1>
            <p className="text-lg text-[var(--ink3)] max-w-xl mx-auto leading-relaxed mb-14 animate-float-up delay-200">
              {isFullService ? 'Freelancers for remote work, gig workers for onsite tasks, and drivers — all verified.' : 'Top freelancers for remote projects — design, development, marketing, writing and more.'}
            </p>
            <div className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto animate-float-up delay-300">
              <Link href="/hire">
                <div className="group bg-[var(--ink)] rounded-3xl p-8 text-left cursor-pointer hover:-translate-y-1 hover:shadow-large transition-smooth relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--accent)] opacity-10" />
                  <div className="text-4xl mb-5">💼</div>
                  <div className="font-display font-black text-2xl text-white tracking-tight mb-2">Hire Gig Work</div>
                  <p className="text-white/55 text-sm leading-relaxed mb-5">{isFullService ? 'Post jobs and hire verified freelancers, gig workers and drivers instantly.' : 'Post projects and hire top freelancers from around the world.'}</p>
                  {['Freelancers for remote work',...(isFullService?['Gig workers for onsite tasks','Drivers for delivery']:[] as string[])].map(f => (
                    <div key={f} className="flex items-center gap-2 text-xs text-white/65 mb-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[#7ee8a2] flex-shrink-0"/>{f}</div>
                  ))}
                  <div className="flex items-center gap-2 text-[#7ee8a2] font-semibold text-sm mt-4 group-hover:gap-3 transition-smooth">Start hiring <span>→</span></div>
                </div>
              </Link>
              <Link href="/find-jobs">
                <div className="group bg-white rounded-3xl p-8 text-left cursor-pointer hover:-translate-y-1 hover:shadow-large border border-[var(--border2)] transition-smooth relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--accent)] opacity-5" />
                  <div className="text-4xl mb-5">🔍</div>
                  <div className="font-display font-black text-2xl text-[var(--ink)] tracking-tight mb-2">Find Jobs</div>
                  <p className="text-[var(--ink3)] text-sm leading-relaxed mb-5">{isFullService ? 'Browse freelance projects, gig work and driving opportunities near you.' : 'Browse thousands of freelance projects across all skill categories.'}</p>
                  {['Freelance projects (remote)',...(isFullService?['Gig work (local, flexible)','Driver & delivery jobs']:[] as string[])].map(f => (
                    <div key={f} className="flex items-center gap-2 text-xs text-[var(--ink3)] mb-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] flex-shrink-0"/>{f}</div>
                  ))}
                  <div className="flex items-center gap-2 text-[var(--accent)] font-semibold text-sm mt-4 group-hover:gap-3 transition-smooth">Browse jobs <span>→</span></div>
                </div>
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-10 mt-16 animate-float-up delay-400">
              {[{val:'50K+',lbl:'Active workers'},{val:'12K+',lbl:'Jobs posted'},{val:'4.9★',lbl:'Avg. rating'},{val:'98%',lbl:'Satisfaction'}].map(s => (
                <div key={s.lbl} className="text-center"><div className="font-display font-black text-2xl text-[var(--ink)] tracking-tight">{s.val}</div><div className="text-xs text-[var(--ink3)] mt-0.5">{s.lbl}</div></div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED FREELANCERS */}
        <section className="py-24 bg-white">
          <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
            <div className="flex items-end justify-between mb-10 reveal">
              <div>
                <h2 className="font-display font-black text-[var(--ink)] tracking-tight" style={{fontSize:'clamp(24px,4vw,40px)',letterSpacing:'-0.025em'}}>Top rated freelancers</h2>
                <p className="text-[var(--ink3)] text-sm mt-1">Verified professionals ready to work</p>
              </div>
              <Link href="/hire" className="text-sm font-medium text-[var(--accent)] hover:underline hidden sm:block">View all →</Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {MOCK_FREELANCERS.slice(0,8).map((fl,i) => (
                <Link key={fl.id} href={`/freelancers/${fl.id}`}>
                  <div className={cn('reveal bg-[var(--bg)] rounded-2xl border border-[var(--border2)] p-5 hover:-translate-y-1 hover:shadow-medium transition-smooth cursor-pointer group',`reveal-delay-${(i%4)+1}`)}>
                    <div className="relative mb-4">
                      <img src={fl.avatarUrl} alt={fl.name} className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-soft" onError={(e)=>{(e.target as HTMLImageElement).src=`https://ui-avatars.com/api/?name=${fl.name}&background=ece9e3&color=7a756c&size=64`}} />
                      {fl.isOnline && <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[var(--accent)] border-2 border-white" />}
                      {fl.isTopRated && <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#f5a623] flex items-center justify-center text-[10px]">⭐</div>}
                    </div>
                    <div className="font-semibold text-sm text-[var(--ink)] group-hover:text-[var(--accent)] transition-smooth">{fl.name}</div>
                    <div className="text-xs text-[var(--ink3)] mb-2 truncate">{fl.title}</div>
                    <div className="flex items-center gap-1 mb-3">
                      <span className="stars text-xs">{'★'.repeat(Math.floor(fl.rating))}</span>
                      <span className="text-xs font-semibold text-[var(--ink)]">{fl.rating}</span>
                      <span className="text-xs text-[var(--ink3)]">({fl.reviewCount})</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {fl.skills.slice(0,2).map(s => <span key={s} className="px-2 py-0.5 bg-white rounded text-[11px] font-medium text-[var(--ink2)] border border-[var(--border2)]">{s}</span>)}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-[var(--border2)]">
                      <div className="font-display font-bold text-base text-[var(--ink)]">{convertPrice(fl.hourlyRateMin)}<span className="font-sans text-xs font-normal text-[var(--ink3)]">/hr</span></div>
                      <span className="px-3 py-1.5 bg-[var(--ink)] text-white text-xs font-semibold rounded-full group-hover:bg-[var(--accent)] transition-smooth">Hire</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* WORKER TYPES */}
        <section className="py-24 bg-[var(--bg)]">
          <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
            <div className="text-center mb-14 reveal">
              <h2 className="font-display font-black text-[var(--ink)] mb-3" style={{fontSize:'clamp(28px,4vw,48px)',letterSpacing:'-0.025em'}}>Every type of work, <em className="text-[var(--accent)] not-italic">covered</em></h2>
              {!isFullService && <div className="inline-flex items-center gap-2 bg-[#fdf0e0] text-[#c2620a] rounded-full px-4 py-1.5 text-xs font-medium mt-2">{country.flag} Gig workers & drivers launching in {country.name} soon</div>}
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {icon:'💻',title:'Freelancers',desc:'Remote professionals for design, development, marketing, writing and more.',tags:['Web development','UI/UX design','Digital marketing','Content writing'],href:'/find-jobs',color:'#5c44c2',bg:'#edeafa',ok:true},
                {icon:'🔧',title:'Gig Workers',desc:'Verified onsite workers for moving, labour, installation and field tasks.',tags:['Furniture moving','Warehouse work','General labour','Installations'],href:'/find-jobs?type=gigs',color:'#1a6b3c',bg:'#e8f5ee',ok:isFullService},
                {icon:'🚗',title:'Drivers',desc:'Licensed drivers for delivery, logistics, cab runs and long-distance transport.',tags:['Package delivery','Logistics runs','Cab & pickup','Long distance'],href:'/find-jobs?type=drivers',color:'#1a5a8a',bg:'#e5f0fa',ok:country.hasDrivers},
              ].map((t,i) => (
                <Link key={t.title} href={t.ok ? t.href : '#'}>
                  <div className={cn('reveal bg-white rounded-3xl p-8 border border-[var(--border2)] h-full flex flex-col transition-smooth',`reveal-delay-${i+1}`,t.ok?'cursor-pointer hover:-translate-y-1 hover:shadow-medium group':'opacity-50 cursor-not-allowed')}>
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 flex-shrink-0" style={{background:t.bg}}>{t.icon}</div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="font-display font-bold text-xl text-[var(--ink)] tracking-tight">{t.title}</div>
                      {!t.ok && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#fdf0e0] text-[#c2620a]">Coming soon</span>}
                    </div>
                    <p className="text-sm text-[var(--ink3)] leading-relaxed mb-5 flex-1">{t.desc}</p>
                    <div className="flex flex-wrap gap-1.5 mb-6">{t.tags.map(tag => <span key={tag} className="px-2.5 py-1 rounded-full text-xs font-medium border border-[var(--border2)] text-[var(--ink2)]" style={{background:t.bg+'80'}}>{tag}</span>)}</div>
                    {t.ok && <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-smooth" style={{color:t.color}}>Browse {t.title.toLowerCase()} <span>→</span></div>}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-24 bg-[var(--bg2)]">
          <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
            <div className="text-center mb-12 reveal"><h2 className="font-display font-black text-[var(--ink)] mb-3" style={{fontSize:'clamp(28px,4vw,48px)',letterSpacing:'-0.025em'}}>How it works</h2></div>
            <div className="flex justify-center mb-12">
              <div className="flex bg-white border border-[var(--border2)] rounded-full p-1">
                {(['hire','work'] as const).map(t => <button key={t} onClick={() => setHowTab(t)} className={cn('px-8 py-2.5 rounded-full text-sm font-semibold transition-smooth',howTab===t?'bg-[var(--ink)] text-white':'text-[var(--ink3)] hover:text-[var(--ink)]')}>{t==='hire'?'💼 I want to hire':'🔍 I want to work'}</button>)}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {(howTab==='hire'?hireSteps:workSteps).map((s,i) => (
                <div key={s.t} className={cn('reveal text-center p-6',`reveal-delay-${i+1}`)}>
                  <div className="w-14 h-14 rounded-2xl bg-white border border-[var(--border2)] flex items-center justify-center text-2xl mx-auto mb-4">{s.icon}</div>
                  <div className="font-semibold text-[var(--ink)] mb-2">{s.t}</div>
                  <p className="text-sm text-[var(--ink3)] leading-relaxed">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AGENCY STRIP */}
        <section className="py-20 bg-[var(--ink)]">
          <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-[rgba(26,107,60,.25)] text-[#7ee8a2] text-xs font-bold tracking-widest uppercase mb-5">For staffing agencies & enterprises</span>
                <h2 className="font-display font-black text-white mb-4" style={{fontSize:'clamp(26px,4vw,44px)',letterSpacing:'-0.025em',lineHeight:1.1}}>Your own branded<br /><em className="text-[#7ee8a2] not-italic">staff portal</em></h2>
                <p className="text-white/55 text-base leading-relaxed mb-8 max-w-md">A completely private portal for your company. Manage employees, shifts and attendance under your own brand — no GigHub branding shown to your staff.</p>
                {['🏷️  Your logo, domain and brand colours','📤  Bulk upload employees via CSV','📅  Shift management and GPS clock-in','💰  Auto payslips and invoicing'].map(f => <div key={f} className="text-sm text-white/60 mb-2">{f}</div>)}
                <div className="mt-6"><Link href="/portal/login"><button className="px-7 py-3.5 rounded-full bg-[var(--accent)] text-white font-semibold text-sm hover:bg-[var(--accent2)] transition-smooth">Access agency portal →</button></Link></div>
              </div>
              <div className="bg-white/5 rounded-3xl border border-white/10 p-7">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-xl bg-[var(--accent)] flex items-center justify-center text-white font-bold text-sm">A</div>
                  <div><div className="text-sm font-semibold text-white">Acme Corp</div><div className="text-xs text-white/40">portal.acmecorp.com</div></div>
                  <div className="ml-auto text-[10px] font-bold px-2 py-1 rounded-full bg-white/10 text-white/40">PRIVATE</div>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4">{[['248','Employees'],['42','On shift'],['96%','Attendance']].map(([v,l]) => <div key={l} className="bg-white/8 rounded-xl p-3"><div className="font-display font-bold text-lg text-white">{v}</div><div className="text-[10px] text-white/40">{l}</div></div>)}</div>
                {[{e:'👷',n:'Ravi Kumar',r:'Heavy duty',s:'On shift',c:'#7ee8a2'},{e:'🚛',n:'Priya Sharma',r:'Driver',s:'Active',c:'#7ee8a2'},{e:'🔧',n:'Arjun Mehta',r:'Gig worker',s:'Pending',c:'#fab387'}].map(emp => (
                  <div key={emp.n} className="flex items-center gap-3 bg-white/5 rounded-xl px-3 py-2.5 mb-2">
                    <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-sm">{emp.e}</div>
                    <div className="flex-1 min-w-0"><div className="text-xs font-semibold text-white truncate">{emp.n}</div><div className="text-[11px] text-white/40">{emp.r}</div></div>
                    <div className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{background:emp.c+'25',color:emp.c}}>{emp.s}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-white">
          <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
            <div className="reveal bg-[var(--accent)] rounded-3xl p-14 grid lg:grid-cols-2 gap-8 items-center relative overflow-hidden">
              <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white opacity-5" />
              <div><h2 className="font-display font-black text-white mb-3" style={{fontSize:'clamp(28px,4vw,44px)',letterSpacing:'-0.025em',lineHeight:1.1}}>Ready to get started?</h2><p className="text-white/65 text-base">Join 50,000+ people already using GigHub</p></div>
              <div className="flex flex-wrap gap-4 lg:justify-end">
                <Link href="/hire"><button className="px-8 py-4 rounded-2xl bg-white text-[var(--accent)] font-bold text-sm hover:-translate-y-0.5 transition-smooth shadow-medium">Post a job</button></Link>
                <Link href="/find-jobs"><button className="px-8 py-4 rounded-2xl bg-transparent text-white border-2 border-white/40 font-semibold text-sm hover:border-white hover:bg-white/10 transition-smooth">Find work</button></Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[var(--ink)] text-white py-16">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-12 border-b border-white/8">
            <div className="col-span-2 md:col-span-1"><div className="font-display font-black text-xl mb-4">Gig<span className="text-[#7ee8a2]">Hub</span></div><p className="text-sm text-white/40 leading-relaxed">Platform for gig work across India, Canada, Dubai & USA.</p></div>
            {[{h:'For businesses',links:['Post a job','Browse freelancers','Hire drivers','Pricing']},{h:'For workers',links:['Find freelance work','Find gig jobs','Find driving jobs','Create profile']},{h:'Company',links:['About','Contact','Blog','Agency portal']}].map(col => (
              <div key={col.h}><div className="text-xs font-bold tracking-widest uppercase text-white/30 mb-4">{col.h}</div>{col.links.map(l => <div key={l} className="text-sm text-white/50 mb-2.5 hover:text-white cursor-pointer transition-smooth">{l}</div>)}</div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 text-xs text-white/25">
            <div>© 2025 GigHub. All rights reserved.</div>
            <div className="flex gap-6">{['Privacy','Terms','Cookies'].map(l => <span key={l} className="hover:text-white/60 cursor-pointer transition-smooth">{l}</span>)}</div>
          </div>
        </div>
      </footer>
    </>
  )
}
