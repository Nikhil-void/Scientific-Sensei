from abc import ABC, abstractmethod
from langchain_core.prompts import ChatPromptTemplate, PromptTemplate
from langchain_ollama.llms import OllamaLLM
from langchain.callbacks.streaming_aiter import AsyncIteratorCallbackHandler
from langchain_openai import OpenAI
import asyncio
from langchain.callbacks.manager import CallbackManagerForLLMRun


class ModelConnection:
    def __init__(self, model_name: str, platform: str):
        if platform == "ollama":
            self.llm = OllamaLLM(model=model_name)
        else:
            raise Exception("Platform not supported")
        
    def prompt_model(self, user_query: str) -> str:
        template = """Question: {question}
        Answer: Let's think step by step."""
        prompt = ChatPromptTemplate.from_template(template)
        chain = prompt | self.llm
        return chain.invoke({"question": user_query})
    
    '''
    def prompt_model_stream(self, user_query: str) -> str:
        template = f"""Question: {user_query}
        Answer: Let's think step by step."""
        prompt = ChatPromptTemplate.from_template(template)
        run_manager = CallbackManagerForLLMRun()
        for chunk in self.llm._stream(prompt, run_manager=run_manager):
            print(chunk)
    '''
    def prompt_model_stream(self, user_query: str):
        template = f"""Question: {user_query}
        Answer: Let's think step by step."""
        print(template)
        #prompt = ChatPromptTemplate.from_template(template)
        #print("Prompt", prompt)
        for chunks in self.llm.stream(template):
            print(chunks)


    async def test_aiter(self):
        handler = AsyncIteratorCallbackHandler()
        llm = OpenAI(
            temperature=0,
            streaming=True,
            callbacks=[handler],
            openai_api_key="sk-xxxxx",
            openai_proxy="http://127.0.0.1:11434",
        )
        prompt = PromptTemplate(
            input_variables=["product"],
            template="What is a good name for a company that makes {product}?",
        )
        prompt = prompt.format(product="colorful socks")
        asyncio.create_task(llm.agenerate([prompt]))
        async for i in handler.aiter():
            print(i)