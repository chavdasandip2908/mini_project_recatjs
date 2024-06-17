import React from 'react'
import "../css/meyawo.css"
import ProjectCard from './Switch/ProjectCard'
import ExpenseTracker from '../imgs/Expense Tracker.png'
import StopWatch from '../imgs/Stop Watch.png'
import KrishiCash from '../imgs/Krishi Cash.png'
import ImageGallery from '../imgs/Image Gallery.png'


export default function Home() {
    const projects = [
        {
            image: ExpenseTracker,
            title: 'Expense Tracker',
            link: '/expense-tracker'
        },
        {
            image: StopWatch,
            title: 'Stop Watch',
            link: '/stop-watch'
        },
        {
            image: ImageGallery,
            title: 'Image Gallery',
            link: '/image-gallery'
        },
        {
            image: KrishiCash,
            title: 'Krishi Cash',
            link: '/krishi-cash'
        },
        
    ];
    return (
        <div class="d-flex flex-column flex-nowrap align-items-center justify-content-start w-100">

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
