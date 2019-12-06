import React, { Component } from 'react';
import GetAPI from '../APIs/GetAPI';
import { Container, Col, Fade, Row, Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from 'reactstrap'
import { Link } from 'react-router-dom'


class NewsFeed extends Component {
    state = {
        posts: [],
        isLoading: true,
        createOpen: false,
        personalProfile: undefined
    }

    render() {
        return (
            <Fade in={!this.state.isLoading}>
                <Container>
                    <Row>
                        <Col className="mx-auto">
                            <Row>
                                <Col className="create-news-feed">
                                    <a onClick={() => this.setState({ createOpen: !this.state.createOpen })}>
                                        <i className="fas fa-edit"></i>
                                        <span style={{ color: 'black', padding: '10px', fontWeight: '600' , fontSize: '20px'}}>Create a new</span>
                                    </a>
                                    <Modal toggle={() => this.setState({ createOpen: !this.state.createOpen })} isOpen={this.state.createOpen} >
                                        <ModalHeader toggle={() => this.setState({ createOpen: !this.state.createOpen })} style={{ backgroundColor: '#0073b1', color: 'white' }}>Create Post</ModalHeader>
                                        <ModalBody>
                                            {this.state.personalProfile
                                                ?
                                                < img className='newsfeed-pic' src={this.state.personalProfile.image} alt='profile pic' />
                                                :
                                                <img className='newsfeed-pic' src='src="https://www.shareicon.net/data/512x512/2015/10/02/649910_user_512x512.png"' alt='profile pic' />
                                            }
                                            {this.state.personalProfile &&
                                                <>
                                                    <span style={{ color: 'black', padding: '10px', fontWeight: '600' }}>{this.state.personalProfile.name}{" "}{this.state.personalProfile.surname}</span>
                                                    <Input type="textarea" placeholder='What would you like to talk about?' style={{ borderColor: 'white' }} />
                                                </>
                                            }
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="primary" >Publish</Button>
                                        </ModalFooter>
                                    </Modal>
                                </Col>
                            </Row>
                            {this.state.posts
                                .map((post, index) =>
                                    <Row key={index} className="news-feed">
                                        <Col>
                                            <Link to={"/profile/" + post.username}>
                                                <img className="newsfeed-pic" src={post.userImage} alt="profile pic" />
                                                <span style={{ color: 'black', padding: '10px', fontWeight: '600' }}>{post.name}{" "}{post.surname}</span>
                                            </Link>
                                            {post._edit &&
                                                <i className="fa fa-pencil"></i>}
                                            <Row>
                                                <p style={{ paddingTop: '20px' }}>{post.text}</p>
                                            </Row>
                                            <Row>
                                                {post.image &&
                                                    <img src={post.image} alt='IMAGE MISSING' />}
                                            </Row>
                                            <hr />
                                            <i className="fas fa-thumbs-up"></i>
                                            <i className="fas fa-comment"></i>
                                        </Col>
                                    </Row>)
                            }
                        </Col>
                    </Row>
                </Container>
            </Fade>
        );
    }

    componentDidMount = async () => {
        let posts = await GetAPI(localStorage.getItem('username'), localStorage.getItem('password'), 'posts')
        posts.forEach(async post => {
            let oneUser = post.username
            let profile = await GetAPI(localStorage.getItem('username'), localStorage.getItem('password'), 'profile', oneUser)
            post.name = profile.name
            post.surname = profile.surname
            if (localStorage.getItem('username') === post.username)
                post._edit = "true"
            profile.image
                ?
                post.userImage = profile.image
                :
                post.userImage = "https://www.shareicon.net/data/512x512/2015/10/02/649910_user_512x512.png"
            this.setState({
                posts: [...this.state.posts, post],
                isLoading: false
            })
        })
        let personalProfile = await GetAPI(localStorage.getItem('username'), localStorage.getItem('password'), 'profile')
        this.setState({
            personalProfile: personalProfile
        })
        console.log(this.state.personalProfile)
    }
}

export default NewsFeed;