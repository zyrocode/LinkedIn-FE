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
      area: "",
      image: ""
    }

  }
  render() {
    let userInfo = this.state.userInfo
    return (
      <>
        <img className="profile-pic" src={userInfo.image} alt="profile pic" />
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
    console.log(userProfile.image)

    await this.props.updateID(userProfile.username)

    this.setState({
      userInfo: {
        name: userProfile.name,
        surname: userProfile.surname,
        title: userProfile.title,
        bio: userProfile.bio,
        area: userProfile.area,
        image: userProfile.image
      }
    })
  }
}

export default ProfileInfo;