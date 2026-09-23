import mongoose from "mongoose";

let connectionPromise;

async function connectDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not configured.");
  }

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(uri, {
      dbName: process.env.MONGODB_DB || "ahmed_portfolio",
      maxPoolSize: 5,
      serverSelectionTimeoutMS: 8_000,
    });
  }

  try {
    return await connectionPromise;
  } catch (error) {
    connectionPromise = undefined;
    throw error;
  }
}

export default async () => {
  try {
    const connection = await connectDatabase();
    const database = connection.connection.db;

    if (!database) {
      throw new Error("MongoDB connection is unavailable.");
    }

    const portfolio = await database.collection("portfolios").findOne(
      { key: "main" },
      {
        projection: {
          _id: 0,
          __v: 0,
          key: 0,
        },
      }
    );

    if (!portfolio) {
      return Response.json(
        { message: "Portfolio content has not been seeded." },
        { status: 404 }
      );
    }

    return Response.json(
      { data: portfolio },
      {
        headers: {
          "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (error) {
    console.error("Portfolio function error:", error);
    return Response.json(
      { message: "Portfolio content is temporarily unavailable." },
      { status: 503 }
    );
  }
};
