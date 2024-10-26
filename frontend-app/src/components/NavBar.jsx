import React, { useEffect, useState } from 'react'
import { FaBars } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import {BrowserRouter, Link } from "react-router-dom"
import { IoMdCloudUpload } from "react-icons/io";


function NavBar() {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const ToggleSidebar = () => setSidebarOpen(!sidebarOpen);


  return (
    <>
        <BrowserRouter>
            <div className="NavBar">
                <Link to="#" className={sidebarOpen ? "Nav-Menu active" : "Nav-Menu"}>
                    
                    {sidebarOpen ? <RxCrossCircled onClick={ToggleSidebar}/> : <FaBars onClick={ToggleSidebar}/> }
                </Link>
                <h1>Scientific Sensei</h1>
            </div>
            <div className={sidebarOpen ? "SideNav active" : "SideNav"}>
                <ul>
                    <li><button className='Upload-File-Button'><IoMdCloudUpload /> Upload File </button></li>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </div>
      </BrowserRouter>
    </>
  )
}

export default NavBar