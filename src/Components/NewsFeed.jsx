import React, { Component } from 'react';
import FetchByNewsFeed from '../APIs/FetchByNewsFeed';
import FetchUserByNewsFeed from '../APIs/FetchUserByNewsFeed';
import { Container, Col, Row } from 'reactstrap'
import { Link } from 'react-router-dom'
<<<<<<< HEAD

=======
>>>>>>> 9b7eaab95f8e0011c4ce9f4a53ee661ea7746e30

class NewsFeed extends Component {
    state = {
        posts: []
    }

    render() {
        return (
            <>
<<<<<<< HEAD
                {this.state.posts
                    .map((post, index) =>
                        <Container key={index} className="profile">
                            <Row>
                                <Link to={"/profile/"+ post.username}><img className="newsfeed-pic" src={post.image} alt="profile pic" />
                                <h5>{post.name}{" "}{post.surname}</h5></Link>
                            </Row>
                            <Row>
                                <p>{post.text}</p>
                            </Row>
                        </Container>
                    )
                }
=======
                <Container>
                    <Col md="8" className="mx-auto">
                        <Col className="create-news-feed">
                            <Link to="/">
                                <i className="fas fa-edit"></i>
                                <h3>Create a new</h3>
                            </Link>
                        </Col>

                        {this.state.posts
                            .map((post, index) =>
                                <div key={index} className="news-feed">
                                    <Link to={"/profiles/" + post.username}><img className="newsfeed-pic" src={post.image} alt="profile pic" />
                                        <span style={{color: 'black', padding: '10px', 'font-weight': '600'}}>{post.name}{" "}{post.surname}</span>
                                    </Link>
                                    {post._edit &&
                                        <i className="fa fa-pencil"></i>}
                                    <p style={{'padding-top': '20px'}}>{post.text}</p>
                                    <hr />
                                    <i className="fas fa-thumbs-up"></i>
                                    <i className="fas fa-comment"></i>
                                </div>)
                        }
                    </Col>
                </Container>
>>>>>>> 9b7eaab95f8e0011c4ce9f4a53ee661ea7746e30
            </>
        );
    }

    componentDidMount = async () => {
        let posts = await FetchByNewsFeed(this.props.username, this.props.password)
        posts.forEach(async post => {
            let oneUser = post.username
            let profile = await FetchUserByNewsFeed(this.props.username, this.props.password, oneUser)
            post.name = profile.name
            post.surname = profile.surname
            if (this.props.username === post.username)
                post._edit = "true"
            profile.image
                ?
                post.image = profile.image
                :
                post.image = "https://www.shareicon.net/data/512x512/2015/10/02/649910_user_512x512.png"
            this.setState({
                posts: [...this.state.posts, post]
            })
        })

        console.log(posts)
    }
}

export default NewsFeed;