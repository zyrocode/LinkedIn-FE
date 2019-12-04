import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./HomePage";
import { Alert, Form, Input, Container, Row } from 'reactstrap'
import ProfilePage from './ProfilePage'
import MyProfilePage from './MyProfilePage'


class MainComponent extends Component {

  state = {
    logged: false,
    wrongPass: false,
    user: undefined,
    pass: undefined
  }

  render() {
    return (
      <>
        <Router>
          {this.state.logged
            ?
            <Switch>
              <Route path="/" exact render={() => <HomePage username={this.state.user} password={this.state.pass} />} />
              <Route path="/profile" exact render={() => <MyProfilePage username={this.state.user} password={this.state.pass} />} />
              <Route path="/profiles/:user" render={() => <ProfilePage username={this.state.user} password={this.state.pass} />} />
            </Switch>
            : <div className="login-form mx-auto mt-5">
              <Container>
                <Row>
                  <img className="mx-auto" style={{display: 'block' }} width="30%" src="https://brand.linkedin.com/etc/designs/linkedin/katy/global/clientlibs/img/default-share.png" alt="logo" />
                </Row>
                  <h1 className="text-center">WELCOME TO LINKEDIN!</h1>
                {this.state.wrongPass && <Alert color="danger">The username/password is incorrect!</Alert>}
                <Form onSubmit={this.getCredentials}>
                  <Input className="login-input" id="username" type="text" />
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
    await this.setState({
      user: username,
      pass: password
    })
    let response = await fetch("https://strive-school-testing-apis.herokuapp.com/api/profile/", {
      method: "GET",
      headers: {
        "Authorization": "Basic " + btoa(`${username}:${password}`),
        "Content-Type": "application/json"
      }
    })

    response.ok ? this.setState({ logged: true }) : this.setState({ wrongPass: true })
  }
}

export default MainComponent;
