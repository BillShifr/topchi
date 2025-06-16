import { Request, Response } from 'express';
import * as authService from '../services/authService';

export const register = async (req: Request, res: Response) => {
    try {
        const user = await authService.registerUser(req.body);
        res.status(201).json({ message: 'User registered', userId: user.id });
    } catch (e: any) {
        res.status(400).json({ message: e.message });
    }
};

export const login = async (req: Request, res: Response) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "Тело запроса отсутствует или пустое" });
    }

    try {
        const { email, password } = req.body;

        if (!email?.trim()) {
            return res.status(400).json({ message: "Email обязателен" });
        }
        if (!password?.trim()) {
            return res.status(400).json({ message: "Пароль обязателен" });
        }

        const { token, user } = await authService.loginUser(email.trim(), password);

        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (e: any) {
        res.status(400).json({ message: e.message });
    }
};
