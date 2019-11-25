import React from 'react';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import { db, storage } from './firebase/firebase.js';
import Cheer from './Cheer.js'
class Carousel extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      url : "",
      progress : "",
      goal:"",
      info: null,
      name: "",
      numberLargeSmile:0,
      numberSmile:0,
      numberLike:0,
      numberLove:0
    }
  }

  getUrl(){
    storage.ref(`images/${this.props.mapPeopleWithNumber[this.props.rank]}/`).child(`work${this.props.intervalNum}.jpg`).getDownloadURL()
      .then(url => {
        this.setState({url: url});
      }).catch(function(error) {
      console.log(error);
    });;
  }
  componentDidMount(){
    console.log("Carousel/componentDidMount")
    var self=this;
    db.ref(`groups/${this.props.groupName}/people`).child(`/${this.props.mapPeopleWithNumber[this.props.rank]}`).once('value',
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
    db.ref("users").child(`/${this.props.mapPeopleWithNumber[this.props.rank]}`).on('value',function(snapshot){
        var value = snapshot.val();
        self.setState({name:value.name});
      })
    }
  render(){
    this.getUrl()
    console.log("Carousel/render")
    console.log(this.props.mapPeopleWithNumber[this.props.rank])
    console.log(this.props.intervalNum)
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
              <Cheer uid={this.props.mapPeopleWithNumber[this.props.rank]} intervalNum = {this.props.intervalNum} groupName = {this.props.groupName}/>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    );
  }
}

export default Carousel
