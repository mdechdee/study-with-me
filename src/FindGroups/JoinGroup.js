import React from 'react';
import {Row, Col, Form, Modal, Button} from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {toast} from 'react-toastify';
import { db } from '../firebase/firebase.js';
import '../scss/JoinGroup.scss';

class JoinGroup extends React.Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fillAll = this.fillAll.bind(this);
    this.redirect = this.redirect.bind(this)
    this.updateGroup = this.updateGroup.bind(this)
    this.state = {
      goal:'',
      peopleKey:'',
      isGroupUpdated:false,
      isUserUpdated:false
    };

  }

  handleChange(event) {
    this.setState({goal: event.target.value});
  }

  updateUser(){
    var userRef =  db.ref('users/' + this.props.uid);
    userRef.update({
      group: this.props.name
    })

    userRef.once('value').then(
      (snapshot) =>{
        var val = snapshot.val();
        var groupJoined = 1
        if(val.groupJoined !== undefined){
          groupJoined = val.groupJoined+1
        }
        userRef.update({
          groupJoined: groupJoined
        })
        this.setState({isUserUpdated: true})
      }
    )
  }
  updateGroup(){
    if(this.state.goal==="") {
      this.fillAll();
      return
    }
    var groupRef =  db.ref('groups/' + this.props.name);
    var peopleRef =  db.ref('groups/' + this.props.name + '/people');
    var newMemberRef = peopleRef.child(`${this.props.uid}`);
    var _peopleNum = 1;
    var _progressUpdateFlag = 1;
    groupRef.once('value').then( snapshot => {
      _peopleNum = snapshot.val().peopleNum
      _progressUpdateFlag = snapshot.val().progressUpdateFlag
      groupRef.update({peopleNum: _peopleNum+1, progressUpdateFlag: _progressUpdateFlag+1})
      newMemberRef.update({
        goal: this.state.goal,
        progress: '',
        numberCheer: '',
        lastInterval: 0,
      })
      this.setState({isGroupUpdated: true})
    })
  }

  handleSubmit() {
    this.updateGroup()
    this.updateUser()
  }

  redirect(){
    if(this.state.isGroupUpdated && this.state.isUserUpdated)
    {
      this.props.handleClose()
      return(<Redirect to='./my_group'/>)
    }
    else{
      return(<React.Fragment/>)
    }
  }
  fillAll() {
		toast.error("Please fill out all necessary information.");
	}

  render(){
    return(
      <div>
          <Modal size="sm" show={this.props.show} onHide={this.props.handleClose}>

            <Modal.Header>
              <Modal.Title>
                <div sm={10} className="join-title"> Join Group {this.props.popup_id}
                  <FontAwesomeIcon icon='times-circle' className='join-close-icon' onClick={this.props.handleClose}/>
                </div>

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
                    onClick={() => {this.handleSubmit()}}
              > Join </Button>
              <Button variant="danger"
                    className="cancel-button"
                    onClick = {this.props.handleClose}
              > Cancel </Button>

            </Modal.Body>
          </Modal>
          {this.redirect()}
      </div>
    );
  }
}

export default JoinGroup;
