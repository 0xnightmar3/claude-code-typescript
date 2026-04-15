import { execSync } from "child_process";
import type { ChatCompletionTool } from "openai/resources";

import type { ToolModule } from "./types.js";

interface BashToolArgs {
    command: string;
};

export const BashTool: ChatCompletionTool = {
    type: "function",
    function: {
        name: "Bash",
        description: "Execute a shell command",
        parameters: {
            type: "object",
            properties: {
                command: {
                    type: "string",
                    description: "The command to execute",
                },
            },
            required: ["command"],
        },
    },
};

export const bashToolModule: ToolModule = {
    definition: BashTool,
    execute(argsStr: string): string {
        const args = JSON.parse(argsStr) as BashToolArgs;
        return execSync(args.command).toString();
    },
};

