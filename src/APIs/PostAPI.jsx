const PostAPI = async (userName, password, whatToCreate, objectToCreate) => {
    let URL = undefined
    switch(whatToCreate){
        case 'experience':
                URL = "https://strive-school-testing-apis.herokuapp.com/api/profile/" + userName + "/experiences"
    }
    try {
        let response = await fetch(URL, {
            method: "POST",
            headers: {
                "Authorization": "Basic " + btoa(`${userName}:${password}`),
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