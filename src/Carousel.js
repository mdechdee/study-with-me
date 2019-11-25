import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import { db,storage} from './firebase/firebase.js';
import Cheer from './Cheer.js'
class Carousel extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      rank: this.props.props.rank,
      people: this.props.props.mapPeopleWithNumber,
      groupName: this.props.props.groupName,
      url : "",
      progress : "",
      goal:"",
      uid:this.props.props.mapPeopleWithNumber[this.props.props.rank],
      intervalNum: 0,
      info: null,
      name: "",
      numberLargeSmile:0,
      numberSmile:0,
      numberLike:0,
      numberLove:0
    }
  }

  getUrl(interval){
    storage.ref(`images/${this.state.uid}`).child(`work`+`${this.state.intervalNum}`+`.jpg`).getDownloadURL()
      .then(url => {
        this.setState({ url });
      }).catch(function(error) {
      console.log(error);
    });;
  }
  componentDidMount(){
    console.log("Now componentDidMount is working.")
    var interval = null;
    var temp = null;
    var self=this;
    db.ref(`groups/${this.state.groupName}/people`).child(`/${this.state.uid}`).once('value',
      function(snapshot){
        self.setState({
          goal:snapshot.val().goal,
          progress:snapshot.val().progress,
          numberLargeSmile:snapshot.val().numberLargeSmile,
          numberSmile:snapshot.val().numberSmile,
          numberLike:snapshot.val().numberLike,
          numberLove:snapshot.val().numberLove,
        });

    })
    db.ref("users").child(`/${this.state.uid}`).once('value',function(snapshot){
        var value = snapshot.val();
        self.setState({name:value.name});
      })
    this.getUrl()
    }
  render(){
    return (
      <MDBCol>
        <MDBCard style={{ width: "15rem"  }}>
          <MDBCardImage className="img-fluid" src={ this.state.url || "https://via.placeholder.com/200x300"} waves />
          <MDBCardBody>
            <MDBCardTitle>{this.state.name}</MDBCardTitle>
            <MDBCardText>
              {this.state.progress||"No info"}
              <br/>
              {this.state.goal||""}
            </MDBCardText>
            <div>
              <Cheer uid={this.state.uid} intervalNum = {this.state.intervalNum} groupName = {this.state.groupName}/>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    );
  }
}

export default Carousel