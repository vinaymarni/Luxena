import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Lato } from 'next/font/google'
import { Providers } from '@/components/providers'

import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-lato',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Lumiere Salon | Premium Beauty & Spa Experience',
  description:
    'Discover luxury haircuts, spa treatments, facials, and bridal packages at Lumiere Salon. Book your appointment today for a transformative beauty experience.',
}

export const viewport: Viewport = {
  themeColor: '#5C3D1E',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable}`}>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
