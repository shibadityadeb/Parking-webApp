import React, { useState } from 'react';
import QRScanner from './QRScanner';

export default function ScanToParkCard() {
  const [showScanner, setShowScanner] = useState(false);
  const [scanResult, setScanResult] = useState('');

  const handleScanClick = () => {
    setShowScanner(true);
  };

  const handleScanResult = (data) => {
    setScanResult(data);
    setShowScanner(false);
    // Here you would typically process the QR data
    alert(`QR Code scanned: ${data}`);
  };

  const handleCloseScanner = () => {
    setShowScanner(false);
  };

  return (
    <>
      <div className="scan-card">
        <div className="scan-card-content">
          <h3 className="scan-card-title">Quick Entry</h3>
          <p className="scan-card-description">
            Scan QR code for instant parking registration
          </p>
          <button className="btn btn-primary" onClick={handleScanClick}>
            Scan QR Code
          </button>
          {scanResult && (
            <p className="scan-result">Last scan: {scanResult}</p>
          )}
        </div>
      </div>

      {showScanner && (
        <QRScanner
          onScan={handleScanResult}
          onClose={handleCloseScanner}
        />
      )}
    </>
  );
}
