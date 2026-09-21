import cors from "cors";
import express from "express";
import helmet from "helmet";
import bookingRoutes from "./routes/bookingRoutes.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

export const app = express();

app.disable("x-powered-by");
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
  })
);
app.use(express.json({ limit: "20kb" }));

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/bookings", bookingRoutes);

app.use(notFound);
app.use(errorHandler);

