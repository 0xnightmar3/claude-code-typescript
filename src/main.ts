import type { ChatCompletionMessageParam } from "openai/resources";

import { BashTool } from "./tools/bashTool.js";
import { ReadTool } from "./tools/readTool.js";
import { bootstrap } from "./bootstrap/index.js";
import { WriteTool } from "./tools/writeTool.js";
import { toolRegistry } from "./tools/toolRegistry.js";

async function main() {
  const [, , flag, prompt] = process.argv;

  if (process.argv.length < 4) throw new Error(`Wrong usage, supply flag and prompt`);

  const client = bootstrap(flag!, prompt!);

  const agentLoop = async (messages: ChatCompletionMessageParam[]) => {
    const updatedMessages = [...messages];

    const response = await client.chat.completions.create({
      model: "anthropic/claude-haiku-4.5",
      messages,
      tools: [ReadTool, WriteTool, BashTool],
    });

    if (!response.choices || response.choices.length === 0) {
      throw new Error("no choices in response");
    };

    // TODO: Uncomment the lines below to pass the first stage
    for (const choice of response.choices) {
      updatedMessages.push(choice.message);
      if (!choice.message.tool_calls?.length) {
        console.log(choice.message.content);
        process.exit(0);
      };

      for (const tool_call of choice.message.tool_calls) {
        if (tool_call.type === "function") {
          const handler = toolRegistry.get(tool_call.function.name);
          if (!handler) throw new Error(`Tool ${tool_call.function.name} not registered`);
          const content = handler(tool_call.function.arguments);
          updatedMessages.push({
            role: "tool",
            tool_call_id: tool_call.id,
            content,
          });
        };
      };
    };

    await agentLoop(updatedMessages);
  };

  await agentLoop([{ role: "user", content: prompt! }]);
};

main();
