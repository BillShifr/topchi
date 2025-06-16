import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes';
import eventRoutes from "./routes/eventRoutes";
import venueRoutes from "./routes/venueRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/venues', venueRoutes);

export default app;
