import React, { Component } from 'react';
import ProfileInfo from "./ProflieInfo";
import { Link } from "react-router-dom";
import { Container, Col, Row } from 'reactstrap'


class ProfileComponent extends Component {
    state = {
        id: ""
    }


    updateID = (newid) => {
        this.setState({
            id: newid
        })
    }


    render() {


        return (
            <>
                <Container text-center className="profile">
                    <Row className="profile-header">
                        <img height="150px" width="100%" src="https://www.titanui.com/wp-content/uploads/2014/01/27/Grey-Checker-Pattern-Background-Vector.jpg" alt="" className="src" />
                    </Row>
                    {/* start of a secondRow */}
                    <Row className="profile-body">
                        <Col>

                            <Link to={`/updateUser/${this.state.id}`}>
                                <i className="fa fa-pencil" style={{ color: "#006097", background: "transparent" }}></i>
                            </Link>

                            <div className="m-3">
                                <ProfileInfo updateID={this.updateID} />
                            </div>
                        </Col>  {/* end of a secondRow */}
                    </Row>
                </Container>




            </>);
    }
}

export default ProfileComponent;