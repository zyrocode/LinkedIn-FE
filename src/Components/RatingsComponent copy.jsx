import React, { useState, useEffect } from 'react';
import RatingsAvatar from './RatingsAvatar';
import GetAPI from "../APIs/GetAPI"
import { connect } from "react-redux"
import "../module_css/index.css"

//localStorage.getItem("userId")
const mapStateToProps = state => state

const RatingsComponent = ({ postId, userId, details:{ userToken }, details }) => {

const [ allLikes, setAllLikes ] = useState()
const [ likedbyUser, setLikedbyUser ] = useState(false)
const [ numberOfLikes, setNumberOfLikes ] = useState(0)
const [ isLoading, setLoading ] = useState(true)



useEffect(()=>{
    const fetchAllLikes = async()=>{
   
    const resp =  await GetAPI(details.username, userToken, "likes", "", postId, userId)
    
    if(resp){
        const {reactionsCount, isLikedByUser, postInfo: { reactions } } = resp
        setAllLikes(reactions)
           setLikedbyUser(isLikedByUser)
           setNumberOfLikes(reactionsCount)
            setLoading(false)
        

    } else{
        setAllLikes([])
        setLikedbyUser(false)
        setNumberOfLikes(0)
        console.log(allLikes, "2before")
    }

        // const {reactionsCount, isLikedByUser, postInfo: { reactions } } = resp
    //    console.log(isLikedByUser)
        //   setAllLikes(reactions)
        //   setLikedbyUser(isLikedByUser)
        //   setNumberOfLikes(reactionsCount)
    
    
    


    }
    
    fetchAllLikes()
   
    console.log(allLikes, "before")

},[ details.username, isLoading, postId, userId, userToken])


    const mapppedObj = allLikes.map(a =>  a.likedBy.imageUrl)
    console.log(mapppedObj)
   
   
    return (
    <>


       {/* {allLikes.length > 0 ?  <RatingsAvatar    allLike = { [ ...allLikes]} numberOfLikes /> : null} */}



        
    </>) ;
};

export default connect(mapStateToProps) (RatingsComponent);