import React, { Component } from 'react';
import ProfileInfo from "./ProfileInfo";
import UpdateUser from './UpdateUser'
import { Container, Col, Fade, Row } from 'reactstrap'
import Loading from './Loading'

class ProfileComponent extends Component {
    state = {
        openModal: false,
        isLoading: true
    }

    render() {
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
                                    {localStorage.getItem('username') === this.props.userID && <i className="fa fa-pencil pencil" onClick={() => this.setState({ openModal: true })}></i>}
                                    {this.state.openModal && <UpdateUser closeModal={() => this.setState({ openModal: false, isLoading: false })} />}
                                    <div className="m-3">
                                        {!this.state.openModal && <ProfileInfo userID={this.props.userID} />
                                        }
                                    </div>
                                </Col>  {/* end of a secondRow */}
                            </Row>
                        </Container>
                    </Fade>
                }
            </>);
    }
}

export default ProfileComponent;