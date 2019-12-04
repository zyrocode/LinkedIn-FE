
const FetchToUpdate = async (profile, userName,password) => {
    let URL = "https://strive-school-testing-apis.herokuapp.com/api/profile/"
    try {
        let response = await fetch(URL, {
            method: "PUT",
            headers: {
                "Authorization": "Basic " + btoa(`${userName}:${password}`),
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

export default FetchToUpdate;