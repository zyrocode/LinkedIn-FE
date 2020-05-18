import React from "react"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"
import Loading from "./PageLoading"
import { Container, Col, Row, Fade } from "reactstrap"
import { loginWithThunk } from "../action"


const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
    setUserAndToken : (token, username)=> dispatch (loginWithThunk(token, username))
})


// const mapDispatchToProps = dispatch => ({
//     setUserToken: base64 => dispatch({
//       type:"SET_USERBASE64",
//       payload: base64
//     }) 
//   })

  

class CallbackComponent extends React.Component{

        state={
            infoVerified: false,
            isLoading: false
        }


    componentDidMount = () => {
        let search = new URLSearchParams(this.props.location.search)
        const access_token = search.get("access_token")
        const userName = search.get("username")
        // const search = document.location.search;
        // if (search && search.includes("access_token"))
       
        if( access_token && userName ){
            console.log(access_token, userName)
            // const accessToken = search.split("=")[1];
            // this.props.setUserToken(accessToken)
            this.props.setUserAndToken(access_token,userName)
            localStorage.setItem("access_token", access_token)
            localStorage.setItem("username", userName)
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
            if (search && search.get("confirm")){
                this.setState({
                    infoVerified:true
                })
            }
        }
    }

    render () {
        return (<>

            { this.state.isLoading && <Loading /> }

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
            











        
          
    


            </Fade> 
            </>)
    }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CallbackComponent))