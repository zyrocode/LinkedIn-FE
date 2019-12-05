import React, { Component } from 'react';
import {
    Input,
    Nav,
    NavItem
} from 'reactstrap';
import { Link } from 'react-router-dom'
import GetAPI from '../APIs/GetAPI';

class NavBar extends Component {
    state = {
        image: undefined,
        allUsers: [],
        search: undefined
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
                        <Input type="search" placeholder="Search" onChange={(val) => this.filterUsers(val)} value={this.state.search} />
                    </NavItem>
                    <div align="right" className="nav-right-side">
                        <NavItem>
                            <Link to="/">
                                <span className="nav-icon nav-icon-home"></span>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <span className="nav-icon nav-icon-group"></span>
                        </NavItem>
                        <NavItem>
                            <span className="nav-icon nav-icon-case"></span>
                        </NavItem>
                        <NavItem>
                            <span className="nav-icon nav-icon-chat"></span>
                        </NavItem>
                        <NavItem>
                            <span className="nav-icon nav-icon-bell"></span>
                        </NavItem>
                        <NavItem>
                            <Link to={'/profile/' + localStorage.getItem('username')}>
                                <img className="nav-icon nav-icon-userimg" src={this.state.image ? this.state.image : 'https://www.shareicon.net/data/512x512/2015/10/02/649910_user_512x512.png'} alt="profile-img" />
                            </Link>
                        </NavItem>
                    </div>
                    <NavItem>
                        <span className="nav-icon nav-icon-grid"></span>
                    </NavItem>
                    <NavItem>
                        <span className="nav-icon nav-icon-book"></span>
                    </NavItem>
                </Nav>
            </>
        );
    }

    componentDidMount = async () => {
        let profile = await GetAPI(localStorage.getItem('username'), localStorage.getItem('password'), 'profile')
        let allUsers = await GetAPI(localStorage.getItem('username'), localStorage.getItem('password'))
        this.setState({
            image: profile.image,
            allUsers: allUsers
        })
    }

    filterUsers = (e) => {
        if (e.target.value && e.target.value.length > 0) {
            let search = e.target.value
            let allUsersFilter = this.state.allUsers
                .filter(user =>
                    user.name.toUpperCase().includes(search.toUpperCase()) ||
                    user.surname.toUpperCase().includes(search.toUpperCase())
                )
                allUsersFilter && allUsersFilter.length > 0 
                ?
                console.log(allUsersFilter)
                :
                console.log("NO USER FOUND")
            
        }
    }
}

export default NavBar;