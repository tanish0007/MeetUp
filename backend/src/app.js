import express from 'express'
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import chatRoutes from './routes/chat.route.js';
import { connectDB } from './lib/db.js';
import cors from 'cors';

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
}))
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/chat', chatRoutes);

app.listen(process.env.PORT || 5001, () => {
    console.log(`\nServer is running on http://localhost:${process.env.PORT || 5001}`);
    connectDB();
})