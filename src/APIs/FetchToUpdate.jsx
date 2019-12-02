
const FetchToUpdate = async (comment) => {


    let URL = "https://strive-school-testing-apis.herokuapp.com/api/profile/"
    try {
        let response = await fetch(URL, {
            method: "PUT",
            headers: {
                "Authorization": "Basic dXNlcjE4OlEyejVWN2hFRlU2SktSckU=",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment)
        })
        if (response.ok) {
            return await response.json()
        }
    } catch (error) {
        console.log(error);
    }
}

export default FetchToUpdate;