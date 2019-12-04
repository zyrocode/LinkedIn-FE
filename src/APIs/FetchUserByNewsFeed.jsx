const FetchByUserName = async (userName, password, userToSearch) => {
    let URL = "https://strive-school-testing-apis.herokuapp.com/api/profile/".concat(userToSearch);
    try {
        let response = await fetch(URL, { 
            method: "GET",
            headers: {
                "Authorization": "Basic " + btoa(`${userName}:${password}`),
                "Content-Type": "application/json"
            }
        })
        if (response.ok) {
            let user = await response.json()
            return user

        }
    } catch (error) {
        console.log(error);
    }
}

export default FetchByUserName;