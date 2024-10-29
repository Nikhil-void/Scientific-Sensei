import React from 'react'
import { useState } from 'react'
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { useNavigate } from "react-router-dom";

function UploadDocuments() {
    const [file, setFile] = useState()
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function handleChange(event) {
        setFile(event.target.files[0])
    }

    async function handleSubmit(event) {
        event.preventDefault()
        const url = 'http://localhost:8000/uploadFile';
        const formData = new FormData();
        formData.append('fileContent', file);
        console.log("File upload started"),
        setLoading(true);
        await fetchEventSource(url, {
            method: 'POST',
            body: formData ,
            onopen(res) {
              if (res.ok && res.status === 200) {
                console.log("Connection made ", res);
              } else if (res.status >= 400 && res.status < 500 && res.status !== 429) {
                console.log("Client-side error ", res);
              }
            },
            onmessage(event) {
                const parsedData = event.data;
                console.log("Message received from server", parsedData);
            },
            onclose() {
              console.log("Connection closed by the server");

            },
            onerror(err) {
              console.log("There was an error from server", err);
            },
          });
          setLoading(false);
          navigate('/');
        }
    
    

  return (
    <>
    <div className="OuterUploadDiv">
        {loading ? (
            <div className='UploadDiv'>Loading...</div>
        ) : (
            <div className='UploadDiv'>
                <h1>Upload Document</h1>
                <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleChange}/>
                <button type="submit">Upload</button>
                </form>
            </div>
        )}
    </div>
    </>
  )
}

export default UploadDocuments