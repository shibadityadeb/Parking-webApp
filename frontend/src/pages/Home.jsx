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

      <main className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div className="grid cols-1" style={{ marginBottom: '3rem' }}>
          <ScanToParkCard />
        </div>

        <div>
          <h2 style={{ marginBottom: '1.5rem' }}>Recent Parking</h2>

          {error && <div className="alert alert-error">{error}</div>}

          {loading ? (
            <div className="text-center" style={{ padding: '2rem' }}>
              <div className="spinner" style={{ margin: '0 auto' }}></div>
            </div>
          ) : parkings.length === 0 ? (
            <div className="alert alert-info">
              No parking entries yet. Create your first entry!
            </div>
          ) : (
            <div className="grid cols-1">
              {parkings.map((parking) => (
                <div key={parking.id}>
                  <RecentParkingCard parking={parking} />
                  {!parking.is_paid && (
                    <button
                      className="btn btn-success"
                      onClick={() => handleMarkAsPaid(parking.id)}
                      style={{
                        width: '100%',
                        marginTop: '0.5rem',
                        fontSize: '0.875rem',
                      }}
                    >
                      Mark as Paid
                    </button>
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
