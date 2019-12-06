import React, { Component } from "react";
import {storage} from '../firebase/firebase.js';
import {ProgressBar} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import Avatar from 'react-avatar-edit';
import '../scss/UpdateProgress.scss';

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
      url: "",
      show: "",
      image: null,
      status:"info",
      progress: 0,
      preview: null,
    };
  }

  onClose() {
    this.setState({preview: null})
  }

  onCrop(preview) {
    this.setState({preview})
  }

  onBeforeFileLoad(elem) {
    if(elem.target.files[0].size > 71680){
      alert("File is too big!");
      elem.target.value = "";
    };
  }

  fetchCurrentPic(){
    storage
      .ref(`images/${this.props.uid}`)
      .child("profile.jpg")
      .getDownloadURL()
      .then(url => {
        this.setState({ url });
      }).catch( error =>{
          this.setState({url:"https://via.placeholder.com/300x200"})
    });
  }

  handleChange(e){
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
      this.setState({status:"info"});
      this.setState({show:"0%"});
    }
  }

  handleUpload = () => {
    const { image } = this.state;
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
  }

  componentDidMount(){
    this.fetchCurrentPic()
  }

  render() {
    return (
      <div className="image-upload">
        <div className="align image">
          <Avatar
            width = {390}
            height={295}
            onCrop={this.onCrop}
            onClose={this.onClose}
            onBeforeFileLoad={this.onBeforeFileLoad}
            src={this.state.url}
          />
          <img
            src={this.state.preview}
            alt="Preview"
          />
        </div>
        <div className="progress-bar">
          <ProgressBar animated now={this.state.progress} variant = {this.state.status} className="progress" label={this.state.show} />
        </div>
        <div className="btn-zone">
          <div className="file-box">
            <input type="file" name="ccc" onChange={this.handleChange} />
          </div>
          <Button variant = "outline-info"
                onClick={this.handleUpload}
                className="upload-button waves-effect waves-light btn"
          >
            Upload
          </Button>
        </div>

      </div>
    );
  }
}

export default EditProfileImage;
