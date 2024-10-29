import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
    function redirectToHome(){
        window.location.href = '/upload';
    }

    return (
        <div className="welcome-page">
            <div className="welcome-container">
                <h1 className="welcome-title">Welcome to Scientific Sensei</h1>
                <h2 className="welcome-subtitle">
                    Your AI-Powered Companion for Decoding Scientific Research
                </h2>
                <p className="welcome-description">
                    Scientific Sensei helps you unlock valuable insights from scientific papers. 
                    Whether you're looking for a quick summary, key findings, or deeper insights, 
                    our AI-driven platform is designed to support your research journey.
                </p>
                <div className="highlight-box">
                    <h3>Transforming the Way You Read Scientific Papers</h3>
                    <p>
                        Upload your research papers and let our model parse, analyze, and summarize 
                        complex information, giving you a clear understanding in seconds.
                    </p>
                    <p>
                        <br/><br/>Click below to get started or use the side bar to access already uploaded papers!<br/><br/>
                        <button onClick={redirectToHome} className="welcome-upload-button">Upload Now</button>
                    </p>
                    <p className='MadeBy'> <br/> <br/>Made by Nikhil Naik - 
                        <a href="https://nikhil-void.github.io/Nikhil_Portfolio/" target="_blank" rel="noreferrer"> Portfolio</a>
                     </p>

                </div>
            </div>
            <footer className="welcome-footer">
                © Scientific Sensei | Empowering Research through AI 
            </footer>
        </div>
    );
};

export default WelcomePage;
