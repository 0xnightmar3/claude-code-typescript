import { bashToolModule } from "./bashTool.js";
import { readToolModule } from "./readTool.js";
import { writeToolModule } from "./writeTool.js";

export const toolRegistry = new Map([
    [readToolModule.definition.function.name, readToolModule.execute],
    [writeToolModule.definition.function.name, writeToolModule.execute],
    [bashToolModule.definition.function.name, bashToolModule.execute],
]);
