import express from "express";
import connectDB from "./config/db";
import userRoutes from "./routes/user/userRoutes";
import authRoutes from "./routes/auth/authRoutes";
import cors from "cors";
import { errorHandler } from "./middleware/responseHandler";
import bodyParser from "body-parser";
import { BASE_ROUTE } from "./routes/http";
import dotenv from "dotenv";
import http from "http";
dotenv.config();

const app = express();

// Connect to DB only if not in test environment
if (process.env.NODE_ENV !== "test") {
  connectDB();
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use(BASE_ROUTE, userRoutes);
app.use(BASE_ROUTE, authRoutes);

app.get("/", (req, res) => {
  res.send("");
});

app.use(errorHandler);

const port = process.env.PORT || 5000;
let server: http.Server | undefined;
if (process.env.NODE_ENV !== "test") {
  server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

// Handle graceful shutdown
const shutdown = () => {
  if (server) {
    server.close(() => {
      console.log("Server closed");
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

export default app;
