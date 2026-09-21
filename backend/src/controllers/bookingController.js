import mongoose from "mongoose";
import { z } from "zod";
import { Booking } from "../models/Booking.js";
import { sendBookingNotification } from "../services/emailService.js";

const bookingSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.email().max(160),
  company: z.string().trim().max(120).optional().default(""),
  meetingType: z.enum([
    "Project discussion",
    "Technical consultation",
    "Career conversation",
  ]),
  budget: z.string().trim().max(60).optional().default(""),
  preferredDate: z.coerce.date().refine((date) => date > new Date(), {
    message: "Please choose a future date.",
  }),
  timezone: z.string().trim().min(2).max(80),
  message: z.string().trim().min(20).max(2000),
});

export async function createBooking(request, response, next) {
  try {
    const result = bookingSchema.safeParse(request.body);

    if (!result.success) {
      return response.status(400).json({
        message: "Please review the highlighted information.",
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    try {
      await sendBookingNotification(result.data);
    } catch (error) {
      console.error("Booking email failed:", error.message);
      return response.status(503).json({
        message:
          "Email delivery is temporarily unavailable. Please contact me directly at ahmedfayyaz7891@gmail.com.",
      });
    }

    let bookingId = null;
    if (mongoose.connection.readyState === 1) {
      try {
        const booking = await Booking.create(result.data);
        bookingId = booking.id;
      } catch (error) {
        console.warn("Booking was emailed but could not be saved:", error.message);
      }
    }

    return response.status(201).json({
      message: "Thanks — your request was sent successfully.",
      bookingId,
    });
  } catch (error) {
    return next(error);
  }
}
