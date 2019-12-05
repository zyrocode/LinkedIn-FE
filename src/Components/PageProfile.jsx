import React, { Component } from 'react'
import { Fade } from 'reactstrap'
import NavBar from './SectionNavBar'
import ProfileComponent from './SectionProfile'
import ExperienceComponent from './SectionExperience'


class PageProfile extends Component {
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

export default PageProfile;