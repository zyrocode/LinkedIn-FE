import React, { Component } from 'react';
import {
    Collapse,
    Input,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

class NavBar extends Component {
    state = {}

    render() {
        return (
            <>
                <Nav>
                    <NavItem>
                        <img className="logo-img" src="http://www.prepare1.com/wp-content/uploads/2014/04/linkedin-logo-high-res-1254-1024x1024.jpg" alt="" />
                    </NavItem>
                    <NavItem>
                        <Input type="search" placeholder="Search" />
                    </NavItem>
                    <div align="right" className="nav-right-side">
                        <NavItem>
                            <span className="nav-icon-home"></span>
                        </NavItem>
                        <NavItem>
                            <span className="nav-icon-group"></span>
                        </NavItem>
                        <NavItem>
                            <span className="nav-icon-case"></span>
                        </NavItem>
                        <NavItem>
                            <span className="nav-icon-chat"></span>
                        </NavItem>
                        <NavItem>
                            <span className="nav-icon-bell"></span>
                        </NavItem>
                        <NavItem>
                            <img className="nav-icon-userimg" src=""></img>
                        </NavItem>
                    </div>
                    <NavItem>
                        <span className="nav-icon-grid"></span>
                    </NavItem>
                    <NavItem>
                        <span className="nav-icon-book"></span>
                    </NavItem>
                </Nav>
            </>
        );
    }
}

export default NavBar;