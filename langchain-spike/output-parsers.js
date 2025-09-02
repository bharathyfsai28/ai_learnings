import { ChatOpenAI } from "@langchain/openai";
import {ChatPromptTemplate} from '@langchain/core/prompts'
import { StringOutputParser,CommaSeparatedListOutputParser } from '@langchain/core/output_parsers'
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { string, z } from 'zod'

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

    const prompt = ChatPromptTemplate.fromTemplate('You are a tourist guide. Tell me some historical information about place {input}');

    // Alternate way of calling the promptTemplate with from Messages

    const prompt2 = ChatPromptTemplate.fromMessages([
        ["system","Generate a joke based on a word provided by the user"],
        ["human", "{input}"],
    ])

    // construct the parser
    const parser = new StringOutputParser();

    console.log(await prompt.format({input : "Melbourne"}));


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

async function callStructuredOutputParser(){

    // define the prompt

    const prompt = ChatPromptTemplate.fromTemplate(`
         Extract information from the following phrase.
         Formatting Instructions : {format_instructions}
         Phrase : {phrase}
        `);
    
    
    const outputParser = StructuredOutputParser.fromNamesAndDescriptions({
        name : "The Name of the person",
        age :"Age of the person"
    })

    
    
    const chain = prompt.pipe(model).pipe(outputParser);

    return await chain.invoke({
        phrase : "Sachin is 40 years old",
        format_instructions : outputParser.getFormatInstructions(),
    });

}

async function callZodOutputParser(){

    // define the prompt

    const prompt = ChatPromptTemplate.fromTemplate(`
         Extract information from the following phrase.
         Formatting Instructions : {format_instructions}
         Phrase : {phrase}
        `);
    
    
    const outputParser = StructuredOutputParser.fromZodSchema(
        z.object({
            recipe : z.string().describe("name of recipe"),
            ingredients: z.array(z.string()).describe("ingredients"),
        })
    )
    
    const chain = prompt.pipe(model).pipe(outputParser);

    return await chain.invoke({
        phrase : "The ingredients for making Madurai Parotta is Maida flour, salt, butter, oil and ghee",
        format_instructions : outputParser.getFormatInstructions(),
    });

}

const response = await callStringOutputParser();
const listResponse = await callListOutputParser();
const structuredResponse = await callStructuredOutputParser();
const zodResponse = await callZodOutputParser();

// log the response

console.log(response);
console.log(listResponse);
console.log(structuredResponse);