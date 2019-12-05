const PostImageExperience = async (userName, password , expID, body1)=> {

    // https://striveschool.herokuapp.com/api/profile/userName/experiences/:expId/picture

    let URL = "https://striveschool.herokuapp.com/api/profile/" + userName + "/experiences/" + expID + "/picture"
    try {
        let response = await fetch(URL, {
            method: "POST",
            headers: {
                "Authorization": "Basic " + btoa(`${userName}:${password}`)
                
            },
            body: body1
           
        })
        if (response.ok) {
            return await response.json()
        }
    } catch (error) {
        console.log(error);
    }
}

export default PostImageExperience;
