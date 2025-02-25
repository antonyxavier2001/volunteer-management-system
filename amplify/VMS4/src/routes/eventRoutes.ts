import express from 'express';
import { addEvent, getEvents } from '../controllers/eventController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Event routes - protected by API key
router.post('/events', protect, addEvent);
router.get('/events', protect, getEvents);

export default router;