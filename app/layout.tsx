import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'AislePilot',
  description: 'Smart AI-Powered Retail Assistant',
  keywords: 'AislePilot, AI shopping, AR navigation, retail technology, predictive stock alerts, Walmart Sparkathon',
  authors: [{ name: 'Offbeats', url: 'https://linkedin.com/company/offbeats' }],
  creator: 'Offbeats',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
