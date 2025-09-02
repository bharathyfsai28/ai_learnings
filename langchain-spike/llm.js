import { ChatOpenAI } from "@langchain/openai";
import * as dotenv from 'dotenv'


// GET THE KEY FROM ENV file

dotenv.config();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
console.log(OPENAI_API_KEY);


// Define the model

const model = new ChatOpenAI({

    openAIApiKey : OPENAI_API_KEY
    
});

const response = await model.invoke('What is LLM?');
console.log(response);