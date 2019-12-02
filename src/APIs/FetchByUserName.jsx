
const FetchByUserName = async(userName) => {


    let URL = "https://strive-school-testing-apis.herokuapp.com/api/profile/".concat(userName);
    try {
        let response = await fetch(URL, {
            method: "GET",
            headers:{
             "Authorization": "Basic dXNlcjE4OlEyejVWN2hFRlU2SktSckU=",
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