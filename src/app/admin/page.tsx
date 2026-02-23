'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, LogOut, Package, ShoppingCart, TrendingUp, Users } from 'lucide-react'

interface Product {
  id: string
  name: string
  brand: string
  price: number
  imageUrl: string
  category: string
  placement: string
  inStock: boolean
  createdAt: string
}

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [activeTab, setActiveTab] = useState<'products' | 'books' | 'games'>('products')
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    category: '',
    placement: 'all-products',
    inStock: true
  })
  const [uploading, setUploading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (auth === 'true') {
      setIsAuthenticated(true)
      loadProducts()
    }
  }, [])

  const loadProducts = async () => {
    try {
      const res = await fetch('/api/products')
      if (res.ok) {
        const data = await res.json()
        setProducts(data)
      }
    } catch (error) {
      console.error('Failed to load products')
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'admin123') {
      localStorage.setItem('adminAuth', 'true')
      setIsAuthenticated(true)
      loadProducts()
    } else {
      alert('Invalid password')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    setIsAuthenticated(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)
    
    try {
      let imageUrl = formData.image
      
      if (imageFile) {
        const uploadFormData = new FormData()
        uploadFormData.append('file', imageFile)
        
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData
        })
        
        if (!uploadRes.ok) throw new Error('Upload failed')
        const { url } = await uploadRes.json()
        imageUrl = url
      }
      
      const productData = {
        name: formData.name,
        brand: formData.category,
        price: formData.price,
        imageUrl: imageUrl,
        category: formData.category,
        placement: formData.placement,
        inStock: formData.inStock
      }
      
      if (editingProduct) {
        const res = await fetch(`/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        })
        if (!res.ok) throw new Error('Update failed')
      } else {
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        })
        if (!res.ok) throw new Error('Create failed')
      }
      
      await loadProducts()
      setShowForm(false)
      setEditingProduct(null)
      setFormData({ name: '', price: '', image: '', category: '', placement: 'all-products', inStock: true })
      setImageFile(null)
    } catch (error) {
      alert('Failed to save product')
    } finally {
      setUploading(false)
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData(product)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Delete this product?')) {
      try {
        const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
        if (res.ok) {
          await loadProducts()
        }
      } catch (error) {
        alert('Failed to delete product')
      }
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center p-4">
        <div className="bg-white p-8 max-w-md w-full">
          <h1 className="font-display text-3xl text-center mb-6" style={{ color: '#50a2ff' }}>Admin Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 mb-4"
              style={{ borderColor: '#50a2ff' }}
            />
            <button type="submit" className="w-full text-white font-bold py-3 hover:opacity-90" style={{ backgroundColor: '#50a2ff' }}>
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  const totalProducts = products.length
  const inStockProducts = products.filter(p => p.inStock).length
  const outOfStockProducts = totalProducts - inStockProducts

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8f9fa' }}>
      <header className="bg-white shadow-md" style={{ borderBottom: '3px solid #50a2ff' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#50a2ff' }}>
                <Package className="w-6 h-6 text-white" />
              </div>
              <h1 className="font-display text-2xl" style={{ color: '#50a2ff' }}>KIRAKITU Admin</h1>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-2 hover:opacity-80" style={{ color: '#e60076' }}>
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex border-t">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-6 py-3 font-bold transition-colors ${
                activeTab === 'products' ? 'text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
              style={{ backgroundColor: activeTab === 'products' ? '#50a2ff' : 'transparent' }}
            >
              All Products
            </button>
            <button
              onClick={() => setActiveTab('books')}
              className={`px-6 py-3 font-bold transition-colors ${
                activeTab === 'books' ? 'text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
              style={{ backgroundColor: activeTab === 'books' ? '#50a2ff' : 'transparent' }}
            >
              Educational Books
            </button>
            <button
              onClick={() => setActiveTab('games')}
              className={`px-6 py-3 font-bold transition-colors ${
                activeTab === 'games' ? 'text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
              style={{ backgroundColor: activeTab === 'games' ? '#50a2ff' : 'transparent' }}
            >
              Fun Games
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 lg:p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Products</p>
                <p className="text-3xl font-bold" style={{ color: '#50a2ff' }}>{totalProducts}</p>
              </div>
              <Package className="w-12 h-12" style={{ color: '#50a2ff', opacity: 0.2 }} />
            </div>
          </div>
          <div className="bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">In Stock</p>
                <p className="text-3xl font-bold" style={{ color: '#71b781' }}>{inStockProducts}</p>
              </div>
              <TrendingUp className="w-12 h-12" style={{ color: '#71b781', opacity: 0.2 }} />
            </div>
          </div>
          <div className="bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Out of Stock</p>
                <p className="text-3xl font-bold" style={{ color: '#e60076' }}>{outOfStockProducts}</p>
              </div>
              <ShoppingCart className="w-12 h-12" style={{ color: '#e60076', opacity: 0.2 }} />
            </div>
          </div>
          <div className="bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Categories</p>
                <p className="text-3xl font-bold" style={{ color: '#ffd966' }}>{new Set(products.map(p => p.category)).size}</p>
              </div>
              <Users className="w-12 h-12" style={{ color: '#ffd966', opacity: 0.2 }} />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Product Management</h2>
          <button
            onClick={() => {
              setShowForm(true)
              setEditingProduct(null)
              setFormData({ name: '', price: '', image: '', category: '', placement: 'all-products', inStock: true })
            }}
            className="flex items-center gap-2 text-white px-6 py-3 hover:opacity-90 shadow-lg"
            style={{ backgroundColor: '#50a2ff' }}
          >
            <Plus className="w-5 h-5" />
            Add Product
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 mb-6 shadow-lg" style={{ borderLeft: '4px solid #50a2ff' }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: '#50a2ff' }}>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Product Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="px-4 py-2 border-2"
                style={{ borderColor: '#50a2ff' }}
                required
              />
              <input
                type="text"
                placeholder="Price (e.g., 24,990 RWF)"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="px-4 py-2 border-2"
                style={{ borderColor: '#50a2ff' }}
                required
              />
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="px-4 py-2 border-2 w-full"
                  style={{ borderColor: '#50a2ff' }}
                />
                {formData.image && (
                  <img src={formData.image} alt="Preview" className="mt-2 w-20 h-20 object-contain" />
                )}
              </div>
              <input
                type="text"
                placeholder="Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="px-4 py-2 border-2"
                style={{ borderColor: '#50a2ff' }}
                required
              />
              
              {/* Product Placement Selection */}
              <div className="md:col-span-2">
                <label className="block text-sm font-bold mb-2" style={{ color: '#50a2ff' }}>Where should this product appear?</label>
                <select
                  value={formData.placement}
                  onChange={(e) => setFormData({ ...formData, placement: e.target.value })}
                  className="w-full px-4 py-2 border-2"
                  style={{ borderColor: '#50a2ff' }}
                  required
                >
                  <option value="all-products">All Products Section</option>
                  <option value="featured">Featured Products</option>
                  <option value="books">Educational Books</option>
                  <option value="games">Fun Games Collection</option>
                  <option value="top-picks">Top Picks For You</option>
                  <option value="floating-deals">Floating Balloon Deals</option>
                </select>
              </div>
              
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.inStock}
                  onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                  className="w-5 h-5"
                />
                In Stock
              </label>
              <div className="flex gap-2">
                <button type="submit" disabled={uploading} className="text-white px-6 py-2 hover:opacity-90 disabled:opacity-50" style={{ backgroundColor: '#71b781' }}>
                  {uploading ? 'Uploading...' : editingProduct ? 'Update' : 'Add'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setEditingProduct(null)
                  }}
                  className="bg-gray-500 text-white px-6 py-2 hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-white shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ backgroundColor: '#50a2ff' }}>
                <tr>
                  <th className="px-6 py-4 text-left text-white font-bold">Image</th>
                  <th className="px-6 py-4 text-left text-white font-bold">Product Name</th>
                  <th className="px-6 py-4 text-left text-white font-bold">Price</th>
                  <th className="px-6 py-4 text-left text-white font-bold">Category</th>
                  <th className="px-6 py-4 text-left text-white font-bold">Status</th>
                  <th className="px-6 py-4 text-left text-white font-bold">Date Added</th>
                  <th className="px-6 py-4 text-left text-white font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, idx) => (
                  <tr key={product.id} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4">
                      <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-contain" />
                    </td>
                    <td className="px-6 py-4 font-semibold">{product.name}</td>
                    <td className="px-6 py-4 font-bold" style={{ color: '#e60076' }}>{product.price} RWF</td>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-bold text-white ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 text-white hover:opacity-80"
                          style={{ backgroundColor: '#50a2ff' }}
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-white hover:opacity-80"
                          style={{ backgroundColor: '#e60076' }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
