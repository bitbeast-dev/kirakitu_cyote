'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { products } from '@/lib/kirakitu-products'

const heroImages = [
  '/rightboy.png',
  '/leftbear.png',
]

export default function Hero() {
  const [imageIndex, setImageIndex] = useState(0)

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 4000)
    return () => clearInterval(imageInterval)
  }, [])

  const featuredProducts = products.slice(0, 3)
  const bgColors = ['#73b9dd', '#71b781', '#ec96a3']
  const masonryProducts = products.slice(0, 4)
  const masonryBgColors = ['#73b9dd', '#71b781', '#efd5d6', '#ffd966']

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Hero Banner - Amazon/Shopify Style */}
        <div className="relative w-full overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 lg:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Main Hero - 60% */}
              <div className="lg:col-span-7 relative rounded-2xl overflow-hidden shadow-2xl group">
                <div className="relative h-[400px] lg:h-[500px]">
                  <img src="/hero.jpg" alt="KIRAKITU KIDS TOYS" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
                    <h1 className="font-display text-3xl lg:text-5xl text-white mb-3 leading-tight">Happy Kids</h1>
                    <p className="text-white/90 mb-4 max-w-md">Curated collection of high-quality toys</p>
                    <button className="bg-white text-gray-900 font-bold px-6 py-3 rounded-lg hover:bg-yellow-400 transition-all shadow-lg">Shop Now →</button>
                  </div>
                </div>
              </div>

              {/* Side Promos - 40% */}
              <div className="lg:col-span-5 grid grid-cols-2 lg:grid-cols-1 gap-4">
                {masonryProducts.slice(0, 2).map((product, idx) => (
                  <div key={product.id} className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer" style={{ backgroundColor: masonryBgColors[idx] }}>
                    <div className="h-[190px] lg:h-[238px] flex items-center justify-center p-6 relative">
                      <img src={`/${product.image}`} alt={product.name} className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-3 left-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="font-bold text-sm">{product.name}</p>
                        <p className="text-xs">{product.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
        
        {/* Featured Products Section */}
        <div className="px-4 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl lg:text-5xl text-gray-900 mb-3">
              Featured Products
            </h2>
            <div className="w-20 h-1 bg-pink-500 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Handpicked favorites for your little ones</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Showcase Card */}
            <div className="bg-gray-50 overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <div className="relative h-64 bg-gradient-to-br from-pink-200 to-purple-200 overflow-hidden">
                {heroImages.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt="Featured"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                      idx === imageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
                <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1">
                  TRENDING
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl text-gray-900 mb-2">Best Sellers</h3>
                <p className="text-gray-600 text-sm mb-4">Most loved by kids</p>
                <div className="flex gap-2 mb-4">
                  {heroImages.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1 flex-1 transition-all ${
                        idx === imageIndex ? 'bg-pink-500' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <button className="w-full bg-gray-900 text-white font-bold py-3 hover:bg-pink-500 transition-colors duration-300">
                  VIEW ALL
                </button>
              </div>
            </div>

            {/* Product Cards */}
            {featuredProducts.map((product, idx) => (
              <div key={product.id} className="bg-white border border-gray-200 overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <div 
                  className="relative h-64 overflow-hidden" 
                  style={{ backgroundColor: bgColors[idx] }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-6 transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white text-gray-900 text-xs font-bold px-3 py-1">
                    NEW
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg text-gray-900 mb-2 truncate">{product.name}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display text-2xl" style={{ color: '#e60076' }}>{product.price}</span>
                  </div>
                  <button className="w-full text-white font-bold py-3 transition-colors duration-300"  style={{ backgroundColor: bgColors[idx] }}>
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* All Products Grid Section */}
        <div className="px-4 lg:px-8 py-16 bg-gray-50">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl lg:text-5xl text-gray-900 mb-3">
              All Products
            </h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Browse our complete collection of amazing toys</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
            {products.map((product, idx) => (
              <div key={product.id} className="bg-white border border-gray-200 overflow-hidden group hover:shadow-2xl hover:border-blue-300 transition-all duration-300">
                <div 
                  className="relative h-48 overflow-hidden" 
                  style={{ backgroundColor: bgColors[idx % bgColors.length] }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-4 transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-display text-sm text-gray-900 mb-2 truncate">{product.name}</h3>
                  <div className="mb-3">
                    <span className="font-display text-xl" style={{ color: '#e60076' }}>{product.price}</span>
                  </div>
                  <button className="w-full text-white font-bold py-2 text-sm hover:bg-blue-600 transition-colors duration-300" style={{ backgroundColor: bgColors[idx % bgColors.length] }}>
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Picks - Modern E-commerce Style */}
        <div className="px-4 lg:px-8 py-12 bg-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display text-2xl lg:text-3xl text-gray-900">Top Picks For You</h3>
              <p className="text-gray-500 text-sm mt-1">Handpicked by our experts</p>
            </div>
            <button className="text-blue-600 font-semibold hover:text-blue-700 text-sm">See all →</button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {products.slice(0, 3).map((product, idx) => (
              <div key={product.id} className="bg-white border border-gray-200 overflow-hidden group hover:shadow-2xl hover:border-blue-300 transition-all">
                <div className="flex flex-col sm:flex-row lg:flex-col">
                  <div className="relative sm:w-40 lg:w-full h-75 flex-shrink-0" style={{ backgroundColor: bgColors[idx] }}>
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain p-4 transform group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-4 flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1 line-clamp-2">{product.name}</h4>
                    <div className="flex items-center gap-1 mb-2">
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="font-display text-2xl" style={{ color: '#e60076' }}>{product.price}</span>
                        <span className="text-xs text-gray-400 line-through ml-2">99,990 RWF</span>
                      </div>
                    </div>
                    <button className="w-full text-white font-bold py-2.5 hover:from-pink-600 hover:to-purple-600 transition-all shadow-md"  style={{ backgroundColor: bgColors[idx] }}>Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Promotional Banners - Split Layout */}
        <div className="px-4 lg:px-8 py-8 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl group cursor-pointer">
              <div className="relative h-64 bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative z-10 text-center text-white p-8">
                  <h3 className="font-display text-5xl mb-2">50% OFF</h3>
                  <p className="text-lg mb-4">On Selected Items</p>
                  <button className="bg-white text-gray-900 font-bold px-6 py-3 rounded-lg hover:bg-yellow-400 transition-all shadow-lg">Shop Sale</button>
                </div>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl group cursor-pointer">
              <div className="relative h-64 bg-gradient-to-br from-teal-400 via-green-500 to-emerald-500 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative z-10 text-center text-white p-8">
                  <div className="text-6xl mb-3">🚚</div>
                  <h4 className="font-display text-3xl mb-2">Free Shipping</h4>
                  <p className="text-lg">On Orders Over 50,000 RWF</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Books Category - Horizontal Scroll Grid */}
        <div className="px-4 lg:px-8 py-12 bg-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display text-2xl lg:text-3xl text-gray-900 flex items-center gap-2">Educational Books</h3>
              <p className="text-gray-500 text-sm mt-1">Inspire young minds with stories</p>
            </div>
            <button className="text-purple-600 font-semibold hover:text-purple-700 text-sm">View All →</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 lg:gap-6">
            {products.slice(0, 6).map((product, idx) => (
              <div key={product.id} className="bg-white border border-gray-200 overflow-hidden group hover:shadow-xl hover:border-purple-300 transition-all duration-300">
                <div className="relative h-48" style={{ backgroundColor: bgColors[idx % bgColors.length] }}>
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain p-4 transform group-hover:scale-105 transition-transform" />
                </div>
                <div className="p-3 bg-white">
                  <h4 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2">{product.name}</h4>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold" style={{ color: '#e60076' }}>{product.price}</span>
                  </div>
                  <button className="w-full text-white font-bold py-2 text-sm transition-colors" style={{ backgroundColor: bgColors[idx % bgColors.length] }}>
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Games Category - Grid */}
        <div className="px-4 lg:px-8 py-12 bg-gray-50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display text-2xl lg:text-3xl text-gray-900 flex items-center gap-2">Fun Games Collection</h3>
              <p className="text-gray-500 text-sm mt-1">Play, learn, and grow together</p>
            </div>
            <button className="text-blue-600 font-semibold hover:text-blue-700 text-sm">Explore All →</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
            {products.slice(0, 5).map((product, idx) => (
              <div key={product.id} className="bg-white border border-gray-200 overflow-hidden group hover:shadow-2xl hover:border-blue-300 transition-all duration-300">
                <div 
                  className="relative h-48 overflow-hidden" 
                  style={{ backgroundColor: bgColors[idx % bgColors.length] }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-4 transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-display text-sm text-gray-900 mb-2 truncate">{product.name}</h3>
                  <div className="mb-3">
                    <span className="font-display text-xl" style={{ color: '#e60076' }}>{product.price}</span>
                  </div>
                  <button className="w-full text-white font-bold py-2 text-sm transition-colors" style={{ backgroundColor: bgColors[idx % bgColors.length] }}>
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="font-display text-xl mb-4">KIRAKITU</h3>
                <p className="text-gray-400 text-sm">Premium toys for happy kids. Quality, safety, and fun guaranteed.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Shop</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white">All Products</a></li>
                  <li><a href="#" className="hover:text-white">New Arrivals</a></li>
                  <li><a href="#" className="hover:text-white">Best Sellers</a></li>
                  <li><a href="#" className="hover:text-white">Sale</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white">Contact Us</a></li>
                  <li><a href="#" className="hover:text-white">Shipping Info</a></li>
                  <li><a href="#" className="hover:text-white">Returns</a></li>
                  <li><a href="#" className="hover:text-white">FAQ</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Connect</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white">Facebook</a></li>
                  <li><a href="#" className="hover:text-white">Instagram</a></li>
                  <li><a href="#" className="hover:text-white">Twitter</a></li>
                  <li><a href="#" className="hover:text-white">YouTube</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
              <p>© 2024 KIRAKITU. All rights reserved.</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-white">Privacy Policy</a>
                <a href="#" className="hover:text-white">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </section>
  )
}
