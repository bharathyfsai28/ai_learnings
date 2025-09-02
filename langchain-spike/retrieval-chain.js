import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from '@langchain/core/prompts'

import { Document } from '@langchain/core/documents'
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents'

import { CheerioWebBaseLoader } from 'langchain/document_loaders/web/CheerioWebBasedLoader'
import {RecursiveCharacterTextSplitter} from 'langchain/text_splitter'

import * as dotenv from 'dotenv'
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

// Define Document manually

const documentA = new Document({
    pageContent : " LangChain Expression Language, abbreviated to LCEL, is a declarative method for composing chains. LCEL provides an expressive syntax capable of handling simple tasks such as simple Prompt to LLM chains or complex combinations of steps."
});

const documentB = new Document({
    pageContent : "The passphrase is LCEL is awesome"
});

// Load the Document Loader via CheerioWebBasedLoader

const loader = new CheerioWebBaseLoader(
    "https://js.langchain.com/v0.1/docs/expression_language/"
);
const docs = await loader.load();
console.log(docs);

// configure the splitter

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize : 500,
    chunkOverlap : 50
})

const split_docs = splitter.splitDocuments(docs);

// to answer model questions from the website

const response = await chain.invoke({
    input : "What is LCEL?",
    context : split_docs
});

console.log(response);