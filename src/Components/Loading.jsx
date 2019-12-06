import React, { Component } from 'react';
import { Col, Container, Row, Fade } from 'reactstrap'
import Loader from 'react-loader-spinner'

class PageLoading extends Component {
    render() {
        return (
            <Fade>
                <Container fluid style={{backgroundColor: 'white'}} className="d-block text-center loading">
                    <Row>
                        <Col>
                            <img width="30%" src="http://www.userlogos.org/files/logos/siipikarja/linkedin_white_silhouet.png" alt="LinkedIn Logo" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Loader type="ThreeDots" color="#0274b3" height={80} width={80} />
                        </Col>
                    </Row>
                </Container>
            </Fade>
        );
    }
}

export default PageLoading;