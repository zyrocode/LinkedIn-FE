
const GetAPI = async (userName, access_token, whatToFetch, userName2, ID, reqUserID) => {
    let URL = undefined

    switch (whatToFetch) {
        default:
            URL = "http://localhost:7000/profiles/"
            break
        case 'likes':
            URL = `http://localhost:7000/likes/${ID}/?userId=${reqUserID}`
            break
        case 'experience':
            //http://localhost:7000/experiences/ds/experience/5e5496f570602b00440ce503
            URL = `http://localhost:7000/experiences/${userName}/experience/${ID}` 
            break
        case 'experiences':
            !userName2
            ?
            URL = `http://localhost:7000/profiles/${userName}/experiences` 
            :
            URL = `http://localhost:7000/profiles/${userName2}/experiences`
            break
        case 'posts':
            URL = "http://localhost:7000/posts/"
            break
        case 'profile':
            !userName2
            ?
            URL = `http://localhost:7000/profiles/username/${userName}`
            :
            URL = "http://localhost:7000/profiles/username/".concat(userName2)
            break
        case 'post':
                URL = "http://localhost:7000/posts/" + ID
             break
        case 'comments':
                URL = `http://localhost:7000/comments/${ID}`
            break 
                // http://localhost:7000/comments/5eab1ba16668756d2b8d6de0/
    }

    try {
        let response = await fetch(URL, {
            method: "GET",
            headers: {
                // "Authorization": "Basic " + btoa(`${userName}:${token}`),
                "Authorization": "Bearer " + access_token
               
            }
        })
        if (response.ok) {
            return await response.json()
        }
        else{
            throw new Error (response)
        }
    } catch (error) {
        console.log(error);
    }
}

export default GetAPI