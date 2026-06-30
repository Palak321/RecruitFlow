import express from "express";
import { register } from "../controllers/auth.controller.js";
import { login } from "../controllers/login.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { getCurrentUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticate, getCurrentUser);

export default router;