'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-16 flex items-center',
      scrolled ? 'nav-blur border-b border-[var(--border2)] shadow-soft' : 'bg-transparent'
    )}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 w-full flex items-center gap-4">
        <Link href="/" className="font-display font-black text-[22px] tracking-tight text-[var(--ink)]">
          Gig<span className="text-[var(--accent)]">Hub</span>
        </Link>
        <div className="flex-1" />
        <Link href="/hire" className="hidden sm:block text-sm font-medium text-[var(--ink3)] hover:text-[var(--ink)] transition-smooth px-4 py-2 rounded-full hover:bg-[var(--bg2)]">
          Hire talent
        </Link>
        <Link href="/find-jobs" className="hidden sm:block text-sm font-medium text-[var(--ink3)] hover:text-[var(--ink)] transition-smooth px-4 py-2 rounded-full hover:bg-[var(--bg2)]">
          Find work
        </Link>
        <Link href="/portal/login">
          <button className="text-xs font-semibold px-4 py-2 rounded-full border border-[var(--border)] text-[var(--ink3)] hover:bg-[var(--bg2)] transition-smooth">
            Agency login
          </button>
        </Link>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16 pb-8 relative overflow-hidden bg-[var(--bg)]">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 800px 600px at 50% 40%, rgba(26,107,60,.07) 0%, transparent 70%)' }} />
      <div className="max-w-[1100px] mx-auto px-6 lg:px-12 w-full text-center">
        <div className="inline-flex items-center gap-2 bg-[var(--accent-light)] text-[var(--accent)] border border-[rgba(26,107,60,.2)] rounded-full px-4 py-1.5 text-xs font-bold tracking-widest uppercase mb-8 animate-float-up">
          <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse-dot" />
          India's fastest growing gig platform
        </div>
        <h1 className="font-display font-black text-[var(--ink)] animate-float-up delay-100 mb-6"
          style={{ fontSize: 'clamp(44px,8vw,96px)', letterSpacing: '-0.04em', lineHeight: 1.0 }}>
          Work your way.<br />
          <em className="text-[var(--accent)] not-italic">Hire smarter.</em>
        </h1>
        <p className="text-lg text-[var(--ink3)] max-w-xl mx-auto leading-relaxed mb-14 animate-float-up delay-200">
          One platform for businesses to hire freelancers, gig workers and drivers —
          and for workers to find their next job.
        </p>

        {/* Two big portal cards */}
        <div className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto animate-float-up delay-300">
          <Link href="/hire">
            <div className="group bg-[var(--ink)] rounded-3xl p-8 text-left cursor-pointer hover:-translate-y-1 hover:shadow-large transition-smooth relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--accent)] opacity-10" />
              <div className="text-4xl mb-5">💼</div>
              <div className="font-display font-black text-2xl text-white tracking-tight mb-2">Hire Gig Work</div>
              <p className="text-white/55 text-sm leading-relaxed mb-6">Post jobs and hire verified freelancers, gig workers and drivers instantly.</p>
              <div className="flex flex-col gap-2 mb-6">
                {['Freelancers for remote work', 'Gig workers for onsite tasks', 'Drivers for delivery & transport'].map(f => (
                  <div key={f} className="flex items-center gap-2 text-xs text-white/65">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#7ee8a2] flex-shrink-0" />{f}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 text-[#7ee8a2] font-semibold text-sm group-hover:gap-3 transition-smooth">
                Start hiring <span>→</span>
              </div>
            </div>
          </Link>

          <Link href="/find-jobs">
            <div className="group bg-white rounded-3xl p-8 text-left cursor-pointer hover:-translate-y-1 hover:shadow-large border border-[var(--border2)] transition-smooth relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--accent)] opacity-5" />
              <div className="text-4xl mb-5">🔍</div>
              <div className="font-display font-black text-2xl text-[var(--ink)] tracking-tight mb-2">Find Jobs</div>
              <p className="text-[var(--ink3)] text-sm leading-relaxed mb-6">Browse thousands of gig jobs, freelance projects and driving opportunities near you.</p>
              <div className="flex flex-col gap-2 mb-6">
                {['Freelance projects (remote)', 'Gig work (local, flexible)', 'Driver & delivery jobs'].map(f => (
                  <div key={f} className="flex items-center gap-2 text-xs text-[var(--ink3)]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] flex-shrink-0" />{f}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 text-[var(--accent)] font-semibold text-sm group-hover:gap-3 transition-smooth">
                Browse jobs <span>→</span>
              </div>
            </div>
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-10 mt-16 animate-float-up delay-400">
          {[{ val: '50K+', lbl: 'Active workers' }, { val: '12K+', lbl: 'Jobs posted' }, { val: '4.9★', lbl: 'Avg. rating' }, { val: '98%', lbl: 'Satisfaction' }].map(s => (
            <div key={s.lbl} className="text-center">
              <div className="font-display font-black text-2xl text-[var(--ink)] tracking-tight">{s.val}</div>
              <div className="text-xs text-[var(--ink3)] mt-0.5">{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const [active, setActive] = useState<'hire' | 'work'>('hire')
  const steps = {
    hire: [
      { icon: '📝', title: 'Post a job', desc: 'Describe what you need — remote project, gig task or driver. Set your budget.' },
      { icon: '👥', title: 'Review applicants', desc: 'Browse verified profiles, ratings and reviews. Chat before hiring.' },
      { icon: '🔒', title: 'Pay securely', desc: 'Funds held in escrow — released only when you approve the work.' },
      { icon: '⭐', title: 'Rate & repeat', desc: 'Leave a review and build your trusted network of workers.' },
    ],
    work: [
      { icon: '👤', title: 'Create profile', desc: 'Add your skills, rate, availability and location. Takes 5 minutes.' },
      { icon: '🔔', title: 'Get job alerts', desc: 'Instant notifications when matching jobs are posted near you.' },
      { icon: '💬', title: 'Apply and chat', desc: 'Send a proposal, message the client and get started.' },
      { icon: '💸', title: 'Get paid', desc: 'Payment released to your wallet as soon as the client approves.' },
    ],
  }
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-12 reveal">
          <h2 className="font-display font-black text-[var(--ink)] mb-3" style={{ fontSize: 'clamp(28px,4vw,48px)', letterSpacing: '-0.025em' }}>How it works</h2>
          <p className="text-[var(--ink3)] text-base max-w-md mx-auto">Simple steps whether you're hiring or looking for work</p>
        </div>
        <div className="flex justify-center mb-12">
          <div className="flex bg-[var(--bg)] border border-[var(--border2)] rounded-full p-1">
            {(['hire', 'work'] as const).map(t => (
              <button key={t} onClick={() => setActive(t)}
                className={cn('px-8 py-2.5 rounded-full text-sm font-semibold transition-smooth',
                  active === t ? 'bg-[var(--ink)] text-white' : 'text-[var(--ink3)] hover:text-[var(--ink)]')}>
                {t === 'hire' ? '💼 I want to hire' : '🔍 I want to work'}
              </button>
            ))}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps[active].map((s, i) => (
            <div key={s.title} className={cn('reveal text-center p-6', `reveal-delay-${i + 1}`)}>
              <div className="w-14 h-14 rounded-2xl bg-[var(--bg)] border border-[var(--border2)] flex items-center justify-center text-2xl mx-auto mb-4">{s.icon}</div>
              <div className="font-semibold text-[var(--ink)] mb-2">{s.title}</div>
              <p className="text-sm text-[var(--ink3)] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WorkerTypes() {
  const types = [
    { icon: '💻', title: 'Freelancers', desc: 'Remote professionals for design, development, marketing, writing and more.', tags: ['Web development', 'UI/UX design', 'Digital marketing', 'Content writing'], href: '/find-jobs/freelancers', color: '#5c44c2', bg: '#edeafa' },
    { icon: '🔧', title: 'Gig Workers', desc: 'Verified onsite workers for moving, labour, installation and field tasks.', tags: ['Furniture moving', 'Warehouse work', 'General labour', 'Installations'], href: '/find-jobs/gigs', color: '#1a6b3c', bg: '#e8f5ee' },
    { icon: '🚗', title: 'Drivers', desc: 'Licensed drivers for delivery, logistics, cab runs and long-distance transport.', tags: ['Package delivery', 'Logistics runs', 'Cab & pickup', 'Long distance'], href: '/find-jobs/drivers', color: '#1a5a8a', bg: '#e5f0fa' },
  ]
  return (
    <section className="py-24 bg-[var(--bg)]">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-14 reveal">
          <h2 className="font-display font-black text-[var(--ink)] mb-3" style={{ fontSize: 'clamp(28px,4vw,48px)', letterSpacing: '-0.025em' }}>
            Every type of work, <em className="text-[var(--accent)] not-italic">covered</em>
          </h2>
          <p className="text-[var(--ink3)] text-base max-w-md mx-auto">Whether you need remote talent or boots on the ground</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {types.map((t, i) => (
            <Link key={t.title} href={t.href}>
              <div className={cn('reveal bg-white rounded-3xl p-8 border border-[var(--border2)] cursor-pointer hover:-translate-y-1 hover:shadow-medium transition-smooth group h-full flex flex-col', `reveal-delay-${i + 1}`)}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 flex-shrink-0" style={{ background: t.bg }}>{t.icon}</div>
                <div className="font-display font-bold text-xl text-[var(--ink)] mb-2 tracking-tight">{t.title}</div>
                <p className="text-sm text-[var(--ink3)] leading-relaxed mb-5 flex-1">{t.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {t.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 rounded-full text-xs font-medium border border-[var(--border2)] text-[var(--ink2)]" style={{ background: t.bg + '80' }}>{tag}</span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-smooth" style={{ color: t.color }}>
                  Browse {t.title.toLowerCase()} <span>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function AgencyStrip() {
  return (
    <section className="py-20 bg-[var(--ink)]">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-[rgba(26,107,60,.25)] text-[#7ee8a2] text-xs font-bold tracking-widest uppercase mb-5">For staffing agencies & enterprises</span>
            <h2 className="font-display font-black text-white mb-4" style={{ fontSize: 'clamp(26px,4vw,44px)', letterSpacing: '-0.025em', lineHeight: 1.1 }}>
              Your own branded<br /><em className="text-[#7ee8a2] not-italic">staff portal</em>
            </h2>
            <p className="text-white/55 text-base leading-relaxed mb-8 max-w-md">A completely private portal for your company. Manage employees, shifts and attendance under your own brand — no GigHub branding shown to your staff.</p>
            <div className="flex flex-col gap-2.5 mb-8">
              {['🏷️  Your logo, domain and brand colours', '📤  Bulk upload employees via CSV', '📅  Shift management and GPS clock-in', '💰  Auto payslips and invoicing'].map(f => (
                <div key={f} className="text-sm text-white/60">{f}</div>
              ))}
            </div>
            <Link href="/portal/login">
              <button className="px-7 py-3.5 rounded-full bg-[var(--accent)] text-white font-semibold text-sm hover:bg-[var(--accent2)] hover:-translate-y-px transition-smooth">
                Access agency portal →
              </button>
            </Link>
          </div>
          <div className="bg-white/5 rounded-3xl border border-white/10 p-7">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-xl bg-[var(--accent)] flex items-center justify-center text-white font-bold text-sm">A</div>
              <div>
                <div className="text-sm font-semibold text-white">Acme Corp</div>
                <div className="text-xs text-white/40">portal.acmecorp.com</div>
              </div>
              <div className="ml-auto text-[10px] font-bold px-2 py-1 rounded-full bg-white/10 text-white/40">PRIVATE</div>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[['248', 'Employees'], ['42', 'On shift'], ['96%', 'Attendance']].map(([v, l]) => (
                <div key={l} className="bg-white/8 rounded-xl p-3">
                  <div className="font-display font-bold text-lg text-white">{v}</div>
                  <div className="text-[10px] text-white/40">{l}</div>
                </div>
              ))}
            </div>
            {[{ e: '👷', n: 'Ravi Kumar', r: 'Heavy duty', s: 'On shift', c: '#7ee8a2' }, { e: '🚛', n: 'Priya Sharma', r: 'Driver', s: 'Active', c: '#7ee8a2' }, { e: '🔧', n: 'Arjun Mehta', r: 'Gig worker', s: 'Pending', c: '#fab387' }].map(emp => (
              <div key={emp.n} className="flex items-center gap-3 bg-white/5 rounded-xl px-3 py-2.5 mb-2">
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-sm">{emp.e}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-white truncate">{emp.n}</div>
                  <div className="text-[11px] text-white/40">{emp.r}</div>
                </div>
                <div className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: emp.c + '25', color: emp.c }}>{emp.s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-14 reveal">
          <h2 className="font-display font-black text-[var(--ink)] mb-3" style={{ fontSize: 'clamp(28px,4vw,44px)', letterSpacing: '-0.025em' }}>Trusted by thousands</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { stars: 5, text: 'Found the perfect React developer in 2 hours. Payment was secure and quality was excellent.', name: 'Arun Sharma', role: 'Startup founder, Bangalore', emoji: '💼', badge: 'Hired a freelancer' },
            { stars: 5, text: "I've earned more in 3 months on GigHub than all last year. The job alerts are spot on.", name: 'Meena Rajan', role: 'UI/UX designer, Chennai', emoji: '💻', badge: 'Freelancer' },
            { stars: 5, text: 'Our 200 field workers use the portal daily. GPS check-in saves hours of manual tracking.', name: 'Kumar Logistics', role: 'Operations director, Mumbai', emoji: '🏢', badge: 'Enterprise client' },
          ].map((t, i) => (
            <div key={t.name} className={cn('reveal bg-[var(--bg)] rounded-2xl p-7 border border-[var(--border2)]', `reveal-delay-${i + 1}`)}>
              <div className="stars text-sm mb-4">{'★'.repeat(t.stars)}</div>
              <p className="text-sm leading-relaxed text-[var(--ink2)] italic mb-5">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--bg2)] flex items-center justify-center text-lg">{t.emoji}</div>
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
  )
}

function CTABanner() {
  return (
    <section className="py-20 bg-[var(--bg)]">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
        <div className="reveal bg-[var(--accent)] rounded-3xl p-14 grid lg:grid-cols-2 gap-8 items-center relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white opacity-5" />
          <div>
            <h2 className="font-display font-black text-white mb-3" style={{ fontSize: 'clamp(28px,4vw,44px)', letterSpacing: '-0.025em', lineHeight: 1.1 }}>Ready to get started?</h2>
            <p className="text-white/65 text-base">Join 50,000+ people already using GigHub</p>
          </div>
          <div className="flex flex-wrap gap-4 lg:justify-end">
            <Link href="/hire"><button className="px-8 py-4 rounded-2xl bg-white text-[var(--accent)] font-bold text-sm hover:-translate-y-0.5 transition-smooth shadow-medium">Post a job</button></Link>
            <Link href="/find-jobs"><button className="px-8 py-4 rounded-2xl bg-transparent text-white border-2 border-white/40 font-semibold text-sm hover:border-white hover:bg-white/10 transition-smooth">Find work</button></Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-white py-16">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-12 border-b border-white/8">
          <div className="col-span-2 md:col-span-1">
            <div className="font-display font-black text-xl mb-4">Gig<span className="text-[#7ee8a2]">Hub</span></div>
            <p className="text-sm text-white/40 leading-relaxed">India's platform for gig work — freelancers, workers and drivers.</p>
          </div>
          {[
            { h: 'For businesses', links: ['Post a job', 'Browse freelancers', 'Hire drivers', 'Pricing'] },
            { h: 'For workers', links: ['Find freelance work', 'Find gig jobs', 'Find driving jobs', 'Create profile'] },
            { h: 'Company', links: ['About', 'Contact', 'Blog', 'Agency portal'] },
          ].map(col => (
            <div key={col.h}>
              <div className="text-xs font-bold tracking-widest uppercase text-white/30 mb-4">{col.h}</div>
              {col.links.map(l => <div key={l} className="text-sm text-white/50 mb-2.5 hover:text-white cursor-pointer transition-smooth">{l}</div>)}
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 text-xs text-white/25">
          <div>© 2025 GigHub. All rights reserved.</div>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Cookies'].map(l => <span key={l} className="hover:text-white/60 cursor-pointer transition-smooth">{l}</span>)}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function HomePage() {
  useReveal()
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <WorkerTypes />
        <AgencyStrip />
        <Testimonials />
        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
