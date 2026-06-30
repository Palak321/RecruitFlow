import express from "express";

import {
  createJobController,
  getAllJobsController,
  getJobByIdController,
  updateJobController,
  deleteJobController,
} from "../controllers/job.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const router = express.Router();

router.get("/", getAllJobsController);

router.get("/:id", getJobByIdController);

router.post(
  "/",
  authenticate,
  authorize("RECRUITER"),
  createJobController
);

router.put(
  "/:id",
  authenticate,
  authorize("RECRUITER"),
  updateJobController
);

router.delete(
  "/:id",
  authenticate,
  authorize("RECRUITER"),
  deleteJobController
);

export default router;