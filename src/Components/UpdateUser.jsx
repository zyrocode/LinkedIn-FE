import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import FetchToUpdate from "../APIs/FetchToUpdate"
import FetchByUserName from "../APIs/FetchByUserName"

class UpdateUser extends Component {
  state = {
    isOpen: true,
    name: "",
    surname: "",
    email: "",
    bio: "",
    area: "",
    password: ""
  }


  toggleClose = () => {
    this.props.closeModal()
    this.setState({
      isOpen: !this.state.isOpen,

    })
  }


  render() {
    return (
      <div>
        <Modal isOpen={this.state.isOpen} toggle={this.toggleClose} >
          <ModalHeader toggle={this.toggleClose}>Modal title</ModalHeader>

          <ModalBody>

            <Form onSubmit={this.postUpdatedDetails}>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input onChange={(val) => this.setState({email: val.target.value})} value={this.state.email} type="email" id="email" placeholder="with a placeholder" />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label >First Name</Label>
                    <Input onChange={(val) => this.setState({name: val.target.value})} value={this.state.name} type="text" id="name" placeholder="Name placeholder" />
                  </FormGroup>
                  <FormGroup>
                    <Label >Surname</Label>
                    <Input onChange={(val) => this.setState({surname: val.target.value})} value={this.state.surname}type="text" id="surname" placeholder="Name placeholder" />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="exampleAddress">Bio</Label>
                <Input onChange={(val) => this.setState({bio: val.target.value})} value={this.state.bio} type="text" id="bio" placeholder="Bio" />
              </FormGroup>
              <FormGroup>
                <Label for="exampleCity">Area</Label>
                <Input onChange={(val) => this.setState({area: val.target.value})} value={this.state.area}type="text" name="city" id="area" />
              </FormGroup>
              <FormGroup>
                <Label for="exampleCity">Passwod</Label>
                <Input onChange={(val) => this.setState({password: val.target.value})} value={this.state.password}type="password"/>
              </FormGroup>
              <Button color="success">Update</Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>





    );
  }


  componentDidMount = async () => {
    let userProfile = await FetchByUserName(this.props.id)
    console.log(userProfile)

    this.setState({
      name: userProfile.name,
      surname: userProfile.surname,
      email: userProfile.email,
      bio: userProfile.bio,
      area: userProfile.area
    })

    /* 
    let profileObject = {

      "name": document.querySelector("#name").value,
      "surname": document.querySelector("#surname").value,
      "email": document.querySelector("#email").value,
      "bio": document.querySelector("#bio").value,
      "title": document.querySelector("#title").value,
      "area": document.querySelector("#area").value,

    };
    await FetchToUpdate(profileObject) */

  }

  postUpdatedDetails = async (e) => {
    e.preventDefault();
    let profileObject = {

      "name": document.querySelector("#name").value,
      "surname": document.querySelector("#surname").value,
      "email": document.querySelector("#email").value,
      "bio": document.querySelector("#bio").value,
      "area": document.querySelector("#area").value,

    };
    await FetchToUpdate(profileObject, this.state.password)
    this.props.closeModal()
  }





}

export default UpdateUser;