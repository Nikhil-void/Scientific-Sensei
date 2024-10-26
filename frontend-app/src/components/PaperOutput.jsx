import { fetchEventSource } from '@microsoft/fetch-event-source';
import React, { useState, useEffect } from 'react';
import { Button, Collapse } from 'react-bootstrap';

const PaperOutput = () => {
  const [finalJsonData, setFinalJsonData] = useState([]);
  const [openSections, setOpenSections] = useState({}); // To manage which section is collapsed

  async function generateOutput() {
    await fetchEventSource('http://localhost:8000/paperop', {
      method: 'POST',
      headers: {
        Accept: "text/event-stream",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 'message': ['hello'] }),
      onopen(res) {
        if (res.ok && res.status === 200) {
          console.log("Connection made  PaperOutput", res);
        } else if (res.status >= 400 && res.status < 500 && res.status !== 429) {
          console.log("Client-side error PaperOutput", res);
        }
      },
      onmessage(event) {
        const data = JSON.parse(event.data);

        setFinalJsonData((prevPaperData) => {
          let newJsonData = [ ...prevPaperData ];
          newJsonData.push({section:data.message.section , text:data.message.text});
          return newJsonData;
        });
        setOpenSections((prevOpenSections) => {
          let newOpenSections = { ...prevOpenSections };
          newOpenSections[data.message.section] = true;
          return newOpenSections;
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
  }, []);

  const toggleSection = (section) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const PaperSections = () => {
    return (
      <div className='PaperOutput'>
        <h1>Paper Sections Simplified</h1>
        {finalJsonData.map((data, index) => (
          <div className='PaperSection' key={index}>
            <div className='PaperSection-Heading'>
              <h2 className='PaperSectionHeader'>{data.section}</h2>
              <Button 
                className="PaperSectionHide-btn" 
                onClick={() => toggleSection(data.section)}
              >
                {openSections[data.section] ? 'Hide' : 'Show'} Section
              </Button>
            </div>
              <div id={`${data.section}-collapse-text`} className={openSections[data.section] ? 'Show-section' : 'Hide-section'}>
                <p className='PaperSectionText'>{data.text}</p>
              </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <PaperSections />
    </div>
  );
};

export default PaperOutput;