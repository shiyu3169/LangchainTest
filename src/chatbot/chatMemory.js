import { ConversationChain } from 'langchain/chains';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
  MessagesPlaceholder,
} from 'langchain/prompts';
import { BufferMemory } from 'langchain/memory';
import 'dotenv/config';

const chat = new ChatOpenAI({
  temperature: 0,
  openAIApiKey: process.env.OPENAI_API_KEY,
});

const chatPrompt = ChatPromptTemplate.fromPromptMessages([
  SystemMessagePromptTemplate.fromTemplate(
    'The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know.'
  ),
  new MessagesPlaceholder('history'),
  HumanMessagePromptTemplate.fromTemplate('{input}'),
]);

// Return the current conversation directly as messages and insert them into the MessagesPlaceholder in the above prompt.
const memory = new BufferMemory({
  returnMessages: true,
  memoryKey: 'history',
});

const chain = new ConversationChain({
  memory,
  prompt: chatPrompt,
  llm: chat,
  verbose: true,
});

const res = await chain.call({
  input: 'My name is Jim.',
});

// console.log(await memory.chatHistory.getMessages());
// console.log({ res });

const res2 = await chain.call({
  input: 'What is my name?',
});
console.log({ res2 });
