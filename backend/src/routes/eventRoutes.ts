import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import {
    createEvent,
    getEvents,
    getEventById,
    joinEvent,
    leaveEvent,
} from '../controllers/eventController';

const router = Router();

router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/', authenticateToken, createEvent);
router.post('/:id/join', authenticateToken, joinEvent);
router.post('/:id/leave', authenticateToken, leaveEvent);

export default router;
