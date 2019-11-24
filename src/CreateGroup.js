import React from 'react';
import {Modal, Button} from 'react-bootstrap'
import CreateGroupDescription from'./CreateGroupDescription.js';
import './scss/FindGroups.scss';

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
      <div className="button-create-group">
        <Button variant="warning" size="lg" style={{width:'40%', float:'right'}}
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
      </div>
    );
  }
}

export default CreateGroup;
