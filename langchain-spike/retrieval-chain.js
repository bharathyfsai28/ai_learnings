import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from '@langchain/core/prompts'

import { Document } from '@langchain/core/documents'
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents'

import * as dotenv from 'dotenv'
import { LLM } from "@langchain/core/language_models/llms";
dotenv.config();

// Define the Model

const model = new ChatOpenAI({
    model : "gpt-3.5-turbo",
    temperature : 0.7,
});

// Construct the Prompt. note for Retrieval Chain, prompt template should use placeholder as input

const prompt = ChatPromptTemplate.fromTemplate(`
        Answer the user's question.
        Context : {context},
        Question : {input}
    `);


// construct the chain

//const chain = prompt.pipe(model);

const chain = await createStuffDocumentsChain({
    llm : model,
    prompt
})

// Define Document

const documentA = new Document({
    pageContent : " LangChain Expression Language, abbreviated to LCEL, is a declarative method for composing chains. LCEL provides an expressive syntax capable of handling simple tasks such as simple Prompt to LLM chains or complex combinations of steps."
});


// to answer model questions from the website

const response = await chain.invoke({
    input : "What is LCEL?",
    context : [documentA]
});

console.log(response);