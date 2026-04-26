import express from "express"
import cors from "cors"
import dotenv from "dotenv/config"
import cookieParser from "cookie-parser"
import connectDB from "./config/mongodb.js"
import authRouter from "./routes/authRoutes.js"
import userRouter from "./routes/userRoutes.js"
import adminRouter from "./routes/adminRoutes.js"
import managerRouter from "./routes/managerRoutes.js"

// dotenv.config({
//     Path: "./config/.env"
// })

const app = express();
const port = process.env.PORT || 4000
connectDB()

const allowedOrigins = [process.env.FRONTEND_URL,];

app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials: true, origin: allowedOrigins}))

// API Endpoints
app.get('/', (req, res) => res.send("Production RBAC API is running"));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter); // Admin routes with RBAC
app.use('/api/manager', managerRouter); // Manager routes with limited permissions

app.listen(port, () => console.log(`Server started on PORT ${port}`))