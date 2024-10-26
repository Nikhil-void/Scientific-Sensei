import React from 'react'
import PaperSummary from './PaperSummary';
import LLMOutput from './LLMOutput';
import PaperOutput from './PaperOutput';

function ManageInnerPages() {
  return (
    <div className="flex outerDiv">
        <div className='max-h-screen PaperOutputBox' style={{width:'30%'}}>
            <PaperOutput /> 
        </div>
        <div className='max-h-screen LLMBox flex-1'>  
            <PaperSummary/>
            <LLMOutput />
        </div>
    </div>
  )
}

export default ManageInnerPages