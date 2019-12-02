import React, { Component } from 'react';
import {  Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Button, Form, FormGroup, Label, Input  } from 'reactstrap';
import FetchToUpdate from "../APIs/FetchToUpdate"

class UpdateUser extends Component {
    state = {  
        isOpen : true   
    }

    toggleClose = ()=>{
        this.setState({
            isOpen : !this.state.isOpen
        })
    }


    render() { 
        return ( 
            <div>
      
      <Modal isOpen={this.state.isOpen} toggle={this.toggleClose} >
        <ModalHeader toggle={this.toggleClose}>Modal title</ModalHeader>
        
        <ModalBody>
          
        <Form onSubmit={this.getCommentDetails}>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input type="email" id="email" placeholder="with a placeholder" />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label >First Name</Label>
            <Input type="text"  id="name" placeholder="Name placeholder" />
          </FormGroup>
          <FormGroup>
            <Label >Surname</Label>
            <Input type="text"  id="surname" placeholder="Name placeholder" />
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Label for="exampleAddress">Bio</Label>
        <Input type="text"  id="bio" placeholder="Bio"/>
      </FormGroup>
      <FormGroup>
            <Label for="exampleCity">Area</Label>
            <Input type="text" name="city" id="area"/>
          </FormGroup>
          <Button color="success">Update</Button>
    


     

          </Form>

        </ModalBody>
        <ModalFooter>
        <Button color="success">Update</Button>
      
        </ModalFooter>
        
      </Modal>
    </div>





         );
    }


    //  componentDidMount=async()=>{
    //     let profileObject = {
       
    //         "name": document.querySelector("#name").value,
    //         "surname": document.querySelector("#surname").value,
    //         "email": document.querySelector("#email").value,
    //         "bio": document.querySelector("#bio").value,
    //         "title": document.querySelector("#title").value,
    //         "area": document.querySelector("#area").value,
           
    //         };   
    //      await FetchToUpdate(profileObject)

    //  }

    getCommentDetails= async (e)=>{
        e.preventDefault();
        let profileObject = {
       
        "name": document.querySelector("#name").value,
        "surname": document.querySelector("#surname").value,
        "email": document.querySelector("#email").value,
        "bio": document.querySelector("#bio").value,
        "title": document.querySelector("#title").value,
        "area": document.querySelector("#area").value,
       
        };

       let postData =  await FetchToUpdate(profileObject)

      


    }





}
 
export default UpdateUser;