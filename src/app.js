import { OpenAI } from "langchain/llms/openai";
import "dotenv/config";
// import { chat } from "./chat.js";
// import { genBusinessName } from "./llm.js";
// import { promptLlm } from "./promptLlm.js";
import { promptChat } from "./prompt/promptChat.js";

const llm = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
});

// genBusinessName();
// chat();
// promptLlm();
promptChat();
