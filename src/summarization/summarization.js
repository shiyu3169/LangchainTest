import { OpenAI } from "langchain/llms/openai";
import { loadSummarizationChain } from "langchain/chains";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import * as fs from "fs";
import "dotenv/config";

// In this example, we use a `MapReduceDocumentsChain` specifically prompted to summarize a set of documents.
const text = fs.readFileSync("state_of_the_union.txt", "utf8");
const model = new OpenAI({
  temperature: 0,
  openAIApiKey: process.env.OPENAI_API_KEY,
});
const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
const docs = await textSplitter.createDocuments([text]);

// This convenience function creates a document chain prompted to summarize a set of documents.
const chain = loadSummarizationChain(model, { type: "map_reduce" });
const res = await chain.call({
  input_documents: docs,
});
console.log({ res });
