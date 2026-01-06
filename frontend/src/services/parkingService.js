import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error('VITE_API_URL environment variable is required');
}

const apiClient = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT token to all requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Drivers API
export const driverService = {
  addDriver: (name, phone) =>
    apiClient.post('/drivers', { name, phone }),
  getAllDrivers: () =>
    apiClient.get('/drivers'),
  getDriverById: (id) =>
    apiClient.get(`/drivers/${id}`),
};

// Cars API
export const carService = {
  addCar: (driver_id, car_name, car_number) =>
    apiClient.post('/cars', { driver_id, car_name, car_number }),
  getCarsByDriver: (driver_id) =>
    apiClient.get('/cars', { params: { driver_id } }),
  getAllCars: () =>
    apiClient.get('/cars/all'),
  getCarById: (id) =>
    apiClient.get(`/cars/${id}`),
};

// Parkings API
export const parkingService = {
  createParking: (car_id, location, city, parking_date, duration_minutes, fee) =>
    apiClient.post('/parkings', {
      car_id,
      location,
      city,
      parking_date,
      duration_minutes,
      fee,
    }),
  getAllParkings: () =>
    apiClient.get('/parkings'),
  getParkingById: (id) =>
    apiClient.get(`/parkings/${id}`),
  markParkingAsPaid: (id) =>
    apiClient.patch(`/parkings/${id}/pay`),
  getParkingsByCarId: (car_id) =>
    apiClient.get(`/parkings/car/${car_id}`),
  deleteParking: (id) =>
    apiClient.delete(`/parkings/${id}`),
};

export default apiClient;
