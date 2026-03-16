'use client'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { cn } from '@/lib/utils'
import { WEIGHT_TIERS } from '@/lib/data'

type JobType = 'freelance' | 'onsite'
type Step = 1 | 2 | 3 | 4

const CATEGORIES = ['Design & Creative', 'Development & IT', 'Digital Marketing', 'Writing & Translation', 'Finance & Accounting', 'Video & Animation', 'Data Science', 'Admin & Support']
const SKILLS_LIST = ['React', 'Node.js', 'Python', 'Figma', 'Adobe XD', 'TypeScript', 'PostgreSQL', 'AWS', 'SEO', 'Copywriting', 'After Effects', 'Branding', 'Excel', 'Photoshop', 'WordPress']

export default function PostJobPage() {
  const [step, setStep] = useState<Step>(1)
  const [jobType, setJobType] = useState<JobType>('freelance')
  const [form, setForm] = useState({
    title: '', category: '', description: '', skills: [] as string[],
    budgetMin: '', budgetMax: '', budgetType: 'fixed',
    deadline: '', isUrgent: false,
    weightTier: '', location: '', jobDate: '', hours: '',
  })
  const [submitted, setSubmitted] = useState(false)

  function set(k: string, v: any) { setForm(f => ({ ...f, [k]: v })) }
  function toggleSkill(s: string) {
    set('skills', form.skills.includes(s) ? form.skills.filter(x => x !== s) : [...form.skills, s])
  }

  const steps = [
    { n: 1, label: 'Job type' },
    { n: 2, label: 'Details' },
    { n: 3, label: 'Budget' },
    { n: 4, label: 'Review' },
  ]

  if (submitted) {
    return (
      <>
        <Navbar />
        <main className="pt-16 min-h-screen bg-[#f5f3ee] flex items-center justify-center px-6">
          <div className="bg-white rounded-3xl p-12 text-center max-w-md w-full shadow-[0_8px_40px_rgba(20,18,14,.1)] border border-[rgba(20,18,14,.06)]">
            <div className="text-6xl mb-5">🎉</div>
            <h1 className="font-display font-black text-2xl text-[#14120e] mb-3 tracking-tight">Job posted!</h1>
            <p className="text-[#7a756c] text-sm leading-relaxed mb-8">
              Your job is now live. Freelancers will start sending proposals shortly. You'll get a notification as soon as you receive your first proposal.
            </p>
            <div className="bg-[#f5f3ee] rounded-xl p-4 text-left mb-8">
              <div className="text-xs font-bold text-[#7a756c] uppercase tracking-wider mb-3">Job summary</div>
              <div className="text-sm font-semibold text-[#14120e] mb-1">{form.title || 'Your job'}</div>
              <div className="text-xs text-[#7a756c]">{form.category} · ${form.budgetMin}–${form.budgetMax} {form.budgetType}</div>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/dashboard/client">
                <button className="w-full py-3.5 rounded-full bg-[#14120e] text-white font-semibold text-sm hover:bg-[#1a6b3c] transition-all">View proposals in dashboard</button>
              </Link>
              <button onClick={() => { setSubmitted(false); setStep(1); setForm({title:'',category:'',description:'',skills:[],budgetMin:'',budgetMax:'',budgetType:'fixed',deadline:'',isUrgent:false,weightTier:'',location:'',jobDate:'',hours:''}) }}
                className="w-full py-3.5 rounded-full border border-[rgba(20,18,14,.1)] text-[#3a3630] font-medium text-sm hover:bg-[#f5f3ee] transition-all">
                Post another job
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[#f5f3ee]">
        <div className="max-w-2xl mx-auto px-6 py-12">

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="font-display font-black text-[#14120e] text-3xl tracking-tight mb-2">Post a job</h1>
            <p className="text-[#7a756c] text-sm">Tell us what you need — get proposals from verified talent</p>
          </div>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {steps.map((s, i) => (
              <div key={s.n} className="flex items-center gap-2">
                <div className={cn('flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all',
                  step === s.n ? 'bg-[#14120e] text-white' : step > s.n ? 'bg-[#1a6b3c] text-white' : 'bg-white text-[#b0a99e] border border-[rgba(20,18,14,.08)]')}>
                  <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                    style={{background: step > s.n ? 'rgba(255,255,255,.25)' : step === s.n ? 'rgba(255,255,255,.2)' : 'transparent'}}>
                    {step > s.n ? '✓' : s.n}
                  </span>
                  <span className="hidden sm:block">{s.label}</span>
                </div>
                {i < steps.length - 1 && <div className={cn('w-8 h-0.5 transition-all', step > s.n ? 'bg-[#1a6b3c]' : 'bg-[rgba(20,18,14,.1)]')} />}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl border border-[rgba(20,18,14,.08)] p-8 shadow-[0_4px_24px_rgba(20,18,14,.06)]">

            {/* STEP 1 — Job type */}
            {step === 1 && (
              <div>
                <h2 className="font-display font-bold text-xl text-[#14120e] mb-2 tracking-tight">What type of job is this?</h2>
                <p className="text-[#7a756c] text-sm mb-7">This determines how we match you with the right talent</p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <button onClick={() => setJobType('freelance')}
                    className={cn('p-6 rounded-2xl border-2 text-left transition-all', jobType === 'freelance' ? 'border-[#14120e] bg-[#14120e]' : 'border-[rgba(20,18,14,.1)] hover:border-[rgba(20,18,14,.3)]')}>
                    <div className="text-3xl mb-3">💻</div>
                    <div className={cn('font-bold text-sm mb-1', jobType === 'freelance' ? 'text-white' : 'text-[#14120e]')}>Remote freelance</div>
                    <div className={cn('text-xs leading-relaxed', jobType === 'freelance' ? 'text-white/60' : 'text-[#7a756c]')}>Design, development, marketing, writing — any skill done remotely</div>
                  </button>
                  <button onClick={() => setJobType('onsite')}
                    className={cn('p-6 rounded-2xl border-2 text-left transition-all', jobType === 'onsite' ? 'border-[#14120e] bg-[#14120e]' : 'border-[rgba(20,18,14,.1)] hover:border-[rgba(20,18,14,.3)]')}>
                    <div className="text-3xl mb-3">📍</div>
                    <div className={cn('font-bold text-sm mb-1', jobType === 'onsite' ? 'text-white' : 'text-[#14120e]')}>Onsite worker</div>
                    <div className={cn('text-xs leading-relaxed', jobType === 'onsite' ? 'text-white/60' : 'text-[#7a756c]')}>Driver, mover, general labour — someone who comes to your location</div>
                  </button>
                </div>

                {jobType === 'onsite' && (
                  <div className="mb-6">
                    <div className="text-sm font-semibold text-[#14120e] mb-3">Weight capacity required</div>
                    <div className="grid grid-cols-2 gap-3">
                      {WEIGHT_TIERS.map(t => (
                        <button key={t.tier} onClick={() => set('weightTier', t.tier)}
                          className={cn('p-4 rounded-xl border text-left transition-all', form.weightTier === t.tier ? 'border-[#14120e]' : 'border-[rgba(20,18,14,.08)] hover:border-[rgba(20,18,14,.25)]')}
                          style={form.weightTier === t.tier ? {background:t.bgColor, borderColor:t.color} : {}}>
                          <div className="text-xl mb-1.5">{t.icon}</div>
                          <div className="font-semibold text-sm" style={{color:form.weightTier===t.tier?t.color:'#14120e'}}>{t.label}</div>
                          <div className="text-xs text-[#7a756c]">{t.range} · <strong style={{color:t.color}}>${t.ratePerHour}/hr</strong></div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <button onClick={() => setStep(2)} className="w-full py-3.5 rounded-full bg-[#14120e] text-white font-semibold text-sm hover:bg-[#1a6b3c] transition-all">
                  Continue →
                </button>
              </div>
            )}

            {/* STEP 2 — Details */}
            {step === 2 && (
              <div>
                <h2 className="font-display font-bold text-xl text-[#14120e] mb-2 tracking-tight">Job details</h2>
                <p className="text-[#7a756c] text-sm mb-7">Be specific — better descriptions get better proposals</p>

                <div className="flex flex-col gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-[#3a3630] mb-2">Job title <span className="text-[#c94040]">*</span></label>
                    <input value={form.title} onChange={e => set('title', e.target.value)}
                      placeholder={jobType === 'freelance' ? 'e.g. Senior React Developer for SaaS Dashboard' : 'e.g. 4 Heavy-duty movers needed for warehouse relocation'}
                      className="w-full px-4 py-3 rounded-xl border border-[rgba(20,18,14,.1)] text-sm outline-none focus:border-[rgba(20,18,14,.3)] text-[#14120e] transition-all" />
                  </div>

                  {jobType === 'freelance' && (
                    <div>
                      <label className="block text-sm font-semibold text-[#3a3630] mb-2">Category <span className="text-[#c94040]">*</span></label>
                      <select value={form.category} onChange={e => set('category', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[rgba(20,18,14,.1)] text-sm outline-none focus:border-[rgba(20,18,14,.3)] text-[#14120e] bg-white transition-all">
                        <option value="">Select a category…</option>
                        {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                  )}

                  {jobType === 'onsite' && (
                    <>
                      <div>
                        <label className="block text-sm font-semibold text-[#3a3630] mb-2">Job location <span className="text-[#c94040]">*</span></label>
                        <input value={form.location} onChange={e => set('location', e.target.value)}
                          placeholder="e.g. Guindy Industrial Estate, Chennai"
                          className="w-full px-4 py-3 rounded-xl border border-[rgba(20,18,14,.1)] text-sm outline-none focus:border-[rgba(20,18,14,.3)] transition-all" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-[#3a3630] mb-2">Date needed <span className="text-[#c94040]">*</span></label>
                          <input type="date" value={form.jobDate} onChange={e => set('jobDate', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-[rgba(20,18,14,.1)] text-sm outline-none focus:border-[rgba(20,18,14,.3)] transition-all" />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-[#3a3630] mb-2">Hours needed</label>
                          <input type="number" value={form.hours} onChange={e => set('hours', e.target.value)} placeholder="e.g. 8" min={1}
                            className="w-full px-4 py-3 rounded-xl border border-[rgba(20,18,14,.1)] text-sm outline-none focus:border-[rgba(20,18,14,.3)] transition-all" />
                        </div>
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-[#3a3630] mb-2">Description <span className="text-[#c94040]">*</span></label>
                    <textarea value={form.description} onChange={e => set('description', e.target.value)}
                      rows={5} placeholder={jobType === 'freelance' ? 'Describe the project, what you need, any specific requirements, tech stack, deliverables…' : 'Describe the job, what needs to be moved/done, special requirements, equipment available on site…'}
                      className="w-full px-4 py-3 rounded-xl border border-[rgba(20,18,14,.1)] text-sm outline-none focus:border-[rgba(20,18,14,.3)] resize-none transition-all" />
                    <div className="text-[11px] text-[#b0a99e] text-right mt-1">{form.description.length} characters</div>
                  </div>

                  {jobType === 'freelance' && (
                    <div>
                      <label className="block text-sm font-semibold text-[#3a3630] mb-3">Required skills</label>
                      <div className="flex flex-wrap gap-2">
                        {SKILLS_LIST.map(s => (
                          <button key={s} onClick={() => toggleSkill(s)}
                            className={cn('px-3.5 py-2 rounded-full text-xs font-medium border transition-all', form.skills.includes(s) ? 'bg-[#14120e] text-white border-[#14120e]' : 'bg-[#f5f3ee] text-[#3a3630] border-[rgba(20,18,14,.08)] hover:border-[rgba(20,18,14,.25)]')}>
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={form.isUrgent} onChange={e => set('isUrgent', e.target.checked)} />
                    <div>
                      <div className="text-sm font-semibold text-[#14120e]">Mark as urgent</div>
                      <div className="text-xs text-[#7a756c] mt-0.5">Job will show an "Urgent" badge and appear higher in search results</div>
                    </div>
                  </label>
                </div>

                <div className="flex gap-3 mt-8">
                  <button onClick={() => setStep(1)} className="flex-1 py-3.5 rounded-full border border-[rgba(20,18,14,.1)] text-sm font-medium text-[#3a3630] hover:bg-[#f5f3ee] transition-all">← Back</button>
                  <button onClick={() => setStep(3)} className="flex-1 py-3.5 rounded-full bg-[#14120e] text-white text-sm font-semibold hover:bg-[#1a6b3c] transition-all">Continue →</button>
                </div>
              </div>
            )}

            {/* STEP 3 — Budget */}
            {step === 3 && (
              <div>
                <h2 className="font-display font-bold text-xl text-[#14120e] mb-2 tracking-tight">Budget & timeline</h2>
                <p className="text-[#7a756c] text-sm mb-7">Set a realistic budget — it affects the quality of proposals you'll receive</p>

                {jobType === 'freelance' && (
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-[#3a3630] mb-3">Payment type</label>
                    <div className="flex gap-3">
                      {[{id:'fixed',label:'Fixed price'},{id:'hourly',label:'Hourly rate'}].map(b => (
                        <button key={b.id} onClick={() => set('budgetType', b.id)}
                          className={cn('flex-1 py-3 rounded-xl border text-sm font-semibold transition-all', form.budgetType === b.id ? 'bg-[#14120e] text-white border-[#14120e]' : 'border-[rgba(20,18,14,.1)] text-[#3a3630] hover:border-[rgba(20,18,14,.3)]')}>
                          {b.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#3a3630] mb-2">Min budget ($)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#7a756c] font-medium">$</span>
                      <input type="number" value={form.budgetMin} onChange={e => set('budgetMin', e.target.value)} placeholder="500"
                        className="w-full pl-8 pr-4 py-3 rounded-xl border border-[rgba(20,18,14,.1)] text-sm outline-none focus:border-[rgba(20,18,14,.3)] transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#3a3630] mb-2">Max budget ($)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#7a756c] font-medium">$</span>
                      <input type="number" value={form.budgetMax} onChange={e => set('budgetMax', e.target.value)} placeholder="1500"
                        className="w-full pl-8 pr-4 py-3 rounded-xl border border-[rgba(20,18,14,.1)] text-sm outline-none focus:border-[rgba(20,18,14,.3)] transition-all" />
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-semibold text-[#3a3630] mb-2">Deadline (optional)</label>
                  <input type="date" value={form.deadline} onChange={e => set('deadline', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[rgba(20,18,14,.1)] text-sm outline-none focus:border-[rgba(20,18,14,.3)] transition-all" />
                </div>

                {/* Budget tips */}
                <div className="bg-[#e5f0fa] rounded-xl p-4 mb-8 border border-[rgba(26,90,138,.15)]">
                  <div className="text-xs font-bold text-[#1a5a8a] mb-2">💡 Budget tips</div>
                  <ul className="text-xs text-[#1a5a8a] space-y-1 leading-relaxed">
                    <li>• Competitive budgets attract 3× more proposals</li>
                    <li>• Experienced freelancers typically charge $40–$100/hr</li>
                    <li>• Fixed price works best for well-defined deliverables</li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="flex-1 py-3.5 rounded-full border border-[rgba(20,18,14,.1)] text-sm font-medium text-[#3a3630] hover:bg-[#f5f3ee] transition-all">← Back</button>
                  <button onClick={() => setStep(4)} className="flex-1 py-3.5 rounded-full bg-[#14120e] text-white text-sm font-semibold hover:bg-[#1a6b3c] transition-all">Review job →</button>
                </div>
              </div>
            )}

            {/* STEP 4 — Review */}
            {step === 4 && (
              <div>
                <h2 className="font-display font-bold text-xl text-[#14120e] mb-2 tracking-tight">Review & post</h2>
                <p className="text-[#7a756c] text-sm mb-7">Check everything looks correct before publishing</p>

                <div className="bg-[#f5f3ee] rounded-2xl p-6 mb-8 flex flex-col gap-4">
                  {[
                    { label: 'Job type', val: jobType === 'freelance' ? 'Remote freelance' : 'Onsite worker' },
                    { label: 'Title', val: form.title || '—' },
                    { label: 'Category', val: form.category || (jobType === 'onsite' ? `${form.weightTier} duty` : '—') },
                    { label: 'Budget', val: form.budgetMin && form.budgetMax ? `$${form.budgetMin} – $${form.budgetMax} (${form.budgetType})` : '—' },
                    { label: 'Skills', val: form.skills.length > 0 ? form.skills.join(', ') : '—' },
                    { label: 'Deadline', val: form.deadline || 'No deadline' },
                    { label: 'Location', val: form.location || (jobType === 'freelance' ? 'Remote' : '—') },
                    { label: 'Urgent', val: form.isUrgent ? 'Yes' : 'No' },
                  ].map(r => (
                    <div key={r.label} className="flex gap-4">
                      <div className="w-24 text-xs font-bold text-[#7a756c] uppercase tracking-wider shrink-0 pt-0.5">{r.label}</div>
                      <div className="text-sm text-[#14120e]">{r.val}</div>
                    </div>
                  ))}
                  {form.description && (
                    <div className="flex gap-4">
                      <div className="w-24 text-xs font-bold text-[#7a756c] uppercase tracking-wider shrink-0 pt-0.5">Description</div>
                      <div className="text-sm text-[#14120e] leading-relaxed line-clamp-3">{form.description}</div>
                    </div>
                  )}
                </div>

                <div className="flex items-start gap-3 p-4 bg-[#e8f5ee] rounded-xl border border-[rgba(26,107,60,.2)] mb-8">
                  <span className="text-lg mt-0.5">🔒</span>
                  <div className="text-xs text-[#1a6b3c] leading-relaxed">
                    <strong>Escrow protected.</strong> Your payment is only charged when you approve the delivered work. You can raise a dispute at any time if you're not satisfied.
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(3)} className="flex-1 py-3.5 rounded-full border border-[rgba(20,18,14,.1)] text-sm font-medium text-[#3a3630] hover:bg-[#f5f3ee] transition-all">← Edit</button>
                  <button onClick={() => setSubmitted(true)} className="flex-1 py-3.5 rounded-full bg-[#1a6b3c] text-white text-sm font-bold hover:bg-[#14120e] transition-all">
                    Post job now 🚀
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
