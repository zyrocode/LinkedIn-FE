import React, { Component } from 'react'
import { Fade } from 'reactstrap'
import NavBar from './NavBar'
import PageLoading from './PageLoading'
import ProfileComponent from './ProfileComponent'
import ExperienceComponent from './ExperienceComponent'


class ProfilePage extends Component {
    state = {
        isLoading: true
    }
    render() {
        return (
            <>
                {this.state.isLoading && <PageLoading />}
                {!this.state.isLoading && 
                <Fade in={!this.state.isLoading}>
                    <NavBar/>
                    <ProfileComponent/>
                    <ExperienceComponent/>
                </Fade>}
            </>);
    }


    componentDidMount = () => {
        setTimeout(() => {
            this.setState({
                isLoading: false
            })
        }, 1000);
    }

}

export default ProfilePage;