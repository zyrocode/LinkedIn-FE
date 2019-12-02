import React, { Component } from 'react';
import { Col, Container, Row, Spinner } from 'reactstrap'


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
                        <Spinner style={{ width: '3rem', height: '3rem', color: 'white' }} />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default PageLoading;