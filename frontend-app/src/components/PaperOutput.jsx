import { fetchEventSource } from '@microsoft/fetch-event-source';
import React, { useState, useEffect } from 'react';
import { Button, Collapse } from 'react-bootstrap';

const PaperOutput = () => {
  const [finalJsonData, setFinalJsonData] = useState({});
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
          console.log("Connection made ", res);
        } else if (res.status >= 400 && res.status < 500 && res.status !== 429) {
          console.log("Client-side error ", res);
        }
      },
      onmessage(event) {
        const data = JSON.parse(event.data);

        setFinalJsonData((prevPaperData) => {
          let newJsonData = { ...prevPaperData };
          newJsonData[data.message.section] = data.message.text;
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
        {Object.keys(finalJsonData).map((section, index) => (
          <div className='PaperSection' key={index}>
            <div className='PaperSection-Heading'>
              <h2 className='PaperSectionHeader'>{section}</h2>
              <Button 
                className="PaperSectionHide-btn" 
                onClick={() => toggleSection(section)}
              >
                {openSections[section] ? 'Hide' : 'Show'} Section
              </Button>
            </div>
              <div id={`${section}-collapse-text`} className={openSections[section] ? 'Show-section' : 'Hide-section'}>
                <p className='PaperSectionText'>{finalJsonData[section]}</p>
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