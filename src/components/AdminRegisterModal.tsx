"use client";
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface AdminRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AdminRegisterModal = ({ isOpen, onClose, onSuccess }: AdminRegisterModalProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');

  const checkPasswordStrength = (pwd: string) => {
    if (pwd.length < 6) return 'Weak';
    if (pwd.length < 10) return 'Medium';
    if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && /[^A-Za-z0-9]/.test(pwd)) return 'Strong';
    return 'Medium';
  };

  useEffect(() => {
    if (password) {
      setPasswordStrength(checkPasswordStrength(password));
    }
  }, [password]);

  const handleRegister = async () => {
    setError('');
    
    if (!username || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      const response = await fetch('/api/admin-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Registration failed');
        return;
      }

      onSuccess();
      onClose();
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0, background: 'rgba(0,0,0,0.5)', zIndex: 2000, display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: '450px', background: '#FFFFFF', borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
        <div style={{ background: '#730000', padding: '24px', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#FEFACD', margin: 0 }}>
            Register Admin
          </h2>
          <X onClick={onClose} style={{ width: '24px', height: '24px', color: '#FEFACD', cursor: 'pointer' }} />
        </div>

        <div style={{ padding: '24px' }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#233D4C', marginBottom: '6px', display: 'block' }}>Username *</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              style={{ width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#233D4C', marginBottom: '6px', display: 'block' }}>Password *</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              style={{ width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
            />
            {password && (
              <div style={{ marginTop: '6px', fontSize: '12px', color: passwordStrength === 'Strong' ? '#00A86B' : passwordStrength === 'Medium' ? '#FD802E' : '#FF4444' }}>
                Strength: {passwordStrength}
              </div>
            )}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#233D4C', marginBottom: '6px', display: 'block' }}>Confirm Password *</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              style={{ width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
            />
          </div>

          {error && (
            <div style={{ background: '#FEE', border: '1px solid #F88', color: '#C00', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '13px' }}>
              {error}
            </div>
          )}

          <button
            onClick={handleRegister}
            style={{ width: '100%', background: '#730000', color: '#FEFACD', fontSize: '16px', fontWeight: '700', padding: '14px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          >
            Register Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminRegisterModal;
