from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel
from model_connection import ModelConnection
from fastapi.responses import StreamingResponse
import random

class Data(BaseModel):
    message: list

app = FastAPI()
llm_con = ModelConnection('llama3.2:1b', 'ollama')

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/llmop")
def generate_llm_output(body: Data):
    
    prompt = ''
    for data in body.message[1:]:
        prompt += data['user'] + ': '
        prompt += data['text'] + '\n\n'
    print(prompt)
    return StreamingResponse(llm_con.prompt_model_stream(prompt), media_type='text/event-stream')

@app.post("/paperop")
async def request_handler(body: Data):
    auth = True    
    if auth == True:
        response: StreamingResponse = StreamingResponse(llm_con.get_json_streaming(), media_type="text/event-stream")
        return response
