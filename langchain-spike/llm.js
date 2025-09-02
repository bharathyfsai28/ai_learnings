import { ChatOpenAI } from "@langchain/openai";
import * as dotenv from 'dotenv'


// GET THE KEY FROM ENV file

dotenv.config();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
console.log(OPENAI_API_KEY);


// Define the model

const model = new ChatOpenAI({

    model : "gpt-3.5-turbo",
    openAIApiKey : OPENAI_API_KEY
    
});

const response = await model.invoke('What is LLM?');

// likewise, we can use batch for sending multiple queries to the model 

const response2 = await model.batch(['Hello', 'What is LLM?'])

console.log(response);
console.log(response2);