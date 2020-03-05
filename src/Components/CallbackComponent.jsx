import React from "react"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"
import Loading from "./PageLoading"



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
        
        
            this.state.infoVerified ? 
            <div><h1>Email Verified...go to <Link to ="/login">Home Page</Link> and sign in</h1> </div>
        
        
            : (this.state.isLoading && <Loading />)
    


        )
    }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CallbackComponent))