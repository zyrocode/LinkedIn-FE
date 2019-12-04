import React, { Component } from "react";
import FetchToPost from "../APIs/FetchToPost"
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
                //   onChange={val => this.setState({ role: val.target.value })}
                  type="text"
                  id="role"
                  placeholder="Role"
                />
              </FormGroup>
              <FormGroup>
                <Label>Company</Label>
                <Input
                //   onChange={val => this.setState({ name: val.target.value })}
                  type="text"
                  id="company"
                  placeholder="Add Company details"
                />
              </FormGroup>
              <FormGroup>
                <Label>Description</Label>
                <Input
                //   onChange={val => this.setState({ surname: val.target.value })}
                  type="text"
                  id="description"
                  placeholder="Add Description"
                />
              </FormGroup>
              <FormGroup>
                <Label>Area</Label>
                <Input
                //   onChange={val => this.setState({ area: val.target.value })}
                  type="text"
                  name="city"
                  id="area"
                />
              </FormGroup>

              <FormGroup>
              <Label >StartDate</Label>
        <Input
          type="date"
          name="date"
          id="startDate"
          placeholder="Start Date"
          />
              </FormGroup>

              <FormGroup>
              <Label >StartDate</Label>
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




  postNewDetails = async (e)=>{
    e.preventDefault();
    let profileObjectForPost = {

        "role": document.querySelector("#role").value,
        "company": document.querySelector("#company").value,
        "description": document.querySelector("#description").value,
        "area": document.querySelector("#area").value,
        "startDate": document.querySelector("#startDate").value,
        "endDate": document.querySelector("#endDate").value
       
  
      };

      let postData =  await FetchToPost(profileObjectForPost,this.props.username,this.props.password)
      console.log(postData)

      this.props.closeModal() 





  }

 






}

export default CreateExperience;

// "role": "CTO",
// "company": "Strive School",
// "startDate": "2019-06-16T22:00:00.000Z",
// "endDate": "2019-06-16T22:00:00.000Z",
// "description": "Doing stuff here and there",
// "area": "Berlin",
