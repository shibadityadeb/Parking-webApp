import express from 'express';
import { getInsights } from '../controllers/adminController.js';

const router = express.Router();

// Get admin insights
router.get('/insights', getInsights);

export default router;
