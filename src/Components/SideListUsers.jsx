import React, { useState, useEffect } from "react";
import {
 
  Col,
  Row,
  
} from "reactstrap";
import { Link } from "react-router-dom";

import GetAPI from "../APIs/GetAPI";
import { connect } from "react-redux";

const mapStateToProps = (state) => state;

const SideListUsers = ({ details: { userToken }, details}) => {

  const [ allUsers, setUsers ] = useState({data: [], loading: true})


  useEffect(()=>{
    const fetchUsers =async()=>{
      const resp = await GetAPI(details.username,userToken)
      const { profileList } = resp
      
       setUsers({ data:profileList, loading:false})

    }
    fetchUsers()
  }, [details.username, userToken])



  return (
    <div className="sideList">
     

      {  allUsers.data.length > 0 &&  
      allUsers.data.map( ({ firstname, surname, imageUrl, title, username })  => (
        
      <>
        <Row style={{ padding: "1.5em 1.5em 0.3em 1.5em" }}>
       <Col sm={3}>
          <Link to={"/profile/" + username}>
            {" "}
            <img
              className="newsfeed-pic"
              src={imageUrl}
              alt="newsfeed post pic"
              style={{ objectFit: "cover" }}
            />{" "}
          </Link>
       </Col>
        <Col>
       
          <Link to={"/profile/" + username}>
            {" "}
            <span
              style={{ color: "black", paddingLeft: "10px", fontWeight: "700" }}
            >
              {firstname} {surname}
            </span>{" "}
            <br />
            {title ? (
              <span
                style={{
                  color: "black",
                  paddingLeft: "10px",
                  fontWeight: "400",
                }}
              >
                {title}
              </span>
            ) : null}
          </Link>
          <hr />
        </Col>
       
      </Row>
       </> ))}

     
    </div>
  );
};

export default connect(mapStateToProps)(SideListUsers);
