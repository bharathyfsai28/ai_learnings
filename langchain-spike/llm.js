import { ChatOpenAI } from "@langchain/openai";
import * as dotenv from 'dotenv'


// GET THE KEY FROM ENV file




console.log(OPENAI_API_KEY);


// Define the modelTo i

const model = new ChatOpenAI({

    model : "gpt-3.5-turbo",
    openAIApiKey : OPENAI_API_KEY,
    temperature : 0.6,
    maxTokens : 100,
    verbose : false
    
});

const response = await model.invoke('What is LLM?');

// likewise, we can use batch for sending multiple queries to the model 

const response2 = await model.batch(['Hello', 'What is LLM?'])

console.log(response);
console.log(response2);