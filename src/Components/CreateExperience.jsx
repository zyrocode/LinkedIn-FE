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
  Input,
  Container
} from "reactstrap";
import PostImageExperience from "../APIs/PostImageExperience";
import {connect} from "react-redux"


const mapStateToProps = state => state

class CreateExperience extends Component {
  state = {
    isOpen: true,
    role: "",
    company: "",
    description: "",
    area: "",
    startDate: "",
    endDate: "",
    selectedFile: null,
    noEndDate:false,
    expId:""
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
          <ModalHeader toggle={this.toggleClose}>Add Experience</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.postNewDetails}>
              <FormGroup>
                <Label>Role</Label>
                <Input
                  type="text"
                 value ={this.state.role} onChange={(e)=>this.setState({role:e.currentTarget.value})}
                />
              </FormGroup>
              <FormGroup>
                <Label>Company</Label>
                <Input
                  type="text"
                  value ={this.state.company} onChange={(e)=>this.setState({company:e.currentTarget.value})}
                />
              </FormGroup>
              <FormGroup>
                <Label>Description</Label>
                <Input
                  type="textarea"
                  value ={this.state.description} onChange={(e)=>this.setState({description:e.currentTarget.value})}
                />
              </FormGroup>
              <FormGroup>
                <Label>Area</Label>
                <Input
                  type="city"
                  value ={this.state.area} onChange={(e)=>this.setState({area:e.currentTarget.value})}
                />
              </FormGroup>
              <FormGroup>
                <Label >Start Date</Label>
                <Input
                  type="date"
                  name="date"
                  value ={this.state.startDate} onChange={(e)=>this.setState({startDate:e.currentTarget.value})}
                />
              </FormGroup>


<Container>
  
                <FormGroup check className="m-3">
              <Label check>
                <Input type="checkbox"   onChange={()=> this.setState({
                  noEndDate: !this.state.noEndDate,
  
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

              <Label className="btn btn-secondary">
                  <Input onChange={(val) => this.setState({ selectedFile: val.target.files[0] })} type="file" />
                  Select Image
                </Label>
                {this.state.selectedFile &&
                <Label>
                  {this.state.selectedFile.name}
                </Label>}
                
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

      "role": this.state.role,
      "company": this.state.company,
      "description": this.state.description,
      "area": this.state.area,
      "startDate": this.state.startDate,
      "endDate": this.state.endDate


    };
    let newPostResponse = await PostAPI(this.props.details.username, this.props.details.userToken, 'experience',profileObjectForPost)

    this.setState({
      expId: await newPostResponse._id
    })
    console.log(await newPostResponse._id)

    if(this.state.selectedFile){

      let fdataExp = new FormData();
      fdataExp.append("imageUrl", this.state.selectedFile)
      await PostImageExperience (this.props.details.username, this.props.details.userToken, await newPostResponse._id, fdataExp)
    }

    // this.props.updatexp()
    await this.props.refreshExp()
    this.props.closeModal()
  }

}
export default connect(mapStateToProps)(CreateExperience);