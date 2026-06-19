import express from "express"
import cors from "cors"
import dotenv from "dotenv/config"
import cookieParser from "cookie-parser"
import connectDB from "./config/mongodb.js"
import authRouter from "./routes/authRoutes.js"
import userRouter from "./routes/userRoutes.js"
import adminRouter from "./routes/adminRoutes.js"
import managerRouter from "./routes/managerRoutes.js"
import productRoutes from "./routes/productRoutes.js";

// dotenv.config({
//     Path: "./config/.env"
// })

const app = express();
const port = process.env.PORT || 4000
connectDB()

// CORS configuration must come before routes
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}))

app.use(express.json())
app.use(cookieParser())

// API Endpoints
app.get('/', (req, res) => res.send("Production RBAC API is running"));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter); // Admin routes with RBAC
app.use('/api/manager', managerRouter); // Manager routes with limited permissions
app.use("/api/products", productRoutes);

app.listen(port, () => console.log(`Server started on PORT ${port}`))