import mongoose from "mongoose";

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is missing. Add it to backend/.env.");
  }

  await mongoose.connect(uri, {
    dbName: process.env.MONGODB_DB || "ahmed_portfolio",
    serverSelectionTimeoutMS: 10000,
  });

  console.log(`MongoDB connected: ${mongoose.connection.name}`);
}

