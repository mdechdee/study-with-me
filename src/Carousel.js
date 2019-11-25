import React from 'react';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import { db, storage } from './firebase/firebase.js';
import Cheer from './Cheer.js'
class Carousel extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      url : "",
      progress : [],
      goal:[],
      peopleName:[],
      Name:[],
      people: [],
      isReady: false
    }
  }

  getUrl(){
    storage.ref(`images/${this.props.mapPeopleWithNumber[this.props.rank]}/`).child(`work${this.props.intervalNum}.jpg`).getDownloadURL()
      .then(url => {
        this.setState({url: url});
      }).catch(function(error) {
      console.log("Not found");
    });;
  }
  fetchPeople(){
  	db.ref(`groups/${this.props.groupName}/people`).once('value',(snapshot) => {
  			let val = snapshot.val()
  			console.log("totot")
			console.log(val)
			Object.keys(val).forEach((item) => {
				this.setState({people: [...this.state.people,[item,snapshot.val()[item]]]});
			})
			this.setState({isReady:true})
		})
  }
  fetchName(){
  	db.ref(`users`).once('value',(snapshot) => {
			let val = snapshot.val();
			console.log(val)
			Object.keys(val).forEach((item) => {
				this.setState({peopleName: [...this.state.peopleName, [item,val[item].name]]});
			})

		})
  }
  preparePeopleInfo(){
  	for(let i=0; i<this.state.people.length; i+=1){
  		let person = this.state.people[i]
  		console.log(i)
  		this.setState({goal: [...this.state.goal, person[1].goal]})
  		for(let j=0; j<this.state.peopleName.length; j+=1){
  			let p = this.state.peopleName[j]
  			if(person[0]==p[0]){
  				this.setState({Name:[...this.state.Name,p[1]]})
  				break;
  			}
  		}
 	}
  }
  componentDidMount(){
  	this.fetchName()
  	setTimeout(this.fetchPeople(), 1000)
  }
  render(){
    this.getUrl()
    console.log("Carousel/render")
    console.log(this.state)
        return (
      <MDBCol>
        <MDBCard style={{ width: "15rem"  }}>
          <MDBCardImage className="img-fluid" src={ this.state.url || "https://via.placeholder.com/200x300"} waves />
          <MDBCardBody>
            <MDBCardTitle>{this.state.Name[this.props.rank]}</MDBCardTitle>
            <MDBCardText>
              progress
              <br/>
              {this.state.goal[this.props.rank]}
              rank: {this.props.rank}
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
