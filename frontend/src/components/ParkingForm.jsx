import React, { useState, useEffect } from 'react';
import { parkingService, carService } from '../services/parkingService';

export default function ParkingForm({ onParkingAdded }) {
  const [formData, setFormData] = useState({
    car_id: '',
    location: '',
    city: '',
    parking_date: '',
    duration_minutes: '',
    fee: '',
  });
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCars, setLoadingCars] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setLoadingCars(true);
      const response = await carService.getAllCars();
      setCars(response.data.cars);
    } catch (err) {
      setError('Error loading cars');
    } finally {
      setLoadingCars(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const { car_id, location, city, parking_date, duration_minutes, fee } =
      formData;

    if (
      !car_id ||
      !location ||
      !city ||
      !parking_date ||
      !duration_minutes ||
      !fee
    ) {
      setError('All fields are required');
      return;
    }

    try {
      setLoading(true);
      const response = await parkingService.createParking(
        car_id,
        location,
        city,
        parking_date,
        parseInt(duration_minutes),
        parseInt(fee)
      );
      setSuccess('Parking entry created successfully!');
      setFormData({
        car_id: '',
        location: '',
        city: '',
        parking_date: '',
        duration_minutes: '',
        fee: '',
      });
      if (onParkingAdded) {
        onParkingAdded(response.data.parking);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Error creating parking entry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2 style={{ marginBottom: '1.5rem' }}>Create Parking Entry</h2>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="form-group">
        <label htmlFor="car_id">Car</label>
        <select
          id="car_id"
          name="car_id"
          value={formData.car_id}
          onChange={handleChange}
          disabled={loadingCars}
        >
          <option value="">
            {loadingCars ? 'Loading cars...' : 'Select a car'}
          </option>
          {cars.map((car) => (
            <option key={car.id} value={car.id}>
              {car.car_name} ({car.car_number})
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="location">Location (Parking Area)</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="e.g., Phoenix Mall"
        />
      </div>

      <div className="form-group">
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="e.g., Mumbai"
        />
      </div>

      <div className="form-group">
        <label htmlFor="parking_date">Parking Date</label>
        <input
          type="date"
          id="parking_date"
          name="parking_date"
          value={formData.parking_date}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="duration_minutes">Duration (Minutes)</label>
        <input
          type="number"
          id="duration_minutes"
          name="duration_minutes"
          value={formData.duration_minutes}
          onChange={handleChange}
          placeholder="e.g., 120"
          min="1"
        />
      </div>

      <div className="form-group">
        <label htmlFor="fee">Fee (₹)</label>
        <input
          type="number"
          id="fee"
          name="fee"
          value={formData.fee}
          onChange={handleChange}
          placeholder="e.g., 50"
          min="0"
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={loading || loadingCars}
        style={{ width: '100%' }}
      >
        {loading ? 'Creating...' : 'Create Parking Entry'}
      </button>
    </form>
  );
}
