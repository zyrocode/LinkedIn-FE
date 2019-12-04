import React, { Component } from 'react';
import ProfileInfo from "./ProfileInfo";
import UpdateUser from './UpdateUser'
import { Container, Col, Fade, Row } from 'reactstrap'


class ProfileComponent extends Component {
    state = {
        id: undefined,
        openModal: false
    }

    render() {
        return (
            <>
                <Fade in={!this.state.openModal}>
                    <Container text-center className="profile">
                        <Row className="profile-header">
                            <img height="150px" width="100%" src="https://www.titanui.com/wp-content/uploads/2014/01/27/Grey-Checker-Pattern-Background-Vector.jpg" alt="" className="src" />
                        </Row>
                        {/* start of a secondRow */}
                        <Row className="profile-body">
                            <Col>
                                <i className="fa fa-pencil" style={{ color: "#006097", background: "transparent" }} onClick={() => this.setState({ openModal: true })}></i>

                                {this.state.openModal && <UpdateUser username={this.props.username} password={this.props.password}closeModal={() => this.setState({ openModal: false })} id={this.state.id} />}

                                <div className="m-3">
                                    {!this.state.openModal && <ProfileInfo username={this.props.username} password={this.props.password} />
                                    }
                                </div> 
                            </Col>  {/* end of a secondRow */}
                        </Row>
                    </Container>
                </Fade>
            </>);
    }
}

export default ProfileComponent;