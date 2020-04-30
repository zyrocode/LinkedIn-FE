// `http://localhost:7000/posts/${userName}/${theID}`
const DeletePostAPI = async (userName,userToken, postID) => {
    let URL = `http://localhost:7000/posts/${userName}/${postID}`
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