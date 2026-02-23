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
          {/* Playground Slide Decoration */}
          <img src="/playgroundslide.png" alt="" className="absolute bottom-0 right-0 w-32 h-48 lg:w-48 lg:h-64 object-contain opacity-30 pointer-events-none z-0" />
          <img src="/playgroundslide.png" alt="" className="absolute top-0 left-0 w-32 h-48 lg:w-48 lg:h-64 object-contain opacity-20 pointer-events-none z-0 transform scale-x-[-1]" />
          
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 lg:py-12 relative z-10">
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

            {/* Product Cards - Train Carriage Design */}
            {featuredProducts.map((product, idx) => (
              <div key={product.id} className="relative bg-white overflow-visible group hover:shadow-2xl transition-all duration-300 rounded-lg p-4">
                {/* Decorative Label */}
             
                
                {/* Train Carriage Background - Faded */}
                <div className="relative">
                  <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <img 
                      src="/kids_toy_train_carriage_display-removebg-preview.png" 
                      alt="" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  {/* Product - Clear and Prominent */}
                  <div className="relative h-64 flex items-center justify-center bg-white rounded-lg" style={{ backgroundColor: bgColors[idx] + '20' }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-3/4 h-3/4 object-contain transform group-hover:scale-110 transition-all duration-500 drop-shadow-2xl border-4 border-white rounded-lg"
                    />
                  </div>
                </div>

                {/* Product Info */}
                <div className="mt-4">
                  <h3 className="font-display text-lg text-gray-900 mb-2 truncate">{product.name}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display text-2xl" style={{ color: '#e60076' }}>{product.price}</span>
                  </div>
                  <button className="w-full text-white font-bold py-3 transition-colors duration-300 relative overflow-hidden group/btn rounded-lg" style={{ backgroundColor: bgColors[idx] }}>
                    <span className="relative z-10">ADD TO CART</span>
                    <img src="/rainbow_confetti_overlay_elements-removebg-preview.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </button>
                </div>
                
                {/* Bouncing Star */}
              </div>
            ))}

          </div>
        </div>

        {/* All Products Grid Section */}
        
        <div className="px-4 lg:px-8 py-16 relative bg-white">
          <div className="relative z-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
            {products.map((product, idx) => (
              <div key={product.id} className="relative bg-white overflow-visible group shadow-lg hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)] transition-all duration-300 mt-16">
                {/* Ice Cream Cone Container */}
                <div className="relative">
                  {/* Cone */}
                 
                  
                  {/* Product in Ice Cream */}
                  <div className="relative h-48 overflow-hidden" style={{ backgroundColor: bgColors[idx % bgColors.length] }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain p-4 transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
                
                <div className="p-4 bg-white">
                    <h3 className="font-display text-sm text-gray-900 mb-2 truncate">{product.name}</h3>
                    <div className="mb-3">
                      <span className="font-display text-xl" style={{ color: '#e60076' }}>{product.price}</span>
                    </div>
                    <button className="w-full text-white font-bold py-2 text-sm hover:bg-blue-600 transition-colors duration-300 relative overflow-hidden group/btn" style={{ backgroundColor: bgColors[idx % bgColors.length] }}>
                      <span className="relative z-10">ADD TO CART</span>
                      <img src="/rainbow_confetti_overlay_elements-removebg-preview.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </button>
                </div>
                
                {/* Bouncing Star */}
              </div>
            ))}
          </div>
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 overflow-visible">
            {products.slice(0, 3).map((product, idx) => (
              <div key={product.id} className="relative flex flex-col items-center mt-20">
                
                {/* Balloon Container with Product */}
                <div className="relative w-64 h-80 group cursor-pointer overflow-visible">
                  {/* Balloon Shape */}
                  <div className="absolute inset-0 rounded-t-full overflow-hidden shadow-2xl transform group-hover:scale-105 transition-all duration-300" style={{ backgroundColor: bgColors[idx], borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }}>
                    {/* Product Image inside Balloon */}
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    {/* Shine Effect */}
                    <div className="absolute top-8 left-8 w-16 h-16 bg-white/30 rounded-full blur-xl"></div>
                  </div>
                  
                  {/* Balloon Knot */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 w-6 h-8 z-10" style={{ backgroundColor: bgColors[idx], clipPath: 'polygon(50% 0%, 0% 50%, 50% 100%, 100% 50%)' }}></div>
                  
                  {/* Balloon String */}
                  <img src="/string.png" alt="String" className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full h-32 w-auto object-contain z-0" />
                </div>

                {/* Product Info Below Balloon */}
                <div className="mt-8 text-center w-full max-w-xs">
                  <h4 className="font-display text-xl text-gray-900 mb-2">{product.name}</h4>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="font-display text-3xl" style={{ color: '#e60076' }}>{product.price}</span>
                    <span className="text-sm text-gray-400 line-through">99,990 RWF</span>
                  </div>
                  <button 
                    className="w-full text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                    style={{ backgroundColor: bgColors[idx] }}
                  >
                    Add to Cart
                  </button>
                </div>

                {/* Sparkle Effects */}
                <div className="absolute top-16 -right-4 w-3 h-3 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                <div className="absolute top-24 -left-4 w-2 h-2 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping" style={{ animationDelay: '0.2s' }}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Promotional Banners - Premium Design with Moving Car */}
        <div className="px-2 sm:px-4 lg:px-8 py-8 sm:py-12 bg-gradient-to-b from-white via-blue-50 to-white relative overflow-visible">
          <div className="relative grid grid-cols-2 gap-2 sm:gap-4 md:gap-8 items-center">
            {/* 50% OFF Banner - Left Side */}
            <div className="relative overflow-hidden shadow-2xl group cursor-pointer transform hover:scale-105 transition-transform" style={{ background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 50%, #c44569 100%)' }}>
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 sm:w-64 h-32 sm:h-64 bg-white rounded-full -mr-16 sm:-mr-32 -mt-16 sm:-mt-32"></div>
                <div className="absolute bottom-0 left-0 w-24 sm:w-48 h-24 sm:h-48 bg-white rounded-full -ml-12 sm:-ml-24 -mb-12 sm:-mb-24"></div>
              </div>
              <div className="relative z-10 p-3 sm:p-6 md:p-12 h-48 sm:h-64 md:h-96 flex flex-col justify-center items-center text-center">
                <div className="bg-white/20 backdrop-blur-sm px-2 sm:px-4 md:px-6 py-1 sm:py-2 mb-2 sm:mb-4 md:mb-6 transform -rotate-3">
                  <span className="text-white text-[8px] sm:text-xs md:text-sm font-bold tracking-wider">LIMITED OFFER</span>
                </div>
                <h3 className="font-display text-2xl sm:text-4xl md:text-7xl lg:text-8xl text-white mb-1 sm:mb-2 md:mb-4 drop-shadow-2xl animate-pulse">50% OFF</h3>
                <p className="text-white text-[10px] sm:text-sm md:text-xl mb-2 sm:mb-3 md:mb-6 font-semibold">On Selected Items</p>
                <div className="flex items-center gap-1 sm:gap-2 md:gap-3 mb-2 sm:mb-3 md:mb-6">
                  <div className="w-4 sm:w-8 md:w-12 h-0.5 sm:h-1 bg-white"></div>
                  <span className="text-white text-[8px] sm:text-xs md:text-sm">SAVE BIG</span>
                  <div className="w-4 sm:w-8 md:w-12 h-0.5 sm:h-1 bg-white"></div>
                </div>
                <button className="bg-white text-red-600 font-bold px-3 sm:px-6 md:px-10 py-1.5 sm:py-2 md:py-4 text-[10px] sm:text-sm md:text-lg hover:bg-yellow-300 hover:text-gray-900 transition-all shadow-2xl transform hover:scale-105">
                  Shop Now →
                </button>
              </div>
            </div>

            {/* Free Shipping Banner - Right Side */}
            <div className="relative overflow-hidden shadow-2xl group cursor-pointer transform hover:scale-105 transition-transform" style={{ background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' }}>
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-32 sm:w-64 h-32 sm:h-64 bg-white rounded-full -ml-16 sm:-ml-32 -mt-16 sm:-mt-32"></div>
                <div className="absolute bottom-0 right-0 w-24 sm:w-48 h-24 sm:h-48 bg-white rounded-full -mr-12 sm:-mr-24 -mb-12 sm:-mb-24"></div>
              </div>
              <div className="relative z-10 p-3 sm:p-6 md:p-12 h-48 sm:h-64 md:h-96 flex flex-col justify-center items-center text-center">
                <div className="mb-2 sm:mb-4 md:mb-6">
                  <div className="w-10 h-10 sm:w-16 sm:h-16 md:w-24 md:h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 sm:w-10 sm:h-10 md:w-16 md:h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <h4 className="font-display text-xl sm:text-3xl md:text-5xl lg:text-6xl text-white mb-1 sm:mb-2 md:mb-4 drop-shadow-2xl">Free Ship</h4>
                <div className="bg-white/20 backdrop-blur-sm px-3 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 mb-2 sm:mb-3 md:mb-4">
                  <p className="text-white text-[10px] sm:text-sm md:text-xl font-bold">Orders Over</p>
                  <p className="text-white text-lg sm:text-2xl md:text-4xl font-display">50K RWF</p>
                </div>
                <div className="flex items-center gap-1 sm:gap-2 text-white text-[8px] sm:text-xs md:text-sm">
                  <span className="w-1 h-1 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse"></span>
                  <span className="font-semibold">Fast Delivery</span>
                  <span className="w-1 h-1 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse"></span>
                </div>
              </div>
            </div>
          </div>

          {/* Moving Car Bridge - Visible on all screen sizes, positioned between containers */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
            <div className="relative animate-[wiggle_3s_ease-in-out_infinite]">
              <img src="/car.png" alt="Delivery Car" className="w-20 h-20 sm:w-32 sm:h-32 md:w-64 md:h-64 lg:w-80 lg:h-80 object-contain drop-shadow-2xl" />
              {/* Motion lines */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full flex gap-0.5 sm:gap-1 md:gap-2">
                <div className="w-2 h-0.5 sm:w-4 sm:h-0.5 md:w-8 md:h-1 bg-blue-400 opacity-60 animate-[slideLeft_1s_ease-in-out_infinite]"></div>
                <div className="w-1.5 h-0.5 sm:w-3 sm:h-0.5 md:w-6 md:h-1 bg-blue-300 opacity-40 animate-[slideLeft_1.2s_ease-in-out_infinite]"></div>
                <div className="w-1 h-0.5 sm:w-2 sm:h-0.5 md:w-4 md:h-1 bg-blue-200 opacity-20 animate-[slideLeft_1.4s_ease-in-out_infinite]"></div>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-16 h-16 bg-pink-300 rounded-full opacity-20 animate-pulse"></div>
        </div>

        <style jsx>{`
          @keyframes wiggle {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-5px) rotate(-1deg); }
            75% { transform: translateY(-3px) rotate(1deg); }
          }
          @keyframes slideLeft {
            0% { transform: translateX(0); opacity: 0.6; }
            100% { transform: translateX(-20px); opacity: 0; }
          }
        `}</style>

        {/* Books Category - Horizontal Scroll Grid */}
        <div className="px-4 lg:px-8 py-12 bg-white relative">
          {/* Balloon Background - Random Scattered Pattern */}
         
          
          <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display text-2xl lg:text-3xl text-gray-900 flex items-center gap-2">Educational Books</h3>
              <p className="text-gray-500 text-sm mt-1">Inspire young minds with stories</p>
            </div>
            <button className="text-purple-600 font-semibold hover:text-purple-700 text-sm">View All →</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 lg:gap-6 overflow-visible">
            {products.slice(0, 6).map((product, idx) => (
              <div key={product.id} className="relative bg-white overflow-visible group hover:shadow-xl hover:border-purple-300 transition-all duration-300 mt-12">
                {/* Train Car Container */}
                <div className="relative">
                  {/* Train Car Image */}
                  
                  
                  <div className="relative h-48" style={{ backgroundColor: bgColors[idx % bgColors.length] }}>
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain p-4 transform group-hover:scale-105 transition-transform" />
                  </div>
                </div>
                
                <div className="p-3 bg-white">
                  <h4 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2">{product.name}</h4>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold" style={{ color: '#e60076' }}>{product.price}</span>
                  </div>
                  <button className="w-full text-white font-bold py-2 text-sm transition-colors relative overflow-hidden group/btn" style={{ backgroundColor: bgColors[idx % bgColors.length] }}>
                    <span className="relative z-10">ADD TO CART</span>
                    <img src="/confetti.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>

        {/* Floating Balloon Product Showcase */}
        <div className="px-4 lg:px-8 py-16 bg-gradient-to-b from-sky-100 via-blue-50 to-white relative overflow-hidden">
          {/* Floating clouds background */}
          <div className="absolute top-10 left-10 w-32 h-20 bg-white rounded-full opacity-40 animate-[floatSlow_20s_ease-in-out_infinite]"></div>
          <div className="absolute top-32 right-20 w-40 h-24 bg-white rounded-full opacity-30 animate-[floatSlow_25s_ease-in-out_infinite_reverse]"></div>
          <div className="absolute bottom-20 left-1/4 w-36 h-22 bg-white rounded-full opacity-35 animate-[floatSlow_22s_ease-in-out_infinite]"></div>

          <div className="relative z-10 text-center mb-12">
            <div className="inline-block mb-4">
              <img src="/teddywithmanyballoons.png" alt="Teddy with Balloons" className="w-32 h-32 lg:w-40 lg:h-40 object-contain animate-[floatBalloon_4s_ease-in-out_infinite]" />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-gray-900 mb-3">
              Catch The Best Deals!
            </h2>
            <p className="text-gray-600 text-lg">Floating specials just for you - grab them before they fly away!</p>
          </div>

          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map((product, idx) => (
              <div 
                key={product.id} 
                className="relative group cursor-pointer"
                style={{ 
                  animation: `floatBalloon ${3 + idx * 0.5}s ease-in-out infinite`,
                  animationDelay: `${idx * 0.3}s`
                }}
              >
                {/* Balloon String */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-24 bg-gradient-to-b from-transparent via-gray-400 to-gray-600 opacity-60"></div>
                
                {/* Single Balloon */}
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 z-20">
                  <img 
                    src="/singleballoon.png" 
                    alt="Balloon" 
                    className="w-16 h-20 object-contain opacity-80"
                    style={{ filter: `hue-rotate(${idx * 90}deg)` }}
                  />
                </div>

                {/* Product Card */}
                <div className="bg-white shadow-2xl overflow-hidden transform group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-300">
                  <div 
                    className="relative h-56 overflow-hidden" 
                    style={{ backgroundColor: bgColors[idx % bgColors.length] }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain p-6 transform group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Special Badge */}
                    <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rotate-12 animate-pulse">
                      HOT!
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg text-gray-900 mb-2 truncate">{product.name}</h3>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-display text-2xl" style={{ color: '#e60076' }}>{product.price}</span>
                      <span className="text-xs text-gray-400 line-through">99,990 RWF</span>
                    </div>
                    <button 
                      className="w-full text-white font-bold py-3 hover:shadow-lg transition-all transform hover:scale-105"
                      style={{ backgroundColor: bgColors[idx % bgColors.length] }}
                    >
                      Catch It!
                    </button>
                  </div>
                </div>

                {/* Sparkle effects on hover */}
                <div className="absolute -top-8 -right-8 w-4 h-4 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
                <div className="absolute -bottom-8 -left-8 w-3 h-3 bg-pink-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" style={{ animationDelay: '0.2s' }}></div>
              </div>
            ))}
          </div>

     
         
        </div>

        <style jsx>{`
          @keyframes floatBalloon {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(3deg); }
          }
          @keyframes floatSlow {
            0%, 100% { transform: translateX(0px) translateY(0px); }
            50% { transform: translateX(30px) translateY(-20px); }
          }
        `}</style>

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
