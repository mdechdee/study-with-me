import React from 'react';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import { db, storage } from './firebase/firebase.js';
import Cheer from './Cheer.js'
import './scss/MyGroup.scss';

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
    storage.ref(`images/${this.props.mapPeopleWithNumber[this.props.rank]}`).child(`work`+`${this.props.intervalNum}`+`.jpg`).getDownloadURL()
      .then(url => {
        this.setState({ url });
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
    db.ref("users").child(`/${this.props.mapPeopleWithNumber[this.props.rank]}`).once('value',function(snapshot){
        var value = snapshot.val();
        console.log("Carousel/componentDidMount : snapshot")
        console.log(value)
        self.setState({name:value.name});
      })
    this.getUrl()
    }

  render(){
    console.log("Carousel/render : props")
    console.log(this.props)
    console.log(this.props.mapPeopleWithNumber[this.props.rank])
    return (
      <MDBCol>
        <MDBCard style={{ width: "15rem" }}>
          <MDBCardImage className="img-fluid" src={ this.state.url || "https://via.placeholder.com/150x200"} waves />
          <MDBCardBody>
            <MDBCardTitle className="carousel-font">{this.state.name}</MDBCardTitle>
            <MDBCardText className="carousel-font-small">
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
