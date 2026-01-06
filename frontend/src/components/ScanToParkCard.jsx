import React from 'react';

export default function ScanToParkCard() {
  return (
    <div
      className="card"
      style={{
        background: 'linear-gradient(135deg, #5B4BFF 0%, #7B6CFF 100%)',
        color: '#FFFFFF',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📱</div>
      <h3 style={{ marginBottom: '0.5rem' }}>Scan to Park</h3>
      <p style={{ marginBottom: '1.5rem', opacity: 0.9 }}>
        Quick parking entry with QR code scanning
      </p>
      <button className="btn" style={{ background: '#FFC107', color: '#1F2937' }}>
        Scan QR Code
      </button>
    </div>
  );
}
