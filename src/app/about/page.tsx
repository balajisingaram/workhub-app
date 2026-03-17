import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'About Us' }
export const dynamic = 'force-dynamic'

const TEAM = [
  { name: 'Balaji S.',    role: 'Co-founder & CEO',        photo: 'https://randomuser.me/api/portraits/men/32.jpg',  bio: 'Ex-Swiggy. Passionate about connecting workers with opportunity.' },
  { name: 'Priya M.',     role: 'Co-founder & CTO',        photo: 'https://randomuser.me/api/portraits/women/44.jpg', bio: 'Ex-Flipkart engineer. Builds the systems that power GigHub.' },
  { name: 'Rajan K.',     role: 'Head of Operations',      photo: 'https://randomuser.me/api/portraits/men/75.jpg',  bio: 'Ensures every gig worker gets paid on time, every time.' },
  { name: 'Anitha R.',    role: 'Head of Product',         photo: 'https://randomuser.me/api/portraits/women/68.jpg', bio: 'Obsessed with making hiring and finding work frictionless.' },
]

const VALUES = [
  { icon: '🤝', title: 'Fair work, fair pay',        desc: 'We believe every worker deserves transparency — clear rates, secure payments, and on-time payouts. Always.' },
  { icon: '🔒', title: 'Trust & safety first',       desc: 'Every profile is verified. Every payment is protected by escrow. Every check-in is GPS-verified.' },
  { icon: '🌍', title: 'Built for emerging markets', desc: 'Designed from the ground up for India, UAE, Canada and beyond — local currency, local languages, local needs.' },
  { icon: '⚡', title: 'Speed matters',              desc: 'Post a job, get proposals within minutes. Browse workers, book within seconds. We eliminate the friction.' },
]

export default function AboutPage() {
  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center nav-blur border-b border-[var(--border2)]">
        <div className="max-w-[1100px] mx-auto px-5 lg:px-10 w-full flex items-center gap-3">
          <Link href="/" className="font-display font-black text-[20px] tracking-tight text-[var(--ink)]">Gig<span className="text-[var(--accent)]">Hub</span></Link>
          <div className="flex-1" />
          <Link href="/hire"><button className="px-4 py-2 rounded-full bg-[var(--ink)] text-white text-sm font-semibold hover:bg-[var(--accent)] transition-smooth">Get started</button></Link>
        </div>
      </nav>

      <main className="pt-16">
        {/* Hero */}
        <section className="bg-[var(--ink)] py-20 sm:py-28 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{background:'radial-gradient(ellipse 600px 400px at 70% 50%, rgba(26,107,60,.15) 0%, transparent 70%)'}} />
          <div className="max-w-[1100px] mx-auto px-5 lg:px-10 relative z-10">
            <div className="max-w-2xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[rgba(26,107,60,.25)] text-[#7ee8a2] text-xs font-bold tracking-widest uppercase mb-6">Our story</span>
              <h1 className="font-display font-black text-white mb-5" style={{fontSize:'clamp(32px,6vw,64px)',letterSpacing:'-0.03em',lineHeight:1.05}}>
                We&apos;re building the future of <em className="text-[#7ee8a2] not-italic">gig work</em>
              </h1>
              <p className="text-white/60 text-base sm:text-lg leading-relaxed max-w-xl">
                GigHub started in Bangalore in 2024 with a simple belief: every skilled person deserves an easy way to find work, and every business deserves an easy way to find talent.
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-[1100px] mx-auto px-5 lg:px-10">
            <div className="grid sm:grid-cols-2 gap-12 sm:gap-20 items-center">
              <div>
                <h2 className="font-display font-black text-[var(--ink)] mb-4" style={{fontSize:'clamp(24px,4vw,42px)',letterSpacing:'-0.025em'}}>Our mission</h2>
                <p className="text-[var(--ink3)] text-sm sm:text-base leading-relaxed mb-5">
                  To create the most trusted platform for gig work in emerging markets — starting with India, expanding to UAE, Canada and the US.
                </p>
                <p className="text-[var(--ink3)] text-sm sm:text-base leading-relaxed mb-6">
                  We connect freelancers, gig workers and drivers with the clients who need them — with verified identities, secure payments, and GPS-verified check-ins.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[{val:'50K+',lbl:'Workers registered'},{val:'12K+',lbl:'Jobs completed'},{val:'4',lbl:'Countries'},{val:'98%',lbl:'Satisfaction rate'}].map(s => (
                    <div key={s.lbl} className="bg-[var(--bg)] rounded-xl p-4">
                      <div className="font-display font-black text-2xl text-[var(--accent)] tracking-tight">{s.val}</div>
                      <div className="text-xs text-[var(--ink3)] mt-0.5">{s.lbl}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80" alt="Team working" className="w-full rounded-2xl sm:rounded-3xl object-cover aspect-square sm:aspect-auto sm:h-96" />
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-medium border border-[var(--border2)]">
                  <div className="font-display font-black text-xl text-[var(--accent)]">2024</div>
                  <div className="text-xs text-[var(--ink3)]">Founded in Bangalore</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 sm:py-20 bg-[var(--bg)]">
          <div className="max-w-[1100px] mx-auto px-5 lg:px-10">
            <div className="text-center mb-12">
              <h2 className="font-display font-black text-[var(--ink)] mb-3" style={{fontSize:'clamp(24px,4vw,42px)',letterSpacing:'-0.025em'}}>What we stand for</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {VALUES.map(v => (
                <div key={v.title} className="bg-white rounded-2xl p-6 sm:p-7 border border-[var(--border2)] flex gap-4">
                  <div className="text-3xl flex-shrink-0">{v.icon}</div>
                  <div>
                    <div className="font-semibold text-[var(--ink)] mb-2">{v.title}</div>
                    <p className="text-sm text-[var(--ink3)] leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-[1100px] mx-auto px-5 lg:px-10">
            <div className="text-center mb-12">
              <h2 className="font-display font-black text-[var(--ink)] mb-3" style={{fontSize:'clamp(24px,4vw,42px)',letterSpacing:'-0.025em'}}>Meet the team</h2>
              <p className="text-[var(--ink3)] text-sm">The people building GigHub</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
              {TEAM.map(m => (
                <div key={m.name} className="text-center">
                  <img src={m.photo} alt={m.name} className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover mx-auto mb-3 border-2 border-[var(--border2)]"
                    onError={e => { (e.target as any).src = `https://ui-avatars.com/api/?name=${m.name}&background=ece9e3&color=7a756c` }} />
                  <div className="font-semibold text-sm text-[var(--ink)]">{m.name}</div>
                  <div className="text-xs text-[var(--accent)] font-medium mb-1.5">{m.role}</div>
                  <p className="text-xs text-[var(--ink3)] leading-relaxed hidden sm:block">{m.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[var(--bg)]">
          <div className="max-w-[600px] mx-auto px-5 text-center">
            <h2 className="font-display font-black text-[var(--ink)] mb-3" style={{fontSize:'clamp(22px,4vw,36px)',letterSpacing:'-0.02em'}}>Join us on this journey</h2>
            <p className="text-[var(--ink3)] text-sm mb-7">Whether you&apos;re hiring or looking for work — GigHub is for you.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/register"><button className="px-7 py-3.5 rounded-full bg-[var(--ink)] text-white font-semibold text-sm hover:bg-[var(--accent)] transition-smooth">Get started free</button></Link>
              <Link href="/contact"><button className="px-7 py-3.5 rounded-full border border-[var(--border)] text-sm font-medium text-[var(--ink2)] hover:bg-white transition-smooth">Contact us</button></Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
