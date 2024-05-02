import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage } from "langchain/schema";
import "dotenv/config";
/* 
It is useful to understand how chat models are different from a normal LLM, 
but it can often be handy to just be able to treat them the same. 
LangChain makes that easy by also exposing an interface through which you can interact with a chat model as you would a normal LLM.
You can access this through the predict interface.
*/

const chat = new ChatOpenAI({
  temperature: 0,
  openAIApiKey: process.env.OPENAI_API_KEY,
});

const result = await chat.predictMessages([
  new HumanMessage(
    "Translate this sentence from English to Chinese. I love programming."
  ),
]);

console.log(result);
