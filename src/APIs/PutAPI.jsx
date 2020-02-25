const PutAPI = async (userName,access_token, whatToUpdate, theUpdate, theID) => {
    let URL = undefined
    switch(whatToUpdate){
        case 'experience':
            URL = "https://strive-school-testing-apis.herokuapp.com/api/profile/"+ userName + "/experiences/".concat(theID)
        break
        case 'profile':
            URL = `http://app-be.azurewebsites.net/profiles/${theID}` 
        break
    }
    try {
        let response = await fetch(URL, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + access_token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(theUpdate)
        })
        if (response.ok) {
            return await response.json()
        }
    } catch (error) {
        console.log(error);
    }
}   

export default PutAPI;