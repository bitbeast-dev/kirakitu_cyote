"use client";
import { useState, useEffect } from 'react';
import { X, Lock, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import AdminRegisterModal from './AdminRegisterModal';

export default function AdminLoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await fetch('/api/admin-exists');
        const data = await response.json();
        setShowRegister(!data.exists);
      } catch (err) {
        setShowRegister(true);
      }
    };
    if (isOpen) checkAdmin();
  }, [isOpen]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      localStorage.setItem('admin_session', 'true');
      localStorage.setItem('admin_id', data.id);
      onClose();
      router.push('/admin');
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  const handleRegisterSuccess = () => {
    setShowRegister(false);
    setIsRegisterOpen(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={onClose}>
        <div onClick={(e) => e.stopPropagation()} style={{ background: '#FFFFFF', borderRadius: '16px', width: '400px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
          <div style={{ background: '#730000', padding: '24px', borderRadius: '16px 16px 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Lock style={{ width: '24px', height: '24px', color: '#FEFACD' }} />
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#FEFACD', margin: 0 }}>Admin Access</h2>
            </div>
            <X onClick={onClose} style={{ width: '24px', height: '24px', color: '#FEFACD', cursor: 'pointer' }} />
          </div>
          
          <form onSubmit={handleLogin} style={{ padding: '32px' }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#233D4C', marginBottom: '8px' }}>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                style={{ width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                required
              />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#233D4C', marginBottom: '8px' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  style={{ width: '100%', padding: '12px', paddingRight: '40px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}
                >
                  {showPassword ? <EyeOff style={{ width: '18px', height: '18px', color: '#666' }} /> : <Eye style={{ width: '18px', height: '18px', color: '#666' }} />}
                </button>
              </div>
            </div>

            {error && (
              <div style={{ background: '#FEE', border: '1px solid #F88', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px', color: '#C00' }}>
                {error}
              </div>
            )}

            <button type="submit" style={{ width: '100%', background: '#730000', color: '#FEFACD', fontSize: '16px', fontWeight: '700', padding: '14px', border: 'none', borderRadius: '8px', cursor: 'pointer', marginBottom: '12px' }}>
              Login to Dashboard
            </button>

            {showRegister && (
              <button type="button" onClick={() => setIsRegisterOpen(true)} style={{ width: '100%', background: 'transparent', color: '#730000', fontSize: '14px', fontWeight: '600', padding: '12px', border: '2px solid #730000', borderRadius: '8px', cursor: 'pointer' }}>
                Register New Admin
              </button>
            )}
          </form>
        </div>
      </div>

      <AdminRegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} onSuccess={handleRegisterSuccess} />
    </>
  );
}
