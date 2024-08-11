import express from "express";
import connectDB from "./config/db";
import userRoutes from "./routes/user/userRoutes";
import authRoutes from "./routes/auth/authRoutes";
import requestRoutes from "./routes/request/requestRoutes";
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

const app = express();
const server = createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
app.use(compression({ level: 9 }));
app.use(cookieParser());

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use(BASE_ROUTE, userRoutes);
app.use(BASE_ROUTE, authRoutes);
app.use(BASE_ROUTE, requestRoutes);

app.get("/", (req, res) => {
  res.send("");
});

app.use(errorHandler);

const PORT = process.env.PORT || 4321; //todo: move env file

setupSocketConnection();

if (process.env.NODE_ENV !== "test") {
  connectDB().then(() => {
    console.log(`⚡️[api]: express...`);
    server.listen(PORT, () => {
      console.log(`⚡️[api]: express http://localhost:${PORT}`);
    });
  });
}
export { io };
export default app;
