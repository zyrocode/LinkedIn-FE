import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";
import PageHome from "./PageHome";
import { Alert, Form, Input, Container, Row, Fade } from "reactstrap";
import PageProfile from "./PageProfile";
import PageLoading from "./PageLoading";
import NavBar from "./SectionNavBar";
import SignUp from "./SignUp";
import CallbackComponent from "./CallbackComponent";
import Login from "./Login";
import { connect } from "react-redux";
import PrivateRoute from "./PrivateRoute";
import NotFound from "./NotFound";
import { loginWithThunk } from "../action/index";
import RefreshTokenAPI from "../APIs/RefreshAPI";

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  setUserToken: (t, u) => dispatch(loginWithThunk(t, u))
});

// const mapDispatchToProps = dispatch => ({
//   setUserToken: base64 =>
//     dispatch({
//       type: "SET_USERBASE64",
//       payload:base64

//     })
// });

// const mapDispatchToProps = dispatch => ({
//   setUserToken: base64 =>
//     dispatch({
//       type: "SET_USERBASE64",
//       payload: {
//         token:base64.access_token,
//         user:base64.user.username,

//       }
//     })
// });

class MainComponent extends Component {
  state = {
    logged: undefined,
    wrongPass: false,
    isLoading: false,
    signup: false,
    userToken: null
  };
  defaultIsLoading = () => {
    this.setState({
      isLoading: true
    });
    setTimeout(() => {
      this.setState({
        isLoading: false
      });
    }, 1000);
  };

  render() {
    return (
      <>
        {this.state.isLoading && <PageLoading />}
        <Router>
          <Fade>

          {this.props.details.userToken && (
                <>
                  <NavBar logout={this.logout} />
                </>
              )}
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

             

              <PrivateRoute
                exact
                path="/newsfeed"
                component={PageHome}
                isAuthenticated={this.props.details.userToken}
              />

              <PrivateRoute
                
                exact path="/profile/:username"
                component={PageProfile}
                isAuthenticated={this.props.details.userToken}
              />

            <PrivateRoute       
                 path="/profile"
                component={PageProfile}
                isAuthenticated={this.props.details.userToken}
              />

              <Route
                exact
                path="/"
                render={() => <Redirect to="/newsfeed" />}
              />

            
              {/* <Route
               
                path="*"
                render={() => <Redirect to="/newsfeed" />}
              /> */}

              {/* <Route path="/login">
                <Login removeIsLoading={this.defaultIsLoading} />
              </Route> */}
              {!this.props.details.userToken && (
                <>

                  <Switch>
                    <Route exact path="/login">
                      <Login exact removeIsLoading={this.defaultIsLoading} />
                    </Route>
  
                    <Route exact path="/register">
                      <SignUp />
                      </Route> 
  
                    <Route exact path="/callback" component={CallbackComponent} />
                  
                   <Route path="*">
                   <NotFound />
                 </Route>
                  </Switch>

               
               </>
              )}
             

              {/* <Route exact path="/" render={() => (
            localStorage.getItem("access_token") || this.props.userToken ? 
               <Redirect to="/home"/>
                     : 
                     <>
                     <Route path="/login">
                       <Login removeIsLoading={this.defaultIsLoading} />
                     </Route>
                     <Route path="/register" component={SignUp} />
                     <Route path="/callback" component={CallbackComponent} />
                   </>
                  
            )}/> */}

              {/* {localStorage.getItem("access_token") || this.props.details.userToken ? (
                <Redirect to="/newsfeed" />
              ) : (
                <>
                  <Switch>
                    <Route path="/login">
                      <Login removeIsLoading={this.defaultIsLoading} />
                    </Route>
                    <Route path="/register" component={SignUp} />
                    <Route path="/callback" component={CallbackComponent} />
                    <Route path="*"><NotFound /> </Route>
                  </Switch>
                </>
              )} */}
            </Switch>
          </Fade>
        </Router>
      </>
    );
  }

  // UNSAFE_componentWillMount = async () => {
  //   const token = await localStorage.getItem("access_token");
  //   const seessionToken = await sessionStorage.getItem("access_token");

  //   token || seessionToken
  //     ? token
  //       ? await this.props.setUserToken(token)
  //       : await this.props.setUserToken(seessionToken)
  //     : console.log("no token to mount");
  // };

  // componentWillUnmount =()=>{
  //   sessionStorage.clear()
  // }
  // componentWillUnmount=()=>{
  //   console.log("will unmount")
  // }

  // componentDidUpdate=()=>{
  //   // if(this.prevProps.userToken != this.props.userToken)
  //   console.log("did update" )
  // }

  componentDidMount = async () => {
    // console.log("did mount")
    const access_token = localStorage.getItem("access_token");

    const sessionToken = sessionStorage.getItem("access_token");

    if (access_token || sessionToken) {
      const userJson = await RefreshTokenAPI(access_token || sessionToken);
     
      if(!userJson) {
        delete localStorage["access_token"]
        delete sessionStorage["access_token"]
        delete sessionStorage["userId"]
        delete localStorage["userId"]
        delete localStorage["username"]
        delete sessionStorage["username"] 

      }
      else{

        await this.props.setUserToken(
          userJson.access_token,
          userJson.user.username
        ) 
        // await  this.props.setUserToken(access_token||sessionToken, localUser || sessionUser)
        localStorage.setItem("access_token", userJson.access_token);
        localStorage.setItem("username", userJson.user.username);
        localStorage.setItem("userId",userJson.user._id )
        this.defaultIsLoading();
      } 

      //  if(access_token){
      //     const userJson = await RefreshTokenAPI (access_token)
      //     await  this.props.setUserToken(userJson.access_token, userJson.user.username)
      //     localStorage.setItem("access_token", userJson.access_token)
      //     this.defaultIsLoading()
      //   }
      //     else{
      //       const userJson = await RefreshTokenAPI (sessionToken)
      //        await  this.props.setUserToken(userJson.access_token, userJson.user.username)
      //        sessionStorage.setItem("access_token", userJson.access_token)
      //        this.defaultIsLoading()
      //     }
    }
    //else
    else {
      await this.props.setUserToken(null, null);
      delete localStorage["access_token"];
      delete sessionStorage["access_token"];
      delete sessionStorage["userId"];

    }

    // if (access_token) {
    //   const response = await RefreshTokenAPI (access_token)
    //   if (response) {
    //     const userJson = await response;
    //    await  this.props.setUserToken(userJson.access_token, userJson.user.username);
    //     this.setState({ userToken: userJson.access_token });
    //     localStorage.setItem("access_token", userJson.access_token);
    //     localStorage.setItem("username", userJson.user.username);

    //     this.defaultIsLoading();

    //     console.log("token was ok, refreshed");
    //   } else {
    //     delete localStorage["access_token"];
    //     delete localStorage["username"];
    //     console.log("token was expired, removed");
    //   }
    // } else {
    //   this.props.setUserToken();
    // }

    document.title = "LinkedIn";
    var link = document.querySelector("link[rel='icon']");
    link =
      "https://techcrunch.com/wp-content/uploads/2014/02/linkedin_logo.png";
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
    sessionStorage.clear();
    localStorage.clear();
    this.props.setUserToken();
    
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
