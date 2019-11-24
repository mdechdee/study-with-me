import React from 'react';
import {Modal, Button} from 'react-bootstrap'
import { db } from './firebase/firebase.js';

class JoinGroup extends React.Component {
  constructor(props){
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      show: false,
      goal:''
    };
  }


  handleChange(event) {
    this.setState({goal: event.target.value});
  }

  handleSubmit(event) {
    var peopleRef =  db.ref('groups/study/people');
    var newMemberRef = peopleRef.push();
    newMemberRef.set({
      Goal: this.state.goal,
      StarCount: 0,
      CheerCount: 0
    });

    alert('Goal: ' + this.state.goal);
    //event.preventDefault();
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
        <Button onClick = {this.handleShow}> Join Group </Button>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title> <h3>Join Group</h3> {this.props.popup_id} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={this.handleSubmit}>
                <label>
                  Goal:
                  <input type='text' value= {this.state.goal} onChange= {this.handleChange}/>
                </label>
                <p>*Your goal should be evaluable.</p>
                <p>Ex. I will finish mock exam within 3 hours.</p>
                <p>You must update your progress each interval.</p>
                <input type="submit" value="Join"/>
              </form>
              <Button onClick = {this.handleClose}> Cancel </Button>
            </Modal.Body>
          </Modal>
      </div>
    );
  }
}

export default JoinGroup;
