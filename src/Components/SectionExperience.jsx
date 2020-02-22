import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import GetAPI from "../APIs/GetAPI";
import Moment from "react-moment";
import CreateExperience from "./CreateExperience"
import EditExperience from "./EditExperience"
import { withRouter } from 'react-router-dom';
import Loading from './Loading'

class ExperienceComponent extends Component {
  state = {
    experiences: [],
    openModalEdit: false,
    openModalCreate: false,
    isLoading: true,
    editSelected: undefined
  };


  updateExperience = () => {
    this.setState({
      experiences: this.state.experiences
    })
  }




  render() {
    return (
      <>{this.state.isLoading
        ?
        <Loading />
        :
        < Container className="profile mb-5">
          <Container>
            <Row>
              <Col md="12" className="my-4">
                <b style={{ fontSize: '30px' }}>Experiences</b>
                {localStorage.getItem('username') === this.props.userID && <i
                  className="fa fa-plus"
                  onClick={() => this.setState({ openModalCreate: true })}
                ></i>}
                {this.state.openModalCreate && (
                  <CreateExperience
                    closeModal={() => this.setState({ openModalCreate: false })}
                  />
                )}
              </Col>
            </Row>
          </Container>
          {this.state.openModalEdit &&
                <EditExperience
                  closeModal={() => this.setState({ openModalEdit: false })}
                  onselected={this.onselected}
                  id={this.state.editSelected} updatexp={this.updateExperience}
                />

              }
          {this.state.experiences.map((experience, index) =>
            <Container key={index}>
              <hr />
              <Row>
                <Col style={{ maxWidth: '60px' }}>
                  {experience.image
                    ? <img width="100%" src={experience.image} alt={"institution " + experience.image} />
                    : <img width="40px" src="https://cdn0.iconfinder.com/data/icons/financial-business/512/company_building-512.png" alt="logo company" />
                  }
                </Col>
                <Col>
                  {localStorage.getItem('username') === this.props.userID && <i
                    className="fa fa-pencil"
                    onClick={() => this.setState({ openModalEdit: true,editSelected: experience._id  })}
                  ></i>}
                  <div className="experience">
                    <h6 style={{ fontWeight: '700' }}>{experience.role}</h6>
                    <p>{experience.company}</p>
                    <small>
                      <Moment format="MM/YYYY">
                        {experience.startDate}
                      </Moment>
                      {" "}–{" "}
                      <Moment format="MM/YYYY">
                        {experience.endDate}
                      </Moment>
                      {" "}-{" "}
                      <Moment fromNow ago={experience.startDate}>
                        {experience.endDate}
                      </Moment>
                    </small>
                    <p>{experience.description}</p>
                    <p>{experience.area}</p>
                  </div>
                </Col>
              </Row>

            </Container>
          )}
        </Container>}
      </>
    );
  }

  componentDidMount = async () => {
    this.setState({
      experiences: await GetAPI(localStorage.getItem('username'), localStorage.getItem('access_token'), 'experiences', this.props.userID)
    });
    this.setState({
      isLoading: false
    })
  };

  componentDidUpdate = async (prevProps, prevState) => {
    //  if(this.props.match.params.user !== this.props.userID)) 
    if (this.props.location.pathname !== prevProps.location.pathname)
      await this.fetchInfo()
  }



  fetchInfo = async () => {
    this.setState({
      experiences: await GetAPI(localStorage.getItem('username'), localStorage.getItem('password'), 'experiences', this.props.userID)
    });
  }
}

export default withRouter(ExperienceComponent);
