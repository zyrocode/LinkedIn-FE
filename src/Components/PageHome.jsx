import React, { Component } from 'react'
import { Fade } from 'reactstrap'
import NavBar from './SectionNavBar'
import PageLoading from './PageLoading'
import NewsFeed from './SectionNewsFeed'


class PageHome extends Component {
    state = {
        isLoading: true
    }
    render() {
        return (
            <>
                <Fade in={!this.state.isLoading}>
                    <NavBar />
                    <NewsFeed />
                </Fade>
            </>)
    }
    componentDidMount = () => {
        this.setState({
            isLoading: false
        })

    }

}

export default PageHome;