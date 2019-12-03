import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import FetchByExperience from "../APIs/FetchByExperience";
import Moment from "react-moment";
import CreateExperience from "./CreateExperience"

class ExperienceComponent extends Component {
  state = {
    experiences: [],
    openModal: false
  };

  render() {
    return (
      <>
        <Container className="profile">
          <Row>
             <Col md="10">
                  Experiences
                  
             </Col>
             <Col md="1">
             <i class="fa fa-plus" onClick={() => this.setState({ openModal: true })}></i>
               {this.state.openModal && <CreateExperience closeModal={() => this.setState({ openModal: false })}/>}   
             </Col>
        </Row>
          <Row>
            {this.state.experiences.map((experience, index) => (
              <>
                <Col md="10">
                  <div key={index}>
                    <small>
                      {experience.startDate} - {experience.endDate} .
                      <span>
                        <Moment fromNow ago={experience.startDate}>
                          {experience.endDate}
                        </Moment>{" "}
                      </span>{" "}
                    </small>
                    <p>{experience.role}</p>
                    <p>{experience.company}</p>
                    <p>{experience.description}</p>
                    <p>{experience.area}</p>
                    <hr />
                  </div>
                </Col>
                <Col md="1">
                  {" "}
                  <i class="fa fa-pencil"></i>
                </Col>
              </>
            ))}
          </Row>
        </Container>
      </>
    );
  }

  componentDidMount = async () => {
    let experiences = await FetchByExperience();
    this.setState({
      experiences: experiences
    });
    console.log(this.state.experiences);
  };
}

export default ExperienceComponent;
