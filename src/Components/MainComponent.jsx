import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./HomePage";
import { Alert, Form, Input, Container } from 'reactstrap'


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
            <Route to="/home" render={() => <HomePage username={this.state.user} password={this.state.pass} />} />
            : <>
              <Container>
              {this.state.wrongPass && <Alert color="danger">The username/password is incorrect!</Alert>}
                <Form onSubmit={this.getCredentials}>
                  <Input id="username" type="text" />
                  <Input id="password" type="password" />
                  <Input type="submit" value="Log In" />
                </Form>
                </Container>
            </>
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
