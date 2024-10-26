from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile
from pydantic import BaseModel
from model_connection import ModelConnection
from fastapi.responses import StreamingResponse
import random
import time

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
async def paperop_handler(body: Data):
    auth = True    
    if auth == True:
        response: StreamingResponse = StreamingResponse(llm_con.get_paperop_streaming(), media_type="text/event-stream")
        return response
    
@app.post("/papersum")
async def papersum_handler(body: Data):
    print("papersum_handler Called")
    auth = True    
    if auth == True:
        response: StreamingResponse = StreamingResponse(llm_con.get_papersum_streaming(), media_type="text/event-stream")
        return response
    
@app.post("/uploadFile")
async def handle_file_upload(fileContent: UploadFile):
    contents = await fileContent.read()
    time.sleep(10)
    return {"message":"Done"}
