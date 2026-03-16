import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const features = [
  { icon: '🏷️', title: 'Full white-label branding',      desc: 'Custom domain, your logo, your brand colours, your email. Employees see your company name only — never WorkHub.' },
  { icon: '📤', title: 'Bulk employee upload',           desc: 'Import CSV or Excel with thousands of employees. Automated branded verification emails sent from your domain instantly.' },
  { icon: '📅', title: 'Shift management',               desc: 'Create, assign and track shifts. GPS clock-in verification. Attendance reports, overtime tracking and leave management.' },
  { icon: '💰', title: 'Payroll & invoicing',            desc: 'Auto-generate branded payslips and client invoices monthly. Stripe Billing handles recurring subscriptions automatically.' },
  { icon: '🎥', title: 'Meeting integrations',           desc: 'Zoom, Google Meet, MS Teams — all meeting invites sent under your company name. Offer letters auto-generated.' },
  { icon: '📊', title: 'Analytics & reporting',          desc: 'Real-time workforce analytics. Attendance rates, deployment history, performance dashboards, exportable reports.' },
]

export default function EnterprisePage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="min-h-[80vh] flex items-center bg-[var(--ink)] relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-80px] right-[-80px] w-[500px] h-[500px] rounded-full" style={{ background: 'rgba(26,107,60,.08)' }} />
            <div className="absolute bottom-[-60px] left-[30%] w-[300px] h-[300px] rounded-full" style={{ background: 'rgba(92,68,194,.06)' }} />
          </div>
          <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-20 relative z-10">
            <div className="max-w-2xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[rgba(26,107,60,.25)] text-[#7ee8a2] text-xs font-bold tracking-widest uppercase mb-6">Enterprise & staffing agencies</span>
              <h1 className="font-display font-black text-white mb-6" style={{ fontSize: 'clamp(40px,6vw,72px)', letterSpacing: '-0.03em', lineHeight: '1.05' }}>
                Your brand,<br /><em className="text-[#7ee8a2] not-italic">your portal,</em><br />your rules
              </h1>
              <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-xl">
                Full white-label staffing platform. Bulk upload employees, manage shifts and attendance, generate payslips — all under your company name. WorkHub is completely invisible to your employees and clients.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/dashboard/agency">
                  <button className="px-8 py-4 rounded-2xl bg-[var(--accent2)] text-white font-semibold hover:-translate-y-0.5 transition-smooth shadow-medium">
                    View live demo portal
                  </button>
                </Link>
                <button className="px-8 py-4 rounded-2xl bg-transparent text-white border-2 border-white/20 font-semibold hover:border-white/40 hover:bg-white/5 transition-smooth">
                  Talk to sales
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 bg-[var(--bg)]">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="font-display font-black text-[var(--ink)] mb-4" style={{ fontSize: 'clamp(28px,4vw,48px)', letterSpacing: '-0.025em' }}>
                Everything you need to run<br />a staffing operation
              </h2>
              <p className="text-[var(--ink3)] text-base max-w-md mx-auto">All tools, zero platform branding — completely whitelabelled to your company</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f, i) => (
                <div key={f.title} className="bg-[var(--surface)] rounded-2xl p-7 border border-[var(--border2)] hover:-translate-y-1 hover:shadow-medium transition-smooth">
                  <div className="text-3xl mb-5">{f.icon}</div>
                  <h3 className="font-semibold text-[var(--ink)] mb-2">{f.title}</h3>
                  <p className="text-sm text-[var(--ink3)] leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing CTA */}
        <section className="py-24 bg-[var(--surface2)]">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-12 text-center">
            <h2 className="font-display font-black text-3xl text-[var(--ink)] mb-4 tracking-tight">Enterprise plan — $199/month</h2>
            <p className="text-[var(--ink3)] mb-8 max-w-md mx-auto">Unlimited employees, custom domain, white-label email, Stripe Billing and priority support.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/dashboard/agency">
                <button className="px-8 py-4 rounded-2xl bg-[var(--ink)] text-white font-semibold hover:bg-[var(--accent)] transition-smooth">
                  View live demo →
                </button>
              </Link>
              <button className="px-8 py-4 rounded-2xl border border-[var(--border)] text-[var(--ink2)] font-semibold hover:border-[var(--ink3)] hover:bg-[var(--surface)] transition-smooth">
                Book a call
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
