import React from 'react';
import {Row, Col, Modal, Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { db } from '../firebase/firebase.js';
import '../scss/AllMember.scss';


class AllMember extends React.Component {
  constructor(props){
    super(props);
    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.state = {
      show:false,
      people:[],
      peopleName:[],
      goal:[],
      status:[]
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
    let tempStatus=[]
    
    Object.keys(this.props.people).forEach((person) =>{
      tempPeople[num]=person
      let person_value = this.props.people[person]
      tempGoal[num]=person_value.goal
      tempStatus[num]=person_value.status
      num=num+1
    })
    
    this.setState({
      people: tempPeople,
      goal:tempGoal,
      status:tempStatus
    })
    
    for(let j=0; j< tempPeople.length;j+=1){
    db.ref('users/'+tempPeople[j]).on('value',(snapshot)=>{
            let a = snapshot.val()
      tempPeopleName[j]=a.name
    })}
    this.setState({
        peopleName: tempPeopleName
    })
  }

  showNameList(){
    let nameList = []
    for(let i=0; i<this.state.people.length; i+=1)
    {
        nameList.push(
          <div key={i} className="info-wrap">
            <Row>
              <Col xs={4} className="info-title-font">Name: </Col>
              <Col xs={7} className="info-font">{this.state.peopleName[i]}</Col>
            </Row>
            <Row>
              <Col xs={4} className="info-title-font">Goal: </Col>
              <Col xs={7} className="info-font">{this.state.goal[i]}</Col>
            </Row>
            <Row>
              <Col xs={4} className="info-title-font">Status: </Col>
              <Col xs={7} className="info-font">{this.state.status[i]}</Col>
            </Row>
          </div>);
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
        <Button variant="info"
        onClick={this.handleShow}
        className="all-member-button"> All Members </Button>

          <Modal size="sm" show={this.state.show} onHide={this.handleClose}>
            <Modal.Header>
              <Modal.Title>
                <div sm={10} className="all-member-title"> All Members </div>
                <FontAwesomeIcon icon='times-circle' className='custom-close-icon' onClick={this.handleClose}/>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{maxHeight: 'calc(100vh - 210px)', overflowY: 'auto'}}>
              {this.showNameList()}
            </Modal.Body>
          </Modal>

      </React.Fragment>

    )
  }
}

export default AllMember;
