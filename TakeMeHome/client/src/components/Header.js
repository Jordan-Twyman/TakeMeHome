
import React, { useState, useContext } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { HomeContext } from '../providers/HomeProvider';
import logo from '../img/logo.png'
import linkedin from '../img/linkedin.png'
import github from '../img/github-logo-silhouette-in-a-square.png'


export default function Header() {
  const { isLoggedIn, logout } = useContext(HomeContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <> <div>
    <Navbar color="light" light expand="md">
      { <NavbarBrand tag={RRNavLink} to="/"><img src={logo} alt='logo' width="" height="" /></NavbarBrand> }
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
             { /* When isLoggedIn === true, we will render the Home link */ }
          {isLoggedIn &&
          <>  
          <NavItem>
          <NavLink tag={RRNavLink} to="/upkeeps">Upkeep</NavLink>
            </NavItem>
        <NavItem>
          <NavLink tag={RRNavLink} to="/">Home</NavLink>
            </NavItem>
            </>
          
          
}
        </Nav>
        <Nav navbar>
          {isLoggedIn &&
            <>
              <NavItem>
                <a aria-current="page" className="nav-link"
                  style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
              </NavItem>
            </>
          }
          {!isLoggedIn &&
            <>
              <NavItem>
                <NavLink tag={RRNavLink} to="/login">Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} to="/register">Register</NavLink>
              </NavItem>
            </>
          }
        </Nav>
      </Collapse>
    </Navbar>
  </div>

  <footer className="bg-dark">
    <div className="footer-github">
      <button type="button" className="btn btn-dark btn-outline-light">
        <a target="_blank" href="https://github.com/jordan-twyman/Takemehome">
          <img src={github} alt='' height="25" width="25" className="bi bi-github github-logo"></img>
        </a>
      </button>
      </div>
      <div className="footer-github">
      <button type="button" className="btn btn-dark btn-outline-light">
        <a target="_blank" href="https://www.linkedin.com/in/jordan-twyman/">
          <img src={linkedin} alt='' height="25" width="25" className="bi bi-github github-logo"></img>
        </a>
      </button>
      </div>
    <div className="footer-copyright"><small>Take Me Home &copy;2022</small></div>
  </footer>
 
 </>
   
  );
}