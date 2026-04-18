
import { ENV } from "../config/env.js";
export async function callOllama(prompt: string) {
  const url = `${ENV.OLLAMA_URL}/api/generate`
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${ENV.OLLAMA_API_KEY}`,
    },
    body: JSON.stringify({
      model: ENV.OLLAMA_MODEL,
      prompt,
      stream: false,
      "format": "json",         
      "options": {
        "temperature": 0.0, 
      },
    })
  });

  if (!res.ok) {
    throw new Error("Ollama request failed");
  }

  const data = await res.json();

  return data.response;
}
