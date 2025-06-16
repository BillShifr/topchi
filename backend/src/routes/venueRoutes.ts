import { Router } from 'express';
import { authenticateToken, authorizeRole } from '../middlewares/authMiddleware';
import { createVenue, getVenues } from '../controllers/venueController';

const router = Router();

router.get('/', getVenues);
router.post('/', authenticateToken, authorizeRole('organizer'), createVenue);

export default router;
