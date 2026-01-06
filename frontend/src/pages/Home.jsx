import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import ScanToParkCard from '../components/ScanToParkCard';
import RecentParkingCard from '../components/RecentParkingCard';
import { parkingService } from '../services/parkingService';

export default function Home() {
  const [parkings, setParkings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchParkings();
  }, []);

  const fetchParkings = async () => {
    try {
      setLoading(true);
      const response = await parkingService.getAllParkings();
      setParkings(response.data.parkings);
    } catch (err) {
      setError('Error loading parkings');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsPaid = async (parkingId) => {
    try {
      await parkingService.markParkingAsPaid(parkingId);
      fetchParkings();
    } catch (err) {
      console.error('Error marking as paid:', err);
    }
  };

  return (
    <div>
      <Header />

      <main className="container" style={{ paddingTop: 'var(--space-xl)', paddingBottom: 'var(--space-xl)' }}>
        <div className="grid cols-1" style={{ marginBottom: 'var(--space-2xl)' }}>
          <ScanToParkCard />
        </div>

        <div>
          <div className="section-header">
            <h2>Recent Activity</h2>
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading parking data...</p>
            </div>
          ) : parkings.length === 0 ? (
            <div className="empty-state">
              <p>No parking entries yet</p>
              <span className="text-sm text-secondary">Create your first parking entry to get started</span>
            </div>
          ) : (
            <div className="parking-list">
              {parkings.map((parking) => (
                <div key={parking.id} className="parking-item">
                  <RecentParkingCard parking={parking} />
                  {!parking.is_paid && (
                    <div className="parking-actions">
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleMarkAsPaid(parking.id)}
                      >
                        Mark as Paid
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
