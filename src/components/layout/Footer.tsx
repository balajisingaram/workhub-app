import Link from 'next/link'

const footerLinks = {
  'For clients':  ['How to hire', 'Post a job', 'Browse talent', 'Enterprise', 'Pricing'],
  'For talent':   ['How to get hired', 'Create profile', 'Find jobs', 'Onsite workers', 'Earnings'],
  'Company':      ['About us', 'Blog', 'Careers', 'Press', 'Contact'],
  'Support':      ['Help centre', 'Trust & safety', 'Dispute resolution', 'Terms of service', 'Privacy policy'],
}

export default function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-white">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-20 pb-0">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 pb-16">
          {/* Brand */}
          <div className="col-span-2">
            <div className="font-display font-black text-[22px] tracking-tight mb-4">
              Work<span className="text-[var(--accent2)]">Hub</span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed max-w-[240px] mb-6">
              The platform for hiring freelancers, onsite workers, and managing enterprise staffing — all in one place.
            </p>
            <div className="flex gap-2">
              {['𝕏', 'in', 'f', '▶'].map(s => (
                <button key={s}
                  className="w-9 h-9 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center text-sm text-white/60 hover:bg-white/15 hover:text-white transition-smooth">
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-[11px] font-bold tracking-[.08em] uppercase text-white/30 mb-4">{heading}</h4>
              {links.map(l => (
                <Link key={l} href="#"
                  className="block text-sm text-white/60 mb-2.5 hover:text-white transition-smooth">
                  {l}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">© 2025 WorkHub Inc. All rights reserved.</p>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Cookies', 'Accessibility'].map(l => (
              <Link key={l} href="#" className="text-xs text-white/30 hover:text-white/60 transition-smooth">{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
