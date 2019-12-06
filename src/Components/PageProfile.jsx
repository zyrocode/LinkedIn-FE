import React, { Component } from 'react'
import { Fade } from 'reactstrap'
import ProfileComponent from './SectionProfile'
import ExperienceComponent from './SectionExperience'


class PageProfile extends Component {
    render() {
        return (
            <>
                <ProfileComponent userID={this.props.match.params.user} />
                <ExperienceComponent userID={this.props.match.params.user} />
            </>
        );
    }
}

export default PageProfile;