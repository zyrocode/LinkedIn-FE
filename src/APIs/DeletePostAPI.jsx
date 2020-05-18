// `https://be-linked-in.herokuapp.com/posts/${userName}/${theID}`
const DeletePostAPI = async (userName,userToken, postID, whatToFetch, commentID) => {

    let URL = undefined;

    switch (whatToFetch) {
        case "comment":
            URL = `https://be-linked-in.herokuapp.com/comments/${userName}/${postID}/${commentID}`
            break;
    
        default:
             URL = `https://be-linked-in.herokuapp.com/posts/${userName}/${postID}`
           
    }

 
    try {
        let response = await fetch(URL, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + userToken,
                "Content-Type": "application/json"
            }
        })
        if (response.ok) {
            return await response.json()
        }
    } catch (error) {
        console.log(error);
    }
}

export default DeletePostAPI