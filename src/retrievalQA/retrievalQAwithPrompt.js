import { OpenAI } from "langchain/llms/openai";
import { RetrievalQAChain, loadQAStuffChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import * as fs from "fs";
import "dotenv/config";
import { PromptTemplate } from "langchain";

// Initialize the LLM to use to answer the question.
const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
});
const text = fs.readFileSync("state_of_the_union.txt", "utf8");
const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
const docs = await textSplitter.createDocuments([text]);

// Create a vector store from the documents.
const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());

// Initialize a retriever wrapper around the vector store
const vectorStoreRetriever = vectorStore.asRetriever();

const promptTemplate = `Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer.

{context}

Question: {question}
Answer in Chinese:`;

const prompt = PromptTemplate.fromTemplate(promptTemplate);

// Create a chain that uses the OpenAI LLM and HNSWLib vector store.
const chain = new RetrievalQAChain({
  combineDocumentsChain: loadQAStuffChain(model, { prompt }),
  retriever: vectorStoreRetriever,
});
const res = await chain.call({
  query: "What did the president say about Justice Breyer?",
});
console.log({ res });
/*
{
  res: {
    text: 'The president said that Justice Breyer was an Army veteran, Constitutional scholar,
    and retiring Justice of the United States Supreme Court and thanked him for his service.'
  }
}
*/
