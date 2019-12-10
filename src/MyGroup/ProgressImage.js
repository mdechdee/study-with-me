import React, { Component } from "react";
import {storage} from '../firebase/firebase.js';
import {Container, ProgressBar} from 'react-bootstrap'
import '../scss/UpdateProgress.scss';

class ProgressImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: "",
      progress: 0,
      status:"info",
      show:""
      //uid = this.props.uid
      //intervalNum = this.props.intervalNum
      //groupName = this.props.groupName
    };
  }

  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState({status:"info"});
      this.setState({show:"0%"});
      this.setState(() => ({ image }), () => {this.handleUpload()});
    }
  }

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
    return (
      <Container className="image-upload">
        <img
          src={this.state.url || "https://via.placeholder.com/300x200"}
          alt="Uploaded Images"
          className="img" />
        <input className="hide_input" type="file" accept="image/*" onChange={this.handleChange} />
        <ProgressBar animated now={this.state.progress} variant = {this.state.status} className="progress" label={this.state.show} />
      </Container>
    );
  }
}

export default ProgressImage;
