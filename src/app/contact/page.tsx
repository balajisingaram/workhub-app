import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[#f5f3ee]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-20">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#e8f5ee] text-[#1a6b3c] text-xs font-bold tracking-widest uppercase mb-6">Contact us</span>
              <h1 className="font-display font-black text-[#14120e] mb-5" style={{fontSize:'clamp(32px,5vw,56px)',letterSpacing:'-0.025em',lineHeight:'1.05'}}>
                Let's talk
              </h1>
              <p className="text-[#7a756c] text-base leading-relaxed mb-10 max-w-md">
                Have a question about WorkHub? Want to discuss an enterprise plan? We usually respond within a few hours.
              </p>
              <div className="flex flex-col gap-5">
                {[
                  { icon:'📧', t:'Email',          v:'hello@workhub.com' },
                  { icon:'💬', t:'Live chat',      v:'Available Mon–Fri, 9am–6pm IST' },
                  { icon:'📞', t:'Enterprise sales', v:'+91 98765 43210' },
                ].map(c => (
                  <div key={c.t} className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white border border-[rgba(20,18,14,.08)] flex items-center justify-center text-xl shrink-0">{c.icon}</div>
                    <div>
                      <div className="font-semibold text-sm text-[#14120e]">{c.t}</div>
                      <div className="text-sm text-[#7a756c]">{c.v}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-3xl border border-[rgba(20,18,14,.08)] p-8 shadow-[0_4px_24px_rgba(20,18,14,.06)]">
              <h2 className="font-display font-bold text-xl text-[#14120e] mb-7 tracking-tight">Send us a message</h2>
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-[#3a3630] mb-1.5">First name</label>
                    <input placeholder="John" className="w-full px-4 py-3 rounded-xl border border-[rgba(20,18,14,.1)] text-sm outline-none focus:border-[rgba(20,18,14,.25)] transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#3a3630] mb-1.5">Last name</label>
                    <input placeholder="Smith" className="w-full px-4 py-3 rounded-xl border border-[rgba(20,18,14,.1)] text-sm outline-none focus:border-[rgba(20,18,14,.25)] transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#3a3630] mb-1.5">Email</label>
                  <input type="email" placeholder="you@example.com" className="w-full px-4 py-3 rounded-xl border border-[rgba(20,18,14,.1)] text-sm outline-none focus:border-[rgba(20,18,14,.25)] transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#3a3630] mb-1.5">Subject</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-[rgba(20,18,14,.1)] text-sm outline-none focus:border-[rgba(20,18,14,.25)] bg-white transition-all">
                    {['General enquiry','Enterprise sales','Technical support','Billing','Partnership','Report an issue'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#3a3630] mb-1.5">Message</label>
                  <textarea rows={4} placeholder="Tell us how we can help…" className="w-full px-4 py-3 rounded-xl border border-[rgba(20,18,14,.1)] text-sm outline-none focus:border-[rgba(20,18,14,.25)] resize-none transition-all" />
                </div>
                <button className="w-full py-3.5 rounded-full bg-[#14120e] text-white font-semibold text-sm hover:bg-[#1a6b3c] transition-all">
                  Send message →
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
