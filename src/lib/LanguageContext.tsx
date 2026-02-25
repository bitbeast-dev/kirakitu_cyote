'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'en' | 'rw'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    'header.deliver': 'Deliver to Rwanda', 'header.track': 'Track Order', 'header.help': 'Help', 'header.sell': 'Sell',
    'header.signin': 'Hello, Sign in', 'header.account': 'Account', 'header.search': 'Search for toys, games, and more...',
    'header.all': 'All', 'header.toys': 'Toys', 'header.games': 'Games', 'header.books': 'Books',
    'header.categories': 'All Categories', 'header.deals': "Today's Deals", 'header.new': 'New Arrivals',
    'header.bestsellers': 'Best Sellers', 'header.gifts': 'Gift Ideas', 'header.service': 'Customer Service',
    'header.sale': 'Sale - Up to 50% OFF', 'hero.new': 'NEW ARRIVAL', 'hero.title': 'Premium Toys',
    'hero.subtitle': 'For Happy Kids', 'hero.description': 'Curated collection of high-quality toys', 'hero.cta': 'Shop Now',
    'section.featured': 'Featured Products', 'section.all': 'All Products', 'section.toppicks': 'Top Picks For You',
    'section.toppicks.desc': 'Handpicked by our experts', 'section.books': 'Educational Books',
    'section.books.desc': 'Inspire young minds with stories', 'section.games': 'Fun Games Collection',
    'section.games.desc': 'Play, learn, and grow together', 'section.deals': 'Catch The Best Deals!',
    'section.deals.desc': 'Floating specials just for you - grab them before they fly away!',
    'btn.add': 'Add to Cart', 'btn.viewall': 'VIEW ALL',
    'btn.seeall': 'See all', 'btn.explore': 'Explore All', 'btn.shopsale': 'Shop Sale', 'badge.hot': 'Hot',
    'badge.book': 'Book', 'badge.game': 'Game', 'promo.limited': 'LIMITED TIME', 'promo.off': '50% OFF',
    'promo.selected': 'On Selected Items', 'promo.shipping': 'Free Shipping', 'promo.shipping.desc': 'On Orders Over $50',
    'section.latest': 'Latest Products',
    'footer.brand': 'KIRAKITU', 'footer.desc': 'Premium toys for happy kids. Quality, safety, and fun guaranteed.',
    'footer.shop': 'Shop', 'footer.shop.all': 'All Products', 'footer.shop.new': 'New Arrivals',
    'footer.shop.best': 'Best Sellers', 'footer.shop.sale': 'Sale', 'footer.support': 'Support',
    'footer.support.contact': 'Contact Us', 'footer.support.shipping': 'Shipping Info', 'footer.support.returns': 'Returns',
    'footer.support.faq': 'FAQ', 'footer.connect': 'Connect', 'footer.copyright': '© 2024 KIRAKITU. All rights reserved.',
    'footer.privacy': 'Privacy Policy', 'footer.terms': 'Terms of Service', 'nav.home': 'HOME', 'nav.products': 'PRODUCTS',
    'nav.aboutus': 'ABOUT US', 'nav.contact': 'CONTACT',
  },
  rw: {
    'header.deliver': 'Kohereza muri Rwanda', 'header.track': 'Kugenzura Ibyo Wagize', 'header.help': 'Ubufasha',
    'header.sell': 'Gucuruza', 'header.signin': 'Muraho, Injira', 'header.account': 'Konti',
    'header.search': 'Shakisha ibikinisho, imikino, nibindi...', 'header.all': 'Byose', 'header.toys': 'Ibikinisho',
    'header.games': 'Imikino', 'header.books': 'Ibitabo', 'header.categories': 'Ibyiciro Byose',
    'header.deals': 'Amahirwe Meza', 'header.new': 'IBIGEZEHO', 'header.bestsellers': 'IBIKUNZWE CYANE',
    'header.gifts': 'IBITEKEREZO BY IMPANO', 'header.service': 'Serivisi za Abakiriya',
    'header.sale': 'Igabanuka - Kugeza kuri 50% OFF', 'hero.new': 'IBIGEZWEHO', 'hero.title': 'Ibikinisho byo Hejuru',
    'hero.subtitle': 'Ku Bana Bishimye', 'hero.description': 'Urubuga rwizewe rwa ibikinisho byiza bya abana',
    'hero.cta': 'Gura Nonaha', 'section.featured': 'Ibicuruzwa Byatoranyijwe', 'section.all': 'Ibicuruzwa Byose',
    'section.toppicks': 'Ibyatoranyijwe Kubwanyu', 'section.toppicks.desc': 'Byatoranyijwe na inzobere zacu',
    'section.books': 'Ibitabo Byigisha', 'section.books.desc': 'Shishikariza ubwenge bwa abana ukoresheje inkuru',
    'section.games': 'Imikino Ishimishije', 'section.games.desc': 'Kina, wige, kandi ukure hamwe',
    'section.deals': 'Amahirwe Meza!', 'section.deals.desc': 'Ibicuruzwa ku giciro cyihariye - byihutire mbere ya uko birangira!',
    'btn.add': 'GURA NONAHA', 'btn.viewall': 'REBA BYOSE', 'btn.seeall': 'Reba Byose',
    'btn.explore': 'Reba Byose', 'btn.shopsale': 'Gura Nonaha', 'badge.hot': 'Gishyushye',
    'badge.book': 'Igitabo', 'badge.game': 'Umukino', 'promo.limited': 'IGABANUKA RY IGIHE GITO', 'promo.off': 'IGABANYIJWEHO 50%',
    'promo.selected': 'Ku bicuruzwa byatoranyijwe', 'promo.shipping': 'Kohereza Ubuntu',
    'promo.shipping.desc': 'Ku byaguzwe birengeje',
    'section.latest': 'Ibicuruzwa Bishya', 'footer.brand': 'KIRAKITU',
    'footer.desc': 'Ibikinisho byiza bya abana bishimye. Ubuziranenge, umutekano na ibyishimo byizewe.',
    'footer.shop': 'Gura', 'footer.shop.all': 'Ibicuruzwa Byose', 'footer.shop.new': 'Ibigezweho',
    'footer.shop.best': 'Ibikunzwe Cyane', 'footer.shop.sale': 'Igabanuka', 'footer.support': 'Ubufasha',
    'footer.support.contact': 'Twandikire', 'footer.support.shipping': 'Amakuru yo Kohereza',
    'footer.support.returns': 'Gusubiza Ibicuruzwa', 'footer.support.faq': 'Ibibazo Bikunze Kubazwa', 'footer.connect': 'Dukurikire',
    'footer.copyright': '© 2024 KIRAKITU. Uburenganzira bwose burabitswe.', 'footer.privacy': 'Politiki ya Ubuzima Bwite',
    'footer.terms': 'Amabwiriza ya Serivisi', 'nav.home': 'AHABANZA', 'nav.products': 'IBICURUZWA',
    'nav.aboutus': 'ABATURI BO', 'nav.contact': 'TWANDIKIRE',
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language
    const hasSelected = localStorage.getItem('languageSelected')
    if (saved) setLanguageState(saved)
    if (!hasSelected) setShowModal(true)
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
    localStorage.setItem('languageSelected', 'true')
    setShowModal(false)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🌍</div>
              <h2 className="font-display text-3xl text-gray-900 mb-2">Welcome! / Murakaza neza!</h2>
              <p className="text-gray-600">Choose your language / Hitamo ururimi</p>
            </div>
            <div className="space-y-3">
              <button onClick={() => setLanguage('en')} className="w-full bg-blue-500 text-white font-bold py-4 rounded-xl hover:bg-blue-600 transition-all shadow-lg flex items-center justify-center gap-3">
                <span className="text-2xl">🇬🇧</span><span className="text-lg">English</span>
              </button>
              <button onClick={() => setLanguage('rw')} className="w-full bg-green-500 text-white font-bold py-4 rounded-xl hover:bg-green-600 transition-all shadow-lg flex items-center justify-center gap-3">
                <span className="text-2xl">🇷🇼</span><span className="text-lg">Kinyarwanda</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
