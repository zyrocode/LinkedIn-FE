
const GetAPI = async (userName, access_token, whatToFetch, userName2, ID, reqUserID) => {
    let URL = undefined

    switch (whatToFetch) {
        default:
            URL = "https://be-linked-in.herokuapp.com/profiles/"
            break
        case 'likes':
            URL = `https://be-linked-in.herokuapp.com/likes/${ID}/?userId=${reqUserID}`
            break
        case 'experience':
            //https://be-linked-in.herokuapp.com/experiences/ds/experience/5e5496f570602b00440ce503
            URL = `https://be-linked-in.herokuapp.com/experiences/${userName}/experience/${ID}` 
            break
        case 'experiences':
            !userName2
            ?
            URL = `https://be-linked-in.herokuapp.com/profiles/${userName}/experiences` 
            :
            URL = `https://be-linked-in.herokuapp.com/profiles/${userName2}/experiences`
            break
        case 'posts':
            URL = "https://be-linked-in.herokuapp.com/posts/"
            break
        case 'profile':
            !userName2
            ?
            URL = `https://be-linked-in.herokuapp.com/profiles/username/${userName}`
            :
            URL = "https://be-linked-in.herokuapp.com/profiles/username/".concat(userName2)
            break
        case 'post':
                URL = "https://be-linked-in.herokuapp.com/posts/" + ID
             break
        case 'comments':
                URL = `https://be-linked-in.herokuapp.com/comments/${ID}`
            break 
                // https://be-linked-in.herokuapp.com/comments/5eab1ba16668756d2b8d6de0/
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