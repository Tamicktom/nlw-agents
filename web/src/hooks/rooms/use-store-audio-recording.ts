//* Libraries imports
import { useMutation } from "@tanstack/react-query";
import z from "zod/v4";

//* Local imports
import { apiURL } from "@/utils/api";

const apiResponseSchema = z.any();

async function storeAudioRecording(roomId: string, audio: File) {
	const url = apiURL(`/rooms/${roomId}/audio-recording`);

	const formData = new FormData();

	formData.append("file", audio);

	const response = await fetch(url, {
		method: "POST",
		body: formData,
	});

	const data = apiResponseSchema.parse(await response.json());

	console.log(data);

	return data;
}

export function useStoreAudioRecording(roomId: string) {
	return useMutation({
		mutationFn: async (audio: File) => await storeAudioRecording(roomId, audio),
	});
}
