import React, { useState, useEffect } from 'react'
import { FaBars } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import {BrowserRouter, Link } from "react-router-dom"
import { IoMdCloudUpload } from "react-icons/io";
import { fetchEventSource } from '@microsoft/fetch-event-source';


function NavBar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const ToggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const [finalJsonData, setFinalJsonData] = useState([]);

    const homePage = window.location.pathname === '/';
    if (sidebarOpen === false && homePage) {
        setSidebarOpen(true);
    }
    function reditectToUpload(){
        window.location.href = '/upload';
    }

    function redirectToHome(){
        window.location.href = '/';
    }

    async function fetchHistory() {
        await fetchEventSource('http://localhost:8000/navbar_hist', {
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
            console.log(data);
            setFinalJsonData((prevNavBarData) => {
                let newJsonData = [ ...prevNavBarData ];
                newJsonData.push({content:data.message.content , link:data.message.link});
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
        fetchHistory();
      }, []);
      console.log(finalJsonData)

  return (
    <>
        <BrowserRouter>
            <div className="NavBar">
                <Link to="#" className={sidebarOpen ? "Nav-Menu active" : "Nav-Menu"}>
                    
                    {homePage ? "" : sidebarOpen ? <RxCrossCircled onClick={ToggleSidebar}/> : <FaBars onClick={ToggleSidebar} /> }
                </Link>
                <h1>Scientific Sensei</h1>
                <button onClick={redirectToHome} className='Home-Button'>Home</button>
            </div>
            <div className={sidebarOpen ? "SideNav active" : "SideNav"}>
                <ul>
                    <li><button onClick={reditectToUpload} className='Upload-File-Button'><IoMdCloudUpload /> Upload File </button></li>
                    {}
                {finalJsonData.map((item, index) => (
                    <li key={index}>
                        <a href={item.link}>{item.content}</a>
                    </li>
                ))}
                </ul>
            </div>
      </BrowserRouter>
    </>
  )
}

export default NavBar