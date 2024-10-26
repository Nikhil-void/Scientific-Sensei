import React from 'react';
import PaperOutput from './components/PaperOutput';
import PaperSummary from './components/PaperSummary';
import LLMOutput from './components/LLMOutput';
import NavBar from './components/NavBar';
import './App_darkmode.css';



const App = () => {
  return (
    <>
      <NavBar/>
      <div className="flex outerDiv">
        <div className='max-h-screen PaperOutputBox' style={{width:'30%'}}>
          <PaperOutput /> 
        </div>
        <div className='max-h-screen LLMBox flex-1'>  
          <PaperSummary/>
          <LLMOutput />
        </div>
      </div>
    </>
  )
}

export default App