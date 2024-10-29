from abc import ABC, abstractmethod
from langchain_core.prompts import ChatPromptTemplate, PromptTemplate
from langchain_ollama.llms import OllamaLLM
from langchain.callbacks.streaming_aiter import AsyncIteratorCallbackHandler
from langchain_openai import OpenAI
import asyncio
from langchain.callbacks.manager import CallbackManagerForLLMRun
import json
import time


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
    
    def prompt_model_stream(self, user_query: str):
        template = f"""Question: {user_query}
        """
        print("#"*50)
        print("prompt_model_stream Called")
        print("#"*50)
        #prompt = ChatPromptTemplate.from_template(template)
        #print("Prompt", prompt)
        for chunks in self.llm.stream(template):
            print("data: " + chunks + "\n\n")
            yield "data: " + chunks + "\n\n"

    def return_paper_output(self):
        data = """
    The dominant sequence transduction models are based on complex recurrent or 
    The dominant sequence transduction models are based on complex recurrent or 
    The dominant sequence transduction models are based on complex recurrent or The dominant sequence transduction models are based on complex recurrent or 
    The dominant sequence transduction models are based on complex recurrent or 
    The dominant sequence transduction models are based on complex recurrent or 
    The dominant sequence transduction models are based on complex recur
    The dominant sequence transduction models are based on complex recurrent or 
    The dominant sequence transduction models are based on complex recurrent or The dominant sequence transduction models are based on complex recurrent or 
    The dominant sequence transduction models are based on complex recurrent or 
    The dominant sequence transduction models are based on complex recurrent or 
    The dominant sequence transduction models are based on complex recur
    The dominant sequence transduction models are based on complex recurrent or 
    The dominant sequence transduction models are based on complex recurrent or 
    """
        return data     

    def sse_pack(self, event: str, message: str):
        # Format data as an SSE message
        packet = "event: %s\n" % event
        data = {'message': message}

        packet += "data: %s\n" % json.dumps(data)
        packet += "\n"
        return packet


    def get_paperop_streaming(self):
        json_stream = [
            {"section": "hellaaaaaaaaa aaaaaaaaaaaaaaaaaaa", "text": self.return_paper_output()},
            {"section": "hasjdaw oawi jad aaa", "text": self.return_paper_output()},
            {"section": "helawd : awdha sWUDA", "text": self.return_paper_output()},
            {"section": 2, "text": self.return_paper_output()},
            {"section": 3, "text": self.return_paper_output()},
        ]

        for json in json_stream:
            yield self.sse_pack('json',  json)

    def get_papersum_streaming(self):
        json_stream = [
            {"section": "hellaaaaaaaaa aaaaaaaaaaaaaaaaaaa", "text": "1. Hello gow are you"},
            {"section": "hasjdaw oawi jad aaa", "text": "2. Hello gow are yoanwdkanwkjdu"},
            {"section": "helawd : awdha sWUDA", "text": "3. Hello gow are yaakwdadou"},
            {"section": 2, "text": "4. Hello gow are yaijwi odou"},
            {"section": 3, "text": "5. Hello gow are yawodijoijou"},
            {"section": "hellaaaaaaaaa aaaaaaaaaaaaaaaaaaa", "text": "1. Hello gow are you"},
            {"section": "hasjdaw oawi jad aaa", "text": "2. Hello gow are yoanwdkanwkjdu"},
            {"section": "helawd : awdha sWUDA", "text": "3. Hello gow are yaakwdadou"},
            {"section": 2, "text": "4. Hello gow are yaijwiodou"},
            {"section": 3, "text": "5. Hello gow are yawodijoijou"},
        ]

        for json in json_stream:
            print("json", json)
            yield self.sse_pack('json',  json)

    def get_navbar_info(self):
        json_stream = [
            {"content": "Home", "link": "/home"},
            {"content": "About", "link": "/about"},
            {"content": "Contact", "link": "/contact"},
            {"content": "Services", "link": "/services"},
            {"content": "Portfolio", "link": "/portfolio"},
            {"content": "Blog", "link": "/blog"},
        ]
        for json in json_stream:
            yield self.sse_pack('json',  json)