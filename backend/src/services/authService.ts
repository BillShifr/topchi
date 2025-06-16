import { prisma } from '../config/db';
import { hashPassword, comparePasswords } from '../utils/hash';
import { generateToken } from '../utils/jwt';

interface RegisterInput {
    name: string;
    email: string;
    password: string;
    role: 'athlete' | 'organizer';
    label?: string;
}

export const registerUser = async (data: RegisterInput) => {
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) throw new Error('Email already in use');

    const hashed = await hashPassword(data.password);
    const user = await prisma.user.create({
        data: { ...data, password: hashed },
    });
    return user;
};

export const loginUser = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('Invalid credentials');

    const isValid = await comparePasswords(password, user.password);
    if (!isValid) throw new Error('Invalid credentials');

    const token = generateToken({ userId: user.id, role: user.role });
    return { token, user };
};
