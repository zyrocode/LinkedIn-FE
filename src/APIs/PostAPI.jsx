const PostAPI = async (userName, access_token, whatToCreate, objectToCreate, imageData, postID) => {
    let URL = undefined
    switch (whatToCreate) {
      // `http://localhost:7000/experiences/${userName}/${expID}/imgUpload`:username/:postId
      //http://localhost:7000/comments/ds/5eab1ba16668756d2b8d6de0

      case "comment":
        URL = `http://localhost:7000/comments/${userName}/${postID}`;
        break;
      case "experience":
        URL = "http://localhost:7000/profiles/experience/".concat(userName);
        break;
      case "post":
        URL = "http://localhost:7000/posts/".concat(userName);
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
        if (response.ok) {
            return await response.json()
        }
    } catch (error) {
        console.log(error);
    }
}

export default PostAPI;