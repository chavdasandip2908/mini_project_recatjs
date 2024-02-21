import React from 'react'
import "../css/meyawo.css"

export default function Home() {
    return (
        <>
            <header id="home" className="header w-100 " >
                <div className="overlay"></div>
                <div className="header-content container">
                    <h1 className="header-title" >
                        <span className="up">HI!</span>
                        <span className="down">I am Sandip Chavda</span>
                    </h1>
                    <p className="header-subtitle">WEB DEVELOPMENT</p>

                    {/* <button className="btn btn-primary">Visit My Works</button> */}
                </div>
            </header>
        </>
    )
}
