const PutAPI = async (userName,access_token, whatToUpdate, theUpdate, theID) => {
    let URL = undefined
    switch(whatToUpdate){
        case 'experience':
            //http://localhost:7000/experiences/jeff/5e45ec286a042e4bc0c8dd33
            URL = `http://app-be.azurewebsites.net/experiences/${userName}/${theID}`
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