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
		Info.push(
			<Row>
				<Col>
					Total cheer:
				</Col>
				<Col>
					{this.state.totalCheer.length} 
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
