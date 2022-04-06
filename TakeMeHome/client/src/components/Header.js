
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

export default function Header() {
  const { isLoggedIn, logout } = useContext(HomeContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={RRNavLink} to="/">Take Me Home</NavbarBrand>
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
  );
}