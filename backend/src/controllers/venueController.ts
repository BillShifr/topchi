import { Request, Response } from 'express';
import { prisma } from '../config/db';

export const getVenues = async (req: Request, res: Response) => {
    try {
        const venues = await prisma.venue.findMany();
        res.json(venues);
    } catch {
        res.status(500).json({ message: 'Failed to get venues' });
    }
};

export const createVenue = async (req: any, res: Response) => {
    const { name, description, latitude, longitude, type } = req.body;

    if (!name || latitude === undefined || longitude === undefined) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const venue = await prisma.venue.create({
            data: { name, description, latitude, longitude, type },
        });
        res.status(201).json(venue);
    } catch {
        res.status(500).json({ message: 'Failed to create venue' });
    }
};
