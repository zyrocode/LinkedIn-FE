import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import PutAPI from "../APIs/PutAPI"
import GetAPI from "../APIs/GetAPI"
import PostImageAPI from '../APIs/PostImageAPI';
import {connect}  from "react-redux"


const mapStateToProps = state => state

class UpdateUser extends Component {
  state = {
    isOpen: true,
    name: "",
    surname: "",
    email: "",
    bio: "",
    area: "",
    password: "",
    selectedFile: null
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
          <ModalHeader toggle={this.toggleClose}>Update Info</ModalHeader>
          <ModalBody>

            <Form onSubmit={this.postUpdatedDetails}>
              <FormGroup>
                <Label>Email</Label>
                <Input onChange={(val) => this.setState({ email: val.target.value })} value={this.state.email} type="email" id="email" />
              </FormGroup>
              <FormGroup>
                <Label>First Name</Label>
                <Input onChange={(val) => this.setState({ name: val.target.value })} value={this.state.name} type="text" id="name" />
              </FormGroup>
              <FormGroup>
                <Label>Surname</Label>
                <Input onChange={(val) => this.setState({ surname: val.target.value })} value={this.state.surname} type="text" id="surname" />
              </FormGroup>
              <FormGroup>
                <Label>Bio</Label>
                <Input onChange={(val) => this.setState({ bio: val.target.value })} value={this.state.bio} type="textarea"  id="bio" />
              </FormGroup>
              <FormGroup>
                <Label>Area</Label>
                <Input onChange={(val) => this.setState({ area: val.target.value })} value={this.state.area} type="city" name="city" id="area" />
              </FormGroup>
              <FormGroup>
                <Label className="btn btn-secondary">
                  <Input onChange={(val) => this.setState({ selectedFile: val.target.files[0] })} type="file" />
                  Select Image
                </Label>
                {this.state.selectedFile &&
                <Label>
                  {this.state.selectedFile.name}
                </Label>}
              </FormGroup>
              <Button color="primary">Update Info</Button>
            </Form>
            <hr/>
            {/* <Form onSubmit={this.uploadImage}>
              
              <FormGroup>
                <Button color="primary" >Update Profile Image</Button>
              </FormGroup>
            </Form> */}
          </ModalBody>
        </Modal>
      </div>
    );
  }

  uploadImage = async () => { 
  
    let fd = new FormData();
    fd.append("profileImg", this.state.selectedFile)
    await PostImageAPI(this.props.details.username, this.props.details.userToken, fd, 'profile')
  }

initialiseState =async()=>{
  let userProfile = await GetAPI(this.props.details.username, this.props.details.userToken, 'profile')

    this.setState({
      name: userProfile.firstname,
      surname: userProfile.surname,
      email: userProfile.email,
      bio: userProfile.bio,
      area: userProfile.area,
      title: userProfile.title,
      id: userProfile._id
    })
}

  componentDidMount = async () => {
    await this.initialiseState()
  }

  postUpdatedDetails = async (e) => {
    e.preventDefault();
    let profileObject = {

      firstname: this.state.name,
      surname: this.state.surname,
      email: this.state.email,
      bio: this.state.bio,
      area: this.state.area,
      title:this.state.title

    };
    await PutAPI(this.props.details.username, this.props.details.userToken, 'profile', profileObject, this.state.id)

    await this.uploadImage()
    this.props.closeModal()

    await this.props.refresh()
  }
}

export default connect(mapStateToProps)(UpdateUser);