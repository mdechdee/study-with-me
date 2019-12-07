import React from 'react';
import {db} from '../firebase/firebase.js';
import {Container, Col, Row} from 'react-bootstrap';
import '../scss/Profile.scss';

class ShowInformation extends React.Component {
	constructor(props) {
	    super(props);
	    this.handleChange=this.handleChange.bind(this);
		this.state = {
	      	url: "",
			name: "",
			email: "",
			groupJoined: 0,
			groupCreated: 0,
			totalCheer: [],
	    };

	}
	componentDidMount() {
	 	var nameRef = db.ref(`users/${this.props.uid}`);
	  	nameRef.once('value')
	  	.then( (snapshot) => {

	    	this.setState({
	      		name: snapshot.val().name,
	      		email: this.props.email,
	      		groupJoined: snapshot.val().groupJoined,
	      		groupCreated: snapshot.val().groupCreated,
	    	});

	    	if(snapshot.val().groupCreated === undefined){
				this.setState({groupCreated: 0}, () =>{
					db.ref(`users/${this.props.uid}`).update({groupCreated:0})
				})
			}

			if(snapshot.val().groupJoined === undefined){
				this.setState({groupJoined: 1}, ()=>{
					db.ref(`users/${this.props.uid}`).update({groupJoined:1})
				})
			}

			var _totalCheer = {}
			var num = 0
			if (snapshot.val().cheer !== undefined){
				this.setState({totalCheer: [snapshot.val().cheer]}, ()=>{
				console.log(this.state.totalCheer.length)
				}
			)}
	  	});
	}
	handleChange(e){
		this.setState({name:e.target.value});
	}
	showInfo(){
		var Info = []
		Info.push(
			<Container>
				<Row>
					<Col className="profile-label"> Name: </Col>
					<Col className="profile-value"> {this.state.name} </Col>
				</Row>
			</Container>
			)
		Info.push(
			<Container>
				<Row>
					<Col className="profile-label"> Email: </Col>
					<Col className="profile-value"> {this.state.email} </Col>
				</Row>
			</Container>
			)
		Info.push(
			<Container>
				<Row>
					<Col className="profile-label"> Group joined: </Col>
					<Col className="profile-value"> {this.state.groupJoined} </Col>
				</Row>
			</Container>
			)
		Info.push(
			<Container>
				<Row>
					<Col className="profile-label"> Group created: </Col>
					<Col className="profile-value"> {this.state.groupCreated} </Col>
				</Row>
			</Container>
			)
		Info.push(
			<Container>
				<Row>
					<Col className="profile-label"> Total cheers: </Col>
					<Col className="profile-value"> {this.state.totalCheer.length} </Col>
				</Row>
			</Container>
			)

		return(Info)
	}

	render(){
		return(
			<Container>
				<div className="info">
					{this.showInfo()}
				</div>
			</Container>
		);
	}
}

export default ShowInformation;
