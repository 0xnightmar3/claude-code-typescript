import fs from "fs";
import type { ChatCompletionTool } from "openai/resources";

import type { ToolModule } from "./types.js";

interface ReadToolArgs {
    file_path: string;
};

export const ReadTool: ChatCompletionTool = {
    type: "function",
    function: {
        name: "Read",
        description: "Tool that returns the contents of a file",
        parameters: {
            type: "object",
            properties: {
                file_path: {
                    type: "string",
                    description: "The path to the file to read",
                },
            },
            required: ["file_path"],
        },
    },
};

export const readToolModule: ToolModule = {
    definition: ReadTool,
    execute: (argsStr: string): string => {
        const args = JSON.parse(argsStr) as ReadToolArgs;
        const fileContent = fs.readFileSync(args.file_path);
        return fileContent.toString();
    },
};
