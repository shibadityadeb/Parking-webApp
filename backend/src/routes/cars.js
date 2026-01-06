import express from 'express';
import {
  addCar,
  getCarsByDriver,
  getAllCars,
  getCarById,
} from '../controllers/carController.js';

const router = express.Router();

// Add a new car
router.post('/', addCar);

// Get all cars
router.get('/all', getAllCars);

// Get cars by driver ID
router.get('/', getCarsByDriver);

// Get car by ID
router.get('/:id', getCarById);

export default router;
