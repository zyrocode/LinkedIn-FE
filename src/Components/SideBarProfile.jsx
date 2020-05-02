import React from "react";
import { Card,  CardHeader,  CardBody,
  CardTitle, CardText } from 'reactstrap';
import { Link } from "react-router-dom";

const style = {
    height:"3.5em",
    width:"3.5em"
}


const SideBarProfile = ({ imageUrl, surname, title, firstname, username }) => {
  return (
<>
   <div className="fixedSide">
      <Card >
      <CardHeader className="p-0 bg-img">
     <img className="w-100"  src="https://cdn.hipwallpaper.com/i/62/8/uDtR6w.jpg" alt="background-profile" style={{height:"5em", backgroundColor:" rgba(0, 0, 0, 0.63)"}}/> </CardHeader>
      <CardBody style={{zIndex:"1000", textAlign:"center"}}>
      <div className="feed-profil fixed">
      <Link to={"/profile/" + username}> <img className="profile-pic mt-0 mb-2 " src={imageUrl} alt="profile" style={style} /></Link>
           
          </div>
          <Link to={"/profile/" + username}> <CardTitle className="text-center font-weight-bolder "><p>{firstname + " " + surname}</p></CardTitle></Link>
        <CardText className=" font-weight-light"> 
     <small> {title ? <>{title}</> : null}</small></CardText>
       <hr/>
       <Link to={"/profile/" + username}>  <small className="text-center ">View Profile</small> </Link>
      </CardBody>

    </Card>
   </div>

   </>


  );
};

export default SideBarProfile;
