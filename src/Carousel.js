import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import { db,storage} from './firebase/firebase.js';
class Carousel extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      url : "",
      progress : "",
      goal:""
    }
  }
  render(){
    //initiate variables
    var rank = this.props.props.rank;
    var person = this.props.props.mapPeopleWithNumber;
    var uid ="";
    for(var prop in person){
      if(prop==rank) uid=person[prop];
    }
    console.log("uid = " + uid);

    //Useful varibles
    const userRef = db.ref(`groups/study/people/${uid}`);
    var interval = null;
    userRef.limitToLast(1).once('value',function(snapshot){
      console.log("----");
      console.log(snapshot.val());
      interval = snapshot.val();
    })

    let url = "";
    let progress = "";
    let goal = "";
    var lastInterval =0;
    for(var prop in interval){
      progress = interval[prop].progress;
      goal = interval[prop].goal;
      lastInterval=prop;
      break;
    }

    //bug infinite loop from here
    this.setState({progress:progress, goal: goal});
    console.log(lastInterval);
    storage.ref(`images/${uid}`).child(`work`+`${lastInterval}`+`.jpg`).getDownloadURL()
      .then(url => {
        this.setState({ url });
      });
    return (
      <MDBCol>
        <MDBCard style={{ width: "22rem"  }}>
          <MDBCardImage className="img-fluid" src={this.state.url || "https://via.placeholder.com/200x300"} waves />
          <MDBCardBody>
            <MDBCardTitle>{uid}</MDBCardTitle>
            <MDBCardText>
              <p>My progress</p>
              {this.state.progress}
              <p>My goal</p>
              {this.state.goal}
            </MDBCardText>
            <MDBBtn href="#">MDBBtn</MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    );
  }
}

export default Carousel