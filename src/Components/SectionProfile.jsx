import React, { Component } from 'react';
import UpdateUser from './UpdateUser'
import { Container, Col, Fade, Row, Spinner } from 'reactstrap'
import Loading from './Loading'
import GetAPI from "../APIs/GetAPI"
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import unknowUserImg from "../images/user_unknown.png"
import bg from "../images/bg.jpg"


const mapStateToProps = state => state

const mapDispatchToProps = (dispatch) => ({
    addImgToStore: (imgurl) =>
      dispatch({
        type: "SET_IMG",
        payload: {
            imageUrl: imgurl
        },
      })
  });


class ProfileComponent extends Component {
    state = {
        openModal: false,
        isLoading: true,
        userInfo: {
            name: undefined,
            surname: undefined,
            title: undefined,
            bio: undefined,
            area: undefined,
            image: undefined,
        }
    }
 
    tempTimeoutForImage =()=>{
        this.setState({
            imgLoading: true
        })
        setTimeout(() => {
            this.setState({
                imgLoading: false
            })
        }, 3000);
    }

    render() {
        let userInfo = this.state.userInfo
        return (
            <>
                {
                    <Fade>
                        <Container className="profile">
                            <Row className="profile-header">
                                <img height="150px" style={{ borderTopRightRadius: '5px', borderTopLeftRadius: '5px' }} width="100%" src={bg} alt="" className="src" />
                            </Row>
                            {/* start of a secondRow */}
                            <Row className="profile-body">
                                <Col>
                                    {this.props.details.username === this.props.match.params.username && <i className="fa fa-pencil pencil" onClick={() => this.setState({ openModal: true })}></i>}
                                    {this.state.openModal && 
                                    <UpdateUser closeModal={() => this.setState({ openModal: false, isLoading: false }) }  refresh={this.fetchInfo} loadTimer ={this.tempTimeoutForImage}/>
                                    }
                                    {this.state.isLoading
                                        ?
                                        <Loading />
                                        :
                                        <Fade className="m-3">
                                            <img className="profile-pic" src={userInfo.image} alt="profile pic" style={{objectFit: "cover"}} />
                                            <Row>
                                                <Col sm="6" l="8">
                                                    {
                                                        this.state.imgLoading && <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />
                                                    }
                                                    <h2>{`${userInfo.name} ${userInfo.surname}`}</h2>
                                                    <h4>{userInfo.title}</h4>
                                                    <p>{userInfo.bio}</p>
                                                    <small>{userInfo.area}</small>
                                                    <small>{userInfo.email}</small>
                                                </Col>
                                                <Col sm="6" l="4">
                                                    <span className="mr-1 text-left"><i className="fa fa-building-o mr-1"></i>Strive School</span>
                                                </Col>
                                            </Row>
                                        </Fade>
                                    }
                                </Col>  {/* end of a secondRow */}
                            </Row>
                        </Container>
                    </Fade>
                }
            </>);
    }

    abortController = new AbortController();

    componentDidMount = async () => {
        console.log(this.props.details.username)
        await this.fetchInfo(this.props.userID)
        this.setState({ isLoading: false })
    }
    componentDidUpdate = async (prevProps) => {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            await this.fetchInfo(this.props.userID);
             
        }
    }


    // "imageUrl": "https://via.placeholder.com/150",
    // "_id": "5e501c1b0a9ddc0044195a1f",
    // "firstname": "Maryline",
    // "surname": "Ofoaro",
    // "area": "Berlin",
    // "email": "chijeffo@gmail.com",
    // "username": "mary",
    // "userId": "5e501c1a0a9ddc0044195a1e",
    // "experience": [],
    // "createdAt": "2020-02-21T18:06:19.482Z",
    // "updatedAt": "2020-02-21T18:06:19.482Z",
    // "__v": 0

    fetchInfo = async (anotherUsername) => {
        let userProfile = 
        anotherUsername ? 
          await GetAPI(this.props.details.username, this.props.details.userToken, 'profile',anotherUsername) 
        :  await GetAPI(this.props.details.username, this.props.details.userToken, 'profile') 
        console.log("fetchd data -->",userProfile)
        //{ signal: this.abortController.signal })
        userProfile.imageUrl ? this.props.addImgToStore(userProfile.imageUrl)
           : userProfile.imageUrl = unknowUserImg
        this.setState({
            userInfo: {
                name: userProfile.firstname,
                surname: userProfile.surname,
                title: userProfile.title,
                bio: userProfile.bio,
                area: userProfile.area,
                image: userProfile.imageUrl
            }
        })
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (ProfileComponent));