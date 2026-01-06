import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import driverRoutes from './routes/drivers.js';
import carRoutes from './routes/cars.js';
import parkingRoutes from './routes/parkings.js';
import adminRoutes from './routes/admin.js';
import { verifyToken } from './middleware/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Routes
// Public auth routes
app.use('/api/auth', authRoutes);

// Protected routes (require JWT authentication)
app.use('/api/drivers', verifyToken, driverRoutes);
app.use('/api/cars', verifyToken, carRoutes);
app.use('/api/parkings', verifyToken, parkingRoutes);
app.use('/api/admin', verifyToken, adminRoutes);

// Health check (public)
app.get('/', (req, res) => {
  res.json({ status: 'Server is running' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
