import React, { Component } from 'react'
import { Fade } from 'reactstrap'
 //import NavBar from './NavBar'
import PageLoading from './PageLoading'
// import ProfileComponent from './ProfileComponent'
// import ExperienceComponent from './ExperienceComponent'
import FetchByEachNewsFeedUser from '../APIs/FetchByEachNewsFeedUser'
import FetchByEachNewsFeedExperience from '../APIs/FetchByEachNewsFeedExperience'
import { Container, Row, Col } from "reactstrap";
import Moment from "react-moment";


class ProfilePages extends Component {
    state = {
        userID: "",
        isLoading: true,
        oneUserInfo: [],
        oneUserExp :[]
    }
    render() {
        
        return (
            <>
                {this.state.isLoading && <PageLoading />}
                {!this.state.isLoading && <Fade in={!this.state.isLoading}>
                <Container className="profile">
                        <Row className="profile-header">

                        <img height="150px" width="100%" src="https://cdn.hipwallpaper.com/i/62/8/uDtR6w.jpg" alt= "background" className="src" />



{/* 
                        {this.state.oneUserInfo.image
                        ? <img height="150px" width="100%" src="https://cdn.hipwallpaper.com/i/62/8/uDtR6w.jpg" alt={"image of " + this.state.oneUserInfo.name} className="src" />
                        : <img height="150px" width="100%" src={this.state.oneUserInfo.image} alt={"image of " + this.state.oneUserInfo.name} className="src" />
                        }  */}



                            
                        </Row>
                        {/* start of a secondRow */}
                        <Row className="profile-body">
                            <Col>
                            <div className="m-3">
                            <img className="profile-pic" src={this.state.oneUserInfo.image} alt="profile pic" />
        <Row>
          <Col sm="6" l="8">
            <h3>{`${this.state.oneUserInfo.name} ${this.state.oneUserInfo.surname}`}</h3>
            <h6>{this.state.oneUserInfo.title}</h6>
            <p>{this.state.oneUserInfo.bio}</p>
            <small>{this.state.oneUserInfo.area}</small>
            <small>{this.state.oneUserInfo.email}</small>
          </Col>
          <Col sm="6" l="4">
            <span className="mr-1 text-left"><i className="fa fa-building-o mr-1"></i>{this.state.oneUserExp.company}</span>
          </Col>
        </Row>




                            </div>

                            
                            </Col>  {/* end of a secondRow */}
                        </Row>
                    </Container>

                    <>
        <Container className="profile">
          <Container>
            <Row>
              <Col md="10" className="my-4">Experiences </Col>
              <hr />
              <Col md="1">
                
                
              </Col>
            </Row>
          </Container>
          <Row>
            
          {this.state.oneUserExp.map((experience, index) => (
              <div key={index}>
                <Col md="10">
                  <div className="experience">
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
                  
                 
                </Col>
              </div>
            ))}
            




          </Row>
        </Container>
      </>





                    {/* <NavBar username={this.props.username} password={this.props.password} />
                    <ProfileComponent userid={this.state.user} username={this.props.username} password={this.props.password} />
                    <ExperienceComponent userid={this.state.user} username={this.props.username} password={this.props.password} /> */}
                </Fade>}
            </>);
    }


    componentDidMount = async() => {
        let userID = this.props.match.params.user
        let userInfo = await FetchByEachNewsFeedUser(userID)
        let userExperience = await FetchByEachNewsFeedExperience (userID)
        setTimeout(() => {
            this.setState({
                isLoading: false,
                userID: userID,
                oneUserInfo: userInfo,
                oneUserExp: userExperience
            })
        }, 1000);
    


        }

}

export default ProfilePages;




// "_id": "5de4d03f631d990017331010",
// "name": "Ivan",
// "surname": "Plescan",
// "email": "ivan@strive.school",
// "bio": "Test",
// "title": "CEO @ Fullstack Developer",
// "area": "Italy",
// "username": "user17",
// "createdAt": "2019-12-02T08:50:07.274Z",
// "updatedAt": "2019-12-03T15:25:51.473Z",
// "__v": 0,
// "image": "https://scontent.ftrn1-1.fna.fbcdn.net/v/t1.0-9/46202995_2032384686804609_2702589951756730368_n.jpg?_nc_cat=103&_nc_ohc=tzl7MObTmscAQnJn_3x2ROcaxdkDGSilpJbU1URB8v2x4ynsWTZyfz1nw&_nc_ht=scontent.ftrn1-1.fna&oh=42bcdad5537493e20255ad239ff5896c&oe=5E450E39"
// }