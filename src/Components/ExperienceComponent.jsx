import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import FetchByExperience from "../APIs/FetchByExperience";
import Moment from "react-moment";
import CreateExperience from "./CreateExperience"
import EditExperience from "./EditExperience"

class ExperienceComponent extends Component {
  state = {
    experiences: [],
    openModal: false,
    openModal1: false
  };

  render() {
    return (
        <>
          <Container className="profile">
            <Container>
              <Row>
                <Col md="10">Experiences</Col>
                <Col md="1">
                  <i
                    className="fa fa-plus"
                    onClick={() => this.setState({ openModal1: true })}
                  ></i>
                  {this.state.openModal1 && (
                    <CreateExperience
                      closeModal={() => this.setState({ openModal1: false })}
                      username={this.props.username}
                      password={this.props.password}
                    />
                  )}
                </Col>
              </Row>
            </Container>
            <Row>
              {this.state.experiences.map((experience, index) => (
                <>
                  <Col md="10">
                    <div key={index}>
                      <small>
                        <Moment format="MM/YYYY">
                          {experience.startDate}
                        </Moment>{" "}
                        -{" "}
                        <Moment format="MM/YYYY">{experience.endDate}</Moment>{" "}.{" "}
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
                    <i
                      className="fa fa-pencil"
                      onClick={() => this.setState({ openModal: true })}
                    ></i>
                    {this.state.openModal && (
                      <EditExperience
                        closeModal={() => this.setState({ openModal: false })}
                        id={experience._id}
                        username={this.props.username}
                        password={this.props.password}
                      />
                    )}
                  </Col>
                </>
              ))}
            </Row>
          </Container>
        </>
    );
}

componentDidMount = async () => {
  let experiences = await FetchByExperience(this.props.username, this.props.password);
  this.setState({
    experiences: experiences
  });
  // console.log('hey MAN', this.state.experiences); 
};
}

export default ExperienceComponent;
