'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, User, Heart, ShoppingCart, Menu, Search, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const [cartCount] = useState(3)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'admin123') {
      localStorage.setItem('adminAuth', 'true')
      setShowLoginModal(false)
      router.push('/admin')
    } else {
      alert('Invalid password')
    }
  }

  return (
    <header className="w-full bg-white shadow-md">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" style={{ color: '#50a2ff' }} />
              Deliver to Rwanda
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <Phone className="w-3 h-3" style={{ color: '#50a2ff' }} />
              +250 786127865
            </span>
           
          </div>
          
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex-shrink-0">
              <img src="/logo.png" alt="KIRAKITU" className="h-12 lg:h-14 object-contain" />
            </a>

            {/* Search Bar */}
            <div className="flex-1 max-w-3xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#50a2ff' }} />
                <input
                  type="search"
                  placeholder="Search for toys, games, and more..."
                  className="w-full px-4 py-3 pl-12 pr-4 bg-gray-50 border-2 rounded-full focus:bg-white focus:outline-none transition-all text-sm"
                  style={{ borderColor: '#50a2ff' }}
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center">
              <button onClick={() => setShowLoginModal(true)} className="hidden lg:flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition-colors">
                <User className="w-5 h-5" style={{ color: '#50a2ff' }} />
              </button>

              <button className="relative p-2 hover:bg-gray-100 transition-colors">
                <ShoppingCart className="w-6 h-6" style={{ color: '#50a2ff' }} />
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center font-bold">{cartCount}</span>
              </button>

              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 hover:bg-gray-100 transition-colors">
                {isMenuOpen ? <X className="w-6 h-6" style={{ color: '#50a2ff' }} /> : <Menu className="w-6 h-6" style={{ color: '#50a2ff' }} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar - Desktop */}
      <div className="hidden lg:block bg-blue-400 text-white p-4">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-6 py-3 text-sm overflow-x-auto">
            <a href="#" className="hover:text-yellow-300 whitespace-nowrap font-semibold transition-colors">HOME</a>
            <a href="#" className="hover:text-yellow-300 whitespace-nowrap transition-colors">PRODUCTS</a>
            <a href="#" className="hover:text-yellow-300 whitespace-nowrap transition-colors">NEW ARRIVALS</a>
            <a href="#" className="hover:text-yellow-300 whitespace-nowrap transition-colors">BEST SELLERS</a>
            <a href="#" className="hover:text-yellow-300 whitespace-nowrap transition-colors">GIFT IDEAS</a>
            <a href="#" className="hover:text-yellow-300 whitespace-nowrap transition-colors">ABOUT US</a>
            <a href="#" className="hover:text-yellow-300 whitespace-nowrap transition-colors">CONTACT</a>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-blue-400 text-white">
          <nav className="flex flex-col">
            <a href="#" className="px-4 py-3 hover:bg-blue-500 font-semibold transition-colors border-b border-blue-300">HOME</a>
            <a href="#" className="px-4 py-3 hover:bg-blue-500 transition-colors border-b border-blue-300">PRODUCTS</a>
            <a href="#" className="px-4 py-3 hover:bg-blue-500 transition-colors border-b border-blue-300">NEW ARRIVALS</a>
            <a href="#" className="px-4 py-3 hover:bg-blue-500 transition-colors border-b border-blue-300">BEST SELLERS</a>
            <a href="#" className="px-4 py-3 hover:bg-blue-500 transition-colors border-b border-blue-300">GIFT IDEAS</a>
            <a href="#" className="px-4 py-3 hover:bg-blue-500 transition-colors border-b border-blue-300">ABOUT US</a>
            <a href="#" className="px-4 py-3 hover:bg-blue-500 transition-colors">CONTACT</a>
          </nav>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 max-w-md w-full relative">
            <button onClick={() => setShowLoginModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
            <h2 className="font-display text-3xl text-center mb-6">Admin Login</h2>
            <form onSubmit={handleLogin}>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 mb-4"
                autoFocus
              />
              <button type="submit" className="w-full bg-blue-500 text-white font-bold py-3 hover:bg-blue-600">
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  )
}
