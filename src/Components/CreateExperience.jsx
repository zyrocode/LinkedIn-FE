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
            <Form onSubmit={this.postUpdatedDetails}>
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
                  placeholder="Name placeholder"
                />
              </FormGroup>
              <FormGroup>
                <Label>Description</Label>
                <Input
                //   onChange={val => this.setState({ surname: val.target.value })}
                  type="text"
                  id="description"
                  placeholder="Name placeholder"
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
                <label for="time">Start Date</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="startDate"
                  required
                />
              </FormGroup>

              <FormGroup>
                <label for="time">End Date</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="endDate"
                  required
                />
              </FormGroup>

              <Button color="success">Update</Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }




  postUpdatedDetails = async (e)=>{
    e.preventDefault();
    let profileObjectForPost = {

        "role": document.querySelector("#role").value,
        "company": document.querySelector("#company").value,
        "description": document.querySelector("#description").value,
        "area": document.querySelector("#area").value,
        "startDate": document.querySelector("#startDate").value,
        "endDate": document.querySelector("#endDate").value
       
  
      };

      let postData =  await FetchToPost(profileObjectForPost)
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
