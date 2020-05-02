import React, { Component } from 'react';
import GetAPI from '../APIs/GetAPI';
import { Label, Alert, Container, Col, Fade, Row, Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from 'reactstrap'
import { Link } from 'react-router-dom'
import PostAPI from '../APIs/PostAPI'
import PostImageAPI from '../APIs/PostImageAPI'
import Moment from "react-moment";
import Loading from './Loading';
import DeletePostAPI from '../APIs/DeletePostAPI'
import { connect } from "react-redux"
import SideBarProfile from './SideBarProfile';
import PutAPI from "../APIs/PutAPI"
import EditAndDeletePost from './EditAndDeletePost';
import CommentSection from './CommentSection';


const mapStateToProps = state => state


class NewsFeed extends Component {
    state = {
        posts: [],
        numberPosts: 15,
        isLoading: true,
        createOpen: false,
        editOpen: false,
        personalProfile: undefined,
        createPostText: undefined,
        createPostImage: undefined,
        createPostError: false,
        editPostText: undefined,
        editPostId: undefined,
        
    }

    openForEdit = (text, id)=>{
        this.setState({
            editOpen: true,
            editPostText: text,
            editPostId: id
        })
    }

    toggle =()=>{
        this.setState({
            popoverOpen: !this.state.popoverOpen
        })
    }

    render() {
        return (
            <>
                {this.state.isLoading
                    ?
                    <Loading />
                    :
                    <Fade >
                        <Container fluid style={{padding:"2em 3em 2em 5em"}}>
                            <Row>
                                <div className="col-lg-2 col-md-3 d-none d-sm-block">
                                
                               
                           <SideBarProfile  {...this.state.personalProfile}/>
                            </div>
                                <Col className="col-lg-7 col-md-8">
                                
                               
                        <Container style={{ maxWidth: '700px' }}>
                            <Row>
                                <Col className="mx-auto">
                                    <Row>
                                        <Col className="create-news-feed">
                                            <div onClick={() => this.setState({ createOpen: !this.state.createOpen })}>
                                                <i className="fas fa-edit"></i>
                                                <span style={{ color: 'black', padding: '10px', fontWeight: '600', fontSize: '20px' }}>Create a new</span>
                                            </div>
                                            <Modal toggle={() => this.setState({ createOpen: !this.state.createOpen })} isOpen={this.state.createOpen} >
                                                <ModalHeader toggle={() => this.setState({ createOpen: !this.state.createOpen })} style={{ backgroundColor: '#0073b1', color: 'white' }}>Create Post</ModalHeader>
                                                <ModalBody>
                                                    {this.state.personalProfile
                                                        ?
                                                        < img className='newsfeed-pic' src={this.state.personalProfile.imageUrl} alt='profile pic' />
                                                        :
                                                        <img className='newsfeed-pic' src='src="https://www.shareicon.net/data/512x512/2015/10/02/649910_user_512x512.png"' alt='profile pic' />
                                                    }
                                                    {this.state.personalProfile &&
                                                        <>
                                                            <span style={{ color: 'black', padding: '10px', fontWeight: '600' }}>{this.state.personalProfile.firstname}{" "}{this.state.personalProfile.surname}</span>
                                                            {this.state.createPostError &&
                                                                <Alert className="m-2" color="danger">Add a description</Alert>
                                                            }
                                                            <Input onChange={(val) => this.setState({
                                                                createPostText: val.target.value
                                                            })} type="textarea" placeholder='What would you like to talk about?' style={{ borderColor: 'white' }} />
                                                            <Label className="btn btn-secondary">
                                                                <Input onChange={(val) => this.setState({ createPostImage: val.target.files[0] })} type="file" />
                                                                Select Image
                                                            </Label>
                                                            {this.state.createPostImage &&
                                                                <Label>
                                                                    {this.state.createPostImage.name}
                                                                </Label>}
                                                        </>
                                                    }
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button onClick={() => this.publishPost()} color="primary" >Publish</Button>
                                                </ModalFooter>
                                            </Modal>
                                        </Col>
                                    </Row>
                                    <Modal toggle={() => this.setState({ editOpen: !this.state.editOpen })} isOpen={this.state.editOpen} >
                                        <ModalHeader toggle={() => this.setState({ editOpen: !this.state.editOpen })} style={{ backgroundColor: '#0073b1', color: 'white' }}>Edit Post</ModalHeader>
                                        <ModalBody>
                                            {this.state.personalProfile
                                                ?
                                                < img className='newsfeed-pic' src={this.state.personalProfile.imageUrl} alt='profile pic' />
                                                :
                                                <img className='newsfeed-pic' src='src="https://www.shareicon.net/data/512x512/2015/10/02/649910_user_512x512.png"' alt='profile pic' />
                                            }
                                            {this.state.personalProfile &&
                                                <>
                                                    <span style={{ color: 'black', padding: '10px', fontWeight: '600' }}>{this.state.personalProfile.firstname}{" "}{this.state.personalProfile.surname}</span>
                                                    <Input onChange={(val) => this.setState({
                                                        editPostText: val.target.value
                                                    })} type="textarea" value={this.state.editPostText} style={{ borderColor: 'white' }} />
                                                    {/*  <Input onChange={(val) => this.setState({ createPostImage: val.target.files[0] })} type="file" /> */}
                                                </>
                                            }
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button onClick={() => this.editPost()} color="primary" >Update</Button>
                                        </ModalFooter>
                                    </Modal>
                                    {this.state.posts.length > 0 &&  this.state.posts.slice(0, this.state.numberPosts)
                                        .map((post) =>
                                            <Row key={post._id} className="news-feed">
                                                <Col>
                                                    
                                                        <Row style={{padding: "1.5em 1.5em 0.3em 1.5em"}}>
                                                        <Link to={"/profile/" + post.username}> <img className="newsfeed-pic" src={post.userImage} alt="newsfeed post pic" style={{objectFit: "cover"}} />  </Link>
                                                            <Col>
                                                            <Link to={"/profile/" + post.username}> <span style={{ color: 'black', paddingLeft: '10px', fontWeight: '700' }}>{post.firstname}{" "}{post.surname}</span> <br/>
                                                            {post.userInfo.title || post.title
                                                            ? <span style={{ color: 'black', paddingLeft: '10px', fontWeight: '400' }}>{post.userInfo.title || post.title}</span>
                                                            : null}
                                                             </Link>
                                                                <Row >
                                                                    <Moment fromNow className="time-date">{post.updatedAt}</Moment>
                                                                    {/* <Moment className="time-date" date={post.updatedAt} format="HH:mm DD/MM" /> */}
                                                                </Row>
                                                            </Col>
                                                            <Col xs="2">
                                                            { post.username ===  this.props.details.username &&
                                                         <EditAndDeletePost {...post} openForEdit={this.openForEdit} removePost ={this.removePost} {...this.state} toggle={this.toggle} />
                                                    }

                                                            </Col>
                                                        </Row>
                                                   
                                                  

                                                    
                                                    {/* {post._edit &&
                                                        <>
                                                            <i onClick={() =>
                                                                this.setState({
                                                                    editOpen: true,
                                                                    editPostText: post.text,
                                                                    editPostId: post._id
                                                                })} className="fa fa-pencil"></i>
                                                            <i onClick={() => this.removePost(post._id)} className="far fa-trash-alt"></i>
                                                        </>} */}
                                                    <Row>
                                                        <p style={{ padding: "3px 3px 3px 18px"}}>{post.text}</p>
                                                    </Row>
                                                    {post.image ? <hr className="m-1"/> : null}
                                                    <Row style={{ backgroundColor: '#dddddd7c', borderRadius: '5px' }}>
                                                        
                                                        {post.image &&
                                                            <img className="newsfeed-img img-fluid mx-auto " src={post.image} alt='news feed' />}    
                                                    </Row>
                                                    <hr className="m-1"/>
                                                    
                                                    <span className="text-black-50"> <i className="fas fa-thumbs-up postButtons"></i> like  </span>
                                                    &nbsp;&nbsp;
                                                    <span className="text-black-50"><i className="fas fa-comment postButtons"></i> comment </span>
                                                   
                                                    
                                                    
                                                     {   <CommentSection {...this.state.personalProfile} post={post}/>}
                                                    
                                                

                                                </Col>
                                            </Row>)
                                    }
                                    <Row>
                                        <Col style={{ textAlign: 'center' }}>
                                           {this.state.numberPosts.length > 20 && <Button onClick={() => this.setState({ numberPosts: this.state.numberPosts + 15 })} color="primary">LOAD MORE</Button>}
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                        </Col>
                            </Row>
                        </Container>
                    </Fade>

                }
            </>
        );
    }

    componentDidMount = async () => {
        let getPosts = await GetAPI(this.props.details.username, this.props.details.userToken, 'posts')
        let { posts } = getPosts
        //     console.log( posts ,"old")
        //    let z = posts.map( ({ username })=> username)
        // //    z[0] = "hello"
        // z =[ {h:1},...z]
        // let u = z[0]
        // let { h } = u
        //      console.log(z,h,"new")
        if(getPosts){
            // let posts = getPosts.posts
            posts.forEach( post => {
                // let oneUser = post.username
                // let profile = await GetAPI(this.props.details.username, this.props.details.userToken, 'profile', oneUser)
                
                post.firstname = post.userInfo.firstname
                post.surname = post.userInfo.surname
                if (localStorage.getItem('username') === post.username)
                    post._edit = "true"
                    post.userInfo.imageUrl
                    ?
                    post.userImage = post.userInfo.imageUrl
                    :
                    post.userImage = "https://www.shareicon.net/data/512x512/2015/10/02/649910_user_512x512.png"
                // this.setState({
                //     posts: [...this.state.posts, post]
                    
                // })
                //could have been destructured as posts: [... post, ...this.state.posts]
            })
            posts.sort((a, b) => {
                return new Date(b.updatedAt) - new Date(a.updatedAt)
            })
           
            this.setState({
               
                isLoading: false,
                posts: posts
            })
        }
        else{
            this.setState({
               
                isLoading: false,
                posts: []
            })
        }

        let personalProfile = await GetAPI(this.props.details.username, this.props.details.userToken, 'profile')
        this.setState({
            personalProfile: personalProfile
           
        })

    }
    editPost =async ()=>{
        try {
            
            let editText = {text: this.state.editPostText}
            
          const editResp =   await PutAPI(this.props.details.username, this.props.details.userToken, "", editText, this.state.editPostId)
          /**
           * Using map && some method
           */  
        //   const updatedArray = this.state.posts.map((onePost)=>{
        //       let idPresent = this.state.posts.find(post=> post._id === this.state.editPostId )
        //       console.log(idPresent,"some")
        //       return idPresent
        //       ? {...onePost,text: this.state.editPostText }
        //       : onePost
        //   })
            let updatedArray = [...this.state.posts]
        let updatedPostIndex = this.state.posts.findIndex(post=> post._id === this.state.editPostId)
        console.log(updatedArray[updatedPostIndex], "indexOf")
        updatedArray[updatedPostIndex]["text"] = editResp.text 
    
        /**
         * One line to pass in the array update 
         *   
        // this.setState({posts: [...this.state.posts.slice(0, updatedPostIndex -1), editResp, ...this.state.posts.slice(updatedPostIndex)]})
         */
        
       

          if(editResp)
           this.setState({
            posts: updatedArray,
            editOpen: !this.state.editOpen
            })
         
        } catch (error) {
            console.log(error)
        }

    }

    removePost = async (id) => {
        await DeletePostAPI(this.props.details.username, this.props.details.userToken, id)
        this.setState({ posts: this.state.posts.filter(post => post._id !== id) })
    }

    publishPost = async () => {
        if (this.state.createPostText) {
            this.setState({
                createOpen: false,
                createPostError: false
            })
            let postObject = {
                text: this.state.createPostText
            }
            let response = await PostAPI(this.props.details.username, this.props.details.userToken, 'post', postObject)
            console.log(response,"newPost")
            if (this.state.createPostImage) {
                let fd = new FormData();
                fd.append("post", this.state.createPostImage)
                await PostImageAPI(this.props.details.username, this.props.details.userToken, fd, 'post', response._id)
            }
            let post = await GetAPI(this.props.details.username, this.props.details.userToken, 'post', '', response._id)
            post.firstname = this.state.personalProfile.firstname
            post.surname = this.state.personalProfile.surname
            post.title = this.state.personalProfile.title
            post._edit = true
            this.state.personalProfile.imageUrl
                ?
                post.userImage = this.state.personalProfile.imageUrl
                :
                post.userImage = "https://www.shareicon.net/data/512x512/2015/10/02/649910_user_512x512.png"
            // this.state.posts.unshift(post)
            
            this.setState({
                createOpen: false,
                createPostError: false,
                createPostImage: undefined,
                createPostText: undefined,
                posts: [post,...this.state.posts]
            })
        } else {
            this.setState({ createPostError: true })
        }
    }
}

export default connect(mapStateToProps) (NewsFeed);