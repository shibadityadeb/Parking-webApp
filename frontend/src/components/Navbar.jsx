import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show navbar on login page
  if (location.pathname === '/login') {
    return null;
  }

  // Don't show navbar if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Determine which nav items to show based on role
  const getRoleBasedNav = () => {
    if (user?.role === 'ADMIN') {
      return [
        { label: 'Home', icon: '🏠', path: '/home' },
        { label: 'Admin', icon: '📊', path: '/admin' },
      ];
    } else if (user?.role === 'MANAGER') {
      return [
        { label: 'Home', icon: '🏠', path: '/home' },
        { label: 'History', icon: '📝', path: '/history' },
      ];
    }
    return [];
  };

  const navItems = getRoleBasedNav();
  const isActive = (path) => location.pathname === path;

  return (
    <nav
      style={{
        background: '#FFFFFF',
        borderBottom: '1px solid #E5E7EB',
        padding: '0 1rem',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <div className="container">
        <div className="flex-between" style={{ height: '60px' }}>
          <div
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#5B4BFF',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/home')}
          >
            🚗 Smart Parking
          </div>
          <div className="flex" style={{ gap: '2rem', alignItems: 'center' }}>
            {/* Nav Items */}
            {navItems.map((item) => (
              <NavButton
                key={item.path}
                label={item.label}
                icon={item.icon}
                isActive={isActive(item.path)}
                onClick={() => navigate(item.path)}
              />
            ))}

            {/* Role Badge */}
            <div
              style={{
                padding: '0.5rem 1rem',
                background: user?.role === 'ADMIN' ? '#FEE2E2' : '#DBEAFE',
                color: user?.role === 'ADMIN' ? '#991B1B' : '#1E40AF',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '500',
              }}
            >
              {user?.role === 'ADMIN' ? '📊 Admin' : '⚙️ Manager'}
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              style={{
                background: '#EF4444',
                color: '#FFFFFF',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#DC2626';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = '#EF4444';
              }}
            >
              <span>🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavButton({ label, icon, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: isActive ? '#5B4BFF' : 'transparent',
        color: isActive ? '#FFFFFF' : '#5B4BFF',
        border: 'none',
        cursor: 'pointer',
        padding: '0.5rem 1rem',
        borderRadius: '0.5rem',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        transition: 'all 0.3s ease',
      }}
      onMouseOver={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = 'rgba(91, 75, 255, 0.1)';
        }
      }}
      onMouseOut={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = 'transparent';
        }
      }}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
}
