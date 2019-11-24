import React from 'react';
import {Modal, Button} from 'react-bootstrap'
import CreateGroupDescription from'./CreateGroupDescription.js';
import { db } from './firebase/firebase.js';

class CreateGroup extends React.Component {
  constructor(props){
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {show: false};
  }

  handleClose(){
    this.setState({show: false});
  }

  handleShow(){
    this.setState({show: true});
  }

  render(){
    return(
      <React.Fragment>
        <Button variant="warning" size="lg"
        disabled={this.props.disabled}
        onClick={this.handleShow}> Create a group </Button>
          <Modal size="sm" show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title> <h3>Create a group</h3> {this.props.popup_id} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CreateGroupDescription handleClose={this.handleClose} />
            </Modal.Body>
          </Modal>
      </React.Fragment>
    );
  }
}

export default CreateGroup;
