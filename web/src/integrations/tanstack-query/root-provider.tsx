import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const queryKeys = {
	rooms: {
		list: "list-rooms",
	},
} as const;

export function getContext() {
	return {
		queryClient,
	};
}

export async function refetchQuerie(key: string) {
	const context = getContext();

	await context.queryClient.refetchQueries({
		queryKey: [key],
	});
}

export function Provider({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}
