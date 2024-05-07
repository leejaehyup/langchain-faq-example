# FAQ Bot using LangChain
This project demonstrates how to build a simple FAQ (Frequently Asked Questions) bot using LangChain, GPT Model, Open AI Embedding, Memory Vector Store.

## Descrption

### flow

1. When running the application, the FAQ data is saved in vector store.
   - In this example, `MemoryVectorStore` is used as the vector store.
2. Data with high similarity to the question is retrieved from vector store through `MultiQueryRetriever`.
3. Results of answers are derived through prompts.

`MultiQueryRetriever` was used as a retriever.

The `MultiQueryRetriever` automates the process of prompt tuning by using an LLM to generate multiple queries from different perspectives for a given user input query.


For this part, please refer to [MultiQueryRetriever].
## Installation
To install and run this project locally, follow these steps:

1. Clone this repository to your local machine
```bash 
git clone https://github.com/leejaehyup/langchain-faq-example.git
```

2. Install dependencies using npm
   
```bash
yarn
```

3. Refer to the example.env file and enter environment variables in the .env file.
   -  OPENAI_API_KEY
      -  key value in [openAI]
   -  LANGCHAIN_API_KEY 
      -  Key value for executing [langSmith]


4. Start the application
```bash
yarn run start:dev
```

## Usage

To use the bot, follow these steps:

The format of data used in Retriever is diverse, such as PDF and document.

In this example, we used a text file containing questions and answers.

Put the question and answer files in the `data` folder.

**Example FAQ data**
```
Q. Apple Store란 무엇입니까?
A. Apple Store는 계약에 기반하여 특별히 선별된 Apple 및 타사 제품을 구매할 수 있는 온라인 스토어입니다. 홈페이지 메뉴에 나와 있는 옵션에 표시된 대로 상태를 확인하고 제품의 반품을 요청할 수도 있습니다.
```

**Running the API**
```bash
curl \
  -X GET \
  -d 'question=APP Store는 어떻게 동작하나요?' \
  http://localhost:3000/faq
```

## Copyright and license
This project is licensed under the MIT License.

```
The MIT License (MIT)

Copyright (c) 2024 Jaehyup Lee

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```


## Author
Jaehyup Lee - dlwoguq321@gmail.com



[MultiQueryRetriever]:https://js.langchain.com/docs/modules/data_connection/retrievers/multi-query-retriever
[langSmith]:https://smith.langchain.com
[openAI]:https://platform.openai.com