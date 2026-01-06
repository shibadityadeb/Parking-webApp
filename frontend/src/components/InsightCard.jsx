import React from 'react';

export default function InsightCard({ title, value, icon, loading = false }) {
  return (
    <div
      className="card"
      style={{
        background: '#FFFFFF',
        borderRadius: '1rem',
        padding: '1.5rem',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        minHeight: '150px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <p
            style={{
              color: '#6B7280',
              fontSize: '0.875rem',
              fontWeight: '500',
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            {title}
          </p>
          {loading ? (
            <div className="spinner" style={{ width: '24px', height: '24px' }}></div>
          ) : (
            <h2
              style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: '#1F2937',
                margin: 0,
              }}
            >
              {typeof value === 'number' ? value.toLocaleString() : value}
            </h2>
          )}
        </div>
        <div
          style={{
            fontSize: '2rem',
            opacity: 0.7,
          }}
        >
          {icon}
        </div>
      </div>

      <div
        style={{
          height: '4px',
          background: 'linear-gradient(135deg, #5B4BFF 0%, #7B6CFF 100%)',
          borderRadius: '2px',
          marginTop: '1rem',
        }}
      ></div>
    </div>
  );
}
