import React, { Component } from "react";
import {storage,db} from '../firebase/firebase.js';
import { Container, Button, ProgressBar } from 'react-bootstrap';
import Avatar from 'react-avatar-edit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../scss/Profile.scss';

class EditProfileImage extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
    this.fetchCurrentPic = this.fetchCurrentPic.bind(this)
    this.onCrop = this.onCrop.bind(this)
    this.onClose = this.onClose.bind(this)
    this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this)

    this.state = {
      image: null,
      urlImg: "",
      urlCroppedImg: "",
      show: "",
      status:"info",
      progress: 0,
      urlUploadImg: null,
      urlCroppedUploadImg: null,
    };
  }

  onClose() {
    this.setState({preview: null})
  }

  onCrop(preview) {
    this.setState({urlCroppedUploadImg:preview})
  }

  onBeforeFileLoad(elem) {
    console.log(elem.target.files[0])
    this.setState({image: elem.target.files[0],status:"info",show:"0%"})
  }

  fetchCurrentPic(){
    storage
      .ref(`images/${this.props.uid}`)
      .child("profile.jpg")
      .getDownloadURL()
      .then(url => {
        this.setState({urlImg: url, urlUploadImg: url});
      }).catch( error =>{
          this.setState({urlImg:"https://via.placeholder.com/300x200", urlUploadImg:"https://via.placeholder.com/300x200"})
    });


    db.ref(`users/${this.props.uid}`).once('value').then((snapshot) =>{
      var val = snapshot.val()
      if(val.CroppedImg !== undefined){
        this.setState({urlCroppedImg: val.CroppedImg})
      }
    })
  }

  handleChange(e){
    if (e.target.files[0]) {
      const image = e.target.files[0];
      console.log(image)
      this.setState(() => ({ image }));

    }
  }

  handleUpload() {
    const image = this.state.image;
    const uploadTask = storage.ref(`images/${this.props.uid}/profile.jpg`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        // progress function ...
        const progress_current = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress: progress_current});
        this.setState({ show: progress_current+"%"});
        if(progress_current===100){
          this.setState({status: "success",show:"success"});
        }
      },
      error => {
        // Error function ...
        console.log(error);
      },
      () => {
        // complete function ...
        storage
          .ref(`images/${this.props.uid}`)
          .child("profile.jpg")
          .getDownloadURL()
          .then(url => {
            this.setState({ url });
          }).catch( error =>{
            console.log(error);
          });
      }
    );
    db.ref(`users/${this.props.uid}`).update({CroppedImg: this.state.urlCroppedUploadImg})
  }

  componentDidMount(){
    this.fetchCurrentPic()
  }

  render() {
    return (
      <Container className="image-upload">
        <div className="align image">
          <div className="content-center">
            <Avatar
              width={250}
              height={250}
              onCrop={this.onCrop}
              onClose={this.onClose}
              onBeforeFileLoad={this.onBeforeFileLoad}
              src={this.state.urlUploadImg}
            />
          </div>
          <img className="file-font"
            src={this.state.urlCroppedUploadImg}
            alt="Preview"
          />
        </div>
        <div className="progress-bar">
          <ProgressBar animated now={this.state.progress} variant = {this.state.status} className="progress" label={this.state.show} />
        </div>
        <div className="content-center">
          <Button variant = "outline-info"
                onClick={this.handleUpload}
                className="upload-button"
          > <FontAwesomeIcon icon='upload'/>
            Upload
          </Button>
        </div>

      </Container>
    );
  }
}

export default EditProfileImage;
