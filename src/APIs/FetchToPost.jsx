
const FetchToPost = async (profile) => {


    let URL = "https://strive-school-testing-apis.herokuapp.com/api/profile/user18/experiences"
    try {
        let response = await fetch(URL, {
            method: "POST",
            headers: {
                "Authorization": "Basic dXNlcjE4OlEyejVWN2hFRlU2SktSckU=",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(profile)
        })
        if (response.ok) {
            return await response.json()
        }
    } catch (error) {
        console.log(error);
    }
}

export default FetchToPost;