/* 
As an example, suppose we're building an application that generates a company name based on a company description.
In order to do this, we need to initialize an OpenAI model wrapper.
In this case, since we want the outputs to be MORE random, we'll initialize our model with a HIGH temperature.
 */

/* 
What is OpenAI GPT model temperature?
Temperature is a parameter of OpenAI ChatGPT, GPT-3 and GPT-4 models that governs the randomness
and thus the creativity of the responses. It is always a number between 0 and 1
*/

/* 
Under the hood, large language models try to predict the next best word given a prompt. One word at a time. 
They assign a probability to each word in their vocabulary, and then picks a word among those.
A temperature of 0 means roughly that the model will always select the highest probability word.
A higher temperature means that the model might select a word with slightly lower probability, leading to more variation, randomness and creativity.
A very high temperature therefore increases the risk of “hallucination”, meaning that the AI starts selecting words that will make no sense or be offtopic.
Since all characters count, the ratio of words to tokens is language dependent. */

/* 
Rules of thumb for temperature choice
Your choice of temperature should depend on the task you are giving GPT.

For transformation tasks (extraction, standardization, format conversion, grammar fixes) prefer a temperature of 0 or up to 0.3.
For writing tasks, you should juice the temperature higher, closer to 0.5.
If you want GPT to be highly creative (for marketing or advertising copy for instance), consider values between 0.7 and 1.

If you want to experiment and create many variations quickly, a high temperature is better.
*/
import "dotenv/config";
import { OpenAI } from "langchain/llms/openai";

const llm = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.9,
});

const result = await llm.predict("如果你是秦始皇， 你怎么找我要钱？");
console.log(result);
