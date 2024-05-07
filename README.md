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

**Payment Caution**

By using a `MemoryVectorStore`, the data in the store is restored every time the application is restarted.

So you may continue to pay for text embedding every time the app restarts.
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
Q. 여러 개의 계정에 접근할 수 있습니까?
A. 하나의 로그인에 연결된 여러 개의 주문 주소를 대신하여 여러 계정에 접근할 수 있습니다.
동일한 Apple ID를 사용하여 해당 계정들에 등록한 경우, 동일한 로그인 아래에서 여러 개의 계정에 접근할 수 있습니다.
```

**Test Question**

```bash
curl \
  -X GET \
  -d 'question=내가 여러개의 계정에 접근이 가능해?' \
  http://localhost:3000/faq
```
**Answer**
```
네, 만약 여러 개의 계정을 동일한 Apple ID로 등록했다면, 하나의 로그인으로 여러 개의 계정에 접근할 수 있습니다.
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