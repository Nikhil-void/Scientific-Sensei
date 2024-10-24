import React, { useState, useRef, useEffect } from 'react';
import { GiMaterialsScience } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";
import { fetchEventSource } from '@microsoft/fetch-event-source';

const llmOutput = () => {
  const [chatlog, setChatlog] = useState([{ user: 'model', text: 'Ask me anything!' }]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [chatlog]);

  async function generateOutput(e) {
    e.preventDefault();
    

    let chatlog_new = [...chatlog, { user: 'me', text: input }];
    setChatlog(chatlog_new);
    setInput('');
    setIsSubmitting(true);
    await fetchEventSource('http://localhost:8000/llmop', {
      method: 'POST',
      headers: {  
        Accept: "text/event-stream",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: chatlog_new }),
      onopen(res) {
        if (res.ok && res.status === 200) {
          console.log("Connection made ", res);
        } else if (res.status >= 400 && res.status < 500 && res.status !== 429) {
          console.log("Client-side error ", res);
        }
      },
      onmessage(event) {
        const parsedData = event.data;
        setChatlog((prevChatlog) => {
          let updatedChatlog = [...prevChatlog];
          if (updatedChatlog[updatedChatlog.length - 1].user === "me") {
            updatedChatlog.push({ user: 'model', text: '' });
          }
          
          updatedChatlog[updatedChatlog.length - 1].text += parsedData;
          return updatedChatlog;
        });
      },
      onclose() {
        console.log("Connection closed by the server");
      },
      onerror(err) {
        console.log("There was an error from server", err);
      },
    });
    setIsSubmitting(false);
  }

  const ChatLogOutput = () => {
    return (
      <div className='chat-log'>
        {chatlog.map((chat, index) => {
          return (
            <div key={index} className={chat.user === "me" ? "chat-bubble-me" : "chat-bubble-model"}>
              <div className={chat.user === "me" ? "chat-icon-me" : "chat-icon-model"}>
                {chat.user === "me" ? <FaUser /> : <GiMaterialsScience />}
              </div>
              <div className='chat-text'>{chat.text} </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>
    )
  }

  return (
    <>
      <div className='LLM-Output-Holder'>
        <ChatLogOutput />
        <section className='chat-text-box '>
          <div className='chat-text-div' >
            <form onSubmit={generateOutput}>
              <input value={input} disabled={isSubmitting} onChange={(e) => setInput(e.target.value)} className='chat-text-input ' placeholder='Ask question here'></input>
              <button disabled={isSubmitting} className='chat-text-icon'><FaPaperPlane /></button>
            </form>
          </div>
        </section>
      </div>
    </>
  )
}

export default llmOutput;
