import React, { useState, useEffect } from 'react';
import CarForm from '../components/CarForm';
import { parkingService } from '../services/parkingService';

export default function Cars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const response = await parkingService.carService.getAllCars();
      setCars(response.data.cars || []);
    } catch (err) {
      setError('Error loading cars');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCarAdded = () => {
    setShowForm(false);
    fetchCars();
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ margin: 0 }}>🚗 Cars</h1>
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
            style={{ background: '#5B4BFF', color: '#FFFFFF', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: '500' }}
          >
            {showForm ? '❌ Cancel' : '➕ Add Car'}
          </button>
        </div>

        {error && (
          <div style={{ background: '#FEE2E2', color: '#991B1B', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
            {error}
          </div>
        )}

        {showForm && (
          <div style={{ background: '#F9FAFB', padding: '2rem', borderRadius: '0.75rem', marginBottom: '2rem' }}>
            <CarForm onSuccess={handleCarAdded} />
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div className="spinner" style={{ margin: '0 auto' }}></div>
          </div>
        ) : cars.length === 0 ? (
          <div style={{ background: '#DBEAFE', color: '#1E40AF', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
            No cars yet. Add your first car!
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {cars.map((car) => (
              <div
                key={car.id}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                }}
              >
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#1F2937' }}>{car.car_name}</h3>
                <p style={{ margin: '0.25rem 0', color: '#6B7280', fontSize: '0.9rem' }}>
                  <strong>Number:</strong> {car.car_number}
                </p>
                <p style={{ margin: '0.25rem 0', color: '#6B7280', fontSize: '0.9rem' }}>
                  <strong>Driver ID:</strong> {car.driver_id}
                </p>
                <p style={{ margin: '0.25rem 0', color: '#6B7280', fontSize: '0.9rem' }}>
                  <strong>ID:</strong> {car.id}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
