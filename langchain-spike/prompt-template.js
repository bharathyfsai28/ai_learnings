import { ChatOpenAI } from "@langchain/openai";
import {ChatPromptTemplate} from '@langchain/core/prompts'


import * as dotenv from 'dotenv'


// GET THE KEY FROM ENV file

dotenv.config();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
console.log(OPENAI_API_KEY);


// Define the model

const model = new ChatOpenAI({

    model : "gpt-3.5-turbo",
    openAIApiKey : OPENAI_API_KEY,
    temperature : 0.6,
    maxTokens : 100,
    verbose : false
    
});


// Define the Prompt Template

const prompt = ChatPromptTemplate.fromTemplate('You are a tourist guide. Tell me some historical information about place : {input}');

// Alternate way of calling the promptTemplate with from Messages

const prompt2 = ChatPromptTemplate.fromMessages([
    ["system","Generate a joke based on a word provided by the user"],
    ["human", "{input}"],
])

console.log(await prompt.format({input : "Melbourne"}));


// Construct the Chain

const chain = prompt.pipe(model);

// Invoke the chain, passing the prompt value

const response = await chain.invoke({
    input :'Melbourne'
});


// log the response

console.log(response);