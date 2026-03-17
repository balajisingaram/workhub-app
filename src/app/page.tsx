'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useLocation, CountrySelector } from '@/context/LocationContext'
import { MOCK_FREELANCERS } from '@/lib/data'

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')), { threshold: 0.08 })
    document.querySelectorAll('.reveal').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <nav className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-16 flex items-center',
      scrolled ? 'nav-blur border-b border-[var(--border2)] shadow-soft' : 'bg-transparent')}>
      <div className="max-w-[1280px] mx-auto px-5 lg:px-10 w-full flex items-center gap-3">
        <Link href="/" className="font-display font-black text-[22px] tracking-tight text-white drop-shadow-sm" style={{textShadow:scrolled?'none':'0 1px 4px rgba(0,0,0,.4)'}}>
          Gig<span className="text-[#7ee8a2]">Hub</span>
        </Link>
        <div className="flex-1" />
        <div className="hidden md:flex items-center gap-1">
          <CountrySelector />
          {[{href:'/hire',label:'Hire talent'},{href:'/find-jobs',label:'Find work'},{href:'/how-it-works',label:'How it works'},{href:'/pricing',label:'Pricing'}].map(l => (
            <Link key={l.href} href={l.href} className={cn('text-sm font-medium px-3 py-2 rounded-full transition-smooth',
              scrolled ? 'text-[var(--ink3)] hover:text-[var(--ink)] hover:bg-[var(--bg2)]' : 'text-white/80 hover:text-white hover:bg-white/10')}>
              {l.label}
            </Link>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-2 ml-1">
          <Link href="/login"><button className={cn('px-4 py-2 rounded-full border text-sm font-medium transition-smooth',
            scrolled ? 'border-[var(--border)] text-[var(--ink2)] hover:bg-[var(--bg2)]' : 'border-white/30 text-white hover:bg-white/10')}>Log in</button></Link>
          <Link href="/register"><button className="px-4 py-2 rounded-full bg-[var(--accent)] text-white text-sm font-semibold hover:bg-[#2d9c5e] transition-smooth">Sign up</button></Link>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className={cn('md:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-smooth', scrolled ? 'bg-[var(--bg2)]' : 'bg-white/15')}>
          <span className={scrolled ? 'text-[var(--ink)]' : 'text-white'}>{menuOpen ? '✕' : '☰'}</span>
        </button>
      </div>
      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-[var(--border2)] px-5 py-4 flex flex-col gap-1 md:hidden shadow-medium">
          <div className="pb-2 mb-2 border-b border-[var(--border2)]"><CountrySelector /></div>
          {[{href:'/hire',label:'Hire talent'},{href:'/find-jobs',label:'Find work'},{href:'/how-it-works',label:'How it works'},{href:'/pricing',label:'Pricing'}].map(l => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="px-3 py-2.5 rounded-xl text-sm font-medium text-[var(--ink2)] hover:bg-[var(--bg2)] transition-smooth">{l.label}</Link>
          ))}
          <div className="flex gap-2 mt-2 pt-2 border-t border-[var(--border2)]">
            <Link href="/login" className="flex-1"><button className="w-full py-2.5 rounded-full border border-[var(--border)] text-sm font-medium text-[var(--ink2)]">Log in</button></Link>
            <Link href="/register" className="flex-1"><button className="w-full py-2.5 rounded-full bg-[var(--accent)] text-white text-sm font-semibold">Sign up</button></Link>
          </div>
        </div>
      )}
    </nav>
  )
}

function HireModal({ fl, onClose }: { fl: any; onClose: () => void }) {
  const { convertPrice } = useLocation()
  const [budget, setBudget] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  if (sent) return (
    <div className="modal-backdrop fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="bg-white rounded-3xl p-10 w-full max-w-sm text-center shadow-large animate-scale-in">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="font-display font-black text-xl text-[var(--ink)] mb-2">Request sent!</h2>
        <p className="text-sm text-[var(--ink3)] mb-6">Your hire request has been sent to {fl.name}. They usually respond within {fl.responseTime}.</p>
        <button onClick={onClose} className="w-full py-3 rounded-full bg-[var(--ink)] text-white text-sm font-semibold hover:bg-[var(--accent)] transition-smooth">Done</button>
      </div>
    </div>
  )
  return (
    <div className="modal-backdrop fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="bg-white rounded-3xl p-7 w-full max-w-md shadow-large animate-scale-in relative">
        <button onClick={onClose} className="absolute right-4 top-4 w-8 h-8 rounded-full bg-[var(--bg)] flex items-center justify-center text-sm text-[var(--ink3)] hover:bg-[var(--bg3)] transition-smooth">✕</button>
        <div className="flex items-center gap-3 mb-5">
          <img src={fl.avatarUrl} alt={fl.name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-soft"
            onError={e => { (e.target as any).src = `https://ui-avatars.com/api/?name=${fl.name}&background=ece9e3&color=7a756c&size=48` }} />
          <div><div className="font-semibold text-[var(--ink)]">{fl.name}</div><div className="text-xs text-[var(--ink3)]">{fl.title}</div></div>
        </div>
        <h2 className="font-display font-bold text-xl text-[var(--ink)] mb-5 tracking-tight">Hire {fl.name.split(' ')[0]}</h2>
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
            <span className="text-base">🔒</span>
            <div className="text-xs text-[var(--accent)] leading-relaxed"><strong>Escrow protected.</strong> Payment held securely — released only when you approve the work.</div>
          </div>
          <button onClick={() => { if (budget && message) setSent(true) }}
            className="w-full py-3.5 rounded-full bg-[var(--ink)] text-white font-semibold text-sm hover:bg-[var(--accent)] transition-smooth">
            Send hire request →
          </button>
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  useReveal()
  const { country, convertPrice } = useLocation()
  const [howTab, setHowTab] = useState<'hire'|'work'>('hire')
  const [hireTarget, setHireTarget] = useState<any>(null)
  const isFullService = country.hasGigWorkers
  const hireSteps = [
    {icon:'📝',t:'Post a job',d:'Describe what you need — remote project, gig task or driver. Set your budget.'},
    {icon:'👥',t:'Review applicants',d:'Browse verified profiles, ratings and reviews.'},
    {icon:'🔒',t:'Pay securely',d:'Funds held in escrow — released only when you approve.'},
    {icon:'⭐',t:'Rate & repeat',d:'Leave a review and build your trusted network.'},
  ]
  const workSteps = [
    {icon:'👤',t:'Create profile',d:'Add your skills, rate, availability and location.'},
    {icon:'🔔',t:'Get job alerts',d:'Instant notifications when matching jobs are posted.'},
    {icon:'💬',t:'Apply and chat',d:'Send a proposal, message the client and get started.'},
    {icon:'💸',t:'Get paid',d:'Payment released to your wallet on approval.'},
  ]

  return (
    <>
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Full screen background */}
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80&auto=format&fit=crop"
            alt="hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{background:'linear-gradient(135deg, rgba(20,18,14,.82) 0%, rgba(26,107,60,.6) 60%, rgba(20,18,14,.75) 100%)'}} />
        </div>

        <div className="relative z-10 max-w-[1100px] mx-auto px-5 lg:px-10 w-full pt-20 pb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-[rgba(255,255,255,.12)] backdrop-blur-sm text-white border border-white/20 rounded-full px-4 py-1.5 text-xs font-bold tracking-widest uppercase mb-7 animate-float-up">
            <span className="w-2 h-2 rounded-full bg-[#7ee8a2] animate-pulse-dot" />{country.flag} Now live in {country.name}
          </div>
          <h1 className="font-display font-black text-white animate-float-up delay-100 mb-5 drop-shadow-lg"
            style={{fontSize:'clamp(40px,7vw,88px)',letterSpacing:'-0.04em',lineHeight:1.0}}>
            Work your way.<br /><em className="text-[#7ee8a2] not-italic">Hire smarter.</em>
          </h1>
          <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-10 animate-float-up delay-200">
            {isFullService ? 'Freelancers for remote work, gig workers for onsite tasks, and drivers — all verified.' : 'Top freelancers for remote projects — design, development, marketing, writing and more.'}
          </p>

          {/* Two portal cards */}
          <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto animate-float-up delay-300 mb-10">
            <Link href="/hire">
              <div className="group bg-[var(--ink)]/90 backdrop-blur-sm rounded-2xl p-6 text-left cursor-pointer hover:-translate-y-1 hover:shadow-large transition-smooth relative overflow-hidden border border-white/10">
                <div className="text-3xl mb-4">💼</div>
                <div className="font-display font-black text-xl text-white tracking-tight mb-1.5">Hire Gig Work</div>
                <p className="text-white/50 text-xs leading-relaxed mb-4">{isFullService ? 'Post jobs — freelancers, gig workers, drivers.' : 'Post projects, hire top freelancers.'}</p>
                <div className="flex items-center gap-2 text-[#7ee8a2] font-semibold text-sm group-hover:gap-3 transition-smooth">Start hiring <span>→</span></div>
              </div>
            </Link>
            <Link href="/find-jobs">
              <div className="group bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-left cursor-pointer hover:-translate-y-1 hover:shadow-large border border-white/20 transition-smooth relative overflow-hidden">
                <div className="text-3xl mb-4">🔍</div>
                <div className="font-display font-black text-xl text-[var(--ink)] tracking-tight mb-1.5">Find Jobs</div>
                <p className="text-[var(--ink3)] text-xs leading-relaxed mb-4">{isFullService ? 'Freelance, gig work & driving jobs near you.' : 'Browse thousands of freelance projects.'}</p>
                <div className="flex items-center gap-2 text-[var(--accent)] font-semibold text-sm group-hover:gap-3 transition-smooth">Browse jobs <span>→</span></div>
              </div>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12 animate-float-up delay-400">
            {[{val:'50K+',lbl:'Active workers'},{val:'12K+',lbl:'Jobs posted'},{val:'4.9★',lbl:'Avg. rating'},{val:'98%',lbl:'Satisfaction'}].map(s => (
              <div key={s.lbl} className="text-center">
                <div className="font-display font-black text-xl sm:text-2xl text-white tracking-tight">{s.val}</div>
                <div className="text-xs text-white/50 mt-0.5">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-9 rounded-full border-2 border-white/30 flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-white/60" />
          </div>
        </div>
      </section>

      {/* ── FEATURED FREELANCERS ── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-[1100px] mx-auto px-5 lg:px-10">
          <div className="flex items-end justify-between mb-10 reveal">
            <div>
              <h2 className="font-display font-black text-[var(--ink)] tracking-tight" style={{fontSize:'clamp(22px,4vw,38px)',letterSpacing:'-0.025em'}}>Top rated freelancers</h2>
              <p className="text-[var(--ink3)] text-sm mt-1">Verified professionals ready to work</p>
            </div>
            <Link href="/hire" className="text-sm font-medium text-[var(--accent)] hover:underline hidden sm:block">View all →</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {MOCK_FREELANCERS.slice(0,8).map((fl,i) => (
              <div key={fl.id} className={cn('reveal bg-[var(--bg)] rounded-2xl border border-[var(--border2)] p-4 sm:p-5 transition-smooth cursor-pointer group flex flex-col',`reveal-delay-${(i%4)+1}`)}>
                <div className="relative mb-3">
                  <img src={fl.avatarUrl} alt={fl.name} className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-white shadow-soft"
                    onError={e => { (e.target as any).src = `https://ui-avatars.com/api/?name=${fl.name}&background=ece9e3&color=7a756c&size=64` }} />
                  {fl.isOnline && <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[var(--accent)] border-2 border-white" />}
                  {fl.isTopRated && <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#f5a623] flex items-center justify-center text-[10px]">⭐</div>}
                </div>
                <div className="font-semibold text-sm text-[var(--ink)] group-hover:text-[var(--accent)] transition-smooth leading-tight">{fl.name}</div>
                <div className="text-xs text-[var(--ink3)] mb-2 line-clamp-1">{fl.title}</div>
                <div className="flex items-center gap-1 mb-2">
                  <span className="stars text-xs">{'★'.repeat(Math.floor(fl.rating))}</span>
                  <span className="text-xs font-semibold text-[var(--ink)]">{fl.rating}</span>
                  <span className="text-xs text-[var(--ink3)] hidden sm:inline">({fl.reviewCount})</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-3 flex-1">
                  {fl.skills.slice(0,2).map(s => <span key={s} className="px-2 py-0.5 bg-white rounded text-[10px] sm:text-[11px] font-medium text-[var(--ink2)] border border-[var(--border2)]">{s}</span>)}
                </div>
                <div className="flex items-center justify-between pt-2.5 border-t border-[var(--border2)]">
                  <div className="font-display font-bold text-sm sm:text-base text-[var(--ink)]">{convertPrice(fl.hourlyRateMin)}<span className="font-sans text-[10px] sm:text-xs font-normal text-[var(--ink3)]">/hr</span></div>
                  <button onClick={() => setHireTarget(fl)}
                    className="px-2.5 sm:px-3 py-1.5 bg-[var(--ink)] text-white text-[10px] sm:text-xs font-semibold rounded-full group-hover:bg-[var(--accent)] transition-smooth">
                    Hire
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORKER TYPES ── */}
      <section className="py-20 sm:py-24 bg-[var(--bg)]">
        <div className="max-w-[1100px] mx-auto px-5 lg:px-10">
          <div className="text-center mb-12 reveal">
            <h2 className="font-display font-black text-[var(--ink)] mb-3" style={{fontSize:'clamp(24px,4vw,44px)',letterSpacing:'-0.025em'}}>
              Every type of work, <em className="text-[var(--accent)] not-italic">covered</em>
            </h2>
            {!isFullService && <div className="inline-flex items-center gap-2 bg-[#fdf0e0] text-[#c2620a] rounded-full px-4 py-1.5 text-xs font-medium mt-2">{country.flag} Gig workers & drivers launching in {country.name} soon</div>}
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {icon:'💻',title:'Freelancers',desc:'Remote professionals for design, development, marketing and writing.',tags:['Web dev','UI/UX','Marketing','Writing'],href:'/find-jobs',color:'#5c44c2',bg:'#edeafa',ok:true},
              {icon:'🔧',title:'Gig Workers',desc:'Verified onsite workers for moving, labour and field tasks.',tags:['Moving','Warehouse','Labour','Install'],href:'/find-jobs?type=gigs',color:'#1a6b3c',bg:'#e8f5ee',ok:isFullService},
              {icon:'🚗',title:'Drivers',desc:'Licensed drivers for delivery, logistics and transport.',tags:['Delivery','Logistics','Cab','Long distance'],href:'/find-jobs?type=drivers',color:'#1a5a8a',bg:'#e5f0fa',ok:country.hasDrivers},
            ].map((t,i) => (
              <Link key={t.title} href={t.ok ? t.href : '#'}>
                <div className={cn('reveal bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[var(--border2)] h-full flex flex-col transition-smooth',`reveal-delay-${i+1}`,
                  t.ok ? 'cursor-pointer hover:-translate-y-1 hover:shadow-medium group' : 'opacity-50 cursor-not-allowed')}>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-xl sm:text-2xl mb-4 sm:mb-5 flex-shrink-0" style={{background:t.bg}}>{t.icon}</div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="font-display font-bold text-lg sm:text-xl text-[var(--ink)] tracking-tight">{t.title}</div>
                    {!t.ok && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#fdf0e0] text-[#c2620a]">Soon</span>}
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--ink3)] leading-relaxed mb-4 sm:mb-5 flex-1">{t.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4 sm:mb-6">
                    {t.tags.map(tag => <span key={tag} className="px-2 sm:px-2.5 py-1 rounded-full text-[11px] font-medium border border-[var(--border2)] text-[var(--ink2)]" style={{background:t.bg+'80'}}>{tag}</span>)}
                  </div>
                  {t.ok && <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-smooth" style={{color:t.color}}>Browse {t.title.toLowerCase()} <span>→</span></div>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 sm:py-24 bg-[var(--bg2)]">
        <div className="max-w-[1100px] mx-auto px-5 lg:px-10">
          <div className="text-center mb-10 reveal">
            <h2 className="font-display font-black text-[var(--ink)] mb-2" style={{fontSize:'clamp(24px,4vw,44px)',letterSpacing:'-0.025em'}}>How it works</h2>
            <Link href="/how-it-works" className="text-sm text-[var(--accent)] hover:underline">See detailed guide →</Link>
          </div>
          <div className="flex justify-center mb-10">
            <div className="flex bg-white border border-[var(--border2)] rounded-full p-1">
              {(['hire','work'] as const).map(t => <button key={t} onClick={() => setHowTab(t)}
                className={cn('px-6 sm:px-8 py-2 sm:py-2.5 rounded-full text-sm font-semibold transition-smooth',howTab===t?'bg-[var(--ink)] text-white':'text-[var(--ink3)] hover:text-[var(--ink)]')}>
                {t==='hire'?'💼 I want to hire':'🔍 I want to work'}
              </button>)}
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {(howTab==='hire'?hireSteps:workSteps).map((s,i) => (
              <div key={s.t} className={cn('reveal text-center p-4 sm:p-6',`reveal-delay-${i+1}`)}>
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white border border-[var(--border2)] flex items-center justify-center text-xl sm:text-2xl mx-auto mb-3 sm:mb-4">{s.icon}</div>
                <div className="font-semibold text-[var(--ink)] mb-1 sm:mb-2 text-sm sm:text-base">{s.t}</div>
                <p className="text-xs sm:text-sm text-[var(--ink3)] leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-[1100px] mx-auto px-5 lg:px-10">
          <div className="text-center mb-12 reveal">
            <h2 className="font-display font-black text-[var(--ink)] mb-2" style={{fontSize:'clamp(24px,4vw,44px)',letterSpacing:'-0.025em'}}>Trusted by thousands</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-5">
            {[
              {stars:5,text:'Found the perfect React developer in 2 hours. Payment was secure and quality was excellent.',name:'Arun Sharma',role:'Startup founder, Bangalore',emoji:'💼',badge:'Hired a freelancer'},
              {stars:5,text:"I've earned more in 3 months on GigHub than all last year. The job alerts are spot on.",name:'Meena Rajan',role:'UI/UX designer, Chennai',emoji:'💻',badge:'Freelancer'},
              {stars:5,text:'Our 200 field workers use the portal daily. GPS check-in saves hours of manual tracking.',name:'Kumar Logistics',role:'Operations director, Mumbai',emoji:'🏢',badge:'Business client'},
            ].map((t,i) => (
              <div key={t.name} className={cn('reveal bg-[var(--bg)] rounded-2xl p-5 sm:p-7 border border-[var(--border2)]',`reveal-delay-${i+1}`)}>
                <div className="stars text-sm mb-3 sm:mb-4">{'★'.repeat(t.stars)}</div>
                <p className="text-xs sm:text-sm leading-relaxed text-[var(--ink2)] italic mb-4 sm:mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[var(--bg2)] flex items-center justify-center text-base sm:text-lg">{t.emoji}</div>
                  <div>
                    <div className="font-semibold text-sm text-[var(--ink)]">{t.name}</div>
                    <div className="text-xs text-[var(--ink3)]">{t.role}</div>
                    <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--accent-light)] text-[var(--accent)]">{t.badge}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 sm:py-20 bg-[var(--bg)]">
        <div className="max-w-[1100px] mx-auto px-5 lg:px-10">
          <div className="reveal bg-[var(--accent)] rounded-2xl sm:rounded-3xl p-10 sm:p-14 grid sm:grid-cols-2 gap-6 sm:gap-8 items-center relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white opacity-5" />
            <div>
              <h2 className="font-display font-black text-white mb-2 sm:mb-3" style={{fontSize:'clamp(24px,4vw,42px)',letterSpacing:'-0.025em',lineHeight:1.1}}>Ready to get started?</h2>
              <p className="text-white/65 text-sm sm:text-base">Join 50,000+ people already using GigHub</p>
            </div>
            <div className="flex flex-wrap gap-3 sm:justify-end">
              <Link href="/hire"><button className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white text-[var(--accent)] font-bold text-sm hover:-translate-y-0.5 transition-smooth shadow-medium">Post a job</button></Link>
              <Link href="/find-jobs"><button className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-transparent text-white border-2 border-white/40 font-semibold text-sm hover:border-white hover:bg-white/10 transition-smooth">Find work</button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[var(--ink)] text-white py-12 sm:py-16">
        <div className="max-w-[1100px] mx-auto px-5 lg:px-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-white/8">
            <div className="col-span-2 sm:col-span-1">
              <div className="font-display font-black text-xl mb-3 sm:mb-4">Gig<span className="text-[#7ee8a2]">Hub</span></div>
              <p className="text-xs sm:text-sm text-white/40 leading-relaxed">Platform for gig work across India, Canada, Dubai & USA.</p>
            </div>
            {[
              {h:'For businesses',links:[{l:'Post a job',h:'/hire'},{l:'Browse freelancers',h:'/hire'},{l:'Hire drivers',h:'/hire'},{l:'Pricing',h:'/pricing'}]},
              {h:'For workers',links:[{l:'Find freelance work',h:'/find-jobs'},{l:'Find gig jobs',h:'/find-jobs?type=gigs'},{l:'Find driving jobs',h:'/find-jobs?type=drivers'},{l:'Create profile',h:'/register'}]},
              {h:'Company',links:[{l:'About us',h:'/about'},{l:'How it works',h:'/how-it-works'},{l:'Contact',h:'/contact'},{l:'Pricing',h:'/pricing'}]},
            ].map(col => (
              <div key={col.h}>
                <div className="text-xs font-bold tracking-widest uppercase text-white/30 mb-3 sm:mb-4">{col.h}</div>
                {col.links.map(l => <Link key={l.l} href={l.h}><div className="text-xs sm:text-sm text-white/50 mb-2 sm:mb-2.5 hover:text-white transition-smooth">{l.l}</div></Link>)}
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 pt-5 sm:pt-6 text-xs text-white/25">
            <div>© 2025 GigHub. All rights reserved.</div>
            <div className="flex gap-4 sm:gap-6">
              {['Privacy','Terms','Cookies'].map(l => <span key={l} className="hover:text-white/60 cursor-pointer transition-smooth">{l}</span>)}
            </div>
          </div>
        </div>
      </footer>

      {hireTarget && <HireModal fl={hireTarget} onClose={() => setHireTarget(null)} />}
    </>
  )
}
