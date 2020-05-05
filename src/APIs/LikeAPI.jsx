export const Like = async (postId,username,userToken  )=>{
    try {
        let resp = await fetch(`http://localhost:7000/likes/${postId}/${username}`, { method: "POST",
        headers: {
          "Authorization": "Bearer " + userToken,
          "Content-Type": "application/json"
      }})  
      
        if(resp.ok){
            return await resp.json()
        }
           
       } catch (error) {
           console.log(error)
           
       }
      
}

export const unLike = async (postId,username,userToken  )=>{
    try {
        let resp = await fetch(`http://localhost:7000/likes/${postId}/${username}`, { method: "DELETE",
        headers: {
          "Authorization": "Bearer " + userToken,
          "Content-Type": "application/json"
      }})  
      
        if(resp.ok){
            return await resp.json()
        }
           
       } catch (error) {
           console.log(error)
           
       }
      
}