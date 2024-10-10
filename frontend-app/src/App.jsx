import React from 'react';
import PaperOutput from './components/PaperOutput';
import LLMOutput from './components/LLMOutput';
import './App.css'



const App = () => {
  return (
    <>
      <div className="flex">
        <div className='max-h-screen sticky top-0 overflow-y-auto' style={{width:'30%'}}>
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