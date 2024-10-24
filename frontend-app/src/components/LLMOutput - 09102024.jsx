import React, { useState, useRef, useEffect } from 'react'
import { GiMaterialsScience } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";
import {fetchEventSource} from '@microsoft/fetch-event-source';


const llmOutput = () => {
  
  const [chatlog, setChatlog] = useState([{user: 'model', text: 'Ask me anything!'}])
  const [input, setInput] = useState('')

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [chatlog]);


  async function generateOutput(e) {
    e.preventDefault()

    let chatlog_new =  [...chatlog, {user: 'me', text: input}]
    setChatlog(chatlog_new)
    setInput('')

    const response = await fetch('http://localhost:8000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({message: chatlog_new})
    })

    const data = await response.json()
    setChatlog([...chatlog_new, {user: 'model', text: data.message}])
  }

  const ChatLogOutput = () => {
    return (
      
      
      <div className='chat-log'>
        {chatlog.map((chat, index) => {
          return(
          <div key={index} className={chat.user === "me" ? "chat-bubble-me" : "chat-bubble-model"}>
            <div className={chat.user === "me" ? "chat-icon-me" : "chat-icon-model"}>
              {chat.user === "me" ? <FaUser/> : <GiMaterialsScience/>} 
            </div>
            <div className='chat-text'>{chat.text} </div>
          </div>)
        })}
        <div ref={messagesEndRef} />
      </div>
    )
  }

  return (
    <>
      {/* <Lottie animationData={bg_data} className='bg_class'/> */}
      <div className='LLM-Output-Holder'>
          <ChatLogOutput />
          <section className='chat-text-box '>
            <div className='chat-text-div' >
              <form onSubmit={generateOutput}>
                <input value={input} onChange={(e) => setInput(e.target.value)} className='chat-text-input ' placeholder='Ask question here'></input>
                {/* <textarea value={input} onChange={(e) => setInput(e.target.value)} className='chat-text-input ' placeholder='Ask question here' rows="1" cols="10" wrap="soft"></textarea> */}
                <button className='chat-text-icon'><FaPaperPlane/></button>
              </form>
            </div>
          </section>

        </div>
    </>
  ) 
}

export default llmOutput