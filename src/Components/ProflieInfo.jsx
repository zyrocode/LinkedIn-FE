import React, { Component } from 'react';
import FetchByUserName from "../APIs/FetchByUserName"
import { Row, Col } from 'reactstrap';

class ProfileInfo extends Component {
  state = {
    userInfo: {
      name: "",
      surname: "",
      title: "",
      bio: "",
      area: ""
    }

  }
  render() {
    let userInfo = this.state.userInfo
    return (
      <>
        <img className="profile-pic" width="150px" src="http://www.stickpng.com/assets/images/585e4beacb11b227491c3399.png" alt="profile pic" />
        <Row>
          <Col sm="6" l="8">
            <h3>{`${userInfo.name} ${userInfo.surname}`}</h3>
            <h6>{userInfo.title}</h6>
            <p>{userInfo.bio}</p>
            <small>{userInfo.area}</small>
            <small>{userInfo.email}</small>
          </Col>
          <Col sm="6" l="4">
            <span className="mr-1 text-left"><i className="fa fa-building-o mr-1"></i>Strive School</span>
          </Col>
        </Row>
      </>
    );
  }


  componentDidMount = async () => {
    let userName = "user18"
    let userProfile = await FetchByUserName(userName)
    console.log(userProfile)

    await this.props.updateID(userProfile.username)

    this.setState({
      userInfo: {
        name: userProfile.name,
        surname: userProfile.surname,
        title: userProfile.title,
        bio: userProfile.bio,
        area: userProfile.area
      }
    })






  }

}

export default ProfileInfo;