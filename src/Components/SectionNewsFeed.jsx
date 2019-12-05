import React, { Component } from 'react';
import GetAPI from '../APIs/GetAPI';
import { Container, Col, Fade, Row } from 'reactstrap'
import { Link } from 'react-router-dom'


class NewsFeed extends Component {
    state = {
        posts: [],
        isLoading: true
    }

    render() {
        return (
            <Fade in={!this.state.isLoading}>
                <Container>
                    <Row>
                        <Col className="mx-auto">
                            <Row>
                                <Col className="create-news-feed">
                                    <Link to="/">
                                        <i className="fas fa-edit"></i>
                                        <h3>Create a new</h3>
                                    </Link>
                                </Col>
                            </Row>
                            {this.state.posts
                                .map((post, index) =>
                                    <Row key={index} className="news-feed">
                                        <Col>
                                            <Link to={"/profile/" + post.username}>
                                                <img className="newsfeed-pic" src={post.image} alt="profile pic" />
                                                <span style={{ color: 'black', padding: '10px', fontWeight: '600' }}>{post.name}{" "}{post.surname}</span>
                                            </Link>
                                            {post._edit &&
                                                <i className="fa fa-pencil"></i>}
                                            <p style={{ paddingTop: '20px' }}>{post.text}</p>
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
                post.image = profile.image
                :
                post.image = "https://www.shareicon.net/data/512x512/2015/10/02/649910_user_512x512.png"
            this.setState({
                posts: [...this.state.posts, post],
                isLoading: false
            })
        })
    }
}

export default NewsFeed;