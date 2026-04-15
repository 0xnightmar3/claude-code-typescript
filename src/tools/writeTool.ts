import fs from "fs";
import type { ChatCompletionTool } from "openai/resources";

import type { ToolModule } from "./types.js";

interface WriteToolArgs {
    content: string;
    file_path: string;
};

export const WriteTool: ChatCompletionTool = {
    type: "function",
    function: {
        name: "Write",
        description: "Write content to a file",
        parameters: {
            type: "object",
            properties: {
                file_path: {
                    type: "string",
                    description: "The path of the file to write to"
                },
                content: {
                    type: "string",
                    description: "The content to write to the file",
                },
            },
            required: ["file_path", "content"],
        },
    },
};

export const writeToolModule: ToolModule = {
    definition: WriteTool,
    execute(argsStr: string): string {
        const args = JSON.parse(argsStr) as WriteToolArgs;
        fs.writeFileSync(args.file_path, args.content);
        return args.content;
    },
};
