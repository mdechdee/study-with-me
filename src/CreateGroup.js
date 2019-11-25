import React from 'react';
import {Modal, Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CreateGroupDescription from'./CreateGroupDescription.js';
import { db } from './firebase/firebase.js';
import './scss/CreateGroup.scss';

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
              <div className='custom-close-label'>close</div>
            </Modal.Header>
            <Modal.Body>
              <CreateGroupDescription uid={this.props.uid} handleClose={this.handleClose}/>
            </Modal.Body>
          </Modal>
      </React.Fragment>
    );
  }
}

export default CreateGroup;
