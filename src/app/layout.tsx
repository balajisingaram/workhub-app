import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: { default: 'WorkHub — Hire Talent. Get Work Done.', template: '%s | WorkHub' },
  description: 'Freelancers for remote work, onsite staff for field operations, and enterprise staffing — all on one platform.',
  keywords: ['freelance', 'hire', 'workers', 'onsite', 'staffing', 'agency'],
  themeColor: '#1a6b3c',
  openGraph: {
    title: 'WorkHub — Hire Talent. Get Work Done.',
    description: 'The platform for hiring freelancers, onsite workers, and managing enterprise staffing.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,700;0,9..144,900;1,9..144,400&family=DM+Sans:ital,opsz,wght@0,9..18,300;0,9..18,400;0,9..18,500;0,9..18,600;1,9..18,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[var(--bg)] text-[var(--ink)] antialiased">
        {children}
      </body>
    </html>
  )
}
