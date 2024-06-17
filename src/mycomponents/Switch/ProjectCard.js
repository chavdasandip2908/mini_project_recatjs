import React from 'react';
import { NavLink } from 'react-router-dom';

const ProjectCard = ({ image, title, link }) => {


  return (
    <div className="col-12 col-md-6 col-lg-3 mb-4">
      <NavLink to={link}>
        <div className="card" style={{ cursor: 'pointer' }} >
          <img src={image} className="card-img-top" alt="Project" />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default ProjectCard;
