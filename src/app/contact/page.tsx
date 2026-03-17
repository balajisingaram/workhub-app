'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({name:'',email:'',subject:'General enquiry',message:''})
  function set(k:string,v:string){setForm(f=>({...f,[k]:v}))}

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center nav-blur border-b border-[var(--border2)]">
        <div className="max-w-[1100px] mx-auto px-5 lg:px-10 w-full flex items-center gap-3">
          <Link href="/" className="font-display font-black text-[20px] tracking-tight text-[var(--ink)]">Gig<span className="text-[var(--accent)]">Hub</span></Link>
          <div className="flex-1" />
          <Link href="/register"><button className="px-4 py-2 rounded-full bg-[var(--ink)] text-white text-sm font-semibold hover:bg-[var(--accent)] transition-smooth">Get started</button></Link>
        </div>
      </nav>

      <main className="pt-16 min-h-screen bg-[#f5f3ee]">
        <div className="max-w-[1100px] mx-auto px-5 lg:px-10 py-16 sm:py-20">
          <div className="grid sm:grid-cols-2 gap-12 sm:gap-20 items-start">

            {/* Left */}
            <div>
              <h1 className="font-display font-black text-[var(--ink)] mb-4" style={{fontSize:'clamp(28px,5vw,52px)',letterSpacing:'-0.025em',lineHeight:1.1}}>Let's talk</h1>
              <p className="text-[var(--ink3)] text-sm sm:text-base leading-relaxed mb-10 max-w-sm">Have a question about GigHub? Need help with your account? We respond within a few hours.</p>

              <div className="flex flex-col gap-5">
                {[
                  {icon:'📧',title:'Email',value:'hello@gighub.com',sub:'We reply within 4 hours'},
                  {icon:'💬',title:'Live chat',value:'Available Mon–Fri, 9am–6pm IST',sub:'Click the chat bubble below'},
                  {icon:'📞',title:'Sales',value:'+91 98765 43210',sub:'For Business Plus enquiries'},
                ].map(c => (
                  <div key={c.title} className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white border border-[var(--border2)] flex items-center justify-center text-xl flex-shrink-0">{c.icon}</div>
                    <div>
                      <div className="font-semibold text-sm text-[var(--ink)]">{c.title}</div>
                      <div className="text-sm text-[var(--accent)]">{c.value}</div>
                      <div className="text-xs text-[var(--ink3)]">{c.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Countries */}
              <div className="mt-10">
                <div className="text-xs font-bold text-[var(--ink3)] uppercase tracking-widest mb-4">We operate in</div>
                <div className="grid grid-cols-2 gap-3">
                  {[{flag:'🇮🇳',name:'India',city:'Bangalore'},{flag:'🇺🇸',name:'USA',city:'New York'},{flag:'🇨🇦',name:'Canada',city:'Toronto'},{flag:'🇦🇪',name:'UAE',city:'Dubai'}].map(c => (
                    <div key={c.name} className="flex items-center gap-2.5 bg-white rounded-xl p-3 border border-[var(--border2)]">
                      <span className="text-xl">{c.flag}</span>
                      <div><div className="font-semibold text-xs text-[var(--ink)]">{c.name}</div><div className="text-[11px] text-[var(--ink3)]">{c.city}</div></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right form */}
            {sent ? (
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[var(--border2)] text-center shadow-soft">
                <div className="text-5xl mb-4">✅</div>
                <h2 className="font-display font-bold text-xl text-[var(--ink)] mb-2">Message sent!</h2>
                <p className="text-sm text-[var(--ink3)] mb-6">We'll get back to you at <strong>{form.email}</strong> within 4 hours.</p>
                <button onClick={() => {setSent(false);setForm({name:'',email:'',subject:'General enquiry',message:''})}}
                  className="px-6 py-2.5 rounded-full bg-[var(--ink)] text-white text-sm font-semibold hover:bg-[var(--accent)] transition-smooth">
                  Send another message
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[var(--border2)] shadow-soft">
                <h2 className="font-display font-bold text-xl text-[var(--ink)] mb-6 tracking-tight">Send us a message</h2>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[var(--ink2)] mb-1.5">Your name</label>
                      <input value={form.name} onChange={e=>set('name',e.target.value)} placeholder="John Smith" className="w-full px-4 py-3 rounded-xl border border-[rgba(20,18,14,.1)] text-sm outline-none focus:border-[rgba(20,18,14,.3)] transition-smooth" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[var(--ink2)] mb-1.5">Email</label>
                      <input type="email" value={form.email} onChange={e=>set('email',e.target.value)} placeholder="you@email.com" className="w-full px-4 py-3 rounded-xl border border-[rgba(20,18,14,.1)] text-sm outline-none focus:border-[rgba(20,18,14,.3)] transition-smooth" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[var(--ink2)] mb-1.5">Subject</label>
                    <select value={form.subject} onChange={e=>set('subject',e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[rgba(20,18,14,.1)] text-sm outline-none focus:border-[rgba(20,18,14,.3)] bg-white transition-smooth">
                      {['General enquiry','Business Plus / Sales','Technical support','Billing & payments','Report an issue','Partnership'].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[var(--ink2)] mb-1.5">Message</label>
                    <textarea value={form.message} onChange={e=>set('message',e.target.value)} rows={5} placeholder="Tell us how we can help…" className="w-full px-4 py-3 rounded-xl border border-[rgba(20,18,14,.1)] text-sm outline-none focus:border-[rgba(20,18,14,.3)] resize-none transition-smooth" />
                  </div>
                  <button onClick={() => {if(form.name&&form.email&&form.message) setSent(true)}}
                    className="w-full py-3.5 rounded-full bg-[var(--ink)] text-white font-semibold text-sm hover:bg-[var(--accent)] transition-smooth">
                    Send message →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
