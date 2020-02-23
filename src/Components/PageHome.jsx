import React, { Component } from "react";
import { Fade } from "reactstrap";
import NewsFeed from "./SectionNewsFeed";
import { Route } from "react-router-dom";

class PageHome extends Component {
  state = {
    isLoading: true
  };
  render() {
    return (
      <>
        <Fade in={!this.state.isLoading}>
         
            <NewsFeed />
     
        </Fade>
      </>
    );
  }
  componentDidMount = () => {
    this.setState({
      isLoading: false
    });
  };
}

export default PageHome;
