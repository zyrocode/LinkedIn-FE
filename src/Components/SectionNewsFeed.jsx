import React, { Component } from 'react';
import GetAPI from '../APIs/GetAPI';
import { Container, Col, Fade, Row, Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from 'reactstrap'
import { Link } from 'react-router-dom'
import PostAPI from '../APIs/PostAPI'
import PostImageAPI from '../APIs/PostImageAPI'
import Moment from "react-moment";
import Loading from './Loading';

class NewsFeed extends Component {
    state = {
        posts: [],
        isLoading: true,
        createOpen: false,
        editOpen: false,
        personalProfile: undefined,
        createPostText: undefined,
        createPostImage: undefined,
        createPostError: false,
        createIsLoading: false
    }

    render() {
        return (
            <>
                {this.state.isLoading
                    ?
                    <Loading />
                    :
                    <Fade >
                        <Container style={{ maxWidth: '700px' }}>
                            <Row>
                                <Col className="mx-auto">
                                    <Row>
                                        <Col className="create-news-feed">
                                            <a onClick={() => this.setState({ createOpen: !this.state.createOpen })}>
                                                <i className="fas fa-edit"></i>
                                                <span style={{ color: 'black', padding: '10px', fontWeight: '600', fontSize: '20px' }}>Create a new</span>
                                            </a>
                                            <Modal toggle={() => this.setState({ createOpen: !this.state.createOpen })} isOpen={this.state.createOpen} >
                                                <ModalHeader toggle={() => this.setState({ createOpen: !this.state.createOpen })} style={{ backgroundColor: '#0073b1', color: 'white' }}>Create Post</ModalHeader>
                                                {this.state.createIsLoading
                                                ?
                                                <Loading/>
                                                :
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
                                                            <Input onChange={(val) => this.setState({
                                                                createPostText: val.target.value
                                                            })} type="textarea" placeholder='What would you like to talk about?' style={{ borderColor: 'white' }} />
                                                            <Input onChange={(val) => this.setState({ createPostImage: val.target.files[0] })} type="file" />
                                                        </>
                                                    }
                                                </ModalBody>}
                                                <ModalFooter>
                                                    <Button onClick={() => this.publishPost()} color="primary" >Publish</Button>
                                                </ModalFooter>
                                            </Modal>
                                        </Col>
                                    </Row>
                                    {this.state.posts.slice(0, 30)
                                        .map((post, index) =>
                                            <Row key={index} className="news-feed">
                                                <Col>
                                                    <Link to={"/profile/" + post.username}>
                                                        <Row>
                                                            <img className="newsfeed-pic" src={post.userImage} alt="profile pic" />
                                                            <Col>
                                                                <span style={{ color: 'black', padding: '10px', fontWeight: '600' }}>{post.name}{" "}{post.surname}</span>
                                                                <Row >
                                                                    <Moment className="time-date" date={post.updatedAt} format="HH:mm DD/MM" />
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                    </Link>
                                                    {post._edit &&
                                                        <i className="fa fa-pencil"></i>}
                                                    <Row>
                                                        <p style={{ paddingTop: '20px' }}>{post.text}</p>
                                                    </Row>
                                                    <Row style={{ backgroundColor: '#dddddd7c', borderRadius: '5px' }}>
                                                        {post.image &&
                                                            <img className="newsfeed-img mx-auto" src={post.image} alt='IMAGE MISSING' />}
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
                }
            </>
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
                posts: [...this.state.posts, post]
            })
        })
        posts.sort((a, b) => {
            return new Date(b.updatedAt) - new Date(a.updatedAt)
        })
        let personalProfile = await GetAPI(localStorage.getItem('username'), localStorage.getItem('password'), 'profile')
        this.setState({
            personalProfile: personalProfile,
            isLoading: false,
            posts: posts
        })
    }

    publishPost = async () => {
        this.setState({createIsLoading: true})
        if (this.state.createPostText) {
            let postObject = {
                text: this.state.createPostText
            }
            let response = await PostAPI(localStorage.getItem('username'), localStorage.getItem('password'), 'post', postObject)
            let fd = new FormData();
            fd.append("post", this.state.createPostImage)
            await PostImageAPI(localStorage.getItem('username'), localStorage.getItem('password'), fd, 'post', response._id)
            this.setState({
                createOpen: false,
                createPostError: false
            })
            this.setState({createIsLoading: false})
        } else {
            this.setState({ createPostError: true })
        }
    }
}

export default NewsFeed;