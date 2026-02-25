'use client'

import { Sparkles, Target, Package, Shield, Truck, HeadphonesIcon } from 'lucide-react'
import Navbar from '@/components/Navbar'

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="font-display text-4xl lg:text-5xl text-gray-900 mb-8 text-center" style={{ color: '#50a2ff' }}>About KIRAKITU</h1>
        
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p className="text-lg">
            Welcome to KIRAKITU - Rwanda's premier destination for quality children's products, toys, and educational materials. 
            We are dedicated to bringing joy, learning, and development to children across Rwanda.
          </p>
          
          <div className="bg-white p-6 rounded-lg shadow-lg border-l-4" style={{ borderColor: '#50a2ff' }}>
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-8 h-8" style={{ color: '#50a2ff' }} />
              <h2 className="font-display text-2xl text-gray-900">Our Mission</h2>
            </div>
            <p>
              At KIRAKITU, our mission is to provide safe, high-quality, and affordable products that inspire creativity, 
              learning, and happiness in children. We believe every child deserves access to toys and materials that support 
              their growth and development.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg border-l-4" style={{ borderColor: '#e60076' }}>
            <div className="flex items-center gap-3 mb-4">
              <Package className="w-8 h-8" style={{ color: '#e60076' }} />
              <h2 className="font-display text-2xl text-gray-900">What We Offer</h2>
            </div>
            <ul className="space-y-2 ml-4">
              <li className="flex items-center gap-2"><Sparkles className="w-4 h-4" style={{ color: '#50a2ff' }} /> Educational toys and games</li>
              <li className="flex items-center gap-2"><Sparkles className="w-4 h-4" style={{ color: '#50a2ff' }} /> Books and learning materials</li>
              <li className="flex items-center gap-2"><Sparkles className="w-4 h-4" style={{ color: '#50a2ff' }} /> Sports and outdoor equipment</li>
              <li className="flex items-center gap-2"><Sparkles className="w-4 h-4" style={{ color: '#50a2ff' }} /> Arts and crafts supplies</li>
              <li className="flex items-center gap-2"><Sparkles className="w-4 h-4" style={{ color: '#50a2ff' }} /> Electronics and gadgets for kids</li>
              <li className="flex items-center gap-2"><Sparkles className="w-4 h-4" style={{ color: '#50a2ff' }} /> Home appliances and accessories</li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg border-l-4" style={{ borderColor: '#50a2ff' }}>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8" style={{ color: '#50a2ff' }} />
              <h2 className="font-display text-2xl text-gray-900">Why Choose Us</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 mt-1" style={{ color: '#e60076' }} />
                <span>Quality guaranteed products</span>
              </div>
              <div className="flex items-start gap-3">
                <Package className="w-5 h-5 mt-1" style={{ color: '#e60076' }} />
                <span>Affordable prices for all families</span>
              </div>
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 mt-1" style={{ color: '#e60076' }} />
                <span>Fast delivery across Rwanda</span>
              </div>
              <div className="flex items-start gap-3">
                <HeadphonesIcon className="w-5 h-5 mt-1" style={{ color: '#e60076' }} />
                <span>Excellent customer service</span>
              </div>
            </div>
          </div>
          
          <div className="p-6 rounded-lg mt-8 text-center" style={{ background: 'linear-gradient(135deg, #50a2ff 0%, #e60076 100%)' }}>
            <p className="text-white text-lg font-semibold">
              Thank you for choosing KIRAKITU - Where Children's Dreams Come True!
            </p>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}
