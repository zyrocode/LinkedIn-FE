/*
​
    Extra FE - D2 LinkedIn Part 2
​
    You'll be implementing the frontend of a LinkedIn-like application.
    Today you are gonna focus on the "experiences" in the profile page you started yesterday.
    Make it as close as possible as LinkedIn
    
    https://www.linkedin.com/in/me/
​
    NOTE:
    Every user has a unique username and password.
    Every request to the API should use Basic Authentication to secure access to the LinkedIn contents.
​
    Authentication: Basic base64(username:password)
​
    API:
​
    ---------------------------------------------------------------------------
​
    EXPERIENCES:
​
    - GET https://striveschool.herokuapp.com/api/profiles/userName/experiences
    Get user experiences
    - POST https://striveschool.herokuapp.com/api/profiles/userName/experiences
    Create an experience. NOTE: every user is allowed to mess only with his own experiences
    - GET https://striveschool.herokuapp.com/api/profiles/userName/experiences/:expId
    Get a specific experience
    - PUT https://striveschool.herokuapp.com/api/profiles/userName/experiences/:expId
    Get a specific experience
    - DELETE https://striveschool.herokuapp.com/api/profiles/userName/experiences/:expId
    Get a specific experience
​
  
​
    
    ---------------------------------------------------------------------------
​
    EXPERIENCE Model:
    {
        "_id": "5d925e677360c41e0046d1f5",  //server generated
        "role": "CTO",
        "company": "Strive School",
        "startDate": "2019-06-16T22:00:00.000Z",
        "endDate": "2019-06-16T22:00:00.000Z", //could be null
        "description": "Doing stuff here and there",
        "area": "Berlin",
        "username": "admin",  //server generated
        "createdAt": "2019-09-30T19:58:31.019Z",  //server generated
        "updatedAt": "2019-09-30T19:58:31.019Z",  //server generated
        "__v": 0  //server generated
        "image": ... //server generated on upload
    }   
​
    ---------------------------------------------------------------------------
​
*/