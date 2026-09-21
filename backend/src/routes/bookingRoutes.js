import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import { createBooking } from "../controllers/bookingController.js";

const router = Router();

const bookingLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Too many requests. Please try again in a few minutes." },
});

router.post("/", bookingLimiter, createBooking);

export default router;

