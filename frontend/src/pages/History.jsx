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

      <main className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div className="grid cols-1">
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
