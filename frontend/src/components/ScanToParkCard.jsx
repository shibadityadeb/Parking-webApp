import React from 'react';

export default function ScanToParkCard() {
  return (
    <div className="scan-card">
      <div className="scan-card-content">
        <h3 className="scan-card-title">Quick Entry</h3>
        <p className="scan-card-description">
          Scan QR code for instant parking registration
        </p>
        <button className="btn btn-primary">
          Scan QR Code
        </button>
      </div>
    </div>
  );
}
