const PutAPI = async (userName,access_token, whatToUpdate, theUpdate, theID, commentID) => {
    let URL = undefined
    switch(whatToUpdate){
        case "comment":
            URL = `https://be-lnk.herokuapp.com/comments/${userName}/${theID}/${commentID}`
            break
        case 'experience':
            //https://be-lnk.herokuapp.com/experiences/jeff/5e45ec286a042e4bc0c8dd33
            URL = `https://be-lnk.herokuapp.com/experiences/${userName}/${theID}`
        break
        case 'profile':
            URL = `https://be-lnk.herokuapp.com/profiles/${theID}` 
        break
        default:
            URL =  `https://be-lnk.herokuapp.com/posts/${userName}/${theID}`  
    }
    try {
        let response = await fetch(URL, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + access_token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(theUpdate)
        })
        if (response.ok) {
            return await response.json()
        }
    } catch (error) {
        console.log(error);
    }
}   

export default PutAPI;