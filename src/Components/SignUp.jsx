import React, { Component } from 'react';
import { Alert, Form, Input, Container, Row, Fade, Col, FormGroup, Label } from 'reactstrap'
 import { BrowserRouter as Router, Route, Switch, Link }  from 'react-router-dom';
// import { FacebookFilled } from '@ant-design/icons';
import PostAPI from "../APIs/PostAPI"



class SignUp extends Component {
    state ={
      email:"",
      password:"",
      firstname:"",
      surname:"",
      area:"",
      title:"",
      username:"",
      isSignedUp: false
        
    }
    render() { 
        return (
          <Fade>
            <Container fluid style={{minHeight: "100vh", background:"#016197"}}>
              <div className=" mx-auto  ">
             <Link to="/login"> <img className="mx-auto" style={{ display: 'block' }} width="17%" src="https://seeklogo.net/wp-content/uploads/2017/01/linkedin-logo-512x512.png" alt="logo" /></Link>
                    <Row>
                      
                      <Col>
                       <Container className=" mx-auto" style={{maxWidth:" 45%"}}>

                        {
                          this.state.isSignedUp ? <> <h6 className="text-center text-white ">Go to your email and confirm your account</h6> 
                          <p className="text-center"><small>Already on LinkedIn? </small>
                          <Link to="/login" className="font-weight-bolder">Sign In</Link>
                          </p> </>: <>
                       


                          <h4 className="text-center text-white font-weight-lighter">Make the most of your professional life!</h4>
                          {this.state.wrongPass && <Alert color="danger">The Email/password is incorrect!</Alert>}
                          <div className="form-register">
                            <Form onSubmit={this.signUpInfos}>
                            <Row form>
        <Col md={6} className="pr-3">
          <FormGroup>
          <Label for="text" className="ml-3">Firstname </Label>
          <Input className="login-input p-1 mt-0 ml-3"  type="text"  required  value={this.state.firstname} onChange={e => this.setState({firstname : e.currentTarget.value})}/>
          </FormGroup>
        </Col>
        <Col md={6} className="pr-3">
          <FormGroup>
          <Label for="text" className="ml-3">Surname</Label>
           <Input className="login-input p-1 mt-0 ml-0"  type="text" required  value={this.state.surname} onChange={e => this.setState({surname : e.currentTarget.value})}/>
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
                              <Label for="title" className="ml-3">Current Position</Label>
                              <Input className="login-input p-1 mt-0 "  type="text" placeholder="Ex. Software Engineer"  value={this.state.title} onChange={e => this.setState({title : e.currentTarget.value})}/>
                              </FormGroup>


      <Row form>
        <Col md={6} className="pr-3">
          <FormGroup>
          <Label for="text" className="ml-3">Username </Label>
          <Input className="login-input p-1 mt-0 ml-3"  type="text" required value={this.state.username} onChange={e => this.setState({username : e.currentTarget.value})}/>
          </FormGroup>
        </Col>
        <Col md={6} className="pr-3">
          <FormGroup>
          <Label for="area" className="ml-3">City</Label>
           <Input className="login-input p-1 mt-0 ml-0"  type="city"  value={this.state.area} onChange={e => this.setState({area : e.currentTarget.value})}/>
          </FormGroup>
        </Col>
      </Row>

                            <FormGroup>
                              <Label for="Email" className="ml-3">Email</Label>
                              <Input className="login-input p-1 mt-0 "  type="email" placeholder="Email" required value={this.state.email} onChange={e => this.setState({email : e.currentTarget.value})}/>
                              </FormGroup>

                              <FormGroup>
                              <Label for="password" className="ml-3">Password (6 or more characters)</Label>
                              <Input className="login-input p-1 mt-0 "  type="password" required value={this.state.password} onChange={e => this.setState({password : e.currentTarget.value})}/>
                              </FormGroup>
                              <h6 className="text-center mx-auto agreement" >By clicking Agree &amp; Join, you agree to this LinkedIn Mockup User Agreement. Your information remains confidential and would not be shared with a third party.</h6>
                              <Input className="btn btn-primary font-weight-bold" type="submit" value="Agree &amp; Join" />
                              
                            
                            <div className="separator">or</div>
                            <div className="btn btn-primary font-weight-bold " style={{width: "90%",
    marginLeft: "4%"}}>
                            <span className="spanbutton"> <span className="fa spanbutton"> &#xf09a;</span> &nbsp; Continue With Facebook</span>
                            </div>

                           
                            </Form> 

                         
                            <p className="text-center"><small>Already on LinkedIn? </small>
                          <Link to="/login" className="font-weight-bolder">Sign In</Link>
                          </p>
                          </div>
                          </>}
                          
                       </Container>
                      </Col>
                   
                    </Row>
                   
                
                </div>
            </Container>
            </Fade>
        );
    }


    signUpInfos = async(e) => {

      e.preventDefault()

      const { email,password,firstname,surname,area, title, username } = this.state
      let objectToCreate = {
        email,password,firstname,surname,area, title, username
      }

     // we are destructuring since they have the same label; eg,. username: username

     const resp = await PostAPI (" ", " ", "register", objectToCreate)
      console.log("resp,", resp)
     if(resp)
     this.setState({
      isSignedUp: true

     })

    };
}

export default SignUp;