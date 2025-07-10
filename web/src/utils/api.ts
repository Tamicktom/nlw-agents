//* Local imports
import { env } from "@/env";

type ValidRoutes = "/rooms" | `/rooms/${string}/questions`;

type Params = {
	[key: string]: string | number;
};

export function apiURL(validRoute: ValidRoutes, params: Params = {}) {
	let url = parseApiUrl(env.VITE_API_URL) + validRoute;

	const paramsKeys = Object.keys(params);

	let paramsUrl = "?";

	for (const key of paramsKeys) {
		if (paramsUrl.endsWith("?") || paramsUrl.endsWith("&")) {
			paramsUrl = `${paramsUrl}${key}=${params[key]}`;
			continue;
		}

		paramsUrl = `${paramsUrl}&${key}=${params[key]}`;
	}

	if (paramsKeys.length > 0) url = url + paramsUrl;

	return url;
}

function parseApiUrl(apiUrl: string): string {
	let parsedUrl = apiUrl;

	if (parsedUrl.endsWith("/")) {
		parsedUrl = parsedUrl.slice(0, -1);
	}

	return parsedUrl;
}
