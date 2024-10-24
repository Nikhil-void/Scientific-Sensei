import { fetchEventSource } from '@microsoft/fetch-event-source';
import React, { useState, useEffect } from 'react';
import {Button, Collapse} from 'react-bootstrap'



const paperOutput = () => {
  const [finalJsonData, setFinalString] = useState({});

  async function generateOutput(e) {
    
    await fetchEventSource('http://localhost:8000/paperop', {
      method: 'POST',
      headers: {  
        Accept: "text/event-stream",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 'message': ['hello'] }),
      onopen(res) {
        if (res.ok && res.status === 200) {
          console.log("Connection made ", res);
        } else if (res.status >= 400 && res.status < 500 && res.status !== 429) {
          console.log("Client-side error ", res);
        }
      },
      onmessage(event) {
        const data = JSON.parse(event.data);
        console.log("data", data);
        
        setFinalString((prevPaperData) => {
          let newJsonData = {...prevPaperData};
          newJsonData[data.message.section] = data.message.text;
          console.log("newJsonData", newJsonData, data.message.section);
          return newJsonData;
        });
        
      },
      onclose() {
        console.log("Connection closed by the server");
      },
      onerror(err) {
        console.log("There was an error from server", err);
      },
    });
  }

  useEffect(() => {
    generateOutput();
  }, [])

  let state={ 
    open:false
   }

  const PaperSections = () => {
    return (
      <div className='PaperOutput'>
        {Object.keys(finalJsonData).map((section, index) => {
          
          return (
            <>
              <div className='PaperSection' key={index}>
                <h2 className='PaperSectionHeader'>{section}</h2>
                <p className='PaperSectionText'>{finalJsonData[section]}</p>
                <Button className="btn" onClick={!this.state.open}>
                  Collapse Div
                </Button> 
                <Collapse in={this.state.open}>
                  <p className='PaperSectionText'>{finalJsonData[section]}</p>
                </Collapse>
              </div>
              
            </>
          )
        })}
      </div>
    )
  }
  
 


  return (
    <div>
        <PaperSections />
    </div>
  )
}

export default paperOutput