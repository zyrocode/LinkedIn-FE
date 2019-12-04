
const FetchToPost = async (profileObject,userName,password) => {


    let URL = "https://strive-school-testing-apis.herokuapp.com/api/profile/"+ userName + "/experiences"
    try {
        let response = await fetch(URL, {
            method: "POST",
            headers: {
                "Authorization": "Basic " + btoa(`${userName}:${password}`),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(profileObject)
        })
        if (response.ok) {
            return await response.json() 
        }
    } catch (error) {
        console.log(error);
    }
}

export default FetchToPost;