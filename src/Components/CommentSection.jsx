import React, { useEffect, useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  FormText,
  Col,
  Row,
  Button,
  Container,
} from "reactstrap";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import GetAPI from "../APIs/GetAPI";
import PostAPI from "../APIs/PostAPI"
import PutAPI from "../APIs/PutAPI"
import DeletePostAPI from "../APIs/DeletePostAPI"
import { connect } from "react-redux";
import EditAndDeleteEllipsis from "./EditAndDeleteEllipsis";

const mapStateToProps = (state) => state;

const style = {
  background: "#F3F6F8",
  borderRadius: "0.5em 5em 5em 5em",
  padding: "0 2.3em 0 0",
};

const CommentSection = ({ post, imageUrl, title, details }) => {
  // const [ showButton, setShowButton ] = useState(false);
  const [ commentText, setComment ] = useState("");
  const [ commentList, setCommentList ] = useState([]);
  const [ toggleFetch,setToggleFetch  ] = useState(false)
  const [ editComment,setEditComment  ] = useState({ showEditBox:false, text:"", commentID: ""})

  useEffect(() => {
    const fetchComments = async () => {
      const { comments } = await GetAPI(
        details.username,
        details.userToken,
        "comments",
        "",
        post._id
      );
       const sortedComments = comments.sort((a,b)=> new Date (b.updatedAt) - new Date (a.updatedAt))
      setCommentList(sortedComments);
    };
    fetchComments();
    
  }, [details.userToken, details.username, post._id, toggleFetch]);

const postNewComment = async (commentText)=>{
  try {
    let textBody = { "comment":commentText }
   await PostAPI (details.username, details.userToken, "comment", textBody, "", post._id)

    setToggleFetch(!toggleFetch)
   setComment("")
  } catch (error) {
    throw new Error (error)
  }
}


const deleteComment = async (commentid)=>{
  try {
    
   await DeletePostAPI (details.username, details.userToken,post._id, "comment", commentid)

    // setToggleFetch(!toggleFetch)
    let newList = [...commentList] // getting a reference of the whole array
    
    setCommentList(newList.filter(({ _id }) => _id !== commentid)) // setting the new state without the filtered/deleted object
   
  } catch (error) {
    throw new Error (error)
   
  }
}

const putComment = async (commentText, commentId)=>{
  try {
    let textBody = { "comment":commentText }

    await PutAPI (details.username, details.userToken, "comment", textBody, post._id, commentId) 
    let newList = [...commentList]
   let position =  newList.findIndex(({ _id }) => _id === commentId) //find the exact location comment in the array with it's ID matching the argument id

    newList[position].comment = commentText //assign the updated text to the comment found in the position

    setCommentList(newList) // set the state with the new array

  //  setToggleFetch(!toggleFetch) //alternatively, if I wanted a refetch from the useffect

   setEditComment({showEditBox:false, text:"", commentID: ""})
  } catch (error) {
    throw new Error (error)
  }
}
const editEllipsisHelper = (comment, _id)=>{
   setEditComment(editComment=>({showEditBox:
    !editComment.showEditBox, text:comment, commentID: _id }))
}


  const info = (username, firstname, surname, title, updatedAt) => {
    return (
      <Row className=" mb-1">
        <Col className=" pr-3 pl-3 pb-2">
          <Link to={"/profile/" + username}>
            <span
              style={{ color: "black", paddingLeft: "10px", fontWeight: "700" }}>
              {firstname} {surname}
            </span>
            <br />
            {title ? (
              <span
                style={{
                  color: "grey",
                  paddingLeft: "10px",
                  fontWeight: "400",
                  fontStyle: "italic",
                }}>
                {title}
              </span>
            ) : null}
          </Link>
          <br />
        </Col>
        <div>
          <Row>
            <Col>
              <Moment fromNow className="time-date mt-1 mr-5">
                {updatedAt}
              </Moment>
            </Col>
          </Row>
        </div>
      </Row>
    );
  };

  return (
    <>
      <Row>
        <Col xs={1}>
          <img
            src={imageUrl}
            alt="pic"
            className="mx-auto rounded-circle "
            style={{ marginTop: "1.05em" }}
            height="30"
            width="30"
          />
        </Col>

        <Col className="pl-0">
          
            <Input
            type="textarea"
              className="  mb-2 overflow-auto"
              placeholder="Add a comment..."
              onChange={(e) => setComment(e.target.value)}
              value={commentText}
              rows = {commentText.length > 60  ? "3" : "1"} /*if string.length is greater tha 60, more blank on  input*/
              style={{borderRadius:"2em"}}

              //   style={{marginBottom:"0.5m !important"}} 
              />

            <Row>
              {commentText ? (
                <Button onClick={()=>postNewComment(commentText)}
                  color="primary"
                  size="sm"
                  style={{
                    padding: "0 1em 0 1em",
                    marginTop: "0",
                    marginLeft: "2em",
                  }}>
                  {" "}
                  Post{" "}
                </Button>
              ) : null}
            </Row>
           
        </Col>
      </Row>

      {commentList.length > 0
        ? commentList
        .map(
            ({
              comment,
              _id,
              username,
              postId,
              userInfo: { imageUrl, firstname, surname },
              updatedAt,
            }) => (
              <Row key={_id} style={{ marginTop: "0.35em" }}>
                <Col xs={1}>
                  <img
                    src={imageUrl}
                    alt="pic"
                    className="mx-auto rounded-circle mt-3"
                    height="30"
                    width="30"/>
                </Col>
                <Col>
                <div className="d-flex justify-content-end">
                  <div style={{marginRight:"2.15em", marginBottom:"-0.7em"}}>
                  { username ===  details.username && 

                   <EditAndDeleteEllipsis 
                   setEditComment ={setEditComment}

                
                   openForEdit ={editEllipsisHelper}
                   _id={_id} text={comment}
                   removePost={deleteComment}
                   />

                  }
                  </div>
                </div>
                  <div style={style}>
                    {info(username, firstname, surname, title, updatedAt)}

                   {editComment.showEditBox && editComment.commentID === _id  ? null: <p className="pl-4 pb-4"> {comment} </p>}

                    {
                      editComment.showEditBox && editComment.commentID === _id && (<>
                      <Container>
                        <Input  value={editComment.text} onChange={
                          (e)=>
                          setEditComment({...editComment,text: e.target.value })} 
                          type="textarea"
                          rows = {editComment.text.length > 12  ?
                             "3" : editComment.text.length > 24 ? "5"
                             : "1"}
                          style={{
                            border: "none",
    overflow: "auto",
    outline: "none",
    boxShadow: "none",
    background:"transparent",
    overflowY:"hidden"
                          }}
                          /> 
                          <br/><br/>
                          <Button onClick={()=>putComment(editComment.text, _id)}
                    color="primary"
                    size="sm"
                    style={{
                      padding: "0 1em 0 1em",
                      marginTop: "-6em",
                      marginBottom: "1.7em",
                      marginLeft: "1em",
                    }}>
                    {" "}
                    Update{" "}
                  </Button>

                  <Button 
                  onClick={()=>setEditComment({...editComment, showEditBox:false})}
                  color="secondary"
                    size="sm"
                    style={{
                      padding: "0 1em 0 1em",
                      marginTop: "-6em",
                      marginBottom: "1.7em",
                      marginLeft: "2em",
                    }}>Cancel</Button>
                      </Container>
                        </>)
                    }
                  
                  
                  </div>
                </Col>
              </Row>
            )
          )
        : null}
    </>
  );
};

export default connect(mapStateToProps)(CommentSection);


// {   
//   "confirmed": 
//       {"value":3449986,"detail":"https://covid19.mathdro.id/api/confirmed"},

// "recovered":
//       {"value":1101375,"detail":"https://covid19.mathdro.id/api/recovered"},

// "deaths":
//       {"value":244239,"detail":"https://covid19.mathdro.id/api/deaths"},

// "dailySummary":"https://covid19.mathdro.id/api/daily",

// "dailyTimeSeries":
//       {"pattern":"https://covid19.mathdro.id/api/daily/[dateString]","example":"https://covid19.mathdro.id/api/daily/2-14-2020"},

// "image":
//     "https://covid19.mathdro.id/api/og",

// "source":"https://github.com/mathdroid/covid19",

// "countries":"https://covid19.mathdro.id/api/countries",

// "countryDetail":
//       {"pattern":"https://covid19.mathdro.id/api/countries/[country]","example":"https://covid19.mathdro.id/api/countries/USA"},

// "lastUpdate":"2020-05-03T14:32:26.000Z"

// }