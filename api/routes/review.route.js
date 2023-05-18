import express from "express";
import { createReview, deleteReview, getReview } from "../controller/review.controller.js";
import { verifyToken } from "../middleware/jwt.js"; 

const router = express.Router();

router.post("/",verifyToken, createReview);
router.get("/:gigId",getReview);
router.get("/:id", deleteReview);

export default router;
