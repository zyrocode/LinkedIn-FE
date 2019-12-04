import React, { Component } from 'react'
import { Fade } from 'reactstrap'
import NavBar from './NavBar'
import ProfileComponent from './ProfileComponent'
import ExperienceComponent from './ExperienceComponent'


class ProfilePage extends Component {
    state = {
        isLoading: true
    }
    render() {
        return (
                <Fade in={!this.state.isLoading}>
                    <NavBar />
                    <ProfileComponent userID={this.props.match.params.user}/>
                    <ExperienceComponent userID={this.props.match.params.user}/>
                </Fade>);
    }

    componentDidMount = () => {
        this.setState({
            isLoading: false
        })
    }
}

export default ProfilePage;