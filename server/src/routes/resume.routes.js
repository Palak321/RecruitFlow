import express from "express";

import { uploadResumeController } from "../controllers/resume.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

router.post(
  "/upload",
  authenticate,
  authorize("CANDIDATE"),
  upload.single("resume"),
  uploadResumeController
);

export default router;