import React, { Component } from 'react'
import { Fade } from 'reactstrap'
import NavBar from './NavBar'
import PageLoading from './PageLoading'
import NewsFeed from './NewsFeed'


class HomePage extends Component {
    state = {
        isLoading: true
    }
    render() {
        return (  
            <>
                {this.state.isLoading && <PageLoading />}
                {!this.state.isLoading && <Fade in={!this.state.isLoading}>
                    <NavBar/>
                    <NewsFeed/>
                </Fade>}
            </>);
    }
    componentDidMount = () => {
        setTimeout(() => {
            this.setState({
                isLoading: false
            })
        }, 1000);
    }

}

export default HomePage;