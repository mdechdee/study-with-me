import React from 'react';
import {Modal, Button} from 'react-bootstrap'
import CreateGroupDescription from'./CreateGroupDescription.js';

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
      <div>
        <Button onClick={this.handleShow}> Create a group </Button>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title> <h3>Create a group</h3> {this.props.popup_id} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CreateGroupDescription/>
              <Button variant="warning" offset={100}> Create </Button>
              <Button variant="danger" offset={100} onClick={this.handleClose}> Cancel </Button>
            </Modal.Body>
          </Modal>
      </div>
    );
  }
}

export default CreateGroup;
