import React from 'react';
import '../styles/theme.css';

export default function Header() {
  return (
    <header
      style={{
        background: 'linear-gradient(135deg, #5B4BFF 0%, #7B6CFF 100%)',
        color: '#FFFFFF',
        padding: '2rem 1rem',
        textAlign: 'center',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      }}
    >
      <div className="container">
        <h1 style={{ marginBottom: '0.5rem' }}>🚗 Smart Parking</h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.95 }}>Welcome back!</p>
      </div>
    </header>
  );
}
