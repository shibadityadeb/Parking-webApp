import express from 'express';
import {
  createParking,
  getAllParkings,
  getParkingsByCarId,
  markParkingAsPaid,
  getParkingById,
  deleteParking,
} from '../controllers/parkingController.js';

const router = express.Router();

// Create a new parking entry
router.post('/', createParking);

// Get all parkings (latest first)
router.get('/', getAllParkings);

// Get parking by ID
router.get('/:id', getParkingById);

// Mark parking as paid
router.patch('/:id/pay', markParkingAsPaid);

// Get parkings by car ID
router.get('/car/:car_id', getParkingsByCarId);

// Delete parking entry
router.delete('/:id', deleteParking);

export default router;
