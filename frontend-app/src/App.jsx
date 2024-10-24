import React from 'react';
import PaperOutput from './components/PaperOutput';
import LLMOutput from "./components/LLMOutput";
import './App_darkmode.css'



const App = () => {
  return (
    <>
      <div className="flex outerDiv">
        <div className='max-h-screen PaperOutputBox' style={{width:'30%'}}>
          <PaperOutput /> 
        </div>
        <div className='max-h-screen LLMBox flex-1'>        
          <LLMOutput />
        </div>
      </div>
    </>
  )
}

export default App