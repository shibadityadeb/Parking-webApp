import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import InsightCard from '../components/InsightCard';
import adminService from '../services/adminService';

export default function AdminDashboard() {
  const [insights, setInsights] = useState({
    totalCollection: 0,
    totalCars: 0,
    activeParkings: 0,
    totalParkings: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await adminService.getInsights();
      setInsights(data);
    } catch (err) {
      setError('Failed to load insights');
      console.error(err);
      // Set default values on error
      setInsights({
        totalCollection: 0,
        totalCars: 0,
        activeParkings: 0,
        totalParkings: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />

      <main className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        {/* Page Title */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ marginBottom: '0.5rem', color: '#1F2937' }}>
            📊 Admin Dashboard
          </h1>
          <p style={{ color: '#6B7280' }}>
            Real-time parking insights and analytics
          </p>
        </div>

        {/* Error Alert */}
        {error && <div className="alert alert-error">{error}</div>}

        {/* Insights Grid */}
        <div className="grid cols-2">
          <InsightCard
            title="Total Collection"
            value={loading ? '...' : `₹${insights.totalCollection}`}
            icon="💰"
            loading={loading}
          />
          <InsightCard
            title="Total Cars Registered"
            value={insights.totalCars}
            icon="🚗"
            loading={loading}
          />
          <InsightCard
            title="Active Parking Tickets"
            value={insights.activeParkings}
            icon="🎫"
            loading={loading}
          />
          <InsightCard
            title="Total Parking Sessions"
            value={insights.totalParkings}
            icon="📈"
            loading={loading}
          />
        </div>

        {/* Refresh Button */}
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <button
            className="btn btn-primary"
            onClick={fetchInsights}
            disabled={loading}
            style={{
              background: 'linear-gradient(135deg, #5B4BFF 0%, #7B6CFF 100%)',
              color: '#FFFFFF',
            }}
          >
            {loading ? '⏳ Refreshing...' : '🔄 Refresh Insights'}
          </button>
        </div>

        {/* Info Section */}
        <div
          style={{
            marginTop: '3rem',
            padding: '1.5rem',
            background: 'rgba(91, 75, 255, 0.1)',
            borderRadius: '1rem',
            borderLeft: '4px solid #5B4BFF',
          }}
        >
          <h3 style={{ color: '#5B4BFF', marginBottom: '0.5rem' }}>ℹ️ About This Dashboard</h3>
          <p style={{ color: '#6B7280', margin: 0, fontSize: '0.95rem' }}>
            This dashboard displays real-time analytics about parking operations. All metrics are
            automatically updated from the database and refresh whenever you click the refresh button.
          </p>
        </div>
      </main>
    </div>
  );
}
