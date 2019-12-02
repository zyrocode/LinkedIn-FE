import React, { Component } from 'react';
import ProfileComponent from "./ProfileComponent"
import UpdateUser from "./UpdateUser"


class HomePage extends Component {
    state = {  }
    render() { 
        return (<>
        
        <h1>Hello World</h1>
        < ProfileComponent />
        
        {/* <UpdateUser /> */}
        
        </>  );
    }
}
 
export default HomePage;