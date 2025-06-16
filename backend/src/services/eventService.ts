import { prisma } from '../config/db';

interface CreateEventInput {
    title: string;
    description?: string;
    activity: string;
    date: Date;
    gear?: string;
    organizerId: string;
    venueId?: string;
}

export const createEvent = async (data: CreateEventInput) => {
    return prisma.event.create({
        data: {
            title: data.title,
            description: data.description,
            activity: data.activity,
            date: data.date,
            gear: data.gear,
            organizerId: data.organizerId,
            venueId: data.venueId,
        },
    });
};

export const getEvents = async (activity?: string) => {
    const where = activity ? { activity } : {};
    return prisma.event.findMany({
        where,
        include: {
            organizer: {
                select: { id: true, name: true, label: true, role: true },
            },
            venue: true,
            participants: {
                select: { id: true, name: true },
            },
        },
        orderBy: { date: 'asc' },
    });
};

export const getEventById = async (id: string) => {
    return prisma.event.findUnique({
        where: { id },
        include: {
            organizer: true,
            venue: true,
            participants: true,
        },
    });
};

export const joinEvent = async (eventId: string, userId: string) => {
    const event = await prisma.event.findUnique({
        where: { id: eventId },
        include: { participants: true },
    });
    if (!event) throw new Error('Event not found');

    const isParticipant = event.participants.some((p) => p.id === userId);
    if (isParticipant) throw new Error('User already joined');

    return prisma.event.update({
        where: { id: eventId },
        data: {
            participants: { connect: { id: userId } },
        },
    });
};

export const leaveEvent = async (eventId: string, userId: string) => {
    return prisma.event.update({
        where: { id: eventId },
        data: {
            participants: { disconnect: { id: userId } },
        },
    });
};
