import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PageHome from './PageHome';
import { Alert, Form, Input, Container, Row } from 'reactstrap'
import PageProfile from './PageProfile'
import GetAPI from '../APIs/GetAPI';
import PageLoading from './PageLoading'
import NavBar from './SectionNavBar'


class MainComponent extends Component {

  state = {
    logged: false,
    wrongPass: false,
    isLoading: true
  }

  render() {
    return (
      <>
        <Router>
          {this.state.logged
            ?
            <Switch>
              {this.state.isLoading && <PageLoading />}
              {!this.state.isLoading &&
                <>
                  <NavBar />
                  <Route path="/" exact component={PageHome} />
                  <Route path="/profile/:user" component={PageProfile} />
                </>}
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

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({
        isLoading: false
      })
    }, 2000);
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
