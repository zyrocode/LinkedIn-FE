const PostAPI = async (userName, access_token, whatToCreate, objectToCreate, imageData) => {
    let URL = undefined
    switch(whatToCreate){
        // `http://localhost:7000/experiences/${userName}/${expID}/imgUpload`
        case 'experience':
                URL = "http://localhost:7000/profiles/experience/".concat(userName) 
            break
        case 'post':
                URL = "http://localhost:7000/posts/".concat(userName) 
                break
        default: 
                URL = "https://strive-school-testing-apis.herokuapp.com/api/posts/"
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