import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./HomePage";
import { Alert, Form, Input, Container, Row } from 'reactstrap'
import ProfilePages from './ProfilePages'
import MyProfilePage from './MyProfilePage'
import GetAPI from "../APIs/GetAPI";


class MainComponent extends Component {

  state = {
    logged: false,
    wrongPass: false,
  }

  render() {
    /* // Save data to localStorage
    localStorage.setItem('username', this.state.user);
    /* Get saved data from localStorage  */
    /* localStorage.getItem('username') */ 


    return (
      <>
        <Router>
          {this.state.logged
            ?
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/profile" exact component={MyProfilePage} />
              <Route path="/profile/:user" component={ProfilePages} />
            </Switch>
            :
            <div className="login-form mx-auto mt-5">
              <Container>
                <Row>
                  <img className="mx-auto" style={{ display: 'block' }} width="30%" src="https://seeklogo.net/wp-content/uploads/2017/01/linkedin-logo-512x512.png" alt="logo" />
                </Row>
                <h1 className="text-center">WELCOME TO LINKEDIN!</h1>
                {this.state.wrongPass && <Alert color="danger">The username/password is incorrect!</Alert>}
                <Form onSubmit={this.getCredentials}>
                  <Input className="login-input" id="username" type="text" placeholder="Username" />
                  <Input className="login-input" id="password" type="password" />
                  <Input className="btn btn-primary" type="submit" value="Log In" />
                </Form>
              </Container>
            </div>
          }
        </Router>
      </>
    );
  }

  getCredentials = async (e) => {
    e.preventDefault();
    let username = document.querySelector("#username").value
    let password = document.querySelector("#password").value
    let response = await GetAPI(username, password)
    localStorage.setItem('username', username)
    localStorage.setItem('password', password)
    response ? this.setState({ logged: true }) : this.setState({ wrongPass: true })
  }
}

export default MainComponent;
