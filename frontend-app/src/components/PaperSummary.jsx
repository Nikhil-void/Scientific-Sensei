import React, { useEffect, useState } from 'react';
import { fetchEventSource } from '@microsoft/fetch-event-source';

const PaperSummary = () => {
    const [summaries, setSummaries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSummaries = async () => {
            try {
                await fetchEventSource('http://localhost:8000/papersum', {
                        method: 'POST',
                        headers: {
                            Accept: "text/event-stream",
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ 'message': ['hello'] }),
                    onopen(res) {
                        if (res.ok && res.status === 200) {
                          console.log("Connection made  PaperOutput", res);
                          setLoading(false);
                        } else if (res.status >= 400 && res.status < 500 && res.status !== 429) {
                          console.log("Client-side error PaperOutput", res);
                        }
                      },
                    onmessage(event) {
                        const data = JSON.parse(event.data);
                        setSummaries((prevSummaries) => {
                            let newSumData = [ ...prevSummaries ];
                            newSumData.push({section:data.message.section , text:data.message.text});
                            return newSumData;
                        });
                    },
                    onerror(err) {
                        setError(err.message);
                        setLoading(false);
                    },
                });
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchSummaries();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='LLMOutputPaper'>
            <h1>Paper Summaries</h1>
            <ul>
                {summaries.map((summary, index) => (
                    <li key={index}>{summary.text}</li>
                ))}
            </ul>
        </div>
    );
};

export default PaperSummary;