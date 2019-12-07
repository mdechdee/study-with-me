import React, { Component } from "react";
import {db} from '../firebase/firebase.js';
import '../scss/Profile.scss';

class ProfileImage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      url: "",
    };
  }

  componentDidMount(){
    db.ref(`users/${this.props.uid}`).on('value', (snapshot)=>{
      var val = snapshot.val()
      if(val.CroppedImg !== undefined){
        this.setState({url:val.CroppedImg})
      }
      else{
        this.setState({url:"https://via.placeholder.com/300x200"})
      }
    })
  }

  render(){
    return (
      <div className="profile-image">
          <img
            src={this.state.url}
            alt="profile"
            height="200"
            width="200"
          />
      </div>
    );
  }
}

export default ProfileImage;
