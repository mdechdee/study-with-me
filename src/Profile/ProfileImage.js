import React, { Component } from "react";
import {storage} from '../firebase/firebase.js';
import {ProgressBar} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import '../scss/UpdateProgress.scss';

class ProfileImage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      url: "",
    };
  }

  componentDidMount(){
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
  
  render(){
    return (
      <div className="profile-image">
          <img
            src={this.state.url}
            alt="profile-image"
            height="200"
            width="300"
          />
      </div>
    );
  }
}

export default ProfileImage;
