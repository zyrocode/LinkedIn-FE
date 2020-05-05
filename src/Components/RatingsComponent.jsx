import React, { Component } from 'react';
import RatingsAvatar from './RatingsAvatar';
import GetAPI from "../APIs/GetAPI"
import { connect } from "react-redux"


//({ postId, userId, details:{ userToken }, details }) --> props
//localStorage.getItem("userId")
const mapStateToProps = state => state

class RatingsComponent extends Component  {

state = {
    allLikes:[],
    likedByUser: false,
    numberOfLikes: 0,
    isLoading: true
}


componentDidMount = async()=>{
await this.fetchAllLikes()

}

fetchAllLikes = async()=>{
    const  { postId, userId, details: { userToken}, details } = this.props
    const resp =  await GetAPI(details.username, userToken, "likes", "", postId, userId)
    if(resp){
        const {reactionsCount, isLikedByUser, postInfo: { reactions } } = resp
        
        this.setState({
            allLikes: reactions,
            likedByUser: isLikedByUser,
            numberOfLikes:reactionsCount,
            isLoading:false

        })

        

    } else{
       
        this.setState({
            allLikes: [],
            likedByUser: this.state.likedByUser,
            numberOfLikes: this.state.numberOfLikes,
            isLoading:this.state.isLoading

        })
    }

    }


 
    
    render (){
       

    return (
    <>
<hr className="m-1"/>
        <span className="text-black-50" > <i className="  fa fa-thumbs-up postButtons" style={{fontSize:"1.7em", color:"#1586BD"}}></i> <span style={{color:"#1586BD"}}>Like </span> 

        {/* &nbsp;&nbsp;
        <span className="text-black-50"><i className="fa fa-thumbs-o-up postButtons" style={{color:"red"}}></i> like </span> */} 
        
        &nbsp;  &nbsp; <span></span>

        {this.state.allLikes.length > 0 ?  <RatingsAvatar    allLikes = { [ ...this.state.allLikes]} {...this.state.numberOfLikes} /> : null} 

        
        </span> 

<br/>
        
    </>) ;
    }
   
   
};

export default connect(mapStateToProps) (RatingsComponent);