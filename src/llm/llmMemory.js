import { OpenAI } from "langchain/llms/openai";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import "dotenv/config";

const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
});
const memory = new BufferMemory();
const chain = new ConversationChain({
  llm: model,
  memory,
  verbose: true,
});
const res1 = await chain.call({ input: "Hi! I'm Jim." });
console.log(memory.chatHistory.getMessages());
