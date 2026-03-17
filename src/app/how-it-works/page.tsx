import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'How It Works' }

const FLOWS = [
  {
    role: 'Client',
    icon: '💼',
    color: '#1a6b3c',
    bg: '#e8f5ee',
    title: 'Hiring on GigHub',
    steps: [
      { n:1, icon:'📝', title:'Post a job',         desc:'Describe what you need — a remote freelancer, onsite gig worker or driver. Set your budget, deadline and location if needed. Takes under 3 minutes.' },
      { n:2, icon:'📨', title:'Receive proposals',  desc:'Verified workers apply to your job. Browse their profiles, ratings, portfolio and past reviews. Chat before you commit.' },
      { n:3, icon:'🎥', title:'Interview (optional)',desc:'Book a free Zoom or Google Meet interview directly through GigHub. Schedule at a time that works for you.' },
      { n:4, icon:'🔒', title:'Hire & pay securely',desc:'Accept a proposal. Your payment is authorized but not charged yet — held safely in escrow until you approve the work.' },
      { n:5, icon:'✅', title:'Approve & release',  desc:"Review the delivered work. If you're happy, approve it — funds are instantly released to the worker. Not happy? Raise a dispute." },
      { n:6, icon:'⭐', title:'Leave a review',      desc:'Rate your experience. Your review helps other clients and builds the worker\'s reputation on the platform.' },
    ],
  },
  {
    role: 'Freelancer',
    icon: '💻',
    color: '#5c44c2',
    bg: '#edeafa',
    title: 'Finding work as a freelancer',
    steps: [
      { n:1, icon:'👤', title:'Create your profile', desc:'Add your skills, hourly rate, portfolio and a short bio. Verified profiles get 3× more views. Takes about 10 minutes.' },
      { n:2, icon:'🔔', title:'Get job alerts',       desc:'Receive instant notifications when jobs matching your skills are posted. Set your preferences to only see relevant work.' },
      { n:3, icon:'📨', title:'Submit proposals',     desc:'Write a personalised cover letter, set your rate and proposed timeline. Quality over quantity — focused proposals win jobs.' },
      { n:4, icon:'💬', title:'Chat with the client', desc:'Discuss requirements, clarify scope, share samples. Build trust before starting.' },
      { n:5, icon:'🚀', title:'Deliver great work',   desc:'Complete the project to the agreed specification. Upload deliverables directly through GigHub.' },
      { n:6, icon:'💸', title:'Get paid on time',     desc:'Client approves your work — payment is instantly released to your GigHub wallet. Withdraw to your bank anytime.' },
    ],
  },
  {
    role: 'Gig Worker',
    icon: '🔧',
    color: '#c2620a',
    bg: '#fdf0e0',
    title: 'Finding onsite gig work',
    steps: [
      { n:1, icon:'📋', title:'Register & pick tier', desc:'Choose your weight capacity tier (Light, Medium, Heavy or Extreme). Upload your ID for admin verification.' },
      { n:2, icon:'📍', title:'Set your radius',       desc:"Set how far you're willing to travel. Set your available days and hours. Your location is used for GPS matching — not shown publicly."
      { n:3, icon:'📲', title:'Receive job alerts',    desc:'Get notified when nearby jobs match your tier and availability. First come first served for urgent jobs.' },
      { n:4, icon:'📞', title:'Contact details revealed',desc:'Once a client pays the booking deposit, your contact details are revealed to them (and vice versa).' },
      { n:5, icon:'📍', title:'GPS check-in on arrival',desc:'When you arrive at the job site, check in via GPS or QR code scan. This confirms your arrival to the client.' },
      { n:6, icon:'💸', title:'Job done — get paid',   desc:'Complete the job. Client approves. Payment is auto-released to your wallet. Withdraw weekly.' },
    ],
  },
  {
    role: 'Driver',
    icon: '🚗',
    color: '#1a5a8a',
    bg: '#e5f0fa',
    title: 'Finding driving jobs',
    steps: [
      { n:1, icon:'🚗', title:'Register your vehicle',  desc:'Add your vehicle type (bike, car, van, truck). Upload driving licence and vehicle registration for verification.' },
      { n:2, icon:'📍', title:'Set your service area',  desc:'Set your radius and available hours. You only see jobs within your range.' },
      { n:3, icon:'📲', title:'Get matched to jobs',    desc:'Clients post delivery, logistics or cab jobs. You get notified when a job matches your vehicle and location.' },
      { n:4, icon:'🔒', title:'Identity revealed on booking',desc:'Your full name and photo are only revealed to the client after they confirm the booking and pay the deposit.' },
      { n:5, icon:'✅', title:'Complete the trip',       desc:'Pick up, deliver or transport as agreed. Client confirms completion through the app.' },
      { n:6, icon:'💸', title:'Get paid',                desc:'Payment released to your wallet immediately on job completion. Flexible weekly withdrawals.' },
    ],
  },
]

export default function HowItWorksPage() {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center nav-blur border-b border-[var(--border2)]">
        <div className="max-w-[1100px] mx-auto px-5 lg:px-10 w-full flex items-center gap-3">
          <Link href="/" className="font-display font-black text-[20px] tracking-tight text-[var(--ink)]">Gig<span className="text-[var(--accent)]">Hub</span></Link>
          <div className="flex-1" />
          <Link href="/hire"><button className="px-4 py-2 rounded-full bg-[var(--ink)] text-white text-sm font-semibold hover:bg-[var(--accent)] transition-smooth">Get started</button></Link>
        </div>
      </nav>

      <main className="pt-16">
        {/* Hero */}
        <section className="bg-[var(--bg)] py-16 sm:py-20 text-center">
          <div className="max-w-[700px] mx-auto px-5">
            <h1 className="font-display font-black text-[var(--ink)] mb-4" style={{fontSize:'clamp(32px,6vw,60px)',letterSpacing:'-0.03em'}}>How GigHub works</h1>
            <p className="text-[var(--ink3)] text-base sm:text-lg leading-relaxed">Simple steps for clients, freelancers, gig workers and drivers. Everything is transparent — no hidden fees, no surprises.</p>
          </div>
        </section>

        {/* Jump links */}
        <div className="bg-white border-y border-[var(--border2)] sticky top-16 z-20">
          <div className="max-w-[1100px] mx-auto px-5 lg:px-10">
            <div className="flex gap-1 overflow-x-auto scrollbar-none py-2">
              {FLOWS.map(f => (
                <a key={f.role} href={`#${f.role.toLowerCase().replace(' ','-')}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-smooth text-[var(--ink3)] hover:text-[var(--ink)] hover:bg-[var(--bg)]">
                  {f.icon} {f.role}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Each flow */}
        {FLOWS.map((flow, fi) => (
          <section key={flow.role} id={flow.role.toLowerCase().replace(' ','-')} className={fi % 2 === 0 ? 'bg-white py-16 sm:py-20' : 'bg-[var(--bg)] py-16 sm:py-20'}>
            <div className="max-w-[1100px] mx-auto px-5 lg:px-10">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0" style={{background:flow.bg}}>{flow.icon}</div>
                <div>
                  <div className="font-display font-black text-xl sm:text-2xl text-[var(--ink)] tracking-tight">{flow.title}</div>
                  <div className="text-sm font-semibold" style={{color:flow.color}}>For {flow.role}s</div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {flow.steps.map(step => (
                  <div key={step.n} className="bg-white rounded-2xl border border-[var(--border2)] p-5 sm:p-6 relative overflow-hidden" style={{background: fi%2===0?'var(--bg)':'white'}}>
                    <div className="absolute top-4 right-4 font-display font-black text-4xl text-[var(--border2)]" style={{lineHeight:1}}>{step.n}</div>
                    <div className="text-2xl mb-3">{step.icon}</div>
                    <div className="font-semibold text-sm sm:text-base text-[var(--ink)] mb-2">{step.title}</div>
                    <p className="text-xs sm:text-sm text-[var(--ink3)] leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link href={flow.role === 'Client' ? '/hire' : '/find-jobs'}>
                  <button className="px-7 py-3 rounded-full text-white text-sm font-semibold transition-smooth" style={{background:flow.color}}>
                    {flow.role === 'Client' ? 'Start hiring →' : `Find work as a ${flow.role.toLowerCase()} →`}
                  </button>
                </Link>
              </div>
            </div>
          </section>
        ))}

        {/* Safety */}
        <section className="py-16 sm:py-20 bg-[var(--ink)]">
          <div className="max-w-[1100px] mx-auto px-5 lg:px-10">
            <div className="text-center mb-12">
              <h2 className="font-display font-black text-white mb-3" style={{fontSize:'clamp(24px,4vw,42px)',letterSpacing:'-0.025em'}}>Built-in trust & safety</h2>
              <p className="text-white/50 text-sm sm:text-base max-w-lg mx-auto">Every transaction on GigHub is protected by multiple layers of security</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {icon:'🔒',title:'Escrow payments',desc:'Client funds held until work approved'},
                {icon:'🪪',title:'KYC verification',desc:'All workers ID-verified before going live'},
                {icon:'📍',title:'GPS check-in',desc:'Onsite workers verify arrival at job site'},
                {icon:'⭐',title:'Review system',desc:'Real reviews from real verified jobs only'},
              ].map(s => (
                <div key={s.title} className="bg-white/8 rounded-2xl p-5 sm:p-6 border border-white/10">
                  <div className="text-2xl sm:text-3xl mb-3">{s.icon}</div>
                  <div className="font-semibold text-sm sm:text-base text-white mb-1">{s.title}</div>
                  <p className="text-xs text-white/50 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-[700px] mx-auto px-5">
            <h2 className="font-display font-black text-[var(--ink)] mb-10 text-center" style={{fontSize:'clamp(22px,4vw,38px)',letterSpacing:'-0.02em'}}>Common questions</h2>
            <div className="flex flex-col gap-4">
              {[
                {q:'How long does it take to get hired?', a:'Most freelancers receive their first proposal within 2 hours of posting a job. Gig workers can be booked same-day for urgent tasks.'},
                {q:'What happens if I\'m not satisfied with the work?', a:'You can raise a dispute before releasing payment. Our team reviews both sides and makes a fair decision. Funds stay in escrow until resolved.'},
                {q:'When do workers get paid?', a:'Payment is released to the worker\'s GigHub wallet immediately when the client approves. Workers can withdraw to their bank weekly.'},
                {q:'Is my personal information safe?', a:'Gig workers and drivers only have their identity revealed to a client after the client pays the booking deposit. Your contact details are never shared before then.'},
                {q:'What currencies are supported?', a:'INR for India, USD for USA, CAD for Canada, AED for UAE. Prices are shown automatically in your local currency.'},
              ].map(f => (
                <div key={f.q} className="border border-[var(--border2)] rounded-2xl overflow-hidden">
                  <div className="p-5"><div className="font-semibold text-sm sm:text-base text-[var(--ink)] mb-2">{f.q}</div><p className="text-xs sm:text-sm text-[var(--ink3)] leading-relaxed">{f.a}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
