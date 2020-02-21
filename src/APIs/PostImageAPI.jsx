const PostImageAPI = async (userName, password, body1, whatToPost, idPost) => {
    let URL
    switch (whatToPost) {
        case 'profile':
            URL = "https://striveschool.herokuapp.com/api/profile/" + userName + "/picture"
            break;
        case 'post':
            URL = "https://striveschool.herokuapp.com/api/posts/" + idPost
            break;

    }
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

export default PostImageAPI;