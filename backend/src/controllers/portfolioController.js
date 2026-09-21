import mongoose from "mongoose";
import { Portfolio } from "../models/Portfolio.js";
import { portfolio as localPortfolio } from "../seed.js";

const { key: _key, ...publicLocalPortfolio } = localPortfolio;

export async function getPortfolio(_request, response, next) {
  if (mongoose.connection.readyState !== 1) {
    response.set("Cache-Control", "no-store");
    return response.json({ data: publicLocalPortfolio, source: "local-fallback" });
  }

  try {
    const portfolio = await Portfolio.findOne({ key: "main" })
      .select("-__v -key")
      .lean();

    if (!portfolio) {
      return response.json({ data: publicLocalPortfolio, source: "local-fallback" });
    }

    if (portfolio.contentVersion !== localPortfolio.contentVersion) {
      response.set("Cache-Control", "no-store");
      return response.json({ data: publicLocalPortfolio, source: "local-fallback" });
    }

    response.set("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
    return response.json({ data: portfolio });
  } catch (error) {
    console.warn(`Portfolio database read failed: ${error.message}`);
    response.set("Cache-Control", "no-store");
    return response.json({ data: publicLocalPortfolio, source: "local-fallback" });
  }
}
