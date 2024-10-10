from model_connection import ModelConnection

llm_con = ModelConnection('llama3.2:1b', 'ollama')
print(llm_con.prompt_model_stream('Who are you? Give 1 line answer'))
#llm_con.test_aiter()


