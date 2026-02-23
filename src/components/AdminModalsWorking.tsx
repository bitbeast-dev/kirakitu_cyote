"use client";
import { useState } from 'react';
import { X } from 'lucide-react';

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
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: '#FFFFFF', borderRadius: '16px', width: '400px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
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
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: '#FFFFFF', borderRadius: '16px', width: '400px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
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

// Simplified Product and PromoBanner modals - add full functionality later
export { ProductModal, PromoBannerModal } from './AdminModals';
