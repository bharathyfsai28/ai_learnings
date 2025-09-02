
## Bootstrap the Project

    npm init -y

## Install Dependencies

    npm i langchain @langchain/openai
    npm i dotenv
    npm i nodemon --save-dev


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
        - define the prompt template
        - construct the chain
        - invoke the chain with prompt inputs
        - log the response