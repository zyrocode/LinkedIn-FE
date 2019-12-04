import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import { Alert, Form, Input, Container, Row } from 'reactstrap'
import ProfilePage from './ProfilePage'
import GetAPI from '../APIs/GetAPI';
import ProfilePages from './ProfilePages'


class MainComponent extends Component {

  state = {
    logged: false,
    wrongPass: false,
  }

  render() {
    return (
      <>
        <Router>
          {this.state.logged
            ?
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/profile/:user" component={ProfilePage} />
              {/* <Route path="/profiles/:user" component={ProfilePages} /> */}
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
