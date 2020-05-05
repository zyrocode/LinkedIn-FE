import React, { Component } from 'react';
import RatingsAvatar from './RatingsAvatar';
import GetAPI from "../APIs/GetAPI"
import { connect } from "react-redux"
import { Like, unLike } from "../APIs/LikeAPI"

//({ postId, userId, details:{ userToken }, details }) --> props
//localStorage.getItem("userId")
const mapStateToProps = state => state

class RatingsComponent extends Component  {

state = {
    allLikes:[],
    likedByUser: false,
    numberOfLikes: 0,
    isLoading: true,
    postLikeImg: false,
    checkIsLiked: true
}






fetchAllLikes = async()=>{
    const  { postId, userId, details: { userToken}, details } = this.props
    const resp =  await GetAPI(details.username, userToken, "likes", "", postId, userId)
    if(resp){
        if (!resp.length) {
            this.setState({
                allLikes: [],
                likedByUser: false,
                numberOfLikes: this.state.numberOfLikes,
                isLoading:this.state.isLoading
    
            })
        }

      

            const {reactionsCount, isLikedByUser, postInfo: { reactions } } = resp
            
            this.setState({
                allLikes: reactions,
                 likedByUser: isLikedByUser,
                numberOfLikes:reactionsCount,
                isLoading:false,
                checkIsLiked: isLikedByUser
    
            })
       

        

    } else{
       
        this.setState({
            allLikes: [],
             likedByUser: false,
            numberOfLikes: this.state.numberOfLikes,
            isLoading:this.state.isLoading

        })
    }

    this.setState({
        postLikeImg: true
    })

    }


 
    
    render (){
    //    const style1 = {
    //     color:"#1586BD"
    //    }
    //    const style2 = {
    //     color:"black"
    //    }

    return ( <>
   
        <hr className="m-1"/>
      
        {/* addLike */}

        {/* <i  className= { this.state.likedByUser ? " fa fa-thumbs-up postButtons" : "fa fa-thumbs-o-up postButtons" } style={{fontSize:"1.7em", color:"#1586BD"}} 
        onClick={()=> this.setState({ postLike: !this.state.postLike}),
        this.handleLikeButton }

        ></i> 
        <span style={this.state.likedByUser
        ? style1:style2 }>{this.state.likedByUser ? "Liked" : "Like"} </span> */}

       {this.state.likedByUser && <>
        
           <span className="text-black-50"  onClick={ this.handleDeleteLike}>
                <i  
                    className=" fa fa-thumbs-up postButtons" style={{fontSize:"1.7em", color:"#1586BD"}}> </i> <span style={{color:"#1586BD"}}>Liked </span>
           </span>
        </>}

        { !this.state.likedByUser &&
        <>   <span onClick={this.handleLikeButton}  className="text-black-50" > 
        <i  
        className="fa fa-thumbs-o-up postButtons" style={{fontSize:"1.7em",color:"#1586BD"}} ></i> <span className="text-black-50">Like </span> </span></>}



        {/* &nbsp;&nbsp;
        <span className="text-black-50"><i className="fa fa-thumbs-o-up postButtons" style={{color:"red"}}></i> like </span> */} 
        
        &nbsp;  &nbsp; <span></span>
        

        {this.state.postLikeImg && this.state.allLikes.length > 0 ?  <RatingsAvatar    allLikes = { [ ...this.state.allLikes]} {...this.state.numberOfLikes} /> : null} 

        
      
        
<br/>
        
    </>) ;
    }
   

    componentDidMount = async()=>{
        await this.fetchAllLikes()
        // this.setState({
        //     isLikedByUser: this.state.checkIsLiked
        // })
        }

        componentDidUpdate=async (prevProps, prevState)=>{
            if(prevState.numberOfLikes !== this.state.numberOfLikes){
                await this.fetchAllLikes()
            }
        }
        
        
        handleDeleteLike =async()=>{
            this.setState({
                likedByUser: !this.state.isLikedByUser
            })
            const  { postId, details: { userToken}, details } = this.props
        
                const response = await unLike (postId, details.username, userToken)
        
                if (response){
                    await this.fetchAllLikes()
                }
              
        
            
        
        
        }
        handleLikeButton =async()=>{
            this.setState({
                likedByUser: !this.state.isLikedByUser
            })
            const  { postId, details: { userToken}, details } = this.props
          
                const response = await Like (postId, details.username, userToken)
        
                if (response){
                    
                    await this.fetchAllLikes()
                }
              
        
        
        
        
        }
        



   
};

export default connect(mapStateToProps) (RatingsComponent);