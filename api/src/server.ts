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
dotenv.config();

const app = express();

// Middleware
app.use(cors());
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

if (process.env.NODE_ENV !== "test") {
  connectDB().then(() => {
    console.log(`⚡️[api]: express...`);
    app.listen(PORT, () => {
      console.log(`⚡️[api]: express http://localhost:${PORT}`);
    });
  });
}

export default app;
