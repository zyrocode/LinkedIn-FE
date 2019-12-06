import React, { Component } from 'react';
import GetAPI from "../APIs/GetAPI"
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



   abortController = new AbortController();



  componentDidMount = async () => {
    await this.fetchInfo()
  }

  
  componentDidUpdate  = async (prevProps)=>{
    if (prevProps.userID !== this.props.userID){
      await this.fetchInfo();
    }
  }

  // componentWillUnmount = ()=>{
  //   this.abortController.abort()
  // }


//   componentDidUpdate = async(prevProps, prevState) => {
//  if(this.props.location.pathname !== prevProps.location.pathname) 
//     await this.fetchInfo()   }

  fetchInfo = async () => {
    let userProfile = await GetAPI(localStorage.getItem('username'), localStorage.getItem('password'), 'profile', this.props.userID, {signal: this.abortController.signal})
    if (!userProfile.image)
      userProfile.image = "https://www.shareicon.net/data/512x512/2015/10/02/649910_user_512x512.png"
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