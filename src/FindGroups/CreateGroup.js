import React from 'react';
import {Modal, Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CreateGroupDescription from'./CreateGroupDescription.js';
import '../scss/CreateGroup.scss';

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
            <Modal.Header>
              <Modal.Title>
                <div sm={10} className="create-title"> Create a group </div>
                <FontAwesomeIcon icon='times-circle' className='custom-close-icon' onClick={this.handleClose}/>
              </Modal.Title>
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
