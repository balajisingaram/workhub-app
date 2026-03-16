'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { MOCK_FREELANCERS, CATEGORIES, WEIGHT_TIERS } from '@/lib/data'
import { cn } from '@/lib/utils'

// ── REVEAL HOOK ───────────────────────────────────────────────────────────────
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

// ── STAR RATING ───────────────────────────────────────────────────────────────
function Stars({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' }) {
  return (
    <span className={cn('stars', size === 'sm' ? 'text-sm' : 'text-base')}>
      {'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}
    </span>
  )
}

// ── HERO ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="min-h-screen flex items-center pt-20 pb-12 relative overflow-hidden bg-[var(--bg)]">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 900px 600px at 70% 40%,rgba(26,107,60,.06) 0%,transparent 60%),radial-gradient(ellipse 600px 400px at 20% 80%,rgba(92,68,194,.05) 0%,transparent 60%)' }} />

      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center py-12">

          {/* Left copy */}
          <div className="animate-float-up">
            <div className="inline-flex items-center gap-2 bg-[var(--accent-light)] text-[var(--accent)] border border-[rgba(26,107,60,.2)] rounded-full px-4 py-2 text-xs font-bold tracking-widest uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse-dot" />
              Trusted by 50,000+ clients worldwide
            </div>
            <h1 className="font-display font-black display-xl text-[var(--ink)] mb-6">
              Hire the<br />
              <em className="text-[var(--accent)] not-italic">best talent</em><br />
              for any job
            </h1>
            <p className="text-lg text-[var(--ink3)] leading-relaxed max-w-[520px] mb-10">
              Freelancers for remote work, onsite staff for field operations, and enterprise staffing — all in one platform.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <Link href="/register">
                <button className="px-8 py-4 rounded-2xl bg-[var(--ink)] text-white text-base font-semibold hover:bg-[var(--accent)] hover:-translate-y-0.5 transition-smooth shadow-medium">
                  Start hiring today →
                </button>
              </Link>
              <Link href="/register?role=worker">
                <button className="px-8 py-4 rounded-2xl bg-transparent text-[var(--ink)] border-2 border-[var(--border)] text-base font-semibold hover:border-[var(--ink3)] hover:bg-[var(--surface)] hover:-translate-y-0.5 transition-smooth">
                  Find work
                </button>
              </Link>
            </div>
            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              {[
                { val: '50K+',  lbl: 'Active freelancers' },
                { val: '12K+',  lbl: 'Onsite workers' },
                { val: '4.9★',  lbl: 'Average rating' },
                { val: '98%',   lbl: 'Satisfaction rate' },
              ].map(s => (
                <div key={s.lbl}>
                  <div className="font-display font-black text-2xl tracking-tight text-[var(--ink)]">{s.val}</div>
                  <div className="text-xs text-[var(--ink3)] font-medium mt-0.5">{s.lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right visual */}
          <div className="relative hidden lg:block animate-float-up delay-200">
            {/* Main profile card */}
            <div className="bg-[var(--surface)] rounded-3xl p-7 shadow-large border border-[var(--border2)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[var(--bg2)] flex items-center justify-center text-2xl">👩‍💻</div>
                <div className="flex-1">
                  <div className="font-semibold text-[var(--ink)]">Sarah Johnson</div>
                  <div className="text-xs text-[var(--ink3)]">UI/UX Designer · New York</div>
                </div>
                <div className="text-right">
                  <div className="stars text-sm">★★★★★</div>
                  <div className="text-xs text-[var(--ink3)]">4.9 (128)</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {['Figma', 'Adobe XD', 'Prototyping', 'User Research'].map(s => (
                  <span key={s} className="px-3 py-1 bg-[var(--bg)] rounded-full text-xs font-medium text-[var(--ink2)] border border-[var(--border2)]">{s}</span>
                ))}
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-[var(--border2)]">
                <div>
                  <div className="font-display font-bold text-xl text-[var(--accent)]">$65<span className="text-sm font-sans font-normal text-[var(--ink3)]">/hr</span></div>
                  <div className="text-xs text-[var(--ink3)]">94 jobs completed</div>
                </div>
                <Link href="/freelancers/fl-001">
                  <button className="px-5 py-2 bg-[var(--ink)] text-white text-sm font-semibold rounded-full hover:bg-[var(--accent)] transition-smooth">Hire Now</button>
                </Link>
              </div>
            </div>
            {/* Float 1 — nearby workers */}
            <div className="absolute -bottom-6 -left-8 bg-[var(--surface)] rounded-2xl px-4 py-3 shadow-medium border border-[var(--border2)] animate-float-up delay-300">
              <div className="flex items-center gap-3">
                <div className="flex">
                  {['👷','🔧','🚛'].map((e,i) => (
                    <div key={i} className={cn('w-9 h-9 rounded-full bg-[var(--bg2)] border-2 border-white flex items-center justify-center text-base', i > 0 && '-ml-2')}>{e}</div>
                  ))}
                </div>
                <div>
                  <div className="text-xs font-semibold text-[var(--ink)]">24 workers available</div>
                  <div className="text-[11px] text-[var(--ink3)]">Within 15km radius</div>
                </div>
              </div>
            </div>
            {/* Float 2 — payment released */}
            <div className="absolute -top-5 -right-7 bg-[var(--surface)] rounded-2xl px-4 py-3 shadow-medium border border-[var(--border2)] animate-float-up delay-400">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">✅</span>
                <div>
                  <div className="text-xs font-semibold text-[var(--ink)]">Job completed</div>
                  <div className="text-xs text-[var(--accent)] font-medium">Funds released → $840</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── SEARCH ───────────────────────────────────────────────────────────────────
function SearchSection() {
  const [query, setQuery] = useState('')
  const popular = ['Web Development', 'UI/UX Design', 'Logo Design', 'Delivery Driver', 'General Labour', 'Content Writing']

  return (
    <div className="pb-20">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border2)] shadow-medium p-2 pl-6 flex items-center gap-3 max-w-2xl mx-auto">
          <span className="text-lg">🔍</span>
          <input value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search skills, jobs or services…"
            className="flex-1 bg-transparent text-[var(--ink)] text-base outline-none placeholder:text-[var(--ink4)]" />
          <select className="hidden sm:block text-sm text-[var(--ink2)] bg-[var(--bg)] px-3 py-2.5 rounded-xl border-none outline-none cursor-pointer">
            <option>All categories</option>
            <option>Design</option>
            <option>Development</option>
            <option>Onsite Workers</option>
            <option>Marketing</option>
          </select>
          <Link href={`/search?q=${encodeURIComponent(query)}`}>
            <button className="px-6 py-3 bg-[var(--ink)] text-white text-sm font-semibold rounded-xl hover:bg-[var(--accent)] transition-smooth whitespace-nowrap">
              Search
            </button>
          </Link>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
          <span className="text-xs text-[var(--ink3)] font-medium">Popular:</span>
          {popular.map(t => (
            <Link key={t} href={`/search?q=${encodeURIComponent(t)}`}>
              <span className="px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--ink2)] hover:border-[var(--ink3)] hover:bg-[var(--bg2)] cursor-pointer transition-smooth">
                {t}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── CATEGORIES ────────────────────────────────────────────────────────────────
function CategoriesSection() {
  return (
    <section className="py-0 pb-24">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-14 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--accent-light)] text-[var(--accent)] text-xs font-bold tracking-widest uppercase mb-4">Browse by category</span>
          <h2 className="font-display font-black display-sm text-[var(--ink)]">Find the right expertise</h2>
          <p className="text-base text-[var(--ink3)] mt-3 max-w-md mx-auto">From remote freelancers to field workers — every skill category covered</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat, i) => (
            <Link key={cat.name} href={cat.href}>
              <div className={cn('reveal group bg-[var(--surface)] rounded-2xl p-7 border border-[var(--border2)] cursor-pointer hover:-translate-y-1 hover:shadow-medium hover:border-[var(--border)] transition-smooth relative overflow-hidden',
                `reveal-delay-${(i % 4) + 1}`)}>
                <div className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[var(--bg)] border border-[var(--border2)] flex items-center justify-center text-[var(--ink3)] text-sm group-hover:bg-[var(--ink)] group-hover:text-white group-hover:rotate-[-45deg] transition-smooth">→</div>
                <div className="text-3xl mb-4">{cat.icon}</div>
                <div className="font-semibold text-[var(--ink)] mb-1">{cat.name}</div>
                <div className="text-sm text-[var(--ink3)]">{cat.count}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── FREELANCERS ───────────────────────────────────────────────────────────────
function FreelancersSection() {
  return (
    <section className="py-24 bg-[var(--surface2)]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-14 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--purpleL,#edeafa)] text-[var(--purple,#5c44c2)] text-xs font-bold tracking-widest uppercase mb-4">Top rated freelancers</span>
          <h2 className="font-display font-black display-sm text-[var(--ink)]">
            Hire the <em className="text-[var(--accent)] not-italic">best talent</em>
          </h2>
          <p className="text-base text-[var(--ink3)] mt-3 max-w-md mx-auto">Verified professionals with proven track records and real client reviews</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {MOCK_FREELANCERS.slice(0, 8).map((fl, i) => (
            <Link key={fl.id} href={`/freelancers/${fl.id}`}>
              <div className={cn('reveal bg-[var(--surface)] rounded-2xl p-6 border border-[var(--border2)] hover:-translate-y-1 hover:shadow-medium transition-smooth cursor-pointer group relative',
                `reveal-delay-${(i % 4) + 1}`)}>
                {/* Save btn */}
                <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[var(--bg)] border border-[var(--border2)] flex items-center justify-center text-sm text-[var(--ink4)] hover:text-[#c94040] hover:border-[#c94040] transition-smooth z-10"
                  onClick={e => e.preventDefault()}>♡</button>

                {/* Avatar */}
                <div className="w-16 h-16 rounded-full bg-[var(--bg2)] flex items-center justify-center text-3xl mb-4 relative">
                  {fl.name.split(' ').map(n=>n[0]).join('')}
                  {fl.isOnline && <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[var(--accent)] border-2 border-white" />}
                </div>

                <div className="font-semibold text-sm text-[var(--ink)] mb-0.5">{fl.name}</div>
                <div className="text-xs text-[var(--ink3)] mb-3">{fl.title}</div>

                {/* Rating */}
                <div className="flex items-center gap-1.5 mb-3">
                  <Stars rating={fl.rating} />
                  <span className="text-xs font-semibold text-[var(--ink)]">{fl.rating}</span>
                  <span className="text-xs text-[var(--ink3)]">({fl.reviewCount})</span>
                </div>

                {/* Skill tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {fl.skills.slice(0, 3).map(s => (
                    <span key={s} className="px-2 py-0.5 bg-[var(--bg)] rounded text-[11px] font-medium text-[var(--ink2)]">{s}</span>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-[var(--border2)]">
                  <div className="font-display font-bold text-lg text-[var(--ink)]">
                    ${fl.hourlyRateMin}<span className="font-sans text-xs font-normal text-[var(--ink3)]">/hr</span>
                  </div>
                  <span className="px-3 py-1.5 bg-[var(--ink)] text-white text-xs font-semibold rounded-full group-hover:bg-[var(--accent)] transition-smooth">View Profile</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/freelancers">
            <button className="px-8 py-3 rounded-full border border-[var(--border)] text-sm font-medium text-[var(--ink2)] hover:border-[var(--ink3)] hover:bg-[var(--surface)] transition-smooth">
              View all freelancers →
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

// ── ONSITE WORKERS ────────────────────────────────────────────────────────────
function OnsiteSection() {
  return (
    <section className="py-24 px-6 lg:px-12">
      <div className="max-w-[1280px] mx-auto">
        <div className="bg-[var(--ink)] rounded-4xl overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Left */}
            <div className="p-16 lg:p-20">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[rgba(26,107,60,.25)] text-[#7ee8a2] text-xs font-bold tracking-widest uppercase mb-6">Onsite workers</span>
              <h2 className="font-display font-black display-md text-white mb-5">
                Field staff,<br /><em className="text-[var(--accent2)] not-italic">on demand</em>
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-10 max-w-[380px]">
                GPS-matched drivers, movers, and labour workers. Anonymous until you pay — then full profile revealed. Check-in verified on arrival.
              </p>
              <div className="flex flex-col gap-3 mb-10">
                {[
                  { icon: '📍', text: 'GPS radius matching — only nearby verified workers' },
                  { icon: '🔒', text: 'Photo hidden until payment confirmed' },
                  { icon: '✅', text: 'QR or GPS check-in on arrival' },
                  { icon: '⭐', text: '4 weight capacity tiers with transparent pricing' },
                ].map(f => (
                  <div key={f.text} className="flex items-center gap-3 text-white/70 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-base shrink-0">{f.icon}</div>
                    {f.text}
                  </div>
                ))}
              </div>
              <Link href="/onsite">
                <button className="px-8 py-4 rounded-2xl bg-[var(--accent2)] text-white font-semibold hover:-translate-y-0.5 hover:bg-[var(--accent)] transition-smooth shadow-medium">
                  Browse onsite workers →
                </button>
              </Link>
            </div>

            {/* Right — tier cards */}
            <div className="p-12 bg-white/[.04] flex items-center justify-center">
              <div className="w-full max-w-[420px]">
                <div className="text-[11px] font-bold tracking-widest uppercase text-white/30 mb-4">Weight capacity tiers</div>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {WEIGHT_TIERS.map(t => (
                    <div key={t.tier} className="rounded-2xl p-4 border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-smooth cursor-pointer">
                      <div className="text-2xl mb-2.5">{t.icon}</div>
                      <div className="font-semibold text-sm text-white mb-0.5">{t.label}</div>
                      <div className="text-[11px] text-white/40 mb-2">{t.range}</div>
                      <div className="font-display font-bold text-xl" style={{ color: t.color }}>${t.ratePerHour}/hr</div>
                    </div>
                  ))}
                </div>
                <div className="bg-white/6 rounded-2xl p-4">
                  <div className="text-xs text-white/40 mb-3">Nearby workers right now</div>
                  <div className="flex items-center gap-3">
                    <div className="flex">
                      {['👷','🚛','🔧','👷'].map((e,i) => (
                        <div key={i} className={cn('w-9 h-9 rounded-full bg-white/10 border-2 border-[var(--ink)] flex items-center justify-center text-base',i>0&&'-ml-2')}>{e}</div>
                      ))}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">18 workers available</div>
                      <div className="text-xs text-white/40">Within 20km · Verified</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── HOW IT WORKS ──────────────────────────────────────────────────────────────
function HowItWorksSection() {
  const [activeTab, setActiveTab] = useState<'client'|'freelancer'|'worker'|'agency'>('client')

  const data = {
    client:     [{ n:1,icon:'📝',t:'Post your job',d:'Describe what you need, set budget and timeline. Takes under 5 min.' },{ n:2,icon:'🔍',t:'Review proposals',d:'Browse profiles, portfolios and ratings. Schedule a Zoom interview.' },{ n:3,icon:'💬',t:'Hire & collaborate',d:'Pay securely via escrow. Real-time chat, file sharing, milestones.' },{ n:4,icon:'✅',t:'Approve & pay',d:'Release funds when happy. Rate your freelancer to help the community.' }],
    freelancer: [{ n:1,icon:'👤',t:'Create your profile',d:'Upload photo, add skills, set rate and portfolio. Indexed for search.' },{ n:2,icon:'🔔',t:'Get job alerts',d:'Receive real-time notifications for jobs matching your skills.' },{ n:3,icon:'💼',t:'Submit proposals',d:'Send personalised cover letters with your approach and rate.' },{ n:4,icon:'💸',t:'Get paid on time',d:'Escrow releases automatically when client approves your work.' }],
    worker:     [{ n:1,icon:'📋',t:'Register & pick tier',d:'Choose weight capacity tier. Upload ID for admin verification.' },{ n:2,icon:'📍',t:'Set your radius',d:'Set km availability and working hours. GPS saved for matching.' },{ n:3,icon:'📲',t:'Receive job alerts',d:'Get notified when nearby jobs match your tier and availability.' },{ n:4,icon:'🏁',t:'Check in & earn',d:'GPS or QR check-in on arrival. Payment auto-released on job done.' }],
    agency:     [{ n:1,icon:'🏢',t:'Set up white-label',d:'Configure domain, logo, colours and company email for total branding.' },{ n:2,icon:'📊',t:'Upload employees',d:'Bulk CSV/Excel upload. Automated branded emails sent instantly.' },{ n:3,icon:'📅',t:'Manage shifts',d:'Create shifts, assign staff, track GPS attendance, generate payslips.' },{ n:4,icon:'💰',t:'Auto billing',d:'Monthly invoices auto-generated with your branding and sent to clients.' }],
  }

  const tabs = [
    { id: 'client', label: "I'm a Client" },
    { id: 'freelancer', label: "I'm a Freelancer" },
    { id: 'worker', label: "I'm an Onsite Worker" },
    { id: 'agency', label: "I'm an Agency" },
  ]

  return (
    <section className="py-24 bg-[var(--bg2)]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-14 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--blueL,#e5f0fa)] text-[var(--blue,#1a5a8a)] text-xs font-bold tracking-widest uppercase mb-4">How it works</span>
          <h2 className="font-display font-black display-sm text-[var(--ink)]">
            Simple steps to <em className="text-[var(--accent)] not-italic">get started</em>
          </h2>
        </div>
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-14">
          {tabs.map(t => (
            <button key={t.id}
              onClick={() => setActiveTab(t.id as typeof activeTab)}
              className={cn('px-5 py-2.5 rounded-full border text-sm font-medium transition-smooth',
                activeTab === t.id
                  ? 'bg-[var(--ink)] text-white border-[var(--ink)]'
                  : 'bg-[var(--surface)] text-[var(--ink3)] border-[var(--border)] hover:border-[var(--ink3)] hover:text-[var(--ink)]')}>
              {t.label}
            </button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data[activeTab].map((step, i) => (
            <div key={step.n} className="text-center p-8 relative">
              <div className="w-13 h-13 rounded-full bg-[var(--surface)] border-2 border-[var(--border)] flex items-center justify-center font-display font-bold text-xl text-[var(--ink)] mx-auto mb-5 w-12 h-12">
                {step.n}
              </div>
              {i < 3 && <div className="hidden lg:block absolute top-[52px] left-[calc(50%+32px)] right-0 h-0.5 bg-[var(--border2)]" />}
              <div className="text-4xl mb-4">{step.icon}</div>
              <div className="font-semibold text-[var(--ink)] mb-2">{step.t}</div>
              <div className="text-sm text-[var(--ink3)] leading-relaxed">{step.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── ENTERPRISE ────────────────────────────────────────────────────────────────
function EnterpriseSection() {
  return (
    <section className="py-24 bg-[var(--surface)]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--amberL,#fdf0e0)] text-[var(--amber,#c2620a)] text-xs font-bold tracking-widest uppercase mb-5">For enterprises &amp; agencies</span>
            <h2 className="font-display font-black display-sm text-[var(--ink)] mb-5">
              Your brand,<br /><em className="text-[var(--accent)] not-italic">your portal</em>
            </h2>
            <p className="text-base text-[var(--ink3)] leading-relaxed mb-10 max-w-[440px]">
              Full white-label staffing portal. Upload employees in bulk, manage shifts, track attendance — all under your company name. Employees never see our platform.
            </p>
            <div className="flex flex-col gap-4">
              {[
                { icon: '📊', bg: 'bg-[#fdf0e0]', title: 'Bulk employee upload', desc: 'CSV or Excel upload. Automated branded verification emails sent from your domain. Processes thousands instantly.' },
                { icon: '🏷️', bg: 'bg-[var(--accent-light)]', title: 'Complete white-label branding', desc: 'Custom domain, your logo, your colours, your email. Employees see "Acme HR" — never our platform name.' },
                { icon: '📅', bg: 'bg-[var(--blueL,#e5f0fa)]', title: 'Shift management & attendance', desc: 'Assign shifts, GPS clock-in, attendance reports, payslip generation, leave management — all integrated.' },
                { icon: '🎥', bg: 'bg-[var(--purpleL,#edeafa)]', title: 'Meeting integrations', desc: 'Zoom, Google Meet, MS Teams — all meeting links sent under your company name.' },
              ].map(f => (
                <div key={f.title} className="reveal flex gap-4 items-start p-5 bg-[var(--surface)] rounded-2xl border border-[var(--border2)] hover:translate-x-1 hover:border-[var(--border)] transition-smooth">
                  <div className={cn('w-11 h-11 rounded-xl shrink-0 flex items-center justify-center text-xl', f.bg)}>{f.icon}</div>
                  <div>
                    <div className="font-semibold text-sm text-[var(--ink)] mb-1">{f.title}</div>
                    <div className="text-xs text-[var(--ink3)] leading-relaxed">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/enterprise">
              <button className="mt-8 px-8 py-3.5 rounded-full bg-[var(--ink)] text-white font-semibold text-sm hover:bg-[var(--accent)] hover:-translate-y-px transition-smooth shadow-soft">
                Talk to enterprise sales →
              </button>
            </Link>
          </div>

          {/* Right — agency dashboard mockup */}
          <div className="reveal reveal-delay-2">
            <div className="bg-[var(--ink)] rounded-3xl p-7 shadow-large relative overflow-hidden">
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[var(--accent)] opacity-[.07]" />
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-[var(--accent)] flex items-center justify-center text-white font-bold text-sm">A</div>
                <div>
                  <div className="text-sm font-semibold text-white">Acme Corp</div>
                  <div className="text-[11px] text-white/40">portal.acmecorp.com</div>
                </div>
                <div className="ml-auto font-mono text-[10px] text-white/20">WHITE-LABEL</div>
              </div>
              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[{v:'248',l:'Total employees'},{v:'42',l:'On shift today'},{v:'96%',l:'Attendance rate'}].map(s=>(
                  <div key={s.l} className="bg-white/7 rounded-xl p-3">
                    <div className="font-display font-bold text-xl text-white">{s.v}</div>
                    <div className="text-[10px] text-white/40 mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
              {/* Employee list */}
              <div className="text-[11px] font-bold tracking-widest uppercase text-white/25 mb-3">Recent employees</div>
              <div className="flex flex-col gap-2">
                {[
                  { emoji:'👷', name:'Ravi Kumar',    role:'Heavy duty worker', status:'active',  label:'On shift' },
                  { emoji:'🚛', name:'Priya Sharma',  role:'Driver',            status:'active',  label:'Active' },
                  { emoji:'🔧', name:'Arjun Mehta',   role:'General labour',    status:'pending', label:'Pending' },
                ].map(e => (
                  <div key={e.name} className="flex items-center gap-3 bg-white/6 rounded-xl px-3 py-2.5">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm shrink-0">{e.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-white">{e.name}</div>
                      <div className="text-[11px] text-white/40">{e.role}</div>
                    </div>
                    <span className={cn('text-[10px] font-bold px-2 py-1 rounded-full',
                      e.status === 'active' ? 'bg-[rgba(26,107,60,.3)] text-[#7ee8a2]' : 'bg-[rgba(194,98,10,.3)] text-[#ffc07a]')}>
                      {e.label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between bg-white/5 rounded-xl p-3">
                <div>
                  <div className="text-[11px] text-white/40">Next invoice</div>
                  <div className="font-display font-bold text-lg text-white">₹1,24,800</div>
                </div>
                <div className="text-[11px] px-3 py-1.5 bg-[rgba(26,107,60,.25)] text-[#7ee8a2] rounded-full font-bold">Auto billing</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── TESTIMONIALS ──────────────────────────────────────────────────────────────
function TestimonialsSection() {
  const tests = [
    { stars:5, text:'Found an amazing UI/UX designer within hours. The escrow payment system gave me total confidence.', name:'Michael Torres', role:'Startup founder, SF', emoji:'👨‍💼', badge:'Client', badgeClass:'bg-[var(--accent-light)] text-[var(--accent)]' },
    { stars:5, text:"I've doubled my monthly income since joining WorkHub. Clean platform, serious clients, on-time payouts.", name:'Anita Rajan', role:'Full-stack developer, Bangalore', emoji:'👩‍💻', badge:'Freelancer', badgeClass:'bg-[var(--purpleL,#edeafa)] text-[var(--purple,#5c44c2)]' },
    { stars:5, text:'The enterprise portal is exactly what we needed. Our 200 employees only see our company branding.', name:'Raj Construction Ltd', role:'HR Director, Chennai', emoji:'🏢', badge:'Enterprise', badgeClass:'bg-[var(--amberL,#fdf0e0)] text-[var(--amber,#c2620a)]' },
  ]

  return (
    <section className="py-24 bg-[var(--bg2)]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-14 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--accent-light)] text-[var(--accent)] text-xs font-bold tracking-widest uppercase mb-4">What people say</span>
          <h2 className="font-display font-black display-sm text-[var(--ink)]">
            Trusted by <em className="text-[var(--accent)] not-italic">thousands</em>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tests.map((t,i) => (
            <div key={t.name} className={cn('reveal bg-[var(--surface)] rounded-2xl p-7 border border-[var(--border2)] flex flex-col gap-5', `reveal-delay-${i+1}`)}>
              <div className="stars text-sm">{'★'.repeat(t.stars)}</div>
              <p className="text-sm leading-relaxed text-[var(--ink2)] italic flex-1">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--bg2)] flex items-center justify-center text-lg">{t.emoji}</div>
                <div>
                  <div className="font-semibold text-sm text-[var(--ink)]">{t.name}</div>
                  <div className="text-xs text-[var(--ink3)]">{t.role}</div>
                  <span className={cn('inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full', t.badgeClass)}>{t.badge}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── STATS ─────────────────────────────────────────────────────────────────────
function StatsSection() {
  return (
    <section className="bg-[var(--ink)] py-0">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {[
            { val:'50K+', accent:'50K', rest:'+',  lbl:'Registered freelancers' },
            { val:'120K', accent:'120', rest:'K',  lbl:'Jobs completed' },
            { val:'$8M+', accent:'$8', rest:'M+', lbl:'Paid to talent' },
            { val:'4.9',  accent:'4.',  rest:'9',  lbl:'Average platform rating' },
          ].map((s,i) => (
            <div key={s.lbl} className={cn('py-14 px-8 text-center reveal', i < 3 && 'border-r border-white/8', `reveal-delay-${i+1}`)}>
              <div className="font-display font-black text-5xl lg:text-6xl tracking-tight text-white mb-2">
                {s.accent}<span className="text-[var(--accent2)]">{s.rest}</span>
              </div>
              <div className="text-sm text-white/40">{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── PRICING ───────────────────────────────────────────────────────────────────
function PricingSection() {
  const plans = [
    {
      tag:'Starter', tagClass:'bg-[var(--accent-light)] text-[var(--accent)]',
      name:'Free to post', price:'$0', period:'/mo',
      desc:'For clients posting jobs and freelancers finding work',
      features:['Post unlimited jobs','Browse all freelancers','10% platform fee on hire','Escrow payment protection','Basic messaging'],
      btnClass:'bg-[var(--ink)] text-white hover:bg-[var(--accent)]',
      featured:false,
    },
    {
      tag:'Most popular', tagClass:'bg-white/15 text-white/90',
      name:'Business', price:'$49', period:'/mo',
      desc:'For growing teams that hire regularly',
      features:['6% platform fee (reduced)','Priority candidate matching','Zoom/Meet interview booking','Advanced analytics','Onsite worker access'],
      btnClass:'bg-transparent text-white/80 border-2 border-white/20 hover:bg-white/10',
      featured:true,
    },
    {
      tag:'Enterprise', tagClass:'bg-[#fdf0e0] text-[#c2620a]',
      name:'Agency portal', price:'$199', period:'/mo',
      desc:'Full white-label portal for staffing agencies',
      features:['White-label portal & domain','Bulk employee upload','Branded email (your domain)','Shift management & payroll','Custom contract rates'],
      btnClass:'bg-[var(--ink)] text-white hover:bg-[var(--accent)]',
      featured:false,
    },
  ]

  return (
    <section id="pricing" className="py-24 bg-[var(--surface2)]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-14 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#fdf0e0] text-[#c2620a] text-xs font-bold tracking-widest uppercase mb-4">Transparent pricing</span>
          <h2 className="font-display font-black display-sm text-[var(--ink)]">
            Simple, honest <em className="text-[var(--accent)] not-italic">pricing</em>
          </h2>
          <p className="text-base text-[var(--ink3)] mt-3 max-w-md mx-auto">No hidden fees. You only pay when you hire.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <div key={plan.name} className={cn('reveal rounded-2xl p-8 border transition-smooth hover:-translate-y-1', `reveal-delay-${i+1}`,
              plan.featured
                ? 'bg-[var(--ink)] border-[var(--ink)] text-white'
                : 'bg-[var(--surface)] border-[var(--border2)] hover:shadow-medium')}>
              <span className={cn('inline-block px-3 py-1 rounded-full text-[11px] font-bold mb-4', plan.tagClass)}>{plan.tag}</span>
              <div className={cn('font-display font-bold text-xl mb-2', plan.featured ? 'text-white' : 'text-[var(--ink)]')}>{plan.name}</div>
              <div className={cn('font-display font-black text-5xl tracking-tight mb-1', plan.featured ? 'text-white' : 'text-[var(--ink)]')}>
                <sup className="text-xl align-top mt-3 font-sans font-normal">{plan.price.startsWith('$') ? '$' : ''}</sup>
                {plan.price.replace('$', '')}
                <span className="text-sm font-sans font-normal">{plan.period}</span>
              </div>
              <p className={cn('text-sm mb-6', plan.featured ? 'text-white/50' : 'text-[var(--ink3)]')}>{plan.desc}</p>
              <div className="flex flex-col gap-2.5 mb-7">
                {plan.features.map(f => (
                  <div key={f} className="flex items-center gap-2.5 text-sm">
                    <div className={cn('w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0',
                      plan.featured ? 'bg-[rgba(26,107,60,.3)] text-[#7ee8a2]' : 'bg-[var(--accent-light)] text-[var(--accent)]')}>✓</div>
                    <span className={plan.featured ? 'text-white/80' : 'text-[var(--ink2)]'}>{f}</span>
                  </div>
                ))}
              </div>
              <Link href="/register">
                <button className={cn('w-full py-3.5 rounded-full text-sm font-semibold transition-smooth border border-transparent', plan.btnClass)}>
                  {plan.name === 'Agency portal' ? 'Contact sales' : 'Get started'}
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── CTA BANNER ────────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="py-24 pb-32">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="reveal bg-[var(--accent)] rounded-4xl p-16 lg:p-20 grid lg:grid-cols-2 gap-10 items-center relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/8" />
          <div className="absolute left-[40%] -bottom-16 w-52 h-52 rounded-full bg-white/5" />
          <div className="relative z-10">
            <h2 className="font-display font-black text-[clamp(32px,5vw,52px)] tracking-tight text-white mb-3">
              Ready to get started?
            </h2>
            <p className="text-base text-white/70">Join 50,000+ clients and freelancers already using WorkHub</p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-end relative z-10">
            <Link href="/register">
              <button className="px-8 py-4 rounded-2xl bg-white text-[var(--accent)] font-bold text-sm hover:-translate-y-0.5 transition-smooth shadow-medium">
                Start hiring today
              </button>
            </Link>
            <Link href="/register?role=worker">
              <button className="px-8 py-4 rounded-2xl bg-transparent text-white border-2 border-white/40 font-semibold text-sm hover:border-white hover:bg-white/10 transition-smooth">
                Find work
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── PAGE ──────────────────────────────────────────────────────────────────────
export default function HomePage() {
  useReveal()

  return (
    <>
      <Navbar transparent />
      <main>
        <HeroSection />
        <SearchSection />
        <CategoriesSection />
        <FreelancersSection />
        <OnsiteSection />
        <HowItWorksSection />
        <EnterpriseSection />
        <TestimonialsSection />
        <StatsSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
