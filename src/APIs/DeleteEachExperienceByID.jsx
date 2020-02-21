
const DeleteEachExperienceByID = async (ID,userName,password) => {
    let URL = "https://strive-school-testing-apis.herokuapp.com/api/profile/"+ userName + "/experiences/".concat(ID) 
    try {
        let response = await fetch(URL, {
            method: "DELETE",
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

export default DeleteEachExperienceByID