import React from 'react';
import {Modal, Button} from 'react-bootstrap'
import {ToastContainer, toast} from 'react-toastify';
import { db } from './firebase/firebase.js';

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
      numberLargeSmile: 0,
      numberSmile: 0,
      numberLike: 0,
      numberLove:0
    });

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
            <Modal.Header closeButton>
              <Modal.Title> <h3>Join Group</h3> {this.props.popup_id} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={this.handleSubmit}>
                <label>
                  Goal:
                  <input type='text' value={this.state.goal} onChange={this.handleChange}/>
                </label>
                <p>*Your goal should be evaluable.</p>
                <p>Ex. I will finish mock exam within 3 hours.</p>
                <p>You must update your progress each interval.</p>
                <input type="submit" value="Join"/>
              </form>
              <Button onClick = {this.props.handleClose}> Cancel </Button>
            </Modal.Body>
          </Modal>
      </div>
    );
  }
}

export default JoinGroup;
