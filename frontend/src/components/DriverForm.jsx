import React, { useState } from 'react';
import { driverService } from '../services/parkingService';

export default function DriverForm({ onDriverAdded }) {
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name || !formData.phone) {
      setError('All fields are required');
      return;
    }

    try {
      setLoading(true);
      const response = await driverService.addDriver(
        formData.name,
        formData.phone
      );
      setSuccess('Driver added successfully!');
      setFormData({ name: '', phone: '' });
      if (onDriverAdded) {
        onDriverAdded(response.data.driver);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Error adding driver');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-card">
      <div className="form-header">
        <h2>Add Driver</h2>
      </div>

      <form onSubmit={handleSubmit} className="form">
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="9876543210"
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Driver'}
          </button>
        </div>
      </form>
    </div>
  );
}
