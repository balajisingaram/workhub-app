'use client'
import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { WEIGHT_TIERS } from '@/lib/data'

type Role = 'client' | 'freelancer' | 'gig' | 'driver'

const ROLES = [
  { id: 'client'     as Role, icon: '💼', label: 'Client',       sub: 'I want to hire talent or book workers', color: '#1a6b3c', bg: '#e8f5ee' },
  { id: 'freelancer' as Role, icon: '💻', label: 'Freelancer',   sub: 'I offer remote skills and services',    color: '#5c44c2', bg: '#edeafa' },
  { id: 'gig'        as Role, icon: '🔧', label: 'Gig Worker',   sub: 'I do onsite physical tasks and labour', color: '#c2620a', bg: '#fdf0e0' },
  { id: 'driver'     as Role, icon: '🚗', label: 'Driver',       sub: 'I do delivery, cab and transport jobs', color: '#1a5a8a', bg: '#e5f0fa' },
]

const SKILLS = ['React','Node.js','Python','Figma','Adobe XD','TypeScript','SEO','Copywriting','After Effects','Branding','Excel','Photoshop','WordPress','Data Analysis','Video Editing']

export default function RegisterPage() {
  const [step, setStep]   = useState(1)
  const [role, setRole]   = useState<Role>('client')
  const [form, setForm]   = useState({ firstName:'', lastName:'', email:'', password:'', skills:[] as string[], weightTier:'', vehicleType:'', agreeTerms:false })
  const [done, setDone]   = useState(false)

  const selected = ROLES.find(r => r.id === role)!
  function set(k: string, v: any) { setForm(f => ({...f, [k]:v})) }
  function toggleSkill(s: string) { set('skills', form.skills.includes(s) ? form.skills.filter(x=>x!==s) : [...form.skills, s]) }
  const totalSteps = role === 'client' ? 2 : 3

  if (done) return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-6">
      <div className="bg-white rounded-3xl p-12 text-center max-w-md w-full shadow-[0_8px_40px_rgba(20,18,14,.1)] border border-[rgba(20,18,14,.06)]">
        <div className="text-6xl mb-5">🎉</div>
        <h1 className="font-display font-black text-2xl text-[var(--ink)] mb-3 tracking-tight">Welcome to GigHub!</h1>
        <p className="text-[var(--ink3)] text-sm leading-relaxed mb-4">Your account has been created. Check your email to verify.</p>
        <div className="bg-[var(--bg)] rounded-xl px-4 py-3 text-sm font-medium text-[var(--ink)] mb-8">{form.email}</div>
        <Link href="/dashboard">
          <button className="w-full py-3.5 rounded-full text-white font-semibold text-sm transition-all" style={{background: selected.color}}>Go to dashboard →</button>
        </Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[var(--bg)] flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col w-[420px] bg-[var(--ink)] relative overflow-hidden p-12 shrink-0">
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-10" style={{background: selected.color}} />
        <Link href="/" className="font-display font-black text-[22px] text-white tracking-tight relative z-10">Gig<span style={{color:'#7ee8a2'}}>Hub</span></Link>
        <div className="flex-1 flex flex-col justify-center relative z-10">
          <div className="text-5xl mb-5">{selected.icon}</div>
          <h2 className="font-display font-black text-white text-2xl tracking-tight mb-3">Join as a {selected.label}</h2>
          <p className="text-white/50 text-sm leading-relaxed mb-8">
            {role==='client'     && 'Post jobs, hire freelancers, gig workers and drivers. Secure escrow payments.'}
            {role==='freelancer' && 'Showcase your skills, get hired for remote projects, get paid on time.'}
            {role==='gig'        && 'Find onsite work near you. GPS check-in. Weekly payouts.'}
            {role==='driver'     && 'Flexible delivery and transport jobs. Set your own hours. Easy check-in.'}
          </p>
          <div className="flex flex-col gap-3">
            {['Free to join','Get paid securely','Verified profiles only','24/7 support'].map(f => (
              <div key={f} className="flex items-center gap-3 text-sm text-white/60">
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold bg-white/15 text-white">✓</div>{f}
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10 text-white/20 text-xs">© 2025 GigHub Inc.</div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex flex-col">
        <div className="h-14 flex items-center justify-between px-8 border-b border-[rgba(20,18,14,.06)] bg-white">
          <Link href="/" className="lg:hidden font-display font-black text-lg text-[var(--ink)]">Gig<span className="text-[var(--accent)]">Hub</span></Link>
          <div className="lg:ml-auto text-sm text-[var(--ink3)]">Already have an account?{' '}<Link href="/login" className="font-semibold text-[var(--ink)] hover:text-[var(--accent)] transition-smooth">Log in</Link></div>
        </div>

        <div className="flex-1 flex items-start justify-center px-6 py-10 overflow-y-auto">
          <div className="w-full max-w-[460px]">
            {/* Progress */}
            <div className="flex items-center gap-2 mb-8">
              {Array.from({length:totalSteps}).map((_,i) => (
                <div key={i} className="h-1.5 flex-1 rounded-full transition-all" style={{background: i<step ? selected.color : 'rgba(20,18,14,.1)'}} />
              ))}
              <span className="text-xs text-[var(--ink3)] ml-2">{step}/{totalSteps}</span>
            </div>

            {/* STEP 1 */}
            {step === 1 && (
              <div>
                <h1 className="font-display font-black text-2xl text-[var(--ink)] tracking-tight mb-1">Create your account</h1>
                <p className="text-[var(--ink3)] text-sm mb-7">Choose your role to get the right experience</p>

                {/* Role grid */}
                <div className="grid grid-cols-2 gap-2.5 mb-7">
                  {ROLES.map(r => (
                    <button key={r.id} onClick={() => setRole(r.id)}
                      className={cn('p-4 rounded-2xl border-2 text-left transition-all', role===r.id ? 'border-current' : 'border-[rgba(20,18,14,.08)] hover:border-[rgba(20,18,14,.2)]')}
                      style={role===r.id ? {borderColor:r.color, background:r.bg} : {}}>
                      <div className="text-2xl mb-2">{r.icon}</div>
                      <div className="font-bold text-sm" style={{color: role===r.id ? r.color : '#14120e'}}>{r.label}</div>
                      <div className="text-[11px] text-[var(--ink3)] mt-0.5">{r.sub}</div>
                    </button>
                  ))}
                </div>

                {/* Basic info */}
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="block text-sm font-semibold text-[var(--ink2)] mb-1.5">First name</label><input value={form.firstName} onChange={e=>set('firstName',e.target.value)} placeholder="John" className="w-full px-4 py-3 rounded-xl border border-[rgba(20,18,14,.1)] text-sm outline-none focus:border-[rgba(20,18,14,.3)] transition-all" /></div>
                    <div><label className="block text-sm font-semibold text-[var(--ink2)] mb-1.5">Last name</label><input value={form.lastName} onChange={e=>set('lastName',e.target.value)} placeholder="Smith" className="w-full px-4 py-3 rounded-xl border border-[rgba(20,18,14,.1)] text-sm outline-none focus:border-[rgba(20,18,14,.3)] transition-all" /></div>
                  </div>
                  <div><label className="block text-sm font-semibold text-[var(--ink2)] mb-1.5">Email address</label><input type="email" value={form.email} onChange={e=>set('email',e.target.value)} placeholder="you@example.com" className="w-full px-4 py-3 rounded-xl border border-[rgba(20,18,14,.1)] text-sm outline-none focus:border-[rgba(20,18,14,.3)] transition-all" /></div>
                  <div><label className="block text-sm font-semibold text-[var(--ink2)] mb-1.5">Password</label><input type="password" value={form.password} onChange={e=>set('password',e.target.value)} placeholder="Min. 8 characters" className="w-full px-4 py-3 rounded-xl border border-[rgba(20,18,14,.1)] text-sm outline-none focus:border-[rgba(20,18,14,.3)] transition-all" /></div>
                </div>

                <button onClick={() => setStep(role==='client' ? 2 : 2)} className="w-full mt-6 py-3.5 rounded-full text-white font-semibold text-sm transition-all" style={{background: selected.color}}>
                  Continue →
                </button>
                <div className="relative text-center text-xs text-[var(--ink3)] my-4">
                  <div className="absolute inset-0 flex items-center"><div className="w-full h-px bg-[rgba(20,18,14,.08)]"/></div>
                  <span className="relative bg-[var(--bg)] px-3">or sign up with</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {['G  Google','in  LinkedIn'].map(s => <button key={s} className="py-3 rounded-xl border border-[rgba(20,18,14,.1)] text-sm font-medium text-[var(--ink3)] bg-white hover:bg-[var(--bg)] transition-all">{s}</button>)}
                </div>
              </div>
            )}

            {/* STEP 2 — Role-specific */}
            {step === 2 && role !== 'client' && (
              <div>
                <h1 className="font-display font-black text-2xl text-[var(--ink)] tracking-tight mb-1">
                  {role==='freelancer' && 'Your skills'}
                  {role==='gig'        && 'Your capabilities'}
                  {role==='driver'     && 'Your vehicle'}
                </h1>
                <p className="text-[var(--ink3)] text-sm mb-7">This helps clients find the right worker for their job</p>

                {/* Freelancer skills */}
                {role === 'freelancer' && (
                  <div>
                    <label className="block text-sm font-semibold text-[var(--ink2)] mb-3">Select your skills (pick up to 8)</label>
                    <div className="flex flex-wrap gap-2">
                      {SKILLS.map(s => (
                        <button key={s} onClick={() => toggleSkill(s)}
                          className={cn('px-3.5 py-2 rounded-full text-xs font-medium border transition-all', form.skills.includes(s) ? 'text-white border-transparent' : 'bg-white text-[var(--ink3)] border-[rgba(20,18,14,.1)] hover:border-[rgba(20,18,14,.3)]')}
                          style={form.skills.includes(s) ? {background: selected.color} : {}}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Gig worker — weight tier */}
                {role === 'gig' && (
                  <div>
                    <label className="block text-sm font-semibold text-[var(--ink2)] mb-3">Weight capacity tier</label>
                    <div className="grid grid-cols-2 gap-3">
                      {WEIGHT_TIERS.map(t => (
                        <button key={t.tier} onClick={() => set('weightTier', t.tier)}
                          className={cn('p-4 rounded-xl border text-left transition-all', form.weightTier===t.tier ? 'border-[#c2620a]' : 'border-[rgba(20,18,14,.08)] bg-white hover:border-[rgba(20,18,14,.2)]')}
                          style={form.weightTier===t.tier ? {background:t.bgColor, borderColor:t.color} : {}}>
                          <div className="text-xl mb-1.5">{t.icon}</div>
                          <div className="font-bold text-sm" style={{color:form.weightTier===t.tier?t.color:'#14120e'}}>{t.label}</div>
                          <div className="text-xs text-[var(--ink3)]">{t.range}</div>
                          <div className="font-display font-bold text-base mt-1" style={{color:t.color}}>${t.ratePerHour}/hr</div>
                        </button>
                      ))}
                    </div>
                    <div className="mt-4 p-4 bg-[#fdf0e0] rounded-xl border border-[rgba(194,98,10,.15)] text-xs text-[#c2620a]">
                      ⚠️ Your weight capacity will be verified by our admin team before your profile goes live.
                    </div>
                  </div>
                )}

                {/* Driver — vehicle type */}
                {role === 'driver' && (
                  <div>
                    <label className="block text-sm font-semibold text-[var(--ink2)] mb-3">Vehicle type</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[{id:'bike',icon:'🛵',label:'Motorbike',sub:'Small parcels, food delivery'},{id:'car',icon:'🚗',label:'Car / Sedan',sub:'Passengers, small loads'},{id:'van',icon:'🚐',label:'Van',sub:'Medium loads, furniture'},{id:'truck',icon:'🚛',label:'Truck',sub:'Heavy goods, logistics'}].map(v => (
                        <button key={v.id} onClick={() => set('vehicleType', v.id)}
                          className={cn('p-4 rounded-xl border text-left transition-all', form.vehicleType===v.id ? 'border-[#1a5a8a] bg-[#e5f0fa]' : 'border-[rgba(20,18,14,.08)] bg-white hover:border-[rgba(20,18,14,.2)]')}>
                          <div className="text-2xl mb-2">{v.icon}</div>
                          <div className="font-bold text-sm" style={{color:form.vehicleType===v.id?'#1a5a8a':'#14120e'}}>{v.label}</div>
                          <div className="text-[11px] text-[var(--ink3)] mt-0.5">{v.sub}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3 mt-8">
                  <button onClick={() => setStep(1)} className="flex-1 py-3.5 rounded-full border border-[rgba(20,18,14,.1)] text-sm font-medium text-[var(--ink3)] hover:bg-[var(--bg2)] transition-all">← Back</button>
                  <button onClick={() => setStep(3)} className="flex-1 py-3.5 rounded-full text-white text-sm font-semibold transition-all" style={{background: selected.color}}>Continue →</button>
                </div>
              </div>
            )}

            {/* STEP — Final (agree terms) */}
            {((step === 2 && role === 'client') || step === 3) && (
              <div>
                <h1 className="font-display font-black text-2xl text-[var(--ink)] tracking-tight mb-1">Almost done!</h1>
                <p className="text-[var(--ink3)] text-sm mb-7">Agree to the terms and your account is ready</p>
                <label className="flex items-start gap-3 cursor-pointer mb-7">
                  <input type="checkbox" checked={form.agreeTerms} onChange={e=>set('agreeTerms',e.target.checked)} className="mt-0.5" />
                  <span className="text-xs text-[var(--ink3)] leading-relaxed">
                    I agree to the <Link href="#" className="text-[var(--accent)] underline">Terms of Service</Link> and <Link href="#" className="text-[var(--accent)] underline">Privacy Policy</Link>
                  </span>
                </label>
                <div className="flex gap-3">
                  <button onClick={() => setStep(step - 1)} className="flex-1 py-3.5 rounded-full border border-[rgba(20,18,14,.1)] text-sm font-medium text-[var(--ink3)] hover:bg-[var(--bg2)] transition-all">← Back</button>
                  <button onClick={() => setDone(true)} disabled={!form.agreeTerms} className="flex-1 py-3.5 rounded-full text-white text-sm font-semibold disabled:opacity-50 transition-all" style={{background: selected.color}}>
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
