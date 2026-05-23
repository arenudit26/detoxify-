import express from "express";
import { getFeed } from "../controllers/feed.controller.js";
// import { verifyFirebaseToken } from "../middlewares/verifyFirebaseToken.js";

const router = express.Router();

router.get("/", getFeed);

export default router;
