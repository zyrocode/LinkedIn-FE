
const GetAPI = async (userName, password, whatToFetch, userName2, ID) => {
    let URL = undefined

    switch (whatToFetch) {
        default:
            URL = "https://strive-school-testing-apis.herokuapp.com/api/profile/"
            break
        case 'experience':
            URL = "https://strive-school-testing-apis.herokuapp.com/api/profile/" + userName + "/experiences/".concat(ID)
            break
        case 'experiences':
            URL = `https://strive-school-testing-apis.herokuapp.com/api/profile/${userName}/experiences`
            break
        case 'posts':
            URL = "https://strive-school-testing-apis.herokuapp.com/api/posts/"
            break
        case 'myprofile':
            URL = "https://strive-school-testing-apis.herokuapp.com/api/profile/".concat(userName)
            break
        case 'profile':
            URL = "https://strive-school-testing-apis.herokuapp.com/api/profile/".concat(userName2)
    }

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

export default GetAPI