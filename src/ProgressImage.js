import React, { Component } from "react";
import {storage,db} from './firebase/firebase.js';
import {ProgressBar} from 'react-bootstrap';
import {Button} from 'react-bootstrap'
import './scss/UpdateProgress.scss';

class ProgressImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: "",
      progress: 0,
      status:"info",
      show:""
    };
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
    console.log("Update interval"+ this.props.intervalNum)
    const uploadTask = storage.ref(`images/${this.props.uid}/`).child(`work${this.props.intervalNum}.jpg`).put(image);
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
          .ref(`images/${this.props.uid}/`)
          .child(`work${this.props.intervalNum}.jpg`)
          .getDownloadURL()
          .then(url => {
            this.setState({ url });
            console.log("ProgressImage/snapshot")
            console.log(url)
          }).catch( error =>{
            console.log(error);
          });
      }
    );
  };
  render() {
    console.log("ProgressImage/render")
    console.log(this.props.intervalNum)
    return (
      <div className="image-upload">
        <br/>
        <div className="align image">
          <img
            src={this.state.url || "https://via.placeholder.com/200x300"}
            alt="Uploaded Images"
            height="200"
            width="300"
          />
        </div>
        <div className="btn">
          <span>File: </span>
          <input type="file" onChange={this.handleChange} />
        </div>
        <div className="progress-bar">
          <ProgressBar animated now={this.state.progress} variant = {this.state.status} className="progress" label={this.state.show} />
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

export default ProgressImage;
