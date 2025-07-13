import { createFileRoute, useParams } from "@tanstack/react-router";
//* Libraries imports
import React from "react";

//* Components imports
import { Button } from "@/components/ui/button";

//* Hooks
import { useStoreAudioRecording } from "@/hooks/rooms/use-store-audio-recording";

export const Route = createFileRoute("/record-room-audio/$roomId")({
	component: RouteComponent,
});

const isRecordingSuppoerted =
	!!navigator.mediaDevices &&
	typeof navigator.mediaDevices.getUserMedia === "function" &&
	typeof window.MediaRecorder === "function";

function RouteComponent() {
	const [isRecording, setIsRecording] = React.useState(false);
	const recorder = React.useRef<MediaRecorder>(null);
	const intervalRef = React.useRef<number>(null);

	const params = useParams({ from: "/record-room-audio/$roomId" });

	const storeAudioRecording = useStoreAudioRecording(params.roomId);

	const uploadAudio = (audio: Blob) => {
		storeAudioRecording.mutate(audio);
	};

	const createRecorder = async () => {
		const audio = await navigator.mediaDevices.getUserMedia({
			audio: {
				echoCancellation: true,
				noiseSuppression: true,
				sampleRate: 44_100,
			},
		});

		const newRecorder = new MediaRecorder(audio, {
			mimeType: "audio/webm",
			audioBitsPerSecond: 64_000,
		});

		newRecorder.ondataavailable = (event) => {
			if (event.data.size > 0) {
				console.log(event.data);
				uploadAudio(event.data);
			}
		};

		newRecorder.onstart = () => {
			console.log("Gravação iniciada!");
		};

		newRecorder.onstop = () => {
			console.log("Gravação pausada");
		};

		return newRecorder;
	};

	const stopRecording = async () => {
		setIsRecording(false);

		if (intervalRef.current) {
			clearInterval(intervalRef.current);
		}

		if (recorder.current) {
			recorder.current.stop();
		}
	};

	const startRecording = async () => {
		if (!isRecordingSuppoerted) {
			alert("Seu navegador não suporta gravação");
			return;
		}

		setIsRecording(true);

		if (!recorder.current) {
			recorder.current = await createRecorder();

			intervalRef.current = setInterval(() => {
				console.log("resetting...");
				recorder.current?.stop();
				recorder.current?.start();
			}, 10_000);
		} else {
			console.log("Recorder from cache");
			recorder.current.start();
		}
	};

	return (
		<div className="w-full min-h-svh flex items-center justify-center flex-col gap-3">
			<Button
				id="record-audio"
				type="button"
				onPointerDown={isRecording ? stopRecording : startRecording}
			>
				{isRecording ? "Parar gravação" : "Começar gravação"}
			</Button>

			<p>{isRecording ? "Gravando..." : "Pausado"}</p>
		</div>
	);
}
