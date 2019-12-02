import React, { Component } from 'react';
import FetchByUserName from "../APIs/FetchByUserName"
import { Row, Col } from 'reactstrap';

class ProfileInfo extends Component {
    state = { 
        userInfo:{
            name: "",
            surname: "",
            title:"",
            bio:"",
            area:""
        }

     }
    render() {
        let userInfo  =  this.state.userInfo 
        return (
          <>
          
            <Row>
              <Col sm="6" lg="8">
                <h3>{`${userInfo.name} ${userInfo.surname}`}</h3>
                <h6>{userInfo.title}</h6>
                <p>{userInfo.bio}</p>
                <small>{userInfo.area}</small>
                <small>{userInfo.email}</small>
              </Col>

              <Col sm="6" lg="4">
              <span><i className="fa fa-building-o">Strive School</i></span>
              </Col>
            </Row>
          </>
        );
    }


    componentDidMount=async()=>{
        let userName = "user18"
        let userProfile = await FetchByUserName(userName)
        console.log(userProfile)

        await this.props.updateID(userProfile.username)

        this.setState({
            userInfo:{
                name: userProfile.name,
                surname: userProfile.surname,
                title:userProfile.ttitle,
                bio:userProfile.bio,
                area:userProfile.area
            }
        })






    }

}
 
export default ProfileInfo;