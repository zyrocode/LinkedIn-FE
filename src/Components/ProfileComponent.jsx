import React, { Component } from 'react';
import ProfileInfo from "./ProflieInfo";
import { Link } from "react-router-dom";


class ProfileComponent extends Component {
    state = { 
        id: ""
     }


    updateID =(newid)=>{
       this.setState({
           id: newid
       }) 
    }


    render() {
        
        
        return ( 
            <>
        <div className="container-fluid">
  <div className="row">
  <div className="col-12 col-sm-6 bg-success"> Hey1</div>

    <div className="w-100"></div>


{/* start of a secondRow */}
    <div className="col-12 col-sm-6 bg-secondary">
   <div className="row">
        <div className="col-11">
        <ProfileInfo updateID={this.updateID}/>
        
        </div>


        <div className="col-1">
       <Link to={`/updateUser/${this.state.id}`}>
            
            <i className="fa fa-pencil" style={{color:"#006097", background:"transparent"}}></i>
       </Link>
        </div>
   </div>
    </div>  {/* end of a secondRow */}
   
  </div>
</div>




</> );
    }
}
 
export default ProfileComponent;