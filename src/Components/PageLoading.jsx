import React, { Component } from 'react';
import { Col, Container, Row, Spinner } from 'reactstrap'
import Loader from 'react-loader-spinner'

class PageLoading extends Component {
    render() {
        return (
            <Container fluid className="d-block text-center loading">
                <Row>
                    <Col>
                        <img width="30%" src="http://www.userlogos.org/files/logos/siipikarja/linkedin_white_silhouet.png" alt="LinkedIn Logo" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Loader type="ThreeDots" color="#fff" height={80} width={80} />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default PageLoading;