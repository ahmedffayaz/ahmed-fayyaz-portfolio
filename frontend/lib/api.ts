import type { PortfolioData } from "@/types/portfolio";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:5000/api";

export async function fetchPortfolio(signal?: AbortSignal): Promise<PortfolioData> {
  const response = await fetch(`${API_URL}/portfolio`, { signal });

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    throw new Error(payload?.message || "Unable to load portfolio content.");
  }

  const payload = await response.json();
  return payload.data;
}

