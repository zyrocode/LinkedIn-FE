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
  import FetchEachExperienceByID from "../APIs/FetchEachExperienceByID";
  import DeleteEachExperienceByID from "../APIs/DeleteEachExperienceByID";


  


class EditExperience extends Component {
    state = { 
        isOpen: true,
     role: "",
     company: "",
     description: "",
     area: "",
     startDate: undefined,
     endDate: undefined
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
                onChange={val => this.setState({ role: val.target.value })} value=
                
                
                
                {this.state.role}
                  type="text"
                  id="role1"
                  placeholder="Role"
                />
              </FormGroup>
              <FormGroup>
                <Label>Company</Label>
                <Input
                onChange={val => this.setState({ name: val.target.value })} value={this.state.company}
                  type="text"
                  id="company1"
                  placeholder="Name placeholder"
                />
              </FormGroup>
              <FormGroup>
                <Label>Description</Label>
                <Input
               onChange={val => this.setState({ surname: val.target.value })} value={
                this.state.description
              }
                  type="text"
                  id="description1"
                  placeholder="Name placeholder"
                />
              </FormGroup>
              <FormGroup>
                <Label>Area</Label>
                <Input
                onChange={val => this.setState({ area: val.target.value })} value={this.state.area}
                  type="text"
                  name="city"
                  id="area1"
                />
              </FormGroup>



              <FormGroup>
              <Label >StartDate</Label>
        <Input
        onChange={(val) => this.setState({startDate: val.target.value})} value={this.state.startDate}
          type="date"
         
          id="startDate1"
          placeholder={this.state.startDate}
          required/>
              </FormGroup>

              <FormGroup>
              <Label >StartDate</Label>
        <Input
        onChange={(val) => this.setState({endDate: val.target.value})} value={
          
          
          this.state.endDate
        }
          type="date"
          
          id="endDate1"
          placeholder="2019-12-12T00:00:00.000Z"
          required/>
              </FormGroup>

              <Button color="success">Update</Button>
              <Button color="danger" onClick={async() => {
                  await DeleteEachExperienceByID(this.props.id,this.props.username, this.props.password)
              this.props.closeModal()}}>  Delete</Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>   




       );
    }


    componentDidMount = async () => {
        let oneUserExperienceProfile = await FetchEachExperienceByID(this.props.id, this.props.username, this.props.password)
        console.log("new dates", oneUserExperienceProfile)
      
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
    
            "role": document.querySelector("#role1").value,
            "company": document.querySelector("#company1").value,
            "description": document.querySelector("#description1").value,
            "area": document.querySelector("#area1").value,
            "startDate": this.state.startDate,
            "endDate": this.state.startDate
           
      
          };
    
            await FetchToUpdateExperience (this.props.id, editedProfileObject,this.props.username, this.props.password)
            this.props.closeModal()





        }


}
 
export default EditExperience;