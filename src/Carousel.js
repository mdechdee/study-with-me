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
      url : "",
      progress : "",
      goal:"",
      uid:this.props.props.mapPeopleWithNumber[this.props.props.rank],
      interval:0,
      info: null,
      isReady: false,
      name: ""
    }
  }

  getUrl(interval){
    console.log("-> getUrl");
    storage.ref(`images/${this.state.uid}`).child(`work`+`${interval}`+`.jpg`).getDownloadURL()
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
    db.ref(`groups/study/people`).child(`/${this.state.uid}`).orderByKey().limitToLast(1).once('value',function(snapshot){
      snapshot.forEach((childSnapshot) =>{
        console.log("childsnapshot")
        console.log(childSnapshot.key)
        console.log(childSnapshot.val())
        interval = childSnapshot.key;
        temp = childSnapshot.val();
        self.setState({interval: interval});
        self.setState({info: temp})
        self.setState({progress: temp["progress"]})
        self.setState({goal: temp["goal"]})
        console.log("Now componentDidMount is not working.")
        self.getUrl(interval);
        self.setState({isReady: true})
      })
    })
  db.ref("users").child(`/${this.state.uid}`).once('value',function(snapshot){
      var value = snapshot.val();
      console.log("111");
      self.setState({name:value["name"]});
    })
  }

  render(){
    console.log("Here is at Carousel");
    console.log(this.state);
    return (
      <MDBCol>
        <MDBCard style={{ width: "15rem"  }}>
          <MDBCardImage className="img-fluid" src={ this.state.url || "https://via.placeholder.com/200x300"} waves />
          <MDBCardBody>
            <MDBCardTitle>{this.state.name}</MDBCardTitle>
            <MDBCardText>
              My progress: {this.state.progress}
              <br/>
              My goal: {this.state.goal}
            </MDBCardText>
            <div>
                {this.state.isReady ? (
                  <Cheer uid={this.state.uid} interval = {this.state.interval}/>
                  ) : (
                    <p> loading </p>
                )}
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    );
  }
}

export default Carousel