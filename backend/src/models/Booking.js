import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, trim: true, lowercase: true },
    company: { type: String, trim: true, maxlength: 120 },
    meetingType: {
      type: String,
      required: true,
      enum: ["Project discussion", "Technical consultation", "Career conversation"],
    },
    budget: { type: String, trim: true, maxlength: 60 },
    preferredDate: { type: Date, required: true },
    timezone: { type: String, required: true, trim: true, maxlength: 80 },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
    status: {
      type: String,
      enum: ["new", "contacted", "scheduled", "closed"],
      default: "new",
    },
  },
  { timestamps: true }
);

bookingSchema.index({ createdAt: -1 });
bookingSchema.index({ email: 1, createdAt: -1 });

export const Booking =
  mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

