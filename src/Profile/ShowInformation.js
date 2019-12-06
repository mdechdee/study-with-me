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
			groupJoined: 0,
			groupCreated: 0,
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
					Group joined: 
				</Col>
				<Col>
					{this.state.groupJoined} 
				</Col>
			</Row>
			)
		Info.push(
			<Row>
				<Col>
					Group created:
				</Col>
				<Col>
					{this.state.groupCreated} 
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
