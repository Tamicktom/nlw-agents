//* Local imports
import { env } from "@/env";

type ValidRoutes = "/rooms";

export function apiURL(validRoute: ValidRoutes) {
  return parseApiUrl(env.VITE_API_URL) + validRoute;
}

function parseApiUrl(apiUrl: string): string {
  let parsedUrl = apiUrl;

  if (parsedUrl.endsWith("/")) {
    parsedUrl = parsedUrl.slice(0, -1);
  }

  return parsedUrl;
}