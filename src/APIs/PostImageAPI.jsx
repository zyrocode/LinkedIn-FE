const PostImageAPI = async (userName, userToken, body1, whatToPost, idPost) => {
    let URL
    switch (whatToPost) {
        case 'profile':
            URL = "https://be-linked-in.herokuapp.com/profiles/" + userName + "/picture"
            break;
        case 'post':
            URL = `https://be-linked-in.herokuapp.com/posts/${userName}/${idPost}/uploadImg`
            break;
            default:
                URL = "https://be-linked-in.herokuapp.com/posts/"

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