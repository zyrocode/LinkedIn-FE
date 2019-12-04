import React, { Component } from 'react';
import FetchByNewsFeed from '../APIs/FetchByNewsFeed';
import FetchUserByNewsFeed from '../APIs/FetchUserByNewsFeed';
import { Container, Row } from 'reactstrap'
import { Link } from 'react-router-dom'


class NewsFeed extends Component {
    state = {
        posts: []
    }

    render() {
        return (
            <>
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
            profile.image
                ?
                post.image = profile.image
                :
                post.image = "https://www.shareicon.net/data/512x512/2015/10/02/649910_user_512x512.png"
            this.setState({
                posts: [...this.state.posts, post]
            })
        })
    }
}

export default NewsFeed;