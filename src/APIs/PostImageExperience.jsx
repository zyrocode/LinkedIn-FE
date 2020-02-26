const PostImageExperience = async (userName, token , expID, imagePayload)=> {

    // /:username/:experienceID/imgUpload

    let URL = `http://app-be.azurewebsites.net/experiences/${userName}/${expID}/imgUpload`
    try {
        let response = await fetch(URL, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token
                
            },
            body: imagePayload
           
        })
        if (response.ok) {
            return await response.json()
        }
    } catch (error) {
        console.log(error);
        return (error)
    }
}

export default PostImageExperience;
