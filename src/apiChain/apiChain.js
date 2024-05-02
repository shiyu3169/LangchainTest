import { OpenAI } from 'langchain/llms/openai';
import { APIChain } from 'langchain/chains';
import * as fs from 'fs';
import 'dotenv/config';

const model = new OpenAI({
  modelName: 'text-davinci-003',
  openAIApiKey: process.env.OPENAI_API_KEY,
});
const OPEN_METEO_DOCS = fs.readFileSync('OPEN_METEO_DOCS.txt', 'utf8');
const chain = APIChain.fromLLMAndAPIDocs(model, OPEN_METEO_DOCS, {
  headers: {
    // These headers will be used for API requests made by the chain.
  },
});
try {
  const res = await chain.call({
    question:
      'What is the weather like right now in Munich, Germany in degrees Farenheit?',
  });
} catch (error) {
  console.log(error);
}

console.log({ res });

/* 
{
  res: {
    output: ' The current weather in Munich, Germany is 70.7°F with a windspeed of 10.8 km/h.'
  }
}
*/
