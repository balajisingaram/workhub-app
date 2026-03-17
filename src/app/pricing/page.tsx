'use client'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { cn } from '@/lib/utils'

const PLANS = [
  {
    id: 'free',
    tag: 'Free forever',
    tagStyle: 'bg-[#e8f5ee] text-[#1a6b3c]',
    name: 'Starter',
    monthly: 0,
    annual: 0,
    desc: 'Perfect for clients posting their first job or freelancers just getting started.',
    highlight: false,
    cta: 'Get started free',
    ctaHref: '/register',
    features: [
      { text: 'Post up to 3 jobs/month', included: true },
      { text: 'Browse all freelancers', included: true },
      { text: '10% platform fee on hire', included: true },
      { text: 'Escrow payment protection', included: true },
      { text: 'Basic in-app messaging', included: true },
      { text: 'Standard search ranking', included: true },
      { text: 'Priority matching', included: false },
      { text: 'Zoom/Meet interview booking', included: false },
      { text: 'Onsite worker access', included: false },
      { text: 'Analytics dashboard', included: false },
    ],
  },
  {
    id: 'pro',
    tag: 'Most popular',
    tagStyle: 'bg-[#14120e] text-white',
    name: 'Business',
    monthly: 49,
    annual: 39,
    desc: 'For growing teams that hire regularly and need advanced tools.',
    highlight: true,
    cta: 'Start 14-day free trial',
    ctaHref: '/register?plan=pro',
    features: [
      { text: 'Unlimited job posts', included: true },
      { text: 'Browse all freelancers', included: true },
      { text: '6% platform fee (reduced)', included: true },
      { text: 'Escrow payment protection', included: true },
      { text: 'Advanced messaging + file share', included: true },
      { text: 'Boosted search ranking', included: true },
      { text: 'Priority candidate matching', included: true },
      { text: 'Zoom/Meet/Teams interview booking', included: true },
      { text: 'Onsite worker access', included: true },
      { text: 'Analytics dashboard', included: true },
    ],
  },
  {
    id: 'enterprise',
    tag: 'Agency & staffing',
    tagStyle: 'bg-[#fdf0e0] text-[#c2620a]',
    name: 'Enterprise',
    monthly: 199,
    annual: 159,
    desc: 'Full white-label staffing portal for agencies managing their own workforce.',
    highlight: false,
    cta: 'Talk to sales',
    ctaHref: '/contact?plan=enterprise',
    features: [
      { text: 'Everything in Business', included: true },
      { text: 'White-label portal + custom domain', included: true },
      { text: 'Bulk CSV/Excel employee upload', included: true },
      { text: 'Branded email (your domain)', included: true },
      { text: 'Shift management + GPS clock-in', included: true },
      { text: 'Payslip + invoice generation', included: true },
      { text: 'Zoom/Meet/Teams under your name', included: true },
      { text: 'Custom contract platform rates', included: true },
      { text: 'Dedicated account manager', included: true },
      { text: 'SLA + priority support', included: true },
    ],
  },
]

const FAQS = [
  { q: 'Is there a free trial?', a: 'Yes — the Business plan comes with a 14-day free trial, no credit card required. You get full access to all features.' },
  { q: 'How does escrow work?', a: 'When you hire a freelancer, your payment is authorized but not charged. Funds are only captured when you approve the delivered work. If you\'re not satisfied, you can raise a dispute and our team will review.' },
  { q: 'What is the platform fee?', a: 'On the free Starter plan, a 10% fee is deducted from the freelancer\'s payout on every completed job. Business plan reduces this to 6%. Enterprise clients have custom rates negotiated per contract.' },
  { q: 'Can I cancel anytime?', a: 'Yes, you can cancel your subscription at any time from your dashboard. You\'ll keep access until the end of your billing period.' },
  { q: 'How does white-labelling work?', a: 'Enterprise clients get a fully branded portal at their own domain (e.g. portal.yourcompany.com). All emails, meeting links, and documents are sent under your company name. Employees never see WorkHub branding.' },
  { q: 'Do you support Indian payment methods?', a: 'Yes — we integrate with Razorpay for UPI, NEFT, wallets, and all major Indian bank cards, alongside Stripe for international cards.' },
  { q: 'How is onsite worker pricing calculated?', a: 'Onsite workers are priced by weight tier: Light ($12/hr), Medium ($18/hr), Heavy ($26/hr), Extreme ($40/hr). You only pay for hours worked, confirmed by GPS check-in.' },
  { q: 'Is my data secure?', a: 'All data is encrypted at rest and in transit. We use AWS S3 for secure file storage, and all ID documents are processed via Onfido\'s ISO-certified KYC pipeline.' },
]

export default function PricingPage() {
  const [annual, setAnnual] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Navbar />
      <main className="pt-16 bg-[#f5f3ee] min-h-screen">

        {/* Hero */}
        <section className="pt-20 pb-16 text-center px-6">
          <div className="inline-flex items-center gap-2 bg-[#e8f5ee] text-[#1a6b3c] border border-[rgba(26,107,60,.2)] rounded-full px-4 py-1.5 text-xs font-bold tracking-widest uppercase mb-6">
            Transparent pricing
          </div>
          <h1 className="font-display font-black text-[#14120e] mb-4" style={{fontSize:'clamp(36px,6vw,68px)',letterSpacing:'-0.03em',lineHeight:'1.05'}}>
            Simple, honest pricing
          </h1>
          <p className="text-[#7a756c] text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            No hidden fees. You only pay when you hire. Platform fee deducted automatically on payout.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-4 bg-white border border-[rgba(20,18,14,.08)] rounded-full p-1.5 px-2">
            <button onClick={() => setAnnual(false)}
              className={cn('px-5 py-2 rounded-full text-sm font-semibold transition-all', !annual ? 'bg-[#14120e] text-white' : 'text-[#7a756c] hover:text-[#14120e]')}>
              Monthly
            </button>
            <button onClick={() => setAnnual(true)}
              className={cn('px-5 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2', annual ? 'bg-[#14120e] text-white' : 'text-[#7a756c] hover:text-[#14120e]')}>
              Annual
              <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full transition-all', annual ? 'bg-[#1a6b3c] text-white' : 'bg-[#e8f5ee] text-[#1a6b3c]')}>Save 20%</span>
            </button>
          </div>
        </section>

        {/* Plans */}
        <section className="pb-24 px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            {PLANS.map((plan) => (
              <div key={plan.id}
                className={cn(
                  'rounded-3xl border p-8 flex flex-col transition-all hover:-translate-y-1',
                  plan.highlight
                    ? 'bg-[#14120e] border-[#14120e] shadow-[0_24px_60px_rgba(20,18,14,.25)]'
                    : 'bg-white border-[rgba(20,18,14,.08)] hover:shadow-[0_8px_40px_rgba(20,18,14,.1)]'
                )}>
                <div>
                  <span className={cn('inline-block text-[11px] font-bold px-3 py-1 rounded-full mb-5', plan.tagStyle)}>{plan.tag}</span>
                  <div className={cn('font-display font-bold text-xl mb-2', plan.highlight ? 'text-white' : 'text-[#14120e]')}>{plan.name}</div>
                  <div className="flex items-end gap-1 mb-2">
                    <span className={cn('font-display font-black tracking-tight', plan.highlight ? 'text-white' : 'text-[#14120e]')}
                      style={{fontSize:'clamp(36px,5vw,52px)',lineHeight:1}}>
                      {plan.monthly === 0 ? 'Free' : `$${annual ? plan.annual : plan.monthly}`}
                    </span>
                    {plan.monthly > 0 && (
                      <span className={cn('text-sm mb-2', plan.highlight ? 'text-white/50' : 'text-[#7a756c]')}>/mo</span>
                    )}
                  </div>
                  {plan.monthly > 0 && annual && (
                    <div className={cn('text-xs mb-1', plan.highlight ? 'text-white/40' : 'text-[#7a756c]')}>
                      Billed annually · Save ${(plan.monthly - plan.annual) * 12}/yr
                    </div>
                  )}
                  <p className={cn('text-sm leading-relaxed mb-8', plan.highlight ? 'text-white/55' : 'text-[#7a756c]')}>{plan.desc}</p>
                </div>

                <div className="flex flex-col gap-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <div key={f.text} className="flex items-center gap-3 text-sm">
                      <div className={cn('w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 font-bold',
                        f.included
                          ? plan.highlight ? 'bg-[rgba(26,107,60,.3)] text-[#7ee8a2]' : 'bg-[#e8f5ee] text-[#1a6b3c]'
                          : plan.highlight ? 'bg-white/8 text-white/25' : 'bg-[#f5f3ee] text-[#b0a99e]')}>
                        {f.included ? '✓' : '×'}
                      </div>
                      <span className={cn(
                        f.included
                          ? plan.highlight ? 'text-white/80' : 'text-[#3a3630]'
                          : plan.highlight ? 'text-white/25' : 'text-[#b0a99e]'
                      )}>{f.text}</span>
                    </div>
                  ))}
                </div>

                <Link href={plan.ctaHref}>
                  <button className={cn(
                    'w-full py-3.5 rounded-full text-sm font-bold transition-all border',
                    plan.highlight
                      ? 'bg-[#1a6b3c] text-white border-[#1a6b3c] hover:bg-[#2d9c5e]'
                      : plan.id === 'enterprise'
                        ? 'bg-[#14120e] text-white border-[#14120e] hover:bg-[#1a6b3c]'
                        : 'bg-[#14120e] text-white border-[#14120e] hover:bg-[#1a6b3c]'
                  )}>
                    {plan.cta}
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Feature comparison table */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-14">
              <h2 className="font-display font-black text-[#14120e] mb-3" style={{fontSize:'clamp(26px,4vw,42px)',letterSpacing:'-0.02em'}}>Full feature comparison</h2>
              <p className="text-[#7a756c]">Everything included in each plan at a glance</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-[rgba(20,18,14,.1)]">
                    <th className="text-left py-4 pr-8 text-sm font-semibold text-[#7a756c] w-1/2">Feature</th>
                    {['Starter','Business','Enterprise'].map((p,i) => (
                      <th key={p} className={cn('py-4 px-4 text-center text-sm font-bold', i===1 ? 'text-[#1a6b3c]' : 'text-[#14120e]')}>{p}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Job posts per month',      '3',     'Unlimited','Unlimited'],
                    ['Platform fee',             '10%',   '6%',       'Custom'],
                    ['Escrow protection',        '✓',     '✓',        '✓'],
                    ['In-app messaging',         'Basic', 'Advanced', 'Advanced'],
                    ['Search ranking',           'Standard','Boosted','Boosted'],
                    ['Interview booking',        '—',     '✓',        '✓'],
                    ['Onsite worker access',     '—',     '✓',        '✓'],
                    ['White-label portal',       '—',     '—',        '✓'],
                    ['Bulk employee upload',     '—',     '—',        '✓'],
                    ['Branded emails',           '—',     '—',        '✓'],
                    ['Shift management',         '—',     '—',        '✓'],
                    ['Payslip generation',       '—',     '—',        '✓'],
                    ['Analytics dashboard',      '—',     '✓',        '✓'],
                    ['Dedicated account manager','—',     '—',        '✓'],
                    ['Priority support',         'Email', 'Email+Chat','SLA 24h'],
                  ].map(([feat, ...vals], i) => (
                    <tr key={feat} className={cn('border-b border-[rgba(20,18,14,.06)]', i%2===0 ? 'bg-white' : 'bg-[#faf9f6]')}>
                      <td className="py-3.5 pr-8 text-sm text-[#3a3630]">{feat}</td>
                      {vals.map((v,vi) => (
                        <td key={vi} className={cn('py-3.5 px-4 text-center text-sm font-medium',
                          v === '✓' ? 'text-[#1a6b3c]' : v === '—' ? 'text-[#b0a99e]' : vi===1 ? 'text-[#1a6b3c] font-semibold' : 'text-[#14120e]')}>
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Onsite worker pricing */}
        <section className="py-20 bg-[#14120e]">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="font-display font-black text-white mb-3" style={{fontSize:'clamp(26px,4vw,42px)',letterSpacing:'-0.02em'}}>
                Onsite worker pricing
              </h2>
              <p className="text-white/50">Charged by weight capacity tier — only pay for hours worked</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon:'🌿', name:'Light duty',   range:'Up to 25 kg', rate:'$12', color:'#27ae60', bg:'rgba(39,174,96,.15)' },
                { icon:'💪', name:'Medium duty',  range:'26 – 60 kg',  rate:'$18', color:'#2980b9', bg:'rgba(41,128,185,.15)' },
                { icon:'🔩', name:'Heavy duty',   range:'61 – 120 kg', rate:'$26', color:'#e67e22', bg:'rgba(230,126,34,.15)' },
                { icon:'🏗️', name:'Extreme duty', range:'120 kg +',    rate:'$40', color:'#c94040', bg:'rgba(201,64,64,.15)' },
              ].map(t => (
                <div key={t.name} className="rounded-2xl p-6 border border-white/10 hover:border-white/25 transition-all cursor-default" style={{background:t.bg}}>
                  <div className="text-3xl mb-4">{t.icon}</div>
                  <div className="font-semibold text-white mb-1">{t.name}</div>
                  <div className="text-sm text-white/40 mb-4">{t.range}</div>
                  <div className="font-display font-black text-3xl" style={{color:t.color}}>{t.rate}<span className="text-sm font-sans font-normal text-white/40">/hr</span></div>
                </div>
              ))}
            </div>
            <p className="text-center text-white/30 text-sm mt-6">An 8% platform service fee applies to all onsite worker bookings</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-[#f5f3ee]">
          <div className="max-w-2xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="font-display font-black text-[#14120e] mb-3" style={{fontSize:'clamp(26px,4vw,42px)',letterSpacing:'-0.02em'}}>Frequently asked questions</h2>
              <p className="text-[#7a756c]">Everything you need to know about pricing and billing</p>
            </div>
            <div className="flex flex-col gap-3">
              {FAQS.map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl border border-[rgba(20,18,14,.06)] overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-[#faf9f6] transition-all">
                    <span className="font-semibold text-[#14120e] text-sm">{faq.q}</span>
                    <span className={cn('text-[#7a756c] transition-transform duration-200 shrink-0', openFaq === i && 'rotate-180')}>▾</span>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-6 text-sm text-[#7a756c] leading-relaxed border-t border-[rgba(20,18,14,.06)] pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-white">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <h2 className="font-display font-black text-[#14120e] mb-3" style={{fontSize:'clamp(26px,4vw,42px)',letterSpacing:'-0.02em'}}>
              Still not sure?
            </h2>
            <p className="text-[#7a756c] mb-8 text-base">Start free — no credit card needed. Upgrade when you're ready.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/register"><button className="px-8 py-4 rounded-full bg-[#14120e] text-white font-bold hover:bg-[#1a6b3c] transition-all">Get started free →</button></Link>
              <Link href="/contact"><button className="px-8 py-4 rounded-full border border-[rgba(20,18,14,.15)] text-[#3a3630] font-semibold hover:bg-[#f5f3ee] transition-all">Talk to sales</button></Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
