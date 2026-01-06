import express from 'express';
import {
  addDriver,
  getAllDrivers,
  getDriverById,
} from '../controllers/driverController.js';

const router = express.Router();

// Add a new driver
router.post('/', addDriver);

// Get all drivers
router.get('/', getAllDrivers);

// Get driver by ID
router.get('/:id', getDriverById);

export default router;
