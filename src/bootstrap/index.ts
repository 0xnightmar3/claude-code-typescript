import OpenAI from "openai";

export const bootstrap = (flag: string, prompt: string) => {
    const apiKey = process.env.OPENROUTER_API_KEY;
    const baseURL =
    process.env.OPENROUTER_BASE_URL ?? "https://openrouter.ai/api/v1";
    
    if (!apiKey) {
        throw new Error("OPENROUTER_API_KEY is not set");
    }
    if (flag !== "-p" || !prompt) {
        throw new Error("error: -p flag is required");
    }
    
    const client = new OpenAI({
        apiKey: apiKey,
        baseURL: baseURL,
    });

    return client;
};
