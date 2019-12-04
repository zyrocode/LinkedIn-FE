import React, { Component } from 'react';
import {
    Input,
    Nav,
    NavItem
} from 'reactstrap';
import { Link } from 'react-router-dom'
import FetchByUserName from '../APIs/FetchByUserName';

class NavBar extends Component {
    state = {
        image: undefined
    }

    render() {
        return (
            <>
                <Nav className="sticky-top">
                    <NavItem>
                        <Link to="/">
                            <img className="logo-img" src="http://www.prepare1.com/wp-content/uploads/2014/04/linkedin-logo-high-res-1254-1024x1024.jpg" alt="logo-img" />
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Input type="search" placeholder="Search" />
                    </NavItem>
                    <div align="right" className="nav-right-side">
                        <NavItem>
                            <Link to="/">
                                <span className="nav-icon nav-icon-home"></span>
                                
                            </Link>
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
                            <Link to="/profile">
                                <img className="nav-icon-userimg" src={this.state.image} alt="profile-img" />
                            </Link>
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

    componentDidMount = async () => {
        let profile = await FetchByUserName(this.props.username, this.props.password)
        this.setState({
            image: profile.image
        })
    }
}

export default NavBar;