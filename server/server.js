import express from "express"
import cors from "cors"
import dotenv from "dotenv/config"
import cookieParser from "cookie-parser"
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import connectDB from "./config/mongodb.js"
import authRouter from "./routes/authRoutes.js"
import userRouter from "./routes/userRoutes.js"
import adminRouter from "./routes/adminRoutes.js"
import managerRouter from "./routes/managerRoutes.js"
import productRoutes from "./routes/productRoutes.js";
import inquiryRoutes from "./routes/inquiryRoutes.js";

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

app.use(cookieParser())
app.use(helmet());
app.use(express.json({ limit: "100kb" }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 100 }));

// API Endpoints
app.get('/', (req, res) => res.send("Production RBAC API is running"));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter); // Admin routes with RBAC
app.use('/api/manager', managerRouter); // Manager routes with limited permissions
app.use("/api/products", productRoutes);
app.use("/api/inquiries", inquiryRoutes);

app.listen(port, () => console.log(`Server started on PORT ${port}`))