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

      <main className="container" style={{ paddingTop: 'var(--space-xl)', paddingBottom: 'var(--space-xl)' }}>
        {error && <div className="alert alert-error">{error}</div>}

        <div className="grid cols-2 gap-lg">
          <InsightCard
            title="Total Collection"
            value={loading ? '...' : `₹${insights.totalCollection}`}
            loading={loading}
          />
          <InsightCard
            title="Total Cars"
            value={insights.totalCars}
            loading={loading}
          />
          <InsightCard
            title="Active Tickets"
            value={insights.activeParkings}
            loading={loading}
          />
          <InsightCard
            title="Total Sessions"
            value={insights.totalParkings}
            loading={loading}
          />
        </div>

        <div className="dashboard-actions">
          <button
            className="btn btn-secondary"
            onClick={fetchInsights}
            disabled={loading}
          >
            {loading ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>
      </main>
    </div>
  );
}
