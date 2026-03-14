import type { Metadata } from 'next'
import { Urbanist, Syne } from 'next/font/google'
import './globals.css'

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-urbanist',
})

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
})

export const metadata: Metadata = {
  title: 'United Mississippi Bank - Premium Banking Reimagined',
  description: 'Experience the future of financial services with United Mississippi Bank',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${urbanist.variable} ${syne.variable}`}>{children}</body>
    </html>
  )
}