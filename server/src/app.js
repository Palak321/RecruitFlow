import express from "express";
import cors from "cors";

import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";
import errorHandler from "./middlewares/error.middleware.js";
import jobRoutes from "./routes/job.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jobs", jobRoutes);

// Root Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to RecruitFlow API 🚀",
  });
});
app.use(errorHandler);
export default app;