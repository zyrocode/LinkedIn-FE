import React, { Component } from 'react';
import UpdateUser from './UpdateUser'
import { Container, Col, Fade, Row } from 'reactstrap'
import Loading from './Loading'
import GetAPI from "../APIs/GetAPI"
import { connect } from "react-redux";



const mapStateToProps = state => state




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

    render() {
        let userInfo = this.state.userInfo
        return (
            <>
                {
                    <Fade>
                        <Container className="profile">
                            <Row className="profile-header">
                                <img height="150px" style={{ borderTopRightRadius: '5px', borderTopLeftRadius: '5px' }} width="100%" src="https://cdn.hipwallpaper.com/i/62/8/uDtR6w.jpg" alt="" className="src" />
                            </Row>
                            {/* start of a secondRow */}
                            <Row className="profile-body">
                                <Col>
                                    {this.props.details.username && <i className="fa fa-pencil pencil" onClick={() => this.setState({ openModal: true })}></i>}
                                    {this.state.openModal && <UpdateUser closeModal={() => this.setState({ openModal: false, isLoading: false })} />}
                                    {this.state.isLoading
                                        ?
                                        <Loading />
                                        :
                                        <Fade className="m-3">
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
        await this.fetchInfo()
        this.setState({ isLoading: false })
    }
    componentDidUpdate = async (prevProps) => {
        if (prevProps.userID !== this.props.userID) {
            await this.fetchInfo();
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

    fetchInfo = async () => {
        let userProfile = await GetAPI(this.props.details.username, localStorage.getItem('access_token'), 'profile', { signal: this.abortController.signal })
        console.log("fetchd data -->",this.props.details.username)
        if (!userProfile.imageUrl)
            userProfile.imageUrl = "https://www.shareicon.net/data/512x512/2015/10/02/649910_user_512x512.png"
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

export default connect(mapStateToProps) (ProfileComponent);