import type { PortfolioData } from "@/types/portfolio";

const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

// Production is hosted together with the Netlify Functions, so always use the
// same-origin API path. This also prevents a local .env value from being baked
// into the public production bundle.
export const API_URL =
  process.env.NODE_ENV === "production" ? "/api" : configuredApiUrl || "/api";

export async function fetchPortfolio(signal?: AbortSignal): Promise<PortfolioData> {
  const response = await fetch(`${API_URL}/portfolio`, { signal });

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    throw new Error(payload?.message || "Unable to load portfolio content.");
  }

  const payload = await response.json();
  return payload.data;
}
