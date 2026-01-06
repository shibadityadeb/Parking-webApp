import React, { useState, useEffect } from 'react';
import { carService, driverService } from '../services/parkingService';

export default function CarForm({ onCarAdded }) {
  const [formData, setFormData] = useState({
    driver_id: '',
    car_name: '',
    car_number: '',
  });
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingDrivers, setLoadingDrivers] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      setLoadingDrivers(true);
      const response = await driverService.getAllDrivers();
      setDrivers(response.data.drivers);
    } catch (err) {
      setError('Error loading drivers');
    } finally {
      setLoadingDrivers(false);
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

    if (!formData.driver_id || !formData.car_name || !formData.car_number) {
      setError('All fields are required');
      return;
    }

    try {
      setLoading(true);
      const response = await carService.addCar(
        formData.driver_id,
        formData.car_name,
        formData.car_number
      );
      setSuccess('Car added successfully!');
      setFormData({ driver_id: '', car_name: '', car_number: '' });
      if (onCarAdded) {
        onCarAdded(response.data.car);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Error adding car');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-card">
      <div className="form-header">
        <h2>Add Car</h2>
      </div>

      <form onSubmit={handleSubmit} className="form">
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="form-group">
          <label htmlFor="driver_id">Driver</label>
          <select
            id="driver_id"
            name="driver_id"
            value={formData.driver_id}
            onChange={handleChange}
            disabled={loadingDrivers}
          >
            <option value="">
              {loadingDrivers ? 'Loading drivers...' : 'Select a driver'}
            </option>
            {drivers.map((driver) => (
              <option key={driver.id} value={driver.id}>
                {driver.name} ({driver.phone})
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="car_name">Car Name</label>
            <input
              type="text"
              id="car_name"
              name="car_name"
              value={formData.car_name}
              onChange={handleChange}
              placeholder="Honda Accord"
            />
          </div>

          <div className="form-group">
            <label htmlFor="car_number">Car Number</label>
            <input
              type="text"
              id="car_number"
              name="car_number"
              value={formData.car_number}
              onChange={handleChange}
              placeholder="MH02AB1234"
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading || loadingDrivers}
          >
            {loading ? 'Adding...' : 'Add Car'}
          </button>
        </div>
      </form>
    </div>
  );
}
