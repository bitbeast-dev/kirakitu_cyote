'use client'

import { useState, useEffect } from 'react'
import { MapPin, Phone, User, Menu, Search, X, Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/lib/LanguageContext'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)
  const [adminExists, setAdminExists] = useState(false)
  const [loginData, setLoginData] = useState({ username: '', password: '' })
  const [signupData, setSignupData] = useState({ username: '', password: '', confirmPassword: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const router = useRouter()
  const { t, language, setLanguage } = useLanguage()

  useEffect(() => {
    if (searchQuery.length > 0) {
      fetch('/api/products')
        .then(res => res.json())
        .then(data => {
          const filtered = data.filter((p: any) => 
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase())
          ).slice(0, 5)
          setSuggestions(filtered)
          setShowSuggestions(true)
        })
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [searchQuery])

  useEffect(() => {
    fetch('/api/admin')
      .then(res => res.json())
      .then(data => setAdminExists(data.exists))
      .catch(() => setAdminExists(false))
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', ...loginData })
      })
      const data = await res.json()
      if (data.success) {
        localStorage.setItem('adminAuth', 'true')
        setShowLoginModal(false)
        router.push('/admin')
      } else {
        alert(data.error || 'Invalid credentials')
      }
    } catch (error) {
      alert('Login failed')
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (signupData.password !== signupData.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    if (signupData.password.length < 6) {
      alert('Password must be at least 6 characters')
      return
    }
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'signup', username: signupData.username, password: signupData.password })
      })
      const data = await res.json()
      if (data.success) {
        setAdminExists(true)
        setShowSignupModal(false)
        alert('Admin account created successfully!')
      } else {
        alert(data.error || 'Signup failed')
      }
    } catch (error) {
      alert('Signup failed')
    }
  }

  return (
    <header className="w-full bg-white shadow-md">
      <div className="bg-gray-900 text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" style={{ color: '#50a2ff' }} />
              {t('header.deliver')}
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <Phone className="w-3 h-3" style={{ color: '#50a2ff' }} />
              +250 786127865
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLanguage(language === 'en' ? 'rw' : 'en')} 
              className="flex items-center gap-1 hover:text-yellow-400 transition-colors"
              title={language === 'en' ? 'Switch to Kinyarwanda' : 'Switch to English'}
            >
              <span className="text-xs">{language === 'en' ? 'EN' : 'RW'}</span>
            </button>
            <button onClick={() => adminExists ? setShowLoginModal(true) : setShowSignupModal(true)} className="p-1 hover:text-yellow-400 transition-colors" title={adminExists ? "Admin Login" : "Admin Signup"}>
              <User className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="#" className="flex-shrink-0">
              <img src="/logo.png" alt="KIRAKITU" className="h-12 lg:h-14 object-contain" />
            </a>

            <div className="flex-1 max-w-3xl relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#50a2ff' }} />
                <input 
                  type="search" 
                  placeholder={t('header.search')} 
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    window.dispatchEvent(new CustomEvent('searchProducts', { detail: e.target.value }))
                  }}
                  onFocus={() => searchQuery && setShowSuggestions(true)}
                  className="w-full px-4 py-3 pl-12 pr-4 bg-gray-50 border-2 rounded-full focus:bg-white focus:outline-none transition-all text-sm" 
                  style={{ borderColor: '#50a2ff' }} 
                />
              </div>
              
              {/* Search Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white shadow-2xl rounded-lg border border-gray-200 z-50 max-h-96 overflow-y-auto">
                  {suggestions.map((product) => (
                    <div 
                      key={product.id} 
                      onClick={() => {
                        setSearchQuery(product.name)
                        setShowSuggestions(false)
                        window.dispatchEvent(new CustomEvent('searchProducts', { detail: product.name }))
                      }}
                      className="flex items-center gap-4 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0"
                    >
                      <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-contain bg-gray-100 rounded" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm">{product.name}</h4>
                        <p className="text-xs text-gray-500">{product.category}</p>
                      </div>
                      <span className="font-bold text-sm" style={{ color: '#e60076' }}>{product.price.toLocaleString()} RWF</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 hover:bg-gray-100 transition-colors">
                {isMenuOpen ? <X className="w-6 h-6" style={{ color: '#50a2ff' }} /> : <Menu className="w-6 h-6" style={{ color: '#50a2ff' }} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block bg-blue-400 text-white p-4">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-6 py-3 text-sm overflow-x-auto">
            <a href="/" className="hover:text-yellow-300 whitespace-nowrap font-semibold transition-colors">{t('nav.home')}</a>
            <a href="/#products" className="hover:text-yellow-300 whitespace-nowrap transition-colors">{t('nav.products')}</a>
            <a href="/contact" className="hover:text-yellow-300 whitespace-nowrap transition-colors">{t('nav.contact')}</a>
          </nav>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-blue-400 text-white">
          <nav className="flex flex-col">
            <a href="/" className="px-4 py-3 hover:bg-blue-500 font-semibold transition-colors border-b border-blue-300">{t('nav.home')}</a>
            <a href="/#products" className="px-4 py-3 hover:bg-blue-500 transition-colors border-b border-blue-300">{t('nav.products')}</a>
            <a href="/contact" className="px-4 py-3 hover:bg-blue-500 transition-colors">{t('nav.contact')}</a>
          </nav>
        </div>
      )}

      {showSignupModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 max-w-md w-full relative rounded-lg">
            <button onClick={() => setShowSignupModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
            <h2 className="font-display text-3xl text-center mb-6">Create Admin Account</h2>
            <form onSubmit={handleSignup} className="space-y-4">
              <input type="text" placeholder="Username" value={signupData.username} onChange={(e) => setSignupData({...signupData, username: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-300 rounded" required />
              <div className="relative">
                <input type={showPassword ? "text" : "password"} placeholder="Password" value={signupData.password} onChange={(e) => setSignupData({...signupData, password: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-300 rounded pr-12" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <div className="relative">
                <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" value={signupData.confirmPassword} onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-300 rounded pr-12" required />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <button type="submit" className="w-full bg-blue-500 text-white font-bold py-3 rounded hover:bg-blue-600">Create Account</button>
            </form>
          </div>
        </div>
      )}

      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 max-w-md w-full relative rounded-lg">
            <button onClick={() => setShowLoginModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
            <h2 className="font-display text-3xl text-center mb-6">Admin Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <input type="text" placeholder="Username" value={loginData.username} onChange={(e) => setLoginData({...loginData, username: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-300 rounded" required autoFocus />
              <div className="relative">
                <input type={showPassword ? "text" : "password"} placeholder="Password" value={loginData.password} onChange={(e) => setLoginData({...loginData, password: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-300 rounded pr-12" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <button type="submit" className="w-full bg-blue-500 text-white font-bold py-3 rounded hover:bg-blue-600">Login</button>
            </form>
          </div>
        </div>
      )}
    </header>
  )
}
