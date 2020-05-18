import React from "react"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"
import Loading from "./PageLoading"
import { Container, Col, Row, Fade } from "reactstrap"



const mapStateToProps = state => state
const mapDispatchToProps = dispatch => ({
    setUserToken: base64 => dispatch({
      type:"SET_USERBASE64",
      payload: base64
    }) 
  })
  

class CallbackComponent extends React.Component{

        state={
            infoVerified: false,
            isLoading: false
        }


    componentDidMount = () => {
        const search = document.location.search;
        if (search && search.includes("access_token")){
            const accessToken = search.split("=")[1];
            this.props.setUserToken(accessToken)
            localStorage.setItem("access_token", accessToken)
            this.props.history.push("/newsfeed")

            this.setState({
                isLoading:true
            })


        setTimeout(() => {
            this.setState({
                isLoading:false
            })
        }, 3000);


        }

        else{
            if (search && search.includes("confirm")){
                this.setState({
                    infoVerified:true
                })
            }
        }
    }

    render () {
        return (
            <Fade>
        
           { this.state.infoVerified  && 
           
            

            <>
            <Container fluid style={{minHeight: "100vh", background:"#016197"}}>
              <div className=" mx-auto  ">
             <Link to="/login"> <img className="mx-auto" style={{ display: 'block' }} width="17%" src="https://seeklogo.net/wp-content/uploads/2017/01/linkedin-logo-512x512.png" alt="logo" /></Link>
                    <Row>
                      
                      <Col>
                       <Container className=" mx-auto" style={{maxWidth:" 45%"}}>

                        
                           <h6 className="text-center text-white ">Email Verified...go to <Link to ="/login">Login Page</Link> and sign in</h6> <br/>
                          <p className="text-center"><small>Already on LinkedIn? </small>
                          <Link to="/login" className="font-weight-bolder">Sign In</Link>
                          </p> 
                          
                       </Container>
                      </Col>
                   
                    </Row>
                   
                
                </div>
            </Container>

            </>}
            











        
           { this.state.isLoading && <Loading /> }
    


            </Fade> )
    }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CallbackComponent))