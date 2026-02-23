'use client'

import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50">
      <Navbar />
      <Hero />
    </main>
  )
}
