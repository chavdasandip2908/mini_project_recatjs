import React, { useState } from 'react'
// import navlink 
import { NavLink } from "react-router-dom";

// style
import './SideBar.css';


export default function SideBar() {
    const [SideBarActive, setSideBarActive] = useState(false);
    return (
        <>
            <div onClick={() => setSideBarActive(!SideBarActive)} className={SideBarActive ? 'sidebar-toggle-btn' : 'sidebar-toggle-btn active'}>{SideBarActive ? <i className="fa-solid fa-x"></i> : <i className="fa-solid fa-bars"></i>}</div>
            <div className={SideBarActive ? "sidebar active flex-shrink-0 p-3 bg-dark text-white" : "sidebar  flex-shrink-0 p-3 bg-dark text-white"} style={{ width: '280px', height: '100vh' }}>
                <NavLink to="/" className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
                    <span className="fs-5 fw-semibold text-white">Projects</span>
                </NavLink>
                <ul className="list-unstyled ps-0">
                    <li className="mb-3">
                        <NavLink to="/" className="align-items-center text-white text-decoration-none ">
                            Home
                        </NavLink>
                    </li>
                    <li className="mb-3">
                        <NavLink to="/expense-tracker" className="align-items-center text-white text-decoration-none ">
                            Expense Tracker
                        </NavLink>
                    </li>
                    <li className="mb-3">
                        <NavLink to="/stop-watch" className="align-items-center text-white text-decoration-none ">
                            Stop Watch
                        </NavLink>
                    </li>
                    <li className="mb-3">
                        <NavLink to="/image-gallery" className="align-items-center text-white text-decoration-none ">
                            Image Gallery
                        </NavLink>
                    </li>
                    <li className="border-top my-3" />
                    <li className="mb-3">
                        <NavLink to="/" className="align-items-center text-white text-decoration-none ">
                            Account
                        </NavLink>
                    </li>
                </ul>
            </div>
        </>
    )
}
