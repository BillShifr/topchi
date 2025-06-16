import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import { getProfile } from '../controllers/userController';

const router = Router();

router.get('/profile', authenticateToken, getProfile);

export default router;
