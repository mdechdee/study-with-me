import React from 'react';
import {Modal, Button} from 'react-bootstrap'
import { db } from './firebase/firebase.js';

class AllMember extends React.Component {
  constructor(props){
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      show: false,
    };
  }
  //MemberList() {
  //const listMembers = db.ref('groups/study/people').child()((number) =>
//    <ListItem key={number.toString()}
//              value={number} />
//
//  );
//  return (
//    <ul>
//      {listItems}
//    </ul>
//  );
//}
  handleClose(){
    this.setState({show: false});
  }
  handleShow(){
    this.setState({show: true});
  }
  render(){
    return(
      <div>
        <Button onClick = {this.handleShow}> All Member </Button>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title> <h3>All Member</h3> {this.props.popup_id} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
bxgdgx
            </Modal.Body>
          </Modal>
      </div>
    );
  }
}

export default AllMember;
