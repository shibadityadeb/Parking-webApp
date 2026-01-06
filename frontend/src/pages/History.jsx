import React, { useState } from 'react';
import Header from '../components/Header';
import DriverForm from '../components/DriverForm';
import CarForm from '../components/CarForm';
import ParkingForm from '../components/ParkingForm';

export default function History() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleFormSubmit = () => {
    // Refresh the forms
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div>
      <Header />

      <main className="container" style={{ paddingTop: 'var(--space-xl)', paddingBottom: 'var(--space-xl)' }}>
        <div className="grid cols-1 gap-xl">
          <DriverForm key={`driver-${refreshKey}`} onDriverAdded={handleFormSubmit} />
          <CarForm key={`car-${refreshKey}`} onCarAdded={handleFormSubmit} />
          <ParkingForm
            key={`parking-${refreshKey}`}
            onParkingAdded={handleFormSubmit}
          />
        </div>
      </main>
    </div>
  );
}
