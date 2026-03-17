import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f5f3ee] flex flex-col items-center justify-center px-6 text-center">
      <div className="font-display font-black text-[120px] text-[#14120e] leading-none tracking-tighter opacity-10 mb-2">404</div>
      <div className="text-5xl -mt-8 mb-6">🔍</div>
      <h1 className="font-display font-black text-2xl text-[#14120e] tracking-tight mb-3">Page not found</h1>
      <p className="text-[#7a756c] text-sm mb-8 max-w-sm">The page you're looking for doesn't exist or has been moved.</p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/"><button className="px-6 py-2.5 rounded-full bg-[#14120e] text-white text-sm font-semibold hover:bg-[#1a6b3c] transition-all">Back to homepage</button></Link>
        <Link href="/freelancers"><button className="px-6 py-2.5 rounded-full border border-[rgba(20,18,14,.15)] text-sm font-medium text-[#3a3630] hover:bg-white transition-all">Browse freelancers</button></Link>
      </div>
    </div>
  )
}
