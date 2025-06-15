import express from 'express';
import { ConnectDB } from './db';
import authRoutes from './auth/auth-api'
import categorRoutes from './category/category-api'
import budgetRoutes from './budget/budget-api'
import cors from 'cors'
const app = express()

ConnectDB()
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true                // Allow cookies, headers
}))
app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/', categorRoutes);
app.use('/api/v1/', budgetRoutes);
app.listen(3000, () => {
    console.log("Server listern on port 3000")
})
