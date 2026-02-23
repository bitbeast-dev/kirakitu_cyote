"use client";
import { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';

export function ProductModal({ isOpen, onClose, categories, brands, editProduct }: any) {
  const [formData, setFormData] = useState({ name: '', brand: '', category: '', mainCategory: 'Electronics', price: '', wholesalePrice: '', stockCount: '', imageUrl: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const mainCategories = ['Electronics', 'Home Appliances', 'Personal Care & Grooming', 'Audio & Radios', 'Home & Living'];

  useEffect(() => {
    if (editProduct) {
      setFormData({
        name: editProduct.name || '',
        brand: editProduct.brand || '',
        category: editProduct.category || '',
        mainCategory: editProduct.mainCategory || 'Electronics',
        price: editProduct.price?.toString() || '',
        wholesalePrice: editProduct.wholesalePrice?.toString() || '',
        stockCount: editProduct.stockCount?.toString() || '',
        imageUrl: editProduct.imageUrl || '',
        description: editProduct.description || ''
      });
    } else {
      setFormData({ name: '', brand: '', category: '', mainCategory: 'Electronics', price: '', wholesalePrice: '', stockCount: '', imageUrl: '', description: '' });
    }
  }, [editProduct, isOpen]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const data = new FormData();
      data.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: data });
      const result = await res.json();
      setFormData(prev => ({ ...prev, imageUrl: result.secure_url }));
    } catch (error) {
      alert('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imageUrl) {
      alert('Please upload a product image');
      return;
    }
    setLoading(true);
    try {
      const method = editProduct ? 'PUT' : 'POST';
      const url = editProduct ? `/api/products?id=${editProduct.id}` : '/api/products';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, price: parseFloat(formData.price), wholesalePrice: parseFloat(formData.wholesalePrice) || parseFloat(formData.price), stockCount: parseInt(formData.stockCount), inStock: parseInt(formData.stockCount) > 0 })
      });
      if (!res.ok) {
        const error = await res.json();
        alert(`Error: ${error.error || 'Failed to save product'}`);
        return;
      }
      setFormData({ name: '', brand: '', category: '', mainCategory: 'Electronics', price: '', wholesalePrice: '', stockCount: '', imageUrl: '', description: '' });
      onClose();
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save product. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: '#FFFFFF', borderRadius: '16px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        <div style={{ background: '#730000', padding: '24px', borderRadius: '16px 16px 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#FEFACD', margin: 0 }}>{editProduct ? 'Edit Product' : 'Add New Product'}</h2>
          <X onClick={onClose} style={{ width: '24px', height: '24px', color: '#FEFACD', cursor: 'pointer' }} />
        </div>
        <form onSubmit={handleSubmit} style={{ padding: '32px' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#233D4C', marginBottom: '8px' }}>Product Name *</label>
            <input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required type="text" placeholder="Enter product name" style={{ width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '14px' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#233D4C', marginBottom: '8px' }}>Main Category *</label>
            <select value={formData.mainCategory} onChange={(e) => setFormData({...formData, mainCategory: e.target.value})} required style={{ width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '14px' }}>
              {mainCategories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#233D4C', marginBottom: '8px' }}>Sub Category *</label>
            <input value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} required type="text" placeholder="Enter sub category" style={{ width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '14px' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#233D4C', marginBottom: '8px' }}>Brand</label>
            <select value={formData.brand} onChange={(e) => setFormData({...formData, brand: e.target.value})} style={{ width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '14px' }}>
              <option value="">Select brand</option>
              {brands?.map((brand: string) => <option key={brand} value={brand}>{brand}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#233D4C', marginBottom: '8px' }}>Retail Price (1 unit) *</label>
            <input value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required type="number" step="0.01" placeholder="0.00" style={{ width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '14px' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#233D4C', marginBottom: '8px' }}>Wholesale Price (5+ units)</label>
            <input value={formData.wholesalePrice} onChange={(e) => setFormData({...formData, wholesalePrice: e.target.value})} type="number" step="0.01" placeholder="0.00" style={{ width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '14px' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#233D4C', marginBottom: '8px' }}>Stock Quantity *</label>
            <input value={formData.stockCount} onChange={(e) => setFormData({...formData, stockCount: e.target.value})} required type="number" placeholder="0" style={{ width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '14px' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#233D4C', marginBottom: '8px' }}>Product Image *</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} id="product-image" />
            <label htmlFor="product-image" style={{ display: 'block', border: '2px dashed #e5e7eb', borderRadius: '8px', padding: '32px', textAlign: 'center', cursor: 'pointer' }}>
              {uploading ? (
                <p style={{ fontSize: '13px', color: '#730000', margin: 0 }}>Uploading...</p>
              ) : formData.imageUrl ? (
                <div>
                  <img src={formData.imageUrl} alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px', margin: '0 auto 8px', display: 'block' }} />
                  <p style={{ fontSize: '13px', color: '#00A86B', margin: 0 }}>✓ Image uploaded</p>
                </div>
              ) : (
                <div>
                  <Upload style={{ width: '32px', height: '32px', color: '#999', margin: '0 auto 8px' }} />
                  <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>Click to upload product image</p>
                </div>
              )}
            </label>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#233D4C', marginBottom: '8px' }}>Description</label>
            <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Enter product description" rows={4} style={{ width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', resize: 'vertical' }} />
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" disabled={loading} style={{ flex: 1, background: '#730000', color: '#FEFACD', fontSize: '14px', fontWeight: '600', padding: '12px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
              {loading ? (editProduct ? 'Updating...' : 'Creating...') : (editProduct ? 'Update Product' : 'Create Product')}
            </button>
            <button type="button" onClick={onClose} style={{ flex: 1, background: '#e5e7eb', color: '#233D4C', fontSize: '14px', fontWeight: '600', padding: '12px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function CategoryModal({ isOpen, onClose }: any) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      setName('');
      onClose();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: '#FFFFFF', borderRadius: '16px', width: '100%', maxWidth: '400px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        <div style={{ background: '#730000', padding: '24px', borderRadius: '16px 16px 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#FEFACD', margin: 0 }}>Add New Category</h2>
          <X onClick={onClose} style={{ width: '24px', height: '24px', color: '#FEFACD', cursor: 'pointer' }} />
        </div>
        <form onSubmit={handleSubmit} style={{ padding: '32px' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#233D4C', marginBottom: '8px' }}>Category Name *</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required type="text" placeholder="Enter category name" style={{ width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '14px' }} />
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" disabled={loading} style={{ flex: 1, background: '#730000', color: '#FEFACD', fontSize: '14px', fontWeight: '600', padding: '12px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
              {loading ? 'Creating...' : 'Create Category'}
            </button>
            <button type="button" onClick={onClose} style={{ flex: 1, background: '#e5e7eb', color: '#233D4C', fontSize: '14px', fontWeight: '600', padding: '12px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function BrandModal({ isOpen, onClose }: any) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/brands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      setName('');
      onClose();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: '#FFFFFF', borderRadius: '16px', width: '100%', maxWidth: '400px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        <div style={{ background: '#730000', padding: '24px', borderRadius: '16px 16px 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#FEFACD', margin: 0 }}>Add New Brand</h2>
          <X onClick={onClose} style={{ width: '24px', height: '24px', color: '#FEFACD', cursor: 'pointer' }} />
        </div>
        <form onSubmit={handleSubmit} style={{ padding: '32px' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#233D4C', marginBottom: '8px' }}>Brand Name *</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required type="text" placeholder="Enter brand name" style={{ width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '14px' }} />
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" disabled={loading} style={{ flex: 1, background: '#730000', color: '#FEFACD', fontSize: '14px', fontWeight: '600', padding: '12px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
              {loading ? 'Creating...' : 'Create Brand'}
            </button>
            <button type="button" onClick={onClose} style={{ flex: 1, background: '#e5e7eb', color: '#233D4C', fontSize: '14px', fontWeight: '600', padding: '12px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function PromoBannerModal({ isOpen, onClose }: any) {
  const [formData, setFormData] = useState({ title: '', subtitle: '', imageUrl: '', buttonText: 'Shop Now', buttonLink: '/shop', position: 'hero', order: '1', isActive: true });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const data = new FormData();
      data.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: data });
      const result = await res.json();
      setFormData(prev => ({ ...prev, imageUrl: result.secure_url }));
    } catch (error) {
      alert('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imageUrl) {
      alert('Please upload a banner image');
      return;
    }
    setLoading(true);
    try {
      await fetch('/api/promo-banners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, order: parseInt(formData.order) })
      });
      setFormData({ title: '', subtitle: '', imageUrl: '', buttonText: 'Shop Now', buttonLink: '/shop', position: 'hero', order: '1', isActive: true });
      onClose();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: '#FFFFFF', borderRadius: '16px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        <div style={{ background: '#730000', padding: '24px', borderRadius: '16px 16px 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#FEFACD', margin: 0 }}>Add Promo Banner</h2>
          <X onClick={onClose} style={{ width: '24px', height: '24px', color: '#FEFACD', cursor: 'pointer' }} />
        </div>
        <form onSubmit={handleSubmit} style={{ padding: '32px' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#233D4C', marginBottom: '8px' }}>Banner Title *</label>
            <input value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required type="text" placeholder="Enter banner title" style={{ width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '14px' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#233D4C', marginBottom: '8px' }}>Banner Position *</label>
            <select value={formData.position} onChange={(e) => setFormData({...formData, position: e.target.value})} required style={{ width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '14px' }}>
              <option value="hero">Hero Section (Main Banner)</option>
              <option value="sidebar1">Sidebar Position 1</option>
              <option value="sidebar2">Sidebar Position 2</option>
            </select>
            <p style={{ fontSize: '11px', color: '#666', marginTop: '4px', marginBottom: 0 }}>Hero: Full-width top banner | Sidebar: Right side promotional banners</p>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#233D4C', marginBottom: '8px' }}>Subtitle</label>
            <input value={formData.subtitle} onChange={(e) => setFormData({...formData, subtitle: e.target.value})} type="text" placeholder="Enter subtitle" style={{ width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '14px' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#233D4C', marginBottom: '8px' }}>Banner Image *</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} id="banner-image" />
            <label htmlFor="banner-image" style={{ display: 'block', border: '2px dashed #e5e7eb', borderRadius: '8px', padding: '32px', textAlign: 'center', cursor: 'pointer' }}>
              {uploading ? (
                <p style={{ fontSize: '13px', color: '#730000', margin: 0 }}>Uploading...</p>
              ) : formData.imageUrl ? (
                <div>
                  <img src={formData.imageUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', margin: '0 auto 8px', display: 'block' }} />
                  <p style={{ fontSize: '13px', color: '#00A86B', margin: 0 }}>✓ Image uploaded</p>
                </div>
              ) : (
                <div>
                  <Upload style={{ width: '32px', height: '32px', color: '#999', margin: '0 auto 8px' }} />
                  <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>Click to upload banner image (1200x400 recommended)</p>
                </div>
              )}
            </label>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#233D4C', marginBottom: '8px' }}>Button Text</label>
            <input value={formData.buttonText} onChange={(e) => setFormData({...formData, buttonText: e.target.value})} type="text" placeholder="Shop Now" style={{ width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '14px' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#233D4C', marginBottom: '8px' }}>Display Order</label>
            <input value={formData.order} onChange={(e) => setFormData({...formData, order: e.target.value})} type="number" placeholder="1" style={{ width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '14px' }} />
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" disabled={loading} style={{ flex: 1, background: '#730000', color: '#FEFACD', fontSize: '14px', fontWeight: '600', padding: '12px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
              {loading ? 'Creating...' : 'Create Banner'}
            </button>
            <button type="button" onClick={onClose} style={{ flex: 1, background: '#e5e7eb', color: '#233D4C', fontSize: '14px', fontWeight: '600', padding: '12px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
