import React, { useState, useRef, useEffect } from 'react';

export default function QRScanner({ onScan, onClose }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [error, setError] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    requestCameraPermission();
    return () => {
      stopCamera();
    };
  }, []);

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setHasPermission(true);
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setHasPermission(false);
      setError('Camera access denied. Please allow camera permissions and try again.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  const handleVideoClick = () => {
    // Simple QR detection simulation - in a real app, you'd use a proper QR library
    const mockQRData = "PARKING_SPOT_001";
    onScan(mockQRData);
  };

  if (hasPermission === null) {
    return (
      <div className="qr-scanner-modal">
        <div className="qr-scanner-content">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Requesting camera permission...</p>
          </div>
        </div>
      </div>
    );
  }

  if (hasPermission === false) {
    return (
      <div className="qr-scanner-modal">
        <div className="qr-scanner-content">
          <div className="error-state">
            <h3>Camera Access Required</h3>
            <p>{error}</p>
            <div className="qr-scanner-actions">
              <button className="btn btn-primary" onClick={requestCameraPermission}>
                Try Again
              </button>
              <button className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="qr-scanner-modal">
      <div className="qr-scanner-content">
        <div className="qr-scanner-header">
          <h3>Scan QR Code</h3>
          <button className="btn-close" onClick={onClose}>×</button>
        </div>
        
        <div className="qr-scanner-camera">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            onClick={handleVideoClick}
            style={{
              width: '100%',
              maxWidth: '400px',
              height: 'auto',
              borderRadius: '8px'
            }}
          />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          
          <div className="qr-scanner-overlay">
            <div className="qr-scanner-frame"></div>
            <p>Position QR code within the frame</p>
            <p className="text-sm">Tap camera to simulate scan</p>
          </div>
        </div>

        <div className="qr-scanner-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}