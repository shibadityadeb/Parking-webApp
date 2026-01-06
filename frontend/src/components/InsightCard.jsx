import React from 'react';

export default function InsightCard({ title, value, loading = false }) {
  return (
    <div className="insight-card">
      <div className="insight-card-content">
        <div className="insight-card-header">
          <p className="insight-card-title">{title}</p>
        </div>
        
        <div className="insight-card-value">
          {loading ? (
            <div className="spinner" style={{ width: '24px', height: '24px' }}></div>
          ) : (
            <span className="insight-value">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
