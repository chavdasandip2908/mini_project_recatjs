import React, { useEffect, useState } from 'react';
import "./StopWatch.css";

function App() {
    const [time, settime] = useState(0);
    const [running, setRunning] = useState(false);

    useEffect(() => {
        let interval;
        if (running) {
            interval = setInterval(() => {
                settime((oldTime) => oldTime + 10);
            }, 10);
        }
        else if (!running) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running]);

    return (
        <div className="stopwatch">
            <div className='main'>
                <h2>Stopwatch</h2>
                <div className='bodyPart'>
                    <h1>
                        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)} : </span>
                        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)} : </span>
                        <span>{("0" + Math.floor((time / 100)% 60)).slice(-2)}</span>
                    </h1>
                </div>
                <div className='controlsBtn'>
                    <button className='btn' onClick={() => setRunning(!running)}>{running ? "Pause" : "Start"}</button>
                    <button className='btn' onClick={() => { settime(0); setRunning(false) }} >Reset</button>
                </div >
            </div>
        </div>
    );
}

export default App;
// liyfiato8sfgi7ysagfuiygsi7uygtfuye