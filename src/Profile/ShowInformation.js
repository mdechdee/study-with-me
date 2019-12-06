import React from 'react';
import {db} from '../firebase/firebase.js';
import {Container, Button, Col, Row, Form} from 'react-bootstrap';
import '../scss/Profile.scss';

class ShowInformation extends React.Component {
	constructor(props) {
	    super(props);
	    this.handleChange=this.handleChange.bind(this);
		this.state = {
	      	url: "",
			name: "",
			email: "",
			numberGroupJoined: 0,
			numberGroupCreated: 0,
			totalCheer: null,
	    };

	}
	componentDidMount() {
	 	var nameRef = db.ref(`users/${this.props.uid}`);
	  	nameRef.once('value')
	  	.then( (snapshot) => {
	    	this.setState({
	      		name: snapshot.val().name,
	      		email: this.props.email,
	      		numberGroupJoined: snapshot.val().numberGroupJoined,
	      		numberGroupCreated: snapshot.val().numberGroupCreated,
	    	});
	    	console.log(snapshot.val())
	    	console.log(snapshot.val().numberGroupCreated)
	    	if(snapshot.val().numberGroupCreated === undefined){
				this.setState({numberGroupCreated: 0}, () =>{
					db.ref(`users/${this.props.uid}`).update({numberGroupCreated:0})
				})
			}
			if(snapshot.val().numberGroupJoined === undefined){
				this.setState({numberGroupJoined: 1}, ()=>{
					db.ref(`users/${this.props.uid}`).update({numberGroupJoined:1})
				})	
			}
	  	});
	}
	handleChange(e){
		this.setState({name:e.target.value});
	}
	showInfo(){
		var Info = []
		Info.push(
			<Row>
				<Col>
					Name:
				</Col>
				<Col>
					{this.state.name} 
				</Col>
			</Row>
			)
		Info.push(
			<Row>
				<Col>
					Email:
				</Col>
				<Col>
					{this.state.email} 
				</Col>
			</Row>
			)
		Info.push(
			<Row>
				<Col>
					Number of group you have joined: 
				</Col>
				<Col>
					{this.state.numberGroupJoined} 
				</Col>
			</Row>
			)
		Info.push(
			<Row>
				<Col>
					Number of group you have created: {this.state.numberGroupCreated} 
				</Col>
				<Col>
					{this.state.numberGroupCreated} 
				</Col>
			</Row>
			)
		
		return(Info)
	}

	render(){
		return(
			<Container className="info">
				{this.showInfo()}
			</Container>
		);
	}
}

export default ShowInformation;
