import React, { Component } from "react";
import {storage} from '../firebase/firebase.js';
import {ProgressBar} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import '../scss/UpdateProgress.scss';

class EditProfileImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      show: "",
      image: null,
      status:"info",
      progress: 0
    };

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

  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
      this.setState({status:"info"});
      this.setState({show:"0%"});
    }
  };

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
  };
  componentDidMount(){

  }
  render() {
    return (
      <div className="image-upload">
        <div className="align image">
          <img
            src={this.state.url}
            alt="Profile"
            height="200"
            width="300"
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
