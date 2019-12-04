import React, { Component } from 'react'
import { Fade } from 'reactstrap'
import NavBar from './NavBar'
import PageLoading from './PageLoading'
import ProfileComponent from './ProfileComponent'
import ExperienceComponent from './ExperienceComponent'
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
                    <NavBar username={this.props.username} password={this.props.password}/>
                    <ProfileComponent username={this.props.username} password={this.props.password}/>
                    <ExperienceComponent  username={this.props.username} password={this.props.password}/>
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