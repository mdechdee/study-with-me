import React from 'react';
import {Modal, Button} from 'react-bootstrap'
import { Scrollbars } from 'react-custom-scrollbars';
import {ToastContainer, toast} from 'react-toastify';
import { db } from './firebase/firebase.js';

class AllMember extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      show:false,
      people:{},
      goal:{}
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
  goalMatched(){
    Object.keys(this.props.people).forEach((person) =>{
      this.setState({
        people:[...this.state.people, person],
        goal:[...this.state.goal, this.props.people[person]]
      })
    })
  }
  showNameList(){
    let nameList = []
    for(let i=0; i<this.state.people.length; i+=1)
    {
        nameList.push(<div><p>this.people[i]</p><p>this.goal[i]</p></div>);
    }
    return (nameList)
  }
  componentDidMount(){
    this.goalMatched()
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
          <Modal.Body>
            <Scrollbars horizontal={false}
              className="scroll"
              contentClassName="scroll-content"
              >
              {this.showNameList()}
            </Scrollbars>
          </Modal.Body>
        </Modal>
      </React.Fragment>

    )
  }
}

export default AllMember;
