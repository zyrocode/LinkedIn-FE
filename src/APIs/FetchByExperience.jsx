
const FetchByExperience = async (userName,password) => {


    let URL = "https://strive-school-testing-apis.herokuapp.com/api/profile/"+ userName + "/experiences"
    try {
        let response = await fetch(URL, {
            method: "GET",
            headers: {
                "Authorization": "Basic " + btoa(`${userName}:${password}`),
                "Content-Type": "application/json"
            }
        })
        if (response.ok) {
            return await response.json()
        }
    } catch (error) {
        console.log(error);
    }
}

export default FetchByExperience