/*

    Extra FE - D1 LinkedIn Part 1

    You'll be implementing the frontend of a LinkedIn-like application.
    Today you are gonna focus on the "profile page".
    Make it as close as possible as LinkedIn
    
    https://www.linkedin.com/in/me/

    NOTE:
    Every user has a unique username and password.
    Every request to the API should use Basic Authentication to secure access to the LinkedIn contents.

    Authentication: Basic base64(username:password)

    API:

    ---------------------------------------------------------------------------

    PROFILES:

    - GET https://striveschool.herokuapp.com/api/profiles/ 
    Retrieves list of profiles
    - GET https://striveschool.herokuapp.com/api/profiles/me
    Retrieves my profile
    - GET https://striveschool.herokuapp.com/api/profiles/{username}
    Retrieves the profile with username = {username}
    - POST https://striveschool.herokuapp.com/api/profiles/
    Create the user profile with all his details
    - PUT https://striveschool.herokuapp.com/api/profiles/
    Update current user profile details

    
    ---------------------------------------------------------------------------

    PROFILE Model:
    {
        "_id": "5d84937322b7b54d848eb41b", //server generated
        "name": "Diego",
        "surname": "Banovaz",
        "email": "diego@strive.school",
        "bio": "SW ENG",
        "title": "COO @ Strive School",
        "area": "Berlin",
        "image": ..., //server generated on upload
        "username": "admin", //server generated from Auth
        "createdAt": "2019-09-20T08:53:07.094Z", //server generated
        "updatedAt": "2019-09-20T09:00:46.977Z", //server generated
        "__v": 0 //server generated
     
    }


*/