import React from 'react'
import "../css/meyawo.css"
import ProjectCard from './Switch/ProjectCard'

import { projects } from "./comman";


export default function Home() {

    return (
        <div class="d-flex flex-column flex-nowrap align-items-center justify-content-start w-100">

            <header id="home" className="header w-100 " >
                <div className="overlay"></div>
                <div className="header-content container">
                    <h1 className="header-title" >
                        <span className="up">HI!</span>
                        <span className="down">I am Sandip Chavda</span>
                    </h1>
                    <p className="header-subtitle">WEB DEVELOPER</p>

                    {/* <button className="btn btn-primary">Visit My Works</button> */}
                </div>


            </header>
            <div className="container">
                <div className="row">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            image={project.image}
                            title={project.title}
                            link={project.link}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
