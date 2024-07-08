import express, { ErrorRequestHandler } from "express";
import connectDB from "./config/db";
import userRoutes from "./routes/user/userRoutes";
import authRoutes from "./routes/auth/authRoutes";
import cors from "cors";
import { errorHandler } from "./middleware/responseHandler";
import bodyParser from "body-parser";

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
app.use("/api", userRoutes);
app.use("/api", authRoutes);

app.get("/", (req, res) => {
  res.send("");
});

app.use(errorHandler);

const port = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

export default app;
