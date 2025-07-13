//* Libraries imports
import { GoogleGenAI } from "@google/genai";

//* Local imports
import { env } from "../env";

const gemini = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY
});

const model = "gemini-2.5-flash";

export async function transcribeAudio(audioAsBase64: string, mimeType: string) {
  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: "transcreva o áudio para português do Brasil. Seja preciso e natural na transcrição. Mantenha a pontuação adeguada e divida o texto em parágrafos quando for apropriado."
      },
      {
        inlineData: {
          mimeType,
          data: audioAsBase64
        }
      }
    ]
  });

  if (!response.text) {
    throw new Error("Não foi possível converter o áudio.");
  }

  return response.text;
}

export async function generateEmbeddings(text: string): Promise<number[]> {
  const response = await gemini.models.embedContent({
    model: "text-embedding-004",
    contents: [{ text }],
    config: {
      taskType: "RETRIEVAL_DOCUMENT"
    }
  });

  if (!response.embeddings?.[0].values) {
    throw new Error("Não foi possível gerar os embeddings");
  }

  return response.embeddings[0].values;
}