import express from "express";
import { register, getCurrentUser } from "../controllers/auth.controller.js";
import { login } from "../controllers/login.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/me", authenticate, getCurrentUser);

// Temporary route to test RBAC
router.get(
  "/recruiter-only",
  authenticate,
  authorize("RECRUITER"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Recruiter!",
    });
  }
);

export default router;