'use client'
import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { WEIGHT_TIERS } from '@/lib/data'

type Role = 'client' | 'freelancer' | 'worker' | 'enterprise'

const ROLES = [
  { id: 'client',     icon: '💼', label: 'Client',           sub: 'I want to hire talent or book workers' },
  { id: 'freelancer', icon: '💻', label: 'Freelancer',       sub: 'I offer remote skills and services' },
  { id: 'worker',     icon: '🔧', label: 'Onsite Worker',    sub: 'I do field work, driving or labour jobs' },
  { id: 'enterprise', icon: '🏢', label: 'Enterprise / Agency', sub: 'I manage a team or staffing operation' },
] as const

const SKILLS_LIST = ['React', 'Node.js', 'Python', 'Figma', 'Adobe XD', 'TypeScript', 'SEO', 'Copywriting', 'After Effects', 'Branding', 'Excel', 'Photoshop', 'WordPress', 'Data Analysis', 'Video Editing']

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [role, setRole] = useState<Role>('client')
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '',
    companyName: '', skills: [] as string[], weightTier: '',
    agreeTerms: false,
  })
  const [done, setDone] = useState(false)

  function set(k: string, v: any) { setForm(f => ({ ...f, [k]: v })) }
  function toggleSkill(s: string) { set('skills', form.skills.includes(s) ? form.skills.filter(x=>x!==s) : [...form.skills, s]) }

  const totalSteps = role === 'client' ? 2 : 3

  if (done) {
    return (
      <div className="min-h-screen bg-[#f5f3ee] flex items-center justify-center px-6">
        <div className="bg-white rounded-3xl p-12 text-center max-w-md w-full shadow-[0_8px_40px_rgba(20,18,14,.1)] border border-[rgba(20,18,14,.06)]">
          <div className="text-6xl mb-5">🎉</div>
          <h1 className="font-display font-black text-2xl text-[#14120e] mb-3 tracking-tight">Welcome to WorkHub!</h1>
          <p className="text-[#7a756c] text-sm leading-relaxed mb-4">Your account has been created. Check your email for a verification link.</p>
          <div className="bg-[#f5f3ee] rounded-xl px-4 py-3 text-sm font-medium text-[#14120e] mb-8">{form.email}</div>
          <Link href="/dashboard">
            <button className="w-full py-3.5 rounded-full bg-[#14120e] text-white font-semibold text-sm hover:bg-[#1a6b3c] transition-all">Go to dashboard →</button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f3ee] flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col w-[420px] shrink-0 bg-[#14120e] relative overflow-hidden p-12">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#1a6b3c] opacity-10" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#5c44c2] opacity-8" />
        <Link href="/" className="font-display font-black text-[22px] text-white tracking-tight relative z-10">
          Work<span className="text-[#7ee8a2]">Hub</span>
        </Link>
        <div className="flex-1 flex flex-col justify-center relative z-10 mt-12">
          <h2 className="font-display font-black text-white text-3xl tracking-tight leading-tight mb-5">
            Join 50,000+<br />professionals<br /><em className="text-[#7ee8a2] not-italic">earning more</em>
          </h2>
          <div className="flex flex-col gap-4">
            {[
              { icon: '🔒', t: 'Escrow-protected payments', d: 'Get paid only when you approve' },
              { icon: '📍', t: 'GPS-verified onsite jobs',   d: 'Real jobs, real check-ins' },
              { icon: '🏢', t: 'White-label enterprise',     d: 'Your brand, your portal' },
            ].map(f => (
              <div key={f.t} className="flex gap-3 items-start">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-lg shrink-0">{f.icon}</div>
                <div>
                  <div className="font-semibold text-white text-sm">{f.t}</div>
                  <div className="text-white/40 text-xs mt-0.5">{f.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10 text-white/30 text-xs">
          © 2025 WorkHub Inc.
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <div className="h-14 flex items-center justify-between px-8 border-b border-[rgba(20,18,14,.06)] bg-white">
          <Link href="/" className="lg:hidden font-display font-black text-lg text-[#14120e]">Work<span className="text-[#1a6b3c]">Hub</span></Link>
          <div className="lg:ml-auto flex items-center gap-2 text-sm text-[#7a756c]">
            Already have an account?
            <Link href="/login" className="font-semibold text-[#14120e] hover:text-[#1a6b3c] transition-all">Log in</Link>
          </div>
        </div>

        <div className="flex-1 flex items-start justify-center px-6 py-10 overflow-y-auto">
          <div className="w-full max-w-md">

            {/* Step progress */}
            <div className="flex items-center gap-2 mb-8">
              {Array.from({length: totalSteps}).map((_,i) => (
                <div key={i} className={cn('h-1.5 flex-1 rounded-full transition-all', i < step ? 'bg-[#14120e]' : 'bg-[rgba(20,18,14,.1)]')} />
              ))}
              <span className="text-xs text-[#7a756c] ml-2">{step}/{totalSteps}</span>
            </div>

            {/* STEP 1 — Role + account */}
            {step === 1 && (
              <div>
                <h1 className="font-display font-black text-2xl text-[#14120e] tracking-tight mb-1">Create your account</h1>
                <p className="text-[#7a756c] text-sm mb-7">Choose your role to get the right experience</p>

                {/* Role selector */}
                <div className="grid grid-cols-2 gap-2.5 mb-7">
                  {ROLES.map(r => (
                    <button key={r.id} onClick={() => setRole(r.id)}
                      className={cn('p-4 rounded-2xl border text-left transition-all', role === r.id ? 'border-[#14120e] bg-[#f5f3ee]' : 'border-[rgba(20,18,14,.08)] bg-white hover:border-[rgba(20,18,14,.25)]')}>
                      <div className="text-2xl mb-2">{r.icon}</div>
                      <div className="font-semibold text-sm text-[#14120e]">{r.label}</div>
                      <div className="text-[11px] text-[#7a756c] mt-0.5 leading-relaxed">{r.sub}</div>
                    </button>
                  ))}
                </div>

                {/* Basic info */}
                <div className="flex flex-col gap-4">
                  {role === 'enterprise' && (
                    <div>
                      <label className="block text-sm font-semibold text-[#3a3630] mb-1.5">Company name</label>
                      <input value={form.companyName} onChange={e => set('companyName', e.target.value)} placeholder="Acme Corporation"
                        className="w-full px-4 py-3 rounded-xl border border-[rgba(20,18,14,.1)] text-sm outline-none focus:border-[rgba(20,18,14,.3)] transition-all" />
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-semibold text-[#3a3630] mb-1.5">First name</label>
                      <input value={form.firstName} onChange={e => set('firstName', e.target.value)} placeholder="John"
                        className="w-full px-4 py-3 rounded-xl border border-[rgba(20,18,14,.1)] text-sm outline-none focus:border-[rgba(20,18,14,.3)] transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#3a3630] mb-1.5">Last name</label>
                      <input value={form.lastName} onChange={e => set('lastName', e.target.value)} placeholder="Smith"
                        className="w-full px-4 py-3 rounded-xl border border-[rgba(20,18,14,.1)] text-sm outline-none focus:border-[rgba(20,18,14,.3)] transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#3a3630] mb-1.5">Email address</label>
                    <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-[rgba(20,18,14,.1)] text-sm outline-none focus:border-[rgba(20,18,14,.3)] transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#3a3630] mb-1.5">Password</label>
                    <input type="password" value={form.password} onChange={e => set('password', e.target.value)} placeholder="Min. 8 characters"
                      className="w-full px-4 py-3 rounded-xl border border-[rgba(20,18,14,.1)] text-sm outline-none focus:border-[rgba(20,18,14,.3)] transition-all" />
                  </div>
                </div>

                <button onClick={() => setStep(role === 'client' ? totalSteps : 2)} className="w-full mt-6 py-3.5 rounded-full bg-[#14120e] text-white font-semibold text-sm hover:bg-[#1a6b3c] transition-all">
                  Continue →
                </button>

                <div className="relative text-center text-xs text-[#7a756c] my-5">
                  <div className="absolute inset-0 flex items-center"><div className="w-full h-px bg-[rgba(20,18,14,.08)]"/></div>
                  <span className="relative bg-[#f5f3ee] px-3">or sign up with</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {['G  Google', 'in  LinkedIn'].map(s => (
                    <button key={s} className="py-3 rounded-xl border border-[rgba(20,18,14,.1)] text-sm font-medium text-[#3a3630] bg-white hover:bg-[#f5f3ee] hover:border-[rgba(20,18,14,.2)] transition-all">{s}</button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2 — Role-specific */}
            {step === 2 && role !== 'client' && (
              <div>
                <h1 className="font-display font-black text-2xl text-[#14120e] tracking-tight mb-1">
                  {role === 'freelancer' ? 'Your skills & rate' : role === 'worker' ? 'Your capabilities' : 'Your organisation'}
                </h1>
                <p className="text-[#7a756c] text-sm mb-7">
                  {role === 'freelancer' ? 'This helps clients find you' : role === 'worker' ? 'Select your weight capacity tier and set your availability' : 'Tell us about your company for white-label setup'}
                </p>

                {role === 'freelancer' && (
                  <div className="flex flex-col gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-[#3a3630] mb-3">Select your skills (pick up to 8)</label>
                      <div className="flex flex-wrap gap-2">
                        {SKILLS_LIST.map(s => (
                          <button key={s} onClick={() => toggleSkill(s)}
                            className={cn('px-3.5 py-2 rounded-full text-xs font-medium border transition-all', form.skills.includes(s) ? 'bg-[#14120e] text-white border-[#14120e]' : 'bg-white text-[#3a3630] border-[rgba(20,18,14,.1)] hover:border-[rgba(20,18,14,.3)]')}>
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {role === 'worker' && (
                  <div>
                    <div className="text-sm font-semibold text-[#3a3630] mb-3">Weight capacity tier</div>
                    <div className="grid grid-cols-2 gap-3">
                      {WEIGHT_TIERS.map(t => (
                        <button key={t.tier} onClick={() => set('weightTier', t.tier)}
                          className={cn('p-4 rounded-xl border text-left transition-all', form.weightTier === t.tier ? 'border-[#14120e]' : 'border-[rgba(20,18,14,.08)] bg-white hover:border-[rgba(20,18,14,.2)]')}
                          style={form.weightTier === t.tier ? {background:t.bgColor, borderColor:t.color} : {}}>
                          <div className="text-xl mb-1.5">{t.icon}</div>
                          <div className="font-bold text-sm" style={{color:form.weightTier===t.tier?t.color:'#14120e'}}>{t.label}</div>
                          <div className="text-xs text-[#7a756c]">{t.range}</div>
                          <div className="font-display font-bold text-base mt-1" style={{color:t.color}}>${t.ratePerHour}/hr</div>
                        </button>
                      ))}
                    </div>
                    <div className="mt-4 p-4 bg-[#fdf0e0] rounded-xl border border-[rgba(194,98,10,.15)] text-xs text-[#c2620a]">
                      ⚠️ Your weight capacity will be verified by our admin team before your profile goes live.
                    </div>
                  </div>
                )}

                {role === 'enterprise' && (
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#3a3630] mb-1.5">Custom portal domain</label>
                      <div className="flex gap-2">
                        <span className="px-4 py-3 bg-[#f5f3ee] border border-[rgba(20,18,14,.1)] rounded-l-xl text-sm text-[#7a756c] border-r-0">portal.</span>
                        <input placeholder="yourcompany.com" className="flex-1 px-4 py-3 rounded-r-xl border border-[rgba(20,18,14,.1)] text-sm outline-none focus:border-[rgba(20,18,14,.3)] transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#3a3630] mb-1.5">Number of employees</label>
                      <select className="w-full px-4 py-3 rounded-xl border border-[rgba(20,18,14,.1)] text-sm outline-none focus:border-[rgba(20,18,14,.3)] bg-white transition-all">
                        {['10–50','50–200','200–500','500+'].map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                  </div>
                )}

                <label className="flex items-start gap-3 cursor-pointer mt-6 mb-6">
                  <input type="checkbox" checked={form.agreeTerms} onChange={e => set('agreeTerms', e.target.checked)} className="mt-0.5" />
                  <span className="text-xs text-[#7a756c] leading-relaxed">
                    I agree to the <Link href="#" className="text-[#1a6b3c] underline">Terms of Service</Link> and <Link href="#" className="text-[#1a6b3c] underline">Privacy Policy</Link>
                  </span>
                </label>

                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="flex-1 py-3.5 rounded-full border border-[rgba(20,18,14,.1)] text-sm font-medium text-[#3a3630] hover:bg-[#f5f3ee] transition-all">← Back</button>
                  <button onClick={() => setDone(true)} className="flex-1 py-3.5 rounded-full bg-[#14120e] text-white text-sm font-semibold hover:bg-[#1a6b3c] transition-all" disabled={!form.agreeTerms}>
                    Create account →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2 client = done */}
            {step === totalSteps && role === 'client' && (
              <div>
                <h1 className="font-display font-black text-2xl text-[#14120e] tracking-tight mb-1">Almost done!</h1>
                <p className="text-[#7a756c] text-sm mb-7">Just agree to the terms and your account is ready</p>
                <label className="flex items-start gap-3 cursor-pointer mb-6">
                  <input type="checkbox" checked={form.agreeTerms} onChange={e => set('agreeTerms', e.target.checked)} className="mt-0.5" />
                  <span className="text-xs text-[#7a756c] leading-relaxed">
                    I agree to the <Link href="#" className="text-[#1a6b3c] underline">Terms of Service</Link> and <Link href="#" className="text-[#1a6b3c] underline">Privacy Policy</Link>
                  </span>
                </label>
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="flex-1 py-3.5 rounded-full border border-[rgba(20,18,14,.1)] text-sm font-medium text-[#3a3630] hover:bg-[#f5f3ee] transition-all">← Back</button>
                  <button onClick={() => setDone(true)} disabled={!form.agreeTerms}
                    className="flex-1 py-3.5 rounded-full bg-[#14120e] text-white text-sm font-semibold hover:bg-[#1a6b3c] transition-all disabled:opacity-50">
                    Create account →
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}
