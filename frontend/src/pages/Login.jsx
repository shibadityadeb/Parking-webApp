import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await login(email, password);

      if (result.success) {
        // Redirect based on role
        if (result.user.role === 'ADMIN') {
          navigate('/admin');
        } else if (result.user.role === 'MANAGER') {
          navigate('/home');
        }
      } else {
        setError(result.error || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '1rem',
      }}
    >
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '1rem',
          padding: '2rem',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          maxWidth: '400px',
          width: '100%',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', color: '#5B4BFF', margin: '0 0 0.5rem 0' }}>
            🚗 Smart Parking
          </h1>
          <p style={{ color: '#6B7280', margin: 0, fontSize: '0.95rem' }}>
            Intelligent Parking Management System
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div
            style={{
              background: '#FEE2E2',
              border: '1px solid #FCA5A5',
              color: '#991B1B',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              marginBottom: '1.5rem',
              fontSize: '0.9rem',
            }}
          >
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          {/* Email */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#1F2937',
                fontSize: '0.95rem',
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #D1D5DB',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                boxSizing: 'border-box',
                transition: 'border-color 0.3s ease',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#5B4BFF')}
              onBlur={(e) => (e.target.style.borderColor = '#D1D5DB')}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#1F2937',
                fontSize: '0.95rem',
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #D1D5DB',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                boxSizing: 'border-box',
                transition: 'border-color 0.3s ease',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#5B4BFF')}
              onBlur={(e) => (e.target.style.borderColor = '#D1D5DB')}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: loading ? '#CBD5E1' : 'linear-gradient(135deg, #5B4BFF 0%, #7B6CFF 100%)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '0.5rem',
              fontWeight: '600',
              fontSize: '1rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            {loading ? '🔄 Logging in...' : '🔓 Login'}
          </button>
        </form>

        {/* Signup Link */}
        <div
          style={{
            marginTop: '1.5rem',
            textAlign: 'center',
            color: '#6B7280',
            fontSize: '0.9rem',
          }}
        >
          Don't have an account?{' '}
          <Link
            to="/signup"
            style={{
              color: '#5B4BFF',
              textDecoration: 'none',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Sign Up
          </Link>
        </div>

        {/* Demo Credentials */}
        <div
          style={{
            marginTop: '1.5rem',
            padding: '1rem',
            background: '#F3F4F6',
            borderRadius: '0.5rem',
            fontSize: '0.85rem',
            color: '#6B7280',
            lineHeight: '1.6',
          }}
        >
          <p style={{ margin: '0 0 0.5rem 0', fontWeight: '500', color: '#374151' }}>
            📝 Demo Accounts:
          </p>
          <p style={{ margin: '0 0 0.25rem 0' }}>
            <strong>Admin:</strong> admin@parking.com / admin123
          </p>
          <p style={{ margin: 0 }}>
            <strong>Manager:</strong> manager@parking.com / manager123
          </p>
        </div>
      </div>
    </div>
  );
}
