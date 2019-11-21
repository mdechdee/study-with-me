import React, { Component } from "react";
import {storage} from '../firebase/firebase.js';
import {ProgressBar} from 'react-bootstrap';
import {Button} from 'react-bootstrap'
import '../scss/UpdateProcess.scss';

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: "",
      progress: 0,
      status:"info"
    };
  }

  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  };

  handleUpload = () => {
    const { image } = this.state;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
        if(progress==100){
          this.setState({status: "success"})
        }
      },
      error => {
        // Error function ...
        console.log(error);
      },
      () => {
        // complete function ...
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            this.setState({ url });
          });
      }
    );
  };
  render() {
    return (
      <div className="image-upload">
        <br/>
        <div className="file-fill">
          {this.checkImage()}
          <input type="file" onChange={this.handleChange} className="hide_input"/>
        </div>
          <div className="progress-bar">
          <ProgressBar animated now={this.state.progress} variant = {this.state.status} className="progress" label={this.state.progress+'%'} />
        </div>
        <br />
      
        <Button variant = "outline-primary"
          onClick={this.handleUpload}
          className="waves-effect waves-light btn"
        >
          Upload
        </Button>
        <br />
        <br />
      </div>
    );
  }
}

export default ImageUpload;