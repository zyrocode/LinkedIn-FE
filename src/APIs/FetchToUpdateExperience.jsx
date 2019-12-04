const FetchToUpdateExperience = async (id,object,userName,password) => {


    let URL = "https://strive-school-testing-apis.herokuapp.com/api/profile/"+ userName + "/experiences/".concat(id)
    try {
        let response = await fetch(URL, {
            method: "PUT",
            headers: {
                "Authorization": "Basic " + btoa(`${userName}:${password}`),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(object)
        })
        if (response.ok) {
            return await response.json()
        }
    } catch (error) {
        console.log(error);
    }
}

export default FetchToUpdateExperience;