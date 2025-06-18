import { Request, Response } from 'express';

import * as eventService from '../services/eventService';


export const createEvent = async (req: any, res: Response) => {
    try {
        const { title, description, activity, date, gear, venueId } = req.body;
        if (!title || !activity || !date) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const parsedDate = new Date(date);
        if (!title || !activity || !date || isNaN(parsedDate.getTime())) {
            return res.status(400).json({ message: 'Missing or invalid fields' });
        }
        const event = await eventService.createEvent({
            title,
            description,
            activity,
            date: parsedDate,
            gear,
            organizerId: req.user!.userId,
            venueId,
        });
        res.status(201).json(event);
    } catch (e: any) {
        res.status(500).json({ message: e.message });
    }
};

export const getEvents = async (req: Request, res: Response) => {
    try {
        const { activity } = req.query;
        const events = await eventService.getEvents(activity as string);
        res.json(events);
    } catch (e: any) {
        res.status(500).json({ message: e.message });
    }
};

export const getEventById = async (req: Request, res: Response) => {
    try {
        const event = await eventService.getEventById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json(event);
    } catch (e: any) {
        res.status(500).json({ message: e.message });
    }
};

export const joinEvent = async (req: any, res: Response) => {
    try {
        await eventService.joinEvent(req.params.id, req.user!.userId);
        res.json({ message: 'Joined event' });
    } catch (e: any) {
        res.status(400).json({ message: e.message });
    }
};

export const leaveEvent = async (req: any, res: Response) => {
    try {
        await eventService.leaveEvent(req.params.id, req.user!.userId);
        res.json({ message: 'Left event' });
    } catch (e: any) {
        res.status(400).json({ message: e.message });
    }
};
