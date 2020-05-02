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
} from "reactstrap";
import { Link } from "react-router-dom";
import Moment from "react-moment";


const style = {
    background:"#F3F6F8",
    borderRadius:"0.5em 5em 5em 5em",
    padding:"0 2.3em 0 0"
}

const CommentSection = ({ post, firstname, surname, imageUrl, title }) => {

  const [showButton, setShowButton] = useState(false);
  const [comment, setComment] = useState("");


  const info=(
      <Row className=" mb-1">
    <Col className=" pr-3 pl-3 pb-2">
    <Link to={"/profile/" + post.username}> <span style={{ color: 'black', paddingLeft: '10px', fontWeight: '700' }}>{post.firstname}{" "}{post.surname}</span>
   <br/>
        {post.userInfo.title || post.title
        ? <span style={{ color: 'grey', paddingLeft: '10px', fontWeight: '400', fontStyle:"italic" }}>{post.userInfo.title || post.title}</span>
        : null}
   
     </Link>
     <br/>
     
       
    </Col>
    <div>
   <Row> <Col><Moment fromNow className="time-date mt-1 mr-5">{post.updatedAt}</Moment></Col></Row>
    </div>
    </Row>
  )

  return (
    <>
      <Row>
        <Col xs={1}>
          <img
            src={imageUrl}
            alt="pic"
            className="mx-auto rounded-circle " style={{marginTop:"1.05em"}}
            height="30"
            width="30"
          />
        </Col>

        <Col className="pl-0">
          <Form onSubmit={(e)=> e.preventDefault()}>
            <Input
              className=" rounded-pill mb-2"
              placeholder="Add a comment..."
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            //   style={{marginBottom:"0.5m !important"}}
            />

            <Row>
              {comment ? <Button color="primary" size="sm" style ={{padding:"0 1em 0 1em", marginTop:"0", marginLeft:"2em"}}> Post </Button> : null}
            </Row>
          </Form>
        </Col>
      </Row>

      <Row style ={{ marginTop:"0.35em"}}>
          <Col xs={1}>
          <img
            src={imageUrl}
            alt="pic"
            className="mx-auto rounded-circle mt-3"
            height="30"
            width="30"
          />
          </Col>
          <Col>
            <div style={style}>
                {info}
                <p className="pl-4 pb-4">Hello Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam hic dolorum cupiditate corporis perspiciatis minus! Repellendus, ad? Qui itaque ipsa nihil repellendus? Blanditiis, accusamus eos odio consequuntur eveniet repellat laudantium?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos ipsum animi cupiditate dolor hic magni doloribus maxime corrupti. Nemo quos fuga est recusandae quo architecto consequatur earum modi asperiores magni!
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed minus fuga facilis! Dolorum necessitatibus vero ut inventore eum eligendi vel delectus adipisci, at perferendis itaque, magni nihil tenetur quibusdam porro.
                llo Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam hic dolorum cupiditate corporis perspiciatis minus! Repellendus, ad? Qui itaque ipsa nihil repellendus? Blanditiis, accusamus eos odio consequuntur eveniet repellat laudantium?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos ipsum animi cupiditate dolor hic magni doloribus maxime corrupti. Nemo quos fuga est recusandae quo architecto consequatur earum modi asperiores magni!
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed minus fuga facilis! Dolorum necessitatibus vero ut inventore eum eligendi vel delectus adipisci, at perferendis itaque, magni nihil tenetur quibusdam porro.
                llo Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam hic dolorum cupiditate corporis perspiciatis minus! Repellendus, ad? Qui itaque ipsa nihil repellendus? Blanditiis, accusamus eos odio consequuntur eveniet repellat laudantium?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos ipsum animi cupiditate dolor hic magni doloribus maxime corrupti. Nemo quos fuga est recusandae quo architecto consequatur earum modi asperiores magni!
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed minus fuga facilis! Dolorum necessitatibus vero ut inventore eum eligendi vel delectus adipisci, at perferendis itaque, magni nihil tenetur quibusdam porro. </p>
                

            </div>
          </Col>
      </Row>

    </>
  );
};

export default CommentSection;
