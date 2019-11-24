import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { auth } from '../firebase';
import AuthContext from './AuthContext.js';

class Signout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: this.props.auth,
      redirect: false,
    };
  }


  componentDidMount(){
    if(!this.state.auth){
      setTimeout(() => {
        this.setState({ redirect: true})
      }, 3000);
    }
  }

  handleSignOut () {
    auth
      .doSignOut()

  }

  render(){
      if(this.state.auth){
          this.handleSignOut()
          return(<p>Signin out!</p>)
      }
      else{
          return (<Redirect to='/login' />)
      }
  }

}


export default Signout;
