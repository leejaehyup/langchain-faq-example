import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import {
  RunnableLambda,
  RunnableMap,
  RunnablePassthrough,
} from '@langchain/core/runnables';
import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';
import { Injectable, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import { Document } from 'langchain/document';
import { MultiQueryRetriever } from 'langchain/retrievers/multi_query';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { EmbeddingsFilter } from 'langchain/retrievers/document_compressors/embeddings_filter';
import { ContextualCompressionRetriever } from 'langchain/retrievers/contextual_compression';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class FaqService implements OnModuleInit {
  private vectorDB: MemoryVectorStore;
  constructor() {}

  async onModuleInit(): Promise<void> {
    await this.saveDataInVectorStore();
  }

  // Save faq data in vectorstore
  async saveDataInVectorStore(): Promise<void> {
    const embeddings = new OpenAIEmbeddings({});
    // Get file name list
    const fileNames = fs.readdirSync('./data');

    // Create document list from files
    const docs = fileNames.map((fileName, index) => {
      const fileContentBuffer = fs.readFileSync(`./data/${fileName}`);
      const fileContent = fileContentBuffer.toString();
      // Separate questions and answers
      const question = fileContent.split('Q.')[1]?.split('A.')[0] || '';
      const answer = fileContent.split('A.')[1];

      return new Document({
        pageContent: question,
        metadata: { index, answer },
      });
    });

    // text splitt
    const splitter = new RecursiveCharacterTextSplitter({
      chunkOverlap: 20,
      chunkSize: 2000,
    });

    const splitDocs = await splitter.splitDocuments(docs);

    // vector DB initialization
    this.vectorDB = await MemoryVectorStore.fromDocuments(
      splitDocs,
      embeddings,
    );

    console.log('VectorDB initialization complete');
  }

  async getFaqByQuery(question: string): Promise<string> {
    const model = new ChatOpenAI();

    const baseRetriever = MultiQueryRetriever.fromLLM({
      llm: model,
      retriever: this.vectorDB.asRetriever({ searchType: 'similarity', k: 1 }),
      // debug
      verbose: true,
    });

    const embeddingsFilter = new EmbeddingsFilter({
      embeddings: new OpenAIEmbeddings(),
      similarityThreshold: 0.85,
      k: 1,
    });

    const retriever = new ContextualCompressionRetriever({
      baseCompressor: embeddingsFilter,
      baseRetriever,
      verbose: true,
    });

    const query = question;

    const prompt = ChatPromptTemplate.fromMessages([
      [
        'ai',
        `Answer the question based on only the following context:
      
    {context}`,
      ],
      ['human', '{question}'],
    ]);

    const outputParser = new StringOutputParser();

    const setupAndRetrieval = RunnableMap.from({
      // RunnableLambda - 사용자 정의 함수 실행
      context: new RunnableLambda({
        func: (input: string) =>
          retriever
            .invoke(input)
            .then((response) => response[0]?.metadata?.answer),
      }).withConfig({ runName: 'faqContextRetriever' }),
      // 입력값 전달
      question: new RunnablePassthrough(),
    });

    const chain = setupAndRetrieval.pipe(prompt).pipe(model).pipe(outputParser);

    const response = await chain.invoke(query);

    return response;
  }
}
