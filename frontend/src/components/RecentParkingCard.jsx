import React from 'react';

export default function RecentParkingCard({ parking }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="card">
      <div className="flex-between" style={{ marginBottom: '1rem' }}>
        <div>
          <h3 style={{ marginBottom: '0.25rem' }}>{parking.location}</h3>
          <p className="text-muted">{parking.city}</p>
        </div>
        <span
          className={`badge ${parking.is_paid ? 'badge-success' : 'badge-warning'}`}
        >
          {parking.is_paid ? '✓ Paid' : '⏳ Pending'}
        </span>
      </div>

      <div className="flex-between" style={{ marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <p className="text-muted" style={{ fontSize: '0.875rem' }}>
            Car Number
          </p>
          <p style={{ fontWeight: '600' }}>
            {parking.cars?.car_number || 'N/A'}
          </p>
        </div>
        <div>
          <p className="text-muted" style={{ fontSize: '0.875rem' }}>
            Duration
          </p>
          <p style={{ fontWeight: '600' }}>
            {parking.duration_minutes} mins
          </p>
        </div>
        <div>
          <p className="text-muted" style={{ fontSize: '0.875rem' }}>
            Fee
          </p>
          <p style={{ fontWeight: '600', color: '#22C55E' }}>
            ₹{parking.fee}
          </p>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '1rem' }}>
        <p className="text-muted" style={{ fontSize: '0.875rem' }}>
          {formatDate(parking.parking_date)}
        </p>
      </div>
    </div>
  );
}
