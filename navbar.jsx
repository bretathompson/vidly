import React, { Component } from 'react';


const NavBar = props => {
        console.log('NavBar - Rendered');

    return (
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar{' '} 
            <span className="badge badge-pill badge-secondary" style={{ color: 'blue' }}>
              {props.totalCounters}
            </span>
          </a>
        </div>
      </nav>
    );
};


export default NavBar;