import express from "express";

import {
  recruiterDashboard,
  candidateDashboard,
} from "../controllers/dashboard.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const router = express.Router();

router.get(
  "/recruiter",
  authenticate,
  authorize("RECRUITER"),
  recruiterDashboard
);

router.get(
  "/candidate",
  authenticate,
  authorize("CANDIDATE"),
  candidateDashboard
);

export default router;