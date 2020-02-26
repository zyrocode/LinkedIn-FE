import React, { Component } from 'react'
import { Fade } from 'reactstrap'
import SectionProfile from './SectionProfile'
import ExperienceComponent from './SectionExperience'


class PageProfile extends Component {
    render() { 
        return (
            <>
                <SectionProfile userID={this.props.match.params.username} />
                <ExperienceComponent userID={this.props.match.params.username} />
            </>
        );
    }
}

export default PageProfile;