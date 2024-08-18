import express from "express";
import connectDB from "./config/db";
import userRoutes from "./routes/user/userRoutes";
import authRoutes from "./routes/auth/authRoutes";
import requestRoutes from "./routes/request/requestRoutes";
import questionRouter from "./routes/question/questionRoutes";
import cors from "cors";
import { errorHandler } from "./middleware/responseHandler";
import bodyParser from "body-parser";
import { BASE_ROUTE } from "./routes/http";
import dotenv from "dotenv";
import compression from "compression";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { setupSocketConnection } from "./config/ws";

dotenv.config();
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

const app = express();
const server = createServer(app);
const io = new SocketIOServer(server, {
  cors: corsOptions,
});
app.use(compression({ level: 9 }));
app.use(cookieParser());

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use(BASE_ROUTE, userRoutes);
app.use(BASE_ROUTE, authRoutes);
app.use(BASE_ROUTE, requestRoutes);
app.use(BASE_ROUTE, questionRouter);

app.get("/", (req, res) => {
  res.send("");
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

setupSocketConnection();

if (process.env.NODE_ENV !== "test") {
  connectDB().then(() => {
    console.log(`⚡️[api]: express is running in ${process.env.NODE_ENV} mode...`);
    server.listen(PORT, () => {
      console.log(`⚡️[api]: express http://localhost:${PORT}`);
    });
  });
}
export { io };
export default app;
