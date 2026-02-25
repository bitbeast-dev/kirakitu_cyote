'use client'

import { useCart } from '@/lib/cart-context'
import { X, Minus, Plus, ShoppingCart } from 'lucide-react'
import { useState } from 'react'

export default function CartSidebar() {
  const { cart, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [customerDetails, setCustomerDetails] = useState({ name: '', phone: '', address: '', neighbourhood: '', street: '' })

  const handleCheckout = () => {
    if (!customerDetails.name || !customerDetails.phone || !customerDetails.address || !customerDetails.neighbourhood || !customerDetails.street) {
      alert('Please fill in all customer details')
      return
    }
    
    const items = cart.map(item => `${item.name} x${item.quantity} - ${item.price * item.quantity} RWF`).join('%0A')
    const total = `%0A%0ATotal: ${totalPrice.toLocaleString()} RWF`
    const customer = `%0A%0ACustomer Details:%0AName: ${customerDetails.name}%0APhone: ${customerDetails.phone}%0AAddress: ${customerDetails.address}%0ANeighbourhood: ${customerDetails.neighbourhood}%0AStreet: ${customerDetails.street}`
    const message = `New Order:%0A%0A${items}${total}${customer}`
    
    // Send to both numbers
    window.open(`https://wa.me/250786127865?text=${message}`, '_blank')
    window.open(`https://wa.me/250794269385?text=${message}`, '_blank')
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-15 right-4 z-50 bg-white shadow-lg p-3 hover:scale-110 transition-transform border-2"
        style={{ borderRadius: '50%', borderColor: '#50a2ff' }}
      >
        <ShoppingCart className="w-6 h-6" style={{ color: '#50a2ff' }} />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full font-bold">
            {totalItems}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsOpen(false)} />
          <div className="ml-auto w-full max-w-md bg-white h-full shadow-2xl relative flex flex-col">
            <div className="p-4 border-b flex items-center justify-between" style={{ backgroundColor: '#50a2ff' }}>
              <h2 className="text-xl font-bold text-white">Shopping Cart ({totalItems})</h2>
              <button onClick={() => setIsOpen(false)} className="text-white hover:opacity-80">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4 bg-gray-50 p-3">
                      <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-contain" />
                      <div className="flex-1">
                        <h3 className="font-bold text-sm mb-1">{item.name}</h3>
                        <p className="text-sm mb-2" style={{ color: '#e60076' }}>{item.price.toLocaleString()} RWF</p>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center bg-gray-200 hover:bg-gray-300"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center bg-gray-200 hover:bg-gray-300"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto text-red-500 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t p-4 space-y-3">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span style={{ color: '#e60076' }}>{totalPrice.toLocaleString()} RWF</span>
                </div>
                <button
                  onClick={() => setShowCheckout(true)}
                  className="w-full text-white font-bold py-3 hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#25D366' }}
                >
                  Proceed to Payment
                </button>
                <button
                  onClick={clearCart}
                  className="w-full bg-gray-200 text-gray-700 font-bold py-2 hover:bg-gray-300"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Customer Details</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={customerDetails.name}
                onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={customerDetails.phone}
                onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded"
                required
              />
              <textarea
                placeholder="Delivery Address"
                value={customerDetails.address}
                onChange={(e) => setCustomerDetails({...customerDetails, address: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded h-20"
                required
              />
              <input
                type="text"
                placeholder="Neighbourhood (Karitsiye)"
                value={customerDetails.neighbourhood}
                onChange={(e) => setCustomerDetails({...customerDetails, neighbourhood: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded"
                required
              />
              <input
                type="text"
                placeholder="Street Address"
                value={customerDetails.street}
                onChange={(e) => setCustomerDetails({...customerDetails, street: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded"
                required
              />
              <div className="flex gap-3">
                <button
                  onClick={handleCheckout}
                  className="flex-1 text-white font-bold py-3 rounded"
                  style={{ backgroundColor: '#25D366' }}
                >
                  Send Order
                </button>
                <button
                  onClick={() => setShowCheckout(false)}
                  className="flex-1 bg-gray-200 text-gray-700 font-bold py-3 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
