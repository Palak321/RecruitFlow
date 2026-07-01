import express from "express";

import {
  applyToJobController,
  getMyApplicationsController,
} from "../controllers/application.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";
import {
  getApplicantsController,
  updateApplicationStatusController,
} from "../controllers/application.controller.js";

const router = express.Router();

// Candidate applies
router.post(
  "/",
  authenticate,
  authorize("CANDIDATE"),
  applyToJobController
);

// Candidate views own applications
router.get(
  "/my",
  authenticate,
  authorize("CANDIDATE"),
  getMyApplicationsController
);

router.get(
  "/job/:jobId",
  authenticate,
  authorize("RECRUITER"),
  getApplicantsController
);

router.patch(
  "/:id/status",
  authenticate,
  authorize("RECRUITER"),
  updateApplicationStatusController
);

export default router;
