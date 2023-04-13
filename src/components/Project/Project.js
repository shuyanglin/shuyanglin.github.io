import React from "react";
import {Link} from 'react-router-dom';


function Project({name}) {
  return (
    <>
      <h1> <Link to="/projects"> \ </Link> / {name}</h1>
    </>
  );
}

export default Project;
