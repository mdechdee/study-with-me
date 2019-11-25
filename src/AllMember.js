import React from 'react';
import {Modal, Button} from 'react-bootstrap'
import { Scrollbars } from 'react-custom-scrollbars';
import {ToastContainer, toast} from 'react-toastify';
import { db } from './firebase/firebase.js';


class AllMember extends React.Component {
  constructor(props){
    super(props);
    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.state = {
      show:false,
      people:[],
      peopleName:[],
      goal:[]
    };
  }

  handleShow(){
    this.setState({
      show:true
    })
  }
  handleClose(){
    this.setState({
      show:false
    })
  }
  goalMatch(){
    let num=0;
    let tempPeople=[]
    let tempGoal =[]
    let tempPeopleName=[]
    Object.keys(this.props.people).forEach((person) =>{
      tempPeople[num]=person
      let person_value = this.props.people[person]
      tempGoal[num]=person_value.goal
      db.ref('users/'+person).on('value',(snapshot)=>{
              let a = snapshot.val()
        tempPeopleName[num]=a.name
      })
      num=num+1;
    })
    this.setState({
      peopleName: tempPeopleName,
      people: tempPeople,
      goal:tempGoal
    })
    num=num-1;
  }

  showNameList(){
    let nameList = []
    for(let i=0; i<this.state.people.length; i+=1)
    {
        nameList.push(<div><p>Name: {this.state.peopleName[i]}<br/>Goal: {this.state.goal[i]}</p></div>);
    }
    return (nameList)
  }
  componentDidUpdate(prevProps){
    if(this.props.people && this.props.people !== prevProps.people)
    {
      this.goalMatch()
    }

  }
  render(){
    return(
      <React.Fragment>
        <Button onClick={this.handleShow}>All Member</Button>
        <Modal size="sm" show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h3>All Member</h3>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{'max-height': 'calc(100vh - 210px)', 'overflow-y': 'auto'}}>
              {this.showNameList()}
          </Modal.Body>
        </Modal>
      </React.Fragment>

    )
  }
}

export default AllMember;
