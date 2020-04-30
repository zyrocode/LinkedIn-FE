import React from "react";
import { Card,  CardHeader,  CardBody,
  CardTitle, CardText } from 'reactstrap';

const style = {
    height:"3.5em",
    width:"3.5em"
}



{/* <img height="150px" width="100%" src="https://cdn.hipwallpaper.com/i/62/8/uDtR6w.jpg" alt="" */}

const SideBarProfile = ({ imageUrl, surname, title, firstname }) => {
  return (
<>
   <div className="fixedSide">
      <Card >
      <CardHeader className="p-0 bg-img">
        <img className="w-100"  src="https://cdn.hipwallpaper.com/i/62/8/uDtR6w.jpg" alt="background-profile" style={{height:"5em", backgroundColor:" rgba(0, 0, 0, 0.63)"}}/></CardHeader>
      <CardBody style={{zIndex:"1000"}}>
      <div className="feed-profil fixed">
            <img className="profile-pic mt-0 mb-2 " src={imageUrl} alt="profile" style={style} />
           
          </div>
        <CardTitle className="text-center font-weight-bolder"><h3>{firstname + " " + surname}</h3></CardTitle>
        <CardText className="text-center font-weight-light"> 
     <small> {title ? <>{title}</> : null}</small></CardText>
        
      </CardBody>

    </Card>
   </div>
{/* 
  <Card className="sticky-top " style={{top:"70px"}}>
  <CardHeader>Header</CardHeader>
  <CardBody>
    <CardTitle>Special Title Treatment</CardTitle>
    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
    <Button>Go somewhere</Button>
  </CardBody>
  <CardFooter>Footer</CardFooter>
</Card> */}

</>
    // <div className="fixedSide">     </div>
   
    //  <div className="row ">
  
    // <img src="https://cdn.hipwallpaper.com/i/62/8/uDtR6w.jpg" alt="" className="h-50 w-100"/>

     


    //   <div className="row">
    //       <div className="feed-profil fixed">
    //         <img className="profile-pic mt-0 mb-2 " src={imageUrl} alt="profile" style={style} />
    //         <h4>{firstname + " " + surname}</h4>
    //         {title ? <h6>{title}</h6> : null}
    //       </div>
    //  </div>
     //</div> 









  );
};

export default SideBarProfile;
