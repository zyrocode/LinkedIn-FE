const PostAPI = async (userName, access_token, whatToCreate, objectToCreate, imageData, postID) => {
    let URL = undefined
    switch (whatToCreate) {
      // `https://be-linked-in.herokuapp.com/likes/5eab1ba16668756d2b8d6de0/ds`
      
      case "register":
        URL = `https://be-linked-in.herokuapp.com/users/register`
        break

      case "like":
          URL= `https://be-linked-in.herokuapp.com/likes/${postID}/${userName}`;
          break

      case "comment":
        URL = `https://be-linked-in.herokuapp.com/comments/${userName}/${postID}`;
        break;
      case "experience":
        URL = "https://be-linked-in.herokuapp.com/profiles/experience/".concat(userName);
        break;
      case "post":
        URL = "https://be-linked-in.herokuapp.com/posts/".concat(userName);
        break;
      default:
        URL = "https://strive-school-testing-apis.herokuapp.com/api/posts/";
    }
    try {//profiles/experience/jeff
        let response = await fetch(URL, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + access_token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(objectToCreate)
        })
        if (response) 
            return await response.json()
        
    } catch (error) {
        console.log(error);
    }
}

export default PostAPI;