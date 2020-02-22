import React, { Component } from 'react';
import { Alert, Form, Input, Container, Row, Fade } from 'reactstrap'
 import { BrowserRouter as Router, Route, Switch, Link }  from 'react-router-dom';




class SignUp extends Component {
    state ={
        email:"",
        password:"",
        firstname:"",
        surname:"",
        city:"",
        
    }
    render() {
        return (
            <div className=" mx-auto mt-5 " style={{background:"#016197"}}>
                <Container >
                  <Row>
                    <img className="mx-auto" style={{ display: 'block' }} width="30%" src="https://seeklogo.net/wp-content/uploads/2017/01/linkedin-logo-512x512.png" alt="logo" />
                  </Row>
                  <h1 className="text-center text-white">Make the most of your professional life!</h1>
                  {this.state.wrongPass && <Alert color="danger">The Email/password is incorrect!</Alert>}
                  <Form onSubmit={this.getCredentials}>
                    <Input className="login-input" id="username" type="text" placeholder="Email" />
                    <Input className="login-input" id="password" type="password" />
                   
                    <Input className="btn btn-primary" type="submit" value="Join" />
                    
                  </Form>
                  <p className="text-center"><small>Already on LinkedIn? </small>
                  <Link to="/login" className="font-weight-bolder">Sign In</Link>
                  </p>
                </Container>
              </div>
        );
    }
}

export default SignUp;