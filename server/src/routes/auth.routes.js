import express from "express";
import { authCheck } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/me", authCheck);

export default router;
