import React from 'react';
import {Row, Col, Form, Modal, Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {toast} from 'react-toastify';
import { db } from './firebase/firebase.js';
import './scss/JoinGroup.scss';

class JoinGroup extends React.Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fillAll = this.fillAll.bind(this);
    this.state = {
      goal:'',
      peopleKey:''
    };
  }

  handleChange(event) {
    this.setState({goal: event.target.value});
  }

  handleSubmit(event) {
    if(this.state.goal==="") {
      this.fillAll();
      return
    }
    var peopleRef =  db.ref('groups/' + this.props.name + '/people');
    var newMemberRef = peopleRef.child(`${this.props.uid}`);
    newMemberRef.set({
      goal: this.state.goal,
      progress: '',
      numberCheer: '',
    });
    var userRef =  db.ref('users/' + this.props.uid);
    userRef.update({
      group: this.props.name
    })
    alert('Goal: ' + this.state.goal);
    //event.preventDefault();
  }

  fillAll() {
		toast("Please fill out all necessary information.", {
			position: toast.POSITION.TOP_CENTER
		});
	}

  render(){
    return(
      <div>
          <Modal size="sm" show={this.props.show} onHide={this.props.handleClose}>

            <Modal.Header>
              <Modal.Title>
                <div sm={10} className="join-title"> Join Group {this.props.popup_id} </div>
                <FontAwesomeIcon icon='times-circle' className='join-close-icon' onClick={this.props.handleClose}/>
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Row>
                <Col className="form-font" xs={2}> Goal: </Col>
                <Col xs={9}>
      						<Form>
      						  	<Form.Group controlId="group-name">
      							    <Form.Control className="form-font" onChange={this.handleChange} />
      						  	</Form.Group>
      						</Form>
      					</Col>
                <div className="mute-font">*Your goal should be evaluable.
                Ex: I will finish mock exam within 3 hours.
                You must update your progress each interval.</div>
              </Row>

              <Button variant="success"
                    className="join-button"
                    onClick={this.handleSubmit}
              > Join </Button>

              <Button variant="danger"
                    className="cancel-button"
                    onClick = {this.props.handleClose}
              > Cancel </Button>

            </Modal.Body>
          </Modal>
      </div>
    );
  }
}

export default JoinGroup;
