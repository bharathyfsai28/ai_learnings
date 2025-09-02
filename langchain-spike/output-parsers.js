import { ChatOpenAI } from "@langchain/openai";
import {ChatPromptTemplate} from '@langchain/core/prompts'
import { StringOutputParser,CommaSeparatedListOutputParser } from '@langchain/core/output_parsers'

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

async function callStringOutputParser() {

    // Define the Prompt Template

    const prompt = ChatPromptTemplate.fromTemplate('You are a comedian. Tell me a joke based on following word {input}');

    // Alternate way of calling the promptTemplate with from Messages

    const prompt2 = ChatPromptTemplate.fromMessages([
        ["system","Generate a joke based on a word provided by the user"],
        ["human", "{input}"],
    ])

    // construct the parser
    const parser = new StringOutputParser();

    console.log(await prompt.format({input : "chicken"}));


    // Construct the Chain with Parser

    const chain = prompt.pipe(model).pipe(parser);

    // Invoke the chain, passing the prompt value

    return await chain.invoke({
        input :'Chicken'
    });


}

async function callListOutputParser(){

    const prompt = ChatPromptTemplate.fromTemplate(`
        Provide 5 Synonyms for the following word {word}`
    );

    // construct the ListOutputParser

    const listParser = new CommaSeparatedListOutputParser();

    // construct the chain with Parser

    const chain = prompt.pipe(model).pipe(listParser);

    // Invoke the chain with prompt value

    return await chain.invoke({
        input : 'Excellent'
    })
}

const response = await callStringOutputParser();
const listResponse = await callListOutputParser();

// log the response

console.log(response);
console.log(listResponse);