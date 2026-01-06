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
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://parkingportal.vercel.app',
  'https://parkingportal-qhpgg9rxa-shibadityadeb-adypueduins-projects.vercel.app'
];

// Add logging to debug CORS
const corsOptions = {
  origin: function(origin, callback) {
    console.log('Request origin:', origin);
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // Log rejection but still allow for debugging
      console.warn('CORS rejected origin:', origin);
      callback(null, true); // Allow anyway to debug
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  optionsSuccessStatus: 200,
  maxAge: 86400
};

app.use(cors(corsOptions));

// Handle preflight requests explicitly
app.options('*', cors(corsOptions));
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
  res.json({ status: 'Server is running', port: PORT });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Server is running',
    port: PORT,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔐 CORS enabled for:`, allowedOrigins);
});
