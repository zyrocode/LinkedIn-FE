import React, { Component } from 'react';
import FetchByNewsFeed from '../APIs/FetchByNewsFeed';
import { Container, Row } from 'reactstrap'

class NewsFeed extends Component {
    state = {
        posts: [],
        users: []
    }

    render() {
        return (
<>
            {
                this.state.posts
                    .map((post, index) =>        
                        <Container key={index} className="profile">
                            <Row>
                                <img src="{}"/>
                                <h1>{post.username}</h1>
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
            let profile = await FetchByNewsFeed(this.props.username, this.props.password, oneUser)
            console.log(profile)
            this.setState({
                users: [...this.state.users, profile]
            })
        })
        this.setState({
            posts: posts
        })
        console.log(this.state.users)
    }
}

export default NewsFeed;