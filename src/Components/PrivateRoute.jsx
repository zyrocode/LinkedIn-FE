import React from "react"
import { Route, Redirect, withRouter } from "react-router-dom"
// import { connect } from "react-redux";





const PrivateRoute = ({ component: Component, ...rest}) => (
   
    <Route {...rest} render={(props) =>
        
                 rest.isAuthenticated
                ? (<Component {...props} />)
                : (<Redirect to={{pathname:"/login" }}/>)
        // {
        //     if (!rest.isAuthenticated)
        //         props.history.push("/login")
        //     return <Component {...props}/>
        // } 

        //yourwebsite.com/recover/?123asidjuidnc1iowuc901wbcaowsciba
        // ==> mongo, recover the user linked to that code 
        // create a new token for that user generateToken({ _id. ....})
    }/>
    
        ) 


export default PrivateRoute