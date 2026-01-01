import express from "express";
import { getDSA, toggleProgress } from "../controllers/dsa.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, getDSA);
router.post("/progress", authMiddleware, toggleProgress);

export default router;
