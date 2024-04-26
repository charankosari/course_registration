import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import './Navbar.css'
import {  HamburgetMenuClose, HamburgetMenuOpen } from "./Icons";

function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            <span className="icon">
<img src="https://agency.trivedagroup.com/static/media/logo.03518202920b9b27869a.png" alt="" style={{height:'70px',width:'70px'}} />
            </span>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"} style={{paddingLeft:'0',margin:'0'}}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/about"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/contact"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Contact Us
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>

            {click ? (
              <span className="icon">
                <HamburgetMenuClose />

              </span>
            ) : (
              <span className="icon">
                <HamburgetMenuOpen />{" "}

              </span>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;