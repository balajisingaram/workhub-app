'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useLocation } from '@/context/LocationContext'
import { cn } from '@/lib/utils'

const PLANS = [
  {
    id:'free', tag:'Free forever', tagStyle:'bg-[#e8f5ee] text-[#1a6b3c]',
    name:'Starter', monthly:0, annual:0,
    desc:'For clients posting their first job or freelancers just starting out.',
    highlight:false, cta:'Get started free', href:'/register',
    features:[
      {t:'Post up to 3 jobs/month',ok:true},{t:'Browse all freelancers',ok:true},
      {t:'10% platform fee',ok:true},{t:'Escrow payment protection',ok:true},
      {t:'Basic messaging',ok:true},{t:'Priority matching',ok:false},
      {t:'Interview booking',ok:false},{t:'Gig worker & driver access',ok:false},
      {t:'Analytics',ok:false},
    ],
  },
  {
    id:'pro', tag:'Most popular', tagStyle:'bg-white/15 text-white',
    name:'Business', monthly:49, annual:39,
    desc:'For growing teams that hire regularly and need advanced tools.',
    highlight:true, cta:'Start 14-day free trial', href:'/register?plan=pro',
    features:[
      {t:'Unlimited job posts',ok:true},{t:'Browse all freelancers',ok:true},
      {t:'6% platform fee (reduced)',ok:true},{t:'Escrow payment protection',ok:true},
      {t:'Advanced messaging + files',ok:true},{t:'Priority matching',ok:true},
      {t:'Interview booking (Zoom/Meet)',ok:true},{t:'Gig worker & driver access',ok:true},
      {t:'Analytics dashboard',ok:true},
    ],
  },
  {
    id:'ent', tag:'Teams & staffing', tagStyle:'bg-[#fdf0e0] text-[#c2620a]',
    name:'Business Plus', monthly:199, annual:159,
    desc:'Full workforce management for staffing operations and large teams.',
    highlight:false, cta:'Talk to sales', href:'/contact',
    features:[
      {t:'Everything in Business',ok:true},{t:'Bulk employee management',ok:true},
      {t:'Shift scheduling & GPS clock-in',ok:true},{t:'Payslip & invoice generation',ok:true},
      {t:'Custom platform rates',ok:true},{t:'Dedicated account manager',ok:true},
      {t:'SLA + priority support',ok:true},{t:'Custom domain staff portal',ok:true},
      {t:'White-label branding',ok:true},
    ],
  },
]

export default function PricingPage() {
  const { country } = useLocation()
  const [annual, setAnnual] = useState(false)
  const [openFaq, setOpenFaq] = useState<number|null>(null)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center nav-blur border-b border-[var(--border2)]">
        <div className="max-w-[1100px] mx-auto px-5 lg:px-10 w-full flex items-center gap-3">
          <Link href="/" className="font-display font-black text-[20px] tracking-tight text-[var(--ink)]">Gig<span className="text-[var(--accent)]">Hub</span></Link>
          <div className="flex-1" />
          <Link href="/register"><button className="px-4 py-2 rounded-full bg-[var(--ink)] text-white text-sm font-semibold hover:bg-[var(--accent)] transition-smooth">Get started</button></Link>
        </div>
      </nav>

      <main className="pt-16 bg-[#f5f3ee] min-h-screen">
        <section className="pt-16 sm:pt-20 pb-10 text-center px-5">
          <h1 className="font-display font-black text-[var(--ink)] mb-3" style={{fontSize:'clamp(32px,6vw,60px)',letterSpacing:'-0.03em'}}>Simple, honest pricing</h1>
          <p className="text-[var(--ink3)] text-base sm:text-lg max-w-md mx-auto mb-8">No hidden fees. Only pay when you hire. Prices shown in {country.currencyCode}.</p>
          <div className="inline-flex items-center gap-3 bg-white border border-[var(--border2)] rounded-full p-1.5">
            <button onClick={() => setAnnual(false)} className={cn('px-5 py-2 rounded-full text-sm font-semibold transition-smooth',!annual?'bg-[var(--ink)] text-white':'text-[var(--ink3)]')}>Monthly</button>
            <button onClick={() => setAnnual(true)} className={cn('px-5 py-2 rounded-full text-sm font-semibold transition-smooth flex items-center gap-2',annual?'bg-[var(--ink)] text-white':'text-[var(--ink3)]')}>
              Annual <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full',annual?'bg-[#1a6b3c] text-white':'bg-[#e8f5ee] text-[#1a6b3c]')}>Save 20%</span>
            </button>
          </div>
        </section>

        <section className="pb-16 sm:pb-20 px-5">
          <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-5">
            {PLANS.map(plan => (
              <div key={plan.id} className={cn('rounded-2xl sm:rounded-3xl border p-6 sm:p-8 flex flex-col transition-smooth hover:-translate-y-1',
                plan.highlight?'bg-[var(--ink)] border-[var(--ink)] shadow-[0_16px_48px_rgba(20,18,14,.2)]':'bg-white border-[rgba(20,18,14,.08)] hover:shadow-[0_8px_32px_rgba(20,18,14,.08)]')}>
                <span className={cn('inline-block text-[11px] font-bold px-3 py-1 rounded-full mb-4',plan.tagStyle)}>{plan.tag}</span>
                <div className={cn('font-display font-bold text-lg mb-2',plan.highlight?'text-white':'text-[var(--ink)]')}>{plan.name}</div>
                <div className="flex items-end gap-1 mb-2">
                  <span className={cn('font-display font-black tracking-tight',plan.highlight?'text-white':'text-[var(--ink)]')} style={{fontSize:'clamp(28px,4vw,44px)',lineHeight:1}}>
                    {plan.monthly===0?'Free':`$${annual?plan.annual:plan.monthly}`}
                  </span>
                  {plan.monthly>0 && <span className={cn('text-sm mb-1',plan.highlight?'text-white/50':'text-[var(--ink3)]')}>/mo</span>}
                </div>
                <p className={cn('text-xs sm:text-sm leading-relaxed mb-5',plan.highlight?'text-white/55':'text-[var(--ink3)]')}>{plan.desc}</p>
                <div className="flex flex-col gap-2.5 mb-6 flex-1">
                  {plan.features.map(f => (
                    <div key={f.t} className="flex items-center gap-2.5 text-xs sm:text-sm">
                      <div className={cn('w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 font-bold',
                        f.ok?plan.highlight?'bg-[rgba(26,107,60,.3)] text-[#7ee8a2]':'bg-[#e8f5ee] text-[#1a6b3c]':plan.highlight?'bg-white/8 text-white/25':'bg-[#f5f3ee] text-[#b0a99e]')}>
                        {f.ok?'✓':'×'}
                      </div>
                      <span className={cn(f.ok?plan.highlight?'text-white/80':'text-[#3a3630]':plan.highlight?'text-white/25':'text-[#b0a99e]')}>{f.t}</span>
                    </div>
                  ))}
                </div>
                <Link href={plan.href}><button className={cn('w-full py-3 rounded-full text-sm font-bold transition-smooth',plan.highlight?'bg-[#1a6b3c] text-white hover:bg-[#2d9c5e]':'bg-[var(--ink)] text-white hover:bg-[#1a6b3c]')}>{plan.cta}</button></Link>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 bg-[var(--ink)]">
          <div className="max-w-[1100px] mx-auto px-5 lg:px-10">
            <div className="text-center mb-10"><h2 className="font-display font-black text-white mb-2" style={{fontSize:'clamp(22px,4vw,38px)',letterSpacing:'-0.025em'}}>Gig worker rates</h2><p className="text-white/50 text-sm">Pay only for hours worked — 8% platform fee applies</p></div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[{icon:'🌿',name:'Light',range:'Up to 25 kg',rate:12,color:'#27ae60',bg:'rgba(39,174,96,.15)'},{icon:'💪',name:'Medium',range:'26–60 kg',rate:18,color:'#2980b9',bg:'rgba(41,128,185,.15)'},{icon:'🔩',name:'Heavy',range:'61–120 kg',rate:26,color:'#e67e22',bg:'rgba(230,126,34,.15)'},{icon:'🏗️',name:'Extreme',range:'120 kg +',rate:40,color:'#c94040',bg:'rgba(201,64,64,.15)'}].map(t => (
                <div key={t.name} className="rounded-2xl p-4 sm:p-6 border border-white/10" style={{background:t.bg}}>
                  <div className="text-2xl sm:text-3xl mb-3">{t.icon}</div>
                  <div className="font-semibold text-sm sm:text-base text-white mb-0.5">{t.name}</div>
                  <div className="text-xs text-white/40 mb-2">{t.range}</div>
                  <div className="font-display font-black text-xl sm:text-2xl" style={{color:t.color}}>${t.rate}<span className="text-xs font-sans font-normal text-white/40">/hr</span></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-[700px] mx-auto px-5">
            <h2 className="font-display font-black text-[var(--ink)] mb-8 text-center" style={{fontSize:'clamp(22px,4vw,36px)',letterSpacing:'-0.02em'}}>Common questions</h2>
            <div className="flex flex-col gap-3">
              {[
                {q:'What is the platform fee?',a:'On the free Starter plan, a 10% fee is deducted from the freelancer\'s payout on every completed job. Business plan reduces this to 6%.'},
                {q:'Is there a free trial?',a:'Yes — the Business plan includes a 14-day free trial, no credit card required.'},
                {q:'Can I cancel anytime?',a:'Yes, cancel from your dashboard at any time. Access continues until end of billing period.'},
                {q:'How does escrow work?',a:'Payment is authorized but not charged when you hire. Funds are only captured when you approve the work. Full refund if unsatisfied.'},
              ].map((f,i) => (
                <div key={i} className="border border-[var(--border2)] rounded-2xl overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq===i?null:i)} className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-[var(--bg)] transition-smooth">
                    <span className="font-semibold text-sm text-[var(--ink)]">{f.q}</span>
                    <span className={cn('text-[var(--ink3)] transition-transform shrink-0',openFaq===i&&'rotate-180')}>▾</span>
                  </button>
                  {openFaq===i && <div className="px-5 pb-5 text-sm text-[var(--ink3)] leading-relaxed border-t border-[var(--border2)] pt-4">{f.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
