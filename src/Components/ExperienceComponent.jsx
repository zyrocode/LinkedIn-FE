import React, { Component } from 'react';
import { Container, Row } from 'reactstrap'
import FetchByExperience from '../APIs/FetchByExperience';
import { Moment } from 'react-moment'

class ExperienceComponent extends Component {
    state = {
        experiences: []
    }

    render() {
        return (
            <>
                <Container className="profile">
                    <Row>
                        Experiences
                    </Row>
                    <Row>
                        {this.state.experiences
                            .map((experience, index) =>
                                <div key={index}>
                                    <p>{experience.role}</p>
                                    <p>{experience.company}</p>
                                    

                                    <small>{experience.startDate} - {experience.endDate} .
                                    
                                     1 yr     </small>
                                    

                                  
                                    <Moment from="2015-04-19">1976-04-19T12:59-0500</Moment>

                                    //


                                    
                                    
                                    <p>{experience.description}</p>
                                    <p>{experience.area}</p>
                                </div>
                            )
                        }
                    </Row>
                </Container>
            </>
        );
    }

    componentDidMount = async () => {
        let experiences = await FetchByExperience()
        this.setState({
            experiences: experiences
        })
        console.log(this.state.experiences)
    }
}

export default ExperienceComponent;