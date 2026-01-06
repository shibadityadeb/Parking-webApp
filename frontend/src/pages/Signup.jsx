import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('MANAGER');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  // Password requirements based on role
  const requiredPassword = role === 'ADMIN' ? 'admin123' : 'manager123';
  const isPasswordCorrect = password === requiredPassword;
  const isPasswordsMatch = password === confirmPassword;

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    // Validate form
    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (!isPasswordCorrect) {
      setError(`Password must be "${requiredPassword}" for ${role} role`);
      return;
    }

    if (!isPasswordsMatch) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const result = await signup(name, email, password, role);

      if (result.success) {
        // Redirect based on role
        if (result.user.role === 'ADMIN') {
          navigate('/admin');
        } else if (result.user.role === 'MANAGER') {
          navigate('/home');
        }
      } else {
        setError(result.error || 'Signup failed. Please try again.');
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
          maxWidth: '500px',
          width: '100%',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', color: '#5B4BFF', margin: '0 0 0.5rem 0' }}>
            🚗 Smart Parking
          </h1>
          <p style={{ color: '#6B7280', margin: 0, fontSize: '0.95rem' }}>
            Create an Account
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

        {/* Signup Form */}
        <form onSubmit={handleSignup}>
          {/* Name */}
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
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #D1D5DB',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                boxSizing: 'border-box',
              }}
            />
          </div>

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
              }}
            />
          </div>

          {/* Role Selection */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '0.75rem',
                fontWeight: '600',
                color: '#1F2937',
                fontSize: '0.95rem',
              }}
            >
              Role
            </label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {/* Admin */}
              <label
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  padding: '1rem',
                  border: `2px solid ${role === 'ADMIN' ? '#5B4BFF' : '#E5E7EB'}`,
                  borderRadius: '0.75rem',
                  cursor: 'pointer',
                  background: role === 'ADMIN' ? '#F3F0FF' : '#FFFFFF',
                }}
              >
                <input
                  type="radio"
                  name="role"
                  value="ADMIN"
                  checked={role === 'ADMIN'}
                  onChange={(e) => setRole(e.target.value)}
                  style={{ marginRight: '0.5rem', cursor: 'pointer' }}
                />
                <div>
                  <div style={{ fontWeight: '600', color: '#1F2937' }}>📊 Admin</div>
                  <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>Analytics Only</div>
                </div>
              </label>

              {/* Manager */}
              <label
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  padding: '1rem',
                  border: `2px solid ${role === 'MANAGER' ? '#5B4BFF' : '#E5E7EB'}`,
                  borderRadius: '0.75rem',
                  cursor: 'pointer',
                  background: role === 'MANAGER' ? '#F3F0FF' : '#FFFFFF',
                }}
              >
                <input
                  type="radio"
                  name="role"
                  value="MANAGER"
                  checked={role === 'MANAGER'}
                  onChange={(e) => setRole(e.target.value)}
                  style={{ marginRight: '0.5rem', cursor: 'pointer' }}
                />
                <div>
                  <div style={{ fontWeight: '600', color: '#1F2937' }}>⚙️ Manager</div>
                  <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>Operations</div>
                </div>
              </label>
            </div>
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
              Password (Must be "{requiredPassword}")
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={requiredPassword}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: `1px solid ${isPasswordCorrect ? '#22C55E' : password ? '#EF4444' : '#D1D5DB'}`,
                borderRadius: '0.5rem',
                fontSize: '1rem',
                boxSizing: 'border-box',
                background: isPasswordCorrect && password ? '#ECFDF5' : password && !isPasswordCorrect ? '#FEF2F2' : '#FFFFFF',
              }}
            />
            {password && (
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem', color: isPasswordCorrect ? '#22C55E' : '#EF4444' }}>
                {isPasswordCorrect ? '✓ Password correct' : '✗ Password incorrect'}
              </p>
            )}
          </div>

          {/* Confirm Password */}
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
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: `1px solid ${confirmPassword && isPasswordsMatch ? '#22C55E' : confirmPassword && !isPasswordsMatch ? '#EF4444' : '#D1D5DB'}`,
                borderRadius: '0.5rem',
                fontSize: '1rem',
                boxSizing: 'border-box',
                background: confirmPassword && isPasswordsMatch ? '#ECFDF5' : confirmPassword && !isPasswordsMatch ? '#FEF2F2' : '#FFFFFF',
              }}
            />
            {confirmPassword && (
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem', color: isPasswordsMatch ? '#22C55E' : '#EF4444' }}>
                {isPasswordsMatch ? '✓ Passwords match' : '✗ Passwords do not match'}
              </p>
            )}
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            disabled={loading || !isPasswordCorrect || !isPasswordsMatch}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: loading || !isPasswordCorrect || !isPasswordsMatch ? '#CBD5E1' : 'linear-gradient(135deg, #5B4BFF 0%, #7B6CFF 100%)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '0.5rem',
              fontWeight: '600',
              fontSize: '1rem',
              cursor: loading || !isPasswordCorrect || !isPasswordsMatch ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            {loading ? '🔄 Creating Account...' : '✨ Create Account'}
          </button>
        </form>

        {/* Login Link */}
        <div
          style={{
            marginTop: '1.5rem',
            textAlign: 'center',
            color: '#6B7280',
            fontSize: '0.9rem',
          }}
        >
          Already have an account?{' '}
          <Link
            to="/login"
            style={{
              color: '#5B4BFF',
              textDecoration: 'none',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Login
          </Link>
        </div>

        {/* Info Section */}
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
            🔐 Fixed Passwords:
          </p>
          <p style={{ margin: '0 0 0.25rem 0' }}>
            <strong>Admin:</strong> Must use password "admin123"
          </p>
          <p style={{ margin: 0 }}>
            <strong>Manager:</strong> Must use password "manager123"
          </p>
        </div>
      </div>
    </div>
  );
}
