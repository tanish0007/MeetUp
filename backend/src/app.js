import express from 'express'
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import authRoutes from './routes/auth.route.js'
import { connectDB } from './lib/db.js';

app.use(express.json());
app.use('/api/auth', authRoutes);

app.listen(process.env.PORT || 5001, () => {
    console.log(`\nServer is running on http://localhost:${process.env.PORT || 5001}`);
    connectDB();
})