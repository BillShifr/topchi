import { Response } from 'express';
import { prisma } from '../config/db';

export const getProfile = async (req: any, res: Response) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user!.userId },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                label: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json(user);
    } catch {
        res.status(500).json({ message: 'Server error' });
    }
};
