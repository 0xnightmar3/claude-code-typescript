import type { ChatCompletionFunctionTool } from "openai/resources";

export interface ToolModule {
    execute(args: string): string;
    definition: ChatCompletionFunctionTool;
};
