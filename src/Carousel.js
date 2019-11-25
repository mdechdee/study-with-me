import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import { db,storage} from './firebase/firebase.js';
import Cheer from './Cheer.js'
class Carousel extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      rank: props.props.rank,
      people: props.props.mapPeopleWithNumber,
      groupName: props.props.groupName,
      url : "",
      progress : "",
      goal:"",
      uid:props.props.mapPeopleWithNumber[props.props.rank],
      intervalNum: props.props.intervalNum,
      info: null,
      name: "",
      numberLargeSmile:0,
      numberSmile:0,
      numberLike:0,
      numberLove:0
    }
  }

  getUrl(interval){
    storage.ref(`images/${this.props.props.mapPeopleWithNumber[this.props.props.rank]}`).child(`work`+`${this.props.props.intervalNum}`+`.jpg`).getDownloadURL()
      .then(url => {
        this.setState({ url });
      }).catch(function(error) {
      console.log(error);
    });;
  }
  componentDidMount(){
    var interval = null;
    var temp = null;
    var self=this;
    console.log("Carousel/componentDidmount : state")
    console.log(this.state)
    console.log("Carousel/componentDidmount : props")
    console.log(this.props)
    db.ref(`groups/${this.props.props.groupName}/people`).child(`/${this.props.props.mapPeopleWithNumber[this.props.props.rank]}`).once('value',
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
    db.ref("users").child(`/${this.props.props.mapPeopleWithNumber[this.props.props.rank]}`).once('value',function(snapshot){
        var value = snapshot.val();
        self.setState({name:value.name});
      })
    this.getUrl()
    }
  render(){
    console.log("Carousel/render : rank")
    console.log(this.state.rank)
    console.log(this.props.props.rank)
    console.log(this.state)
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
              <Cheer uid={this.props.props.mapPeopleWithNumber[this.state.rank]} intervalNum = {this.state.intervalNum} groupName = {this.state.groupName}/>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    );
  }
}

export default Carousel