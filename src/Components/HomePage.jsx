import React, { Component } from 'react'
import { Fade } from 'reactstrap'
import NavBar from './NavBar'
import PageLoading from './PageLoading'


class HomePage extends Component {
    state = {
        isLoading: true
    }
    render() {
        return (
            <>
                {this.state.isLoading && <PageLoading />}
                {!this.state.isLoading && <Fade in={!this.state.isLoading}><NavBar/>< ProfileComponent/></Fade>}
            </>);
    }
    componentDidMount = () => {
        setTimeout(() => {
            this.setState({
                isLoading: false
            })
        }, 1500);
    }

}

export default HomePage;