import { ChatOpenAI } from "langchain/chat_models/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { BufferMemory } from "langchain/memory";
import * as fs from "fs";
import "dotenv/config";

/* Initialize the LLM to use to answer the question */
const model = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
});
/* Load in the file we want to do question answering over */
const text = fs.readFileSync("state_of_the_union.txt", "utf8");
/* Split the text into chunks */
const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
const docs = await textSplitter.createDocuments([text]);
/* Create the vectorstore */
const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());
/* Create the chain */
const chain = ConversationalRetrievalQAChain.fromLLM(
  model,
  vectorStore.asRetriever(),
  {
    memory: new BufferMemory({
      memoryKey: "chat_history", // Must be set to "chat_history"
    }),
  }
);
/* Ask it a question */
const question = "What did the president say about Justice Breyer?";
const res = await chain.call({ question });
console.log(res);
/* Ask it a follow up question */
const followUpRes = await chain.call({
  question: "Was that nice?",
});
console.log(followUpRes);
