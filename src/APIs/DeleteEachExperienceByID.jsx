
const DeleteEachExperienceByID = async (theID,userName,access_token) => {
    let URL = `https://be-lnk.herokuapp.com/experiences/${userName}/${theID}`
    try {
        let response = await fetch(URL, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + access_token,
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