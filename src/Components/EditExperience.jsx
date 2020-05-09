import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,  Container
} from "reactstrap";
import PutAPI from "../APIs/PutAPI";
import GetAPI from "../APIs/GetAPI";
import DeleteEachExperienceByID from "../APIs/DeleteEachExperienceByID";
import PostImageExperience from "../APIs/PostImageExperience";
import { connect } from "react-redux"

const mapStateToProps = state => state

class EditExperience extends Component {
  state = {
    isOpen: true,
    role: "",
    company: "",
    description: "",
    area: "",
    startDate: undefined,
    endDate: undefined,
    selectedFile: null,
    noEndDate:false
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
                  onChange={val => this.setState({ role: val.target.value })}
                  value={this.state.role}
                  type="text"
                  id="role1"
                  placeholder="Role"
                />
              </FormGroup>
              <FormGroup>
                <Label>Company</Label>
                <Input
                  onChange={val => this.setState({ company: val.target.value })}
                  value={this.state.company}
                  type="text"
                  id="company1"
                  placeholder="Name placeholder"
                />
              </FormGroup>
              <FormGroup>
                <Label>Description</Label>
                <Input
                  onChange={val => this.setState({ description: val.target.value })}
                  value={this.state.description}
                  type="text"
                  id="description1"
                  placeholder="Name placeholder"
                />
              </FormGroup>
              <FormGroup>
                <Label>Area</Label>
                <Input
                  onChange={val => this.setState({ area: val.target.value })}
                  value={this.state.area}
                  type="text"
                  name="city"
                  id="area1"
                />
              </FormGroup>

              <FormGroup>
                <Label>Start date</Label>
                <Input
                  onChange={val =>
                    this.setState({ startDate: val.target.value })
                  }
                  value={this.state.startDate}
                  type="date"
                  id="startDate1"
                  placeholder={this.state.startDate}
                  required
                />
              </FormGroup>

             
<Container>
  
  <FormGroup check className="m-3">
<Label check>
  <Input type="checkbox"   onChange={()=> this.setState({
    noEndDate: !this.state.noEndDate,
    endDate: null

  })}/>
  I am still currently working there 
  </Label>

</FormGroup>
</Container>

{ !this.state.noEndDate &&

  <FormGroup>
  <Label >End Date</Label>
  <Input
    type="date"
    value ={this.state.endDate} onChange={(e)=>this.setState({endDate:e.currentTarget.value})}
  />
</FormGroup>

}
             

              <FormGroup >

                <Input onChange={(val) => this.setState({ selectedFile: val.target.files[0] })} type="file" name="file" />

              </FormGroup>
              <Button
                color="danger"
                onClick={async () => {
                  await DeleteEachExperienceByID(
                    this.props.id,
                    this.props.details.username,
                    this.props.details.userToken
                  );
                  await this.props.refreshExp()
                  this.props.closeModal();
                }}
              >
                {" "}
                Delete
              </Button>
              <Button color="success">Update</Button>
            </Form>
          </ModalBody>

          {/* <ModalFooter>
          <Form onSubmit={this.uploadImage}>
            <FormGroup >
                
                <Input onChange={(val) => this.setState({selectedFile: val.target.files[0]})}  type="file"  name= "file" />
                <Button color="success" >Change Experience Image</Button>
              </FormGroup>
              </Form>
          </ModalFooter> */}
        </Modal>
      </div>
    );
  }


  // uploadImage = async(e)=>{
  //   e.preventDefault();
  //   let fdExp = new FormData();
  //   fdExp.append("experience", this.state.selectedFile)
  //   let fileUploaded = await PostImageExperience (localStorage.getItem('username'), localStorage.getItem('password'), this.props.id, fdExp)

  //   console.log(fileUploaded) 




  // }






  componentDidMount = async () => {
    let oneUserExperienceProfile = await GetAPI(
      this.props.details.username, this.props.details.userToken,
      'experience',
      '',
      this.props.id
    );

console.log(oneUserExperienceProfile.profileExperience[0].experience)

    this.setState({
      role: oneUserExperienceProfile.profileExperience[0].experience.role,
      company: oneUserExperienceProfile.profileExperience[0].experience.company,
      description: oneUserExperienceProfile.profileExperience[0].experience.description,
      area: oneUserExperienceProfile.profileExperience[0].experience.area,
      startDate: oneUserExperienceProfile.profileExperience[0].experience.startDate.split('T')[0],
      endDate: oneUserExperienceProfile.profileExperience[0].experience.endDate
    });


    console.log("ID here", this.props.id)
  };

  postUpdatedDetails = async e => {
    e.preventDefault();
    this.props.closeModal();
    let editedProfileObject = {
      role: this.state.role,
      company: this.state.company,
      description: this.state.description,
      area: this.state.area,
      startDate: this.state.startDate,
      endDate: this.state.startDate
    };
    await PutAPI(
      this.props.details.username, 
      this.props.details.userToken,
      'experience',
      editedProfileObject,
      this.props.id
    );
    if(this.state.selectedFile) {
      let fdExp = new FormData();
      fdExp.append("imageUrl", this.state.selectedFile)
      await PostImageExperience(this.props.details.username, this.props.details.userToken, this.props.id, fdExp)
    }
    await this.props.refreshExp()
  };
}

export default connect(mapStateToProps) (EditExperience);
