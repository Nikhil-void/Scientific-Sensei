import React from 'react';


import NavBar from './components/NavBar';
import Upload from './components/Upload';
import ManageInnerPages from './components/ManageInnerPages';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import './App_darkmode.css';
import { useState } from 'react';



const App = () => {
  return (
    <>
      <NavBar/>
      <Router>
        <Routes>
          <Route path="/upload"  element={<Upload/>}/>
          <Route path="/" exact element={<WelcomePage/>}  />
          <Route path="/show" exact element={<ManageInnerPages/>} /> 
            
        </Routes>
      </Router>
    </>
  )
}

export default App