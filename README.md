
## Bootstrap the Project

    npm init -y

## Install Dependencies

    npm i langchain @langchain/openai
    npm i dotenv
    npm i nodemon --save-dev
    npm i zod ( need to install this for using StructuredOutputParser to have custom nested json structure response)


## Modify Package.json

    modify package.json file to add below line ( to support import statements )
        - "type" : "module"


## Create the Key

    https://platform.openai.com/api-keys



### Docs

    model can be accessed using
        - invoke
        - batch
        - stream



### Reference

    llm.js 
        - for defining the model and invoke

    prompt-template.js 
        - for defining the prompts and chaining to the model
        - define the model
        - define the prompt template (fromTemplate that takes a string input, fromMessage that takes an array of SystemMessage and Human Message)
        - construct the chain
        - invoke the chain with prompt inputs
        - log the response

    output-parsers.js
        - for defining the prompts and chaining to the model
        - define the model
        - define the prompt template (fromTemplate that takes a string input, fromMessage that takes an array of SystemMessage and Human Message)
        - define the parser
            -   StringOutputParser
            -   CommaSeparatedListOutputParser
            -   StructuredOutputParser
                -   fromNamesAndDescriptions
                -   fromZodSchema
        - construct the chain with parse
        - invoke the chain with prompt inputs
        - log the response
