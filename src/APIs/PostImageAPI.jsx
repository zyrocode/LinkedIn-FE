const PostImageAPI = async (userName, userToken, body1, whatToPost, idPost) => {
    let URL
    switch (whatToPost) {
        case 'profile':
            URL = "http://localhost:7000/profiles/" + userName + "/picture"
            break;
        case 'post':
            URL = `http://localhost:7000/posts/${userName}/${idPost}/uploadImg`
            break;
            default:
                URL = "http://localhost:7000/posts/"

    }
    try {
        let response = await fetch(URL, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + userToken
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