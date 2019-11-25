import React from 'react';
import {storage,db} from './firebase/firebase.js';
import {Form} from 'react-bootstrap';
import {Container, Button,Col,Row} from 'react-bootstrap';
import './scss/Profile.scss';

class ShowInformation extends React.Component {
	constructor(props) {
	    super(props);
	    this.handleChange=this.handleChange.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
		this.state = {
	      uid: props.uid,
	      name: "",
	      nameRef: db.ref(`users/${props.uid}`)
	    };

	}
	componentDidMount() {
	 	var self = this;
	 	var nameRef = db.ref(`users/${this.state.uid}`);
	  	nameRef.once('value')
	  	.then(function(snapshot) {
	    	self.setState({
	      		name: (snapshot.val() && snapshot.val().name)|| ""
	    	});
	  	});
	 }
	 componentWillMount() {
	 	var self = this;
	 	var nameRef = db.ref(`users/${this.state.uid}`);
	  	nameRef.on('value', function(snapshot) {
	    	self.setState({
	      		name: (snapshot.val() && snapshot.val().name)|| ""
	    	});
	  	});
	 }
	handleChange(e){
		this.setState({name:e.target.value});
		console.log("state name = "+ this.state.name);
		console.log("**********");
	}
	handleUpdate(e){
		e.preventDefault();
		const { uid } = this.state;
		const userRef = db.ref(`users`);
		const uploadProgress = userRef.child(`${uid}`).update({'name': this.state.name})
	}
	render(){
		return(
			<Container className="information">
				<Form>
					<Form.Group controlId="name">
						<div className="name">
							<Row className="name">
								<Form.Label column sm ="4">Name</Form.Label>
								<Col sm="7">
						    		<Form.Control type="name" placeholder={this.state.name||"Name"} onChange={this.handleChange}/>
							    	<Form.Text className="text-muted">
							      		This name is displayed in public.
							    	</Form.Text>
							    </Col>
						    </Row>
					    </div>
				  	</Form.Group>
				  	<Button variant="primary" type="submit" onClick={this.handleUpdate}>
				    	Save changes
				  	</Button>
				</Form>
			</Container>
		);
	}
}

export default ShowInformation;
