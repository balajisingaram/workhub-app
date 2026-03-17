import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'
import { LocationProvider } from '@/context/LocationContext'

export const viewport: Viewport = {
  themeColor: '#1a6b3c',
}

export const metadata: Metadata = {
  title: { default: 'GigHub — Hire Talent. Find Work.', template: '%s | GigHub' },
  description: 'Freelancers for remote work, gig workers for onsite tasks, and drivers — all on one platform.',
  keywords: ['freelance', 'gig work', 'hire', 'workers', 'drivers', 'staffing'],
  openGraph: {
    title: 'GigHub — Hire Talent. Find Work.',
    description: 'The platform for hiring freelancers, gig workers and drivers.',
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
        <LocationProvider>
          {children}
        </LocationProvider>
      </body>
    </html>
  )
}
