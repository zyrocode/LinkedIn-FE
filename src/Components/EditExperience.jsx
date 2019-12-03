import React, { Component } from 'react';
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
  import FetchToUpdateExperience  from "../APIs/FetchToUpdateExperience";
  import FetchEachExperienceByID from "../APIs/FetchEachExperienceByID"
  import DeleteEachExperienceByID from "../APIs/DeleteEachExperienceByID"


class EditExperience extends Component {
    state = { 
        isOpen: true,
    role: "",
    company: "",
    description: "",
    area: "",
    startDate: "",
    endDate: ""
     }



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
                onChange={val => this.setState({ role: val.target.value })} value={this.state.role}
                  type="text"
                  id="role"
                  placeholder="Role"
                />
              </FormGroup>
              <FormGroup>
                <Label>Company</Label>
                <Input
                onChange={val => this.setState({ name: val.target.value })} value={this.state.company}
                  type="text"
                  id="company"
                  placeholder="Name placeholder"
                />
              </FormGroup>
              <FormGroup>
                <Label>Description</Label>
                <Input
               onChange={val => this.setState({ surname: val.target.value })} value={this.state.description}
                  type="text"
                  id="description"
                  placeholder="Name placeholder"
                />
              </FormGroup>
              <FormGroup>
                <Label>Area</Label>
                <Input
                onChange={val => this.setState({ area: val.target.value })} value={this.state.area}
                  type="text"
                  name="city"
                  id="area"
                />
              </FormGroup>

              <FormGroup>
                <label for="time">Start Date</label>
                <input
                onChange={(val) => this.setState({startDate: val.target.value})} value={this.state.startDate}
                  type="datetime-local"
                  className="form-control"
                  id="startDate"
                  required
                />
              </FormGroup>

              <FormGroup>
                <label for="time">End Date</label>
                <input
                onChange={(val) => this.setState({endDate: val.target.value})} value={this.state.endDate}
                  type="datetime-local"
                  className="form-control"
                  id="endDate"
                  required
                />
              </FormGroup>

              <Button color="success">Update</Button>
              <Button color="danger" onClick={async() => {
                  await DeleteEachExperienceByID(this.props.id)
              this.props.closeModal()}}>  Delete</Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>   




       );
    }


    componentDidMount = async () => {
        let oneUserExperienceProfile = await FetchEachExperienceByID(this.props.id)
        console.log(oneUserExperienceProfile)
    
        this.setState({
            role: oneUserExperienceProfile.role,
            company: oneUserExperienceProfile.company,
            description: oneUserExperienceProfile.description,
            area: oneUserExperienceProfile.area,
            startDate: oneUserExperienceProfile.startDate,
            endDate: oneUserExperienceProfile.endDate
        })

    
      }




      
      






    postUpdatedDetails = async (e)=>{
        e.preventDefault();
        let editedProfileObject = {
    
            "role": document.querySelector("#role").value,
            "company": document.querySelector("#company").value,
            "description": document.querySelector("#description").value,
            "area": document.querySelector("#area").value,
            "startDate": document.querySelector("#startDate").value,
            "endDate": document.querySelector("#endDate").value
           
      
          };
    
            await FetchToUpdateExperience (this.props.id, editedProfileObject)
            this.props.closeModal()





        }


}
 
export default EditExperience;