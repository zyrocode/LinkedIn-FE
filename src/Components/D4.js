/*

    Extra FE - D4 LinkedIn Part 4

    You'll be implementing the frontend of a LinkedIn-like application.
    Today you'll be working on the image upload.
    Every user can post his own comments / links / photos on the feed.

    Start from yesterday App, if something is still missing, finish previous features before starting with this part.
    Use these endpoints to implement the feed feature.

    On both POSTS and EXPERIENCES it should be possible to upload a picture.

    You can do it using the FormData content and the input type="file"

    Part of the challenge is also understand how to do it googling / searching ;-)

    _______________________

    Diego:Profile

    http://striveschool.herokuapp.com/api/profile/user18/experiences/5de6dc9840093d0017be4d36/

    _______________

    - POST https://striveschool.herokuapp.com/api/profile/{username}/pricture
    Replace user profile picture (name = profile)

    - POST https://striveschool.herokuapp.com/api/profile/userName/experiences/:expId/picture
    Change the experience picture (only if userName == current user). 
    Name of the picture in the form-data: experience

    - POST https://striveschool.herokuapp.com/api/posts/{postId}
    Add an image to the post under the name of "post" 
*/