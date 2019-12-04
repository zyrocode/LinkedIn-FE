/*

    Extra FE - D3 LinkedIn Part 3

    You'll be implementing the frontend of a LinkedIn-like application.
    Today you'll be working on the news feed.

    Start from yesterday App, if something is still missing, finish previous features before starting with this part.
    Use these endpoints to implement the feed feature.

    NOTE:
    Every user has a unique username and password.
    Every request to the API should use Basic Authentication to secure access to the LinkedIn contents.
    For each post, you should be able to click on the author name and be redirected to the user profile

    API:

    ---------------------------------------------------------------------------

    PROFILES:

    - GET https://striveschool.herokuapp.com/api/posts/ 
    Retrieve posts
    - POST https://striveschool.herokuapp.com/api/posts/
    Creates a new post
    - GET https://striveschool.herokuapp.com/api/posts/{postId}
    Retrieves the specified post
    - PUT https://striveschool.herokuapp.com/api/posts/{postId}
    Edit a given post (note: you can only edit your posts)

    - DELETE https://striveschool.herokuapp.com/api/posts/{postId}
    Removes a post
    
    ---------------------------------------------------------------------------

    POST Model:
    {
        "_id": "5d93ac84b86e220017e76ae1", //server generated
        "text": "this is a text 12312 1 3 1",  <<--- THIS IS THE ONLY ONE YOU'LL BE SENDING!!!
        "username": "admin", //server generated
        "createdAt": "2019-10-01T19:44:04.496Z", //server generated
        "updatedAt": "2019-10-01T19:44:04.496Z", //server generated
        "__v": 0 //server generated
    }

    ---------------------------------------------------------------------------

    Make it as close as possible as LinkedIn Newsfeed page
*/