import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import PageHome from "./PageHome";
import { Alert, Form, Input, Container, Row, Fade } from "reactstrap";
import PageProfile from "./PageProfile";
import GetAPI from "../APIs/GetAPI";
import PageLoading from "./PageLoading";
import NavBar from "./SectionNavBar";
import SignUp from "./SignUp";
import CallbackComponent from "./CallbackComponent";
import Login from "./Login";
import { connect } from "react-redux";
import PrivateRoute from "./PrivateRoute";

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  setUserToken: base64 =>
    dispatch({
      type: "SET_USERBASE64",
      payload: base64
    })
});

class MainComponent extends Component {
  state = {
    logged: undefined,
    wrongPass: false,
    isLoading: false,
    signup: false,
    userToken: null
  };
  defaultIsLoading=()=>{
    this.setState({
      isLoading: true
    })
    setTimeout(() => {
      this.setState({
        isLoading: false
      })
    }, 1000);
  }

  render() {

    console.log("redux",this.props.userToken)
    console.log("state",this.state.userToken)
    console.log("local",localStorage.getItem("access_token"))
    return (

      <>
      { this.state.isLoading &&
        <PageLoading /> }
      <Router>


        {/* 
                  <Fade>
                    <NavBar logout={this.logout} />
                    <Route path="/" exact component={PageHome} />
                    <Route path="/profile/:user" component={PageProfile} />
                  </Fade> */}

        {/* {this.props.userToken ? 
          this.state.isLoading ? 
          <PageLoading />:
          <Fade>
            <NavBar logout={this.logout} />
            <Route path="/home" component={PageHome} />
            <Route path="/profile/:user" component={PageProfile} />
          </Fade>
        :  ( <Login removeIsLoading={this.defaultIsLoading}/>)} */}

        <Switch>
          {/* 
          <Route path="/register">
          
           <SignUp/>
          </Route>

          <Route path="/login" >
          <Login removeIsLoading={this.defaultIsLoading}/>
          </Route>


          <Route path="/callback" component={CallbackComponent}>
          <CallbackComponent />  
          </Route>

          <PrivateRoute
            isAuthenticated={this.props.userToken}
            path="/profile"
            component={PageProfile}
          />

          <PrivateRoute
            isAuthenticated={this.props.userToken}

            // exact path="/" render={() => <Redirect to="/home" />}

            exact path="/home"
            component={PageHome}
          />
       */}


          {/* <Route exact path = "/" component={()=>"/ router"} /> */}

            

            <PrivateRoute exact path="/" component={PageHome} isAuthenticated={this.props.userToken || localStorage.getItem("access_token") }/>
            <PrivateRoute exact path="/profile" component={PageProfile} isAuthenticated={this.props.userToken || localStorage.getItem("access_token")}/>
            <Route path="/login">
            <Login removeIsLoading={this.defaultIsLoading}/>
            </Route>
            <Route path="/register" component={SignUp} />
            <Route path="/callback" component={CallbackComponent} />
          
            <Route path = "*" component={()=>"404 Not Found"} />
           



            </Switch> 
      </Router>
      </>
    );
  }

  componentDidMount = async () => {
    const access_token = localStorage.getItem("access_token"); 
    if (access_token) {
     
      const response = await fetch(
        "http://app-be.azurewebsites.net/users/refresh",
        {
          
          headers: {
            Authorization: "Bearer " + access_token
          },
          method: "POST"
        }
      );

      if (response.ok) {
    
        const userJson = await response.json();
        this.props.setUserToken(userJson.access_token);
        this.setState({userToken: userJson.access_token})
        localStorage.setItem("access_token", userJson.access_token);
        localStorage.setItem("username", userJson.user.username);

        this.defaultIsLoading()
     
        console.log("token was ok, refreshed");
      } else {
      
        delete localStorage["access_token"];
        delete localStorage["username"];
        console.log("token was expired, removed");
      }

      document.title = "LinkedIn";
      var link = document.querySelector("link[rel='icon']");
      link =
        "https://techcrunch.com/wp-content/uploads/2014/02/linkedin_logo.png";
    }
    // if (localStorage.getItem('username')) {
    //   let response = await GetAPI(localStorage.getItem('username'), localStorage.getItem('password'))
    //   response ? this.setState({ logged: true }) : this.setState({ logged: false })
    // }
    // else
    //   this.setState({ logged: false })

    // setTimeout(() => {
    //   this.setState({
    //     isLoading: false
    //   })
    // }, 2000);
    // document.title = "LinkedIn"
    // var link = document.querySelector("link[rel='icon']")
    // link = 'https://techcrunch.com/wp-content/uploads/2014/02/linkedin_logo.png'
  };

  // getCredentials = async e => {
  //   e.preventDefault();
  //   let username = document.querySelector("#username").value;
  //   let password = document.querySelector("#password").value;
  //   let response = await GetAPI(username, password);
  //   localStorage.setItem("username", username);
  //   localStorage.setItem("password", password);
  //   response
  //     ? this.setState({ logged: true })
  //     : this.setState({ wrongPass: true });
  // };

  logout = () => {

    delete localStorage["username"]

    delete localStorage["access_token"];
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
