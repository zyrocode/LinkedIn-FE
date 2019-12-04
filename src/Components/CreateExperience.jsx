import React, { Component } from "react";
import PostAPI from "../APIs/PostAPI"
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

class CreateExperience extends Component {
  state = {
    isOpen: true,
    role: "",
    company: "",
    description: "",
    area: "",
    startDate: "",
    endDate: ""
  };

  toggleClose = () => {
    this.props.closeModal();
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <div>
        <Modal isOpen={this.state.isOpen} toggle={this.toggleClose}>
          <ModalHeader toggle={this.toggleClose}>Modal title</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.postNewDetails}>
              <FormGroup>
                <Label>Role</Label>
                <Input
                  type="text"
                  id="role"
                  placeholder="Role"
                />
              </FormGroup>
              <FormGroup>
                <Label>Company</Label>
                <Input
                  type="text"
                  id="company"
                  placeholder="Add Company details"
                />
              </FormGroup>
              <FormGroup>
                <Label>Description</Label>
                <Input
                  type="text"
                  id="description"
                  placeholder="Add Description"
                />
              </FormGroup>
              <FormGroup>
                <Label>Area</Label>
                <Input
                  type="text"
                  name="city"
                  id="area"
                />
              </FormGroup>
              <FormGroup>
                <Label >Start Date</Label>
                <Input
                  type="date"
                  name="date"
                  id="startDate"
                  placeholder="Start Date"
                />
              </FormGroup>
              <FormGroup>
                <Label >End Date</Label>
                <Input
                  type="date"
                  name="date"
                  id="endDate"
                  placeholder="End Date"
                />
              </FormGroup>
              <Button color="primary">Add Data</Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }




  postNewDetails = async (e) => {
    e.preventDefault();
    let profileObjectForPost = {

      "role": document.querySelector("#role").value,
      "company": document.querySelector("#company").value,
      "description": document.querySelector("#description").value,
      "area": document.querySelector("#area").value,
      "startDate": document.querySelector("#startDate").value,
      "endDate": document.querySelector("#endDate").value


    };
    await PostAPI(localStorage.getItem('username'), localStorage.getItem('password'), 'experience',profileObjectForPost)
    this.props.closeModal()
  }
}
export default CreateExperience;