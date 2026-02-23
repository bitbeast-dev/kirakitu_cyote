import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kirakitu Kids Toys',
  description: 'Explore our world of fun and learning',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
