'use client'

import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react'
import Navbar from '@/components/Navbar'

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="font-display text-4xl lg:text-5xl text-gray-900 mb-8 text-center" style={{ color: '#50a2ff' }}>Contact Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-lg border-t-4" style={{ borderColor: '#50a2ff' }}>
            <h2 className="font-display text-2xl text-gray-900 mb-6">Get In Touch</h2>
            <div className="space-y-6 text-gray-700">
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 mt-1" style={{ color: '#50a2ff' }} />
                <div>
                  <p className="font-semibold text-gray-900">Phone</p>
                  <p>+250 786 127 865</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 mt-1" style={{ color: '#50a2ff' }} />
                <div>
                  <p className="font-semibold text-gray-900">Email</p>
                  <p>info@kirakitu.rw</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 mt-1" style={{ color: '#50a2ff' }} />
                <div>
                  <p className="font-semibold text-gray-900">Location</p>
                  <p>Kigali, Rwanda</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 mt-1" style={{ color: '#50a2ff' }} />
                <div>
                  <p className="font-semibold text-gray-900">Business Hours</p>
                  <p>Monday - Saturday: 8:00 AM - 6:00 PM</p>
                  <p>Sunday: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
            <a 
              href="https://wa.me/250786127865" 
              target="_blank"
              className="mt-6 inline-flex items-center gap-2 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-semibold"
              style={{ backgroundColor: '#25D366' }}
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg border-t-4" style={{ borderColor: '#e60076' }}>
            <h2 className="font-display text-2xl text-gray-900 mb-6">Send Us a Message</h2>
            <form className="space-y-4">
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none"
                style={{ focusBorderColor: '#50a2ff' }}
                required
              />
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none"
                required
              />
              <input 
                type="tel" 
                placeholder="Your Phone" 
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none"
              />
              <textarea 
                placeholder="Your Message" 
                rows={5}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none"
                required
              />
              <button 
                type="submit"
                className="w-full text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                style={{ backgroundColor: '#50a2ff' }}
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </div>
        </div>
        
        <div className="text-white p-8 rounded-lg text-center shadow-lg" style={{ backgroundColor: '#50a2ff' }}>
          <h3 className="font-display text-2xl mb-4">Visit Our Store</h3>
          <p className="mb-4">Come see our amazing collection of toys and products in person!</p>
          <p className="text-lg font-semibold">We look forward to serving you!</p>
        </div>
      </div>
      </div>
    </>
  )
}
