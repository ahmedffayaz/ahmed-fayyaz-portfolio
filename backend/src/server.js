import "dotenv/config";
import { app } from "./app.js";
import { connectDatabase } from "./config/db.js";

const port = Number(process.env.PORT) || 5000;

async function startServer() {
  try {
    await connectDatabase();
  } catch (error) {
    console.warn(`MongoDB unavailable: ${error.message}`);
    console.warn("Starting API with the verified local portfolio content.");
  }

  const server = app.listen(port, () => {
    console.log(`Portfolio API listening on http://localhost:${port}`);
  });

  const shutdown = (signal) => {
    console.log(`${signal} received. Closing server.`);
    server.close(() => process.exit(0));
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
}

startServer().catch((error) => {
  console.error("Unable to start API:", error.message);
  process.exit(1);
});
