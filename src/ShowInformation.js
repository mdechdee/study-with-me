import React from 'react';
import {db} from './firebase/firebase.js';
import {Form} from 'react-bootstrap';
import {Container, Button, Col, Row} from 'react-bootstrap';
import './scss/Profile.scss';

class ShowInformation extends React.Component {
	constructor(props) {
	    super(props);
	    this.handleChange=this.handleChange.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
		this.state = {
	      //uid: this.props.uid,
	      name: "",
	      //nameRef: db.ref(`users/${props.uid}`)
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
		var nameRef = db.ref(`users/`);
		nameRef.child(`${this.state.uid}`).update({name: this.state.name})
	}
	render(){
		return(
			<Container className="info">
				<Form>
					<Form.Group controlId="name">
						<div>
							<Row>
								<Form.Label column sm={2} className="form-font">Name</Form.Label>
									<Col sm={9}>
						    		<Form.Control className="form-font" type="name" placeholder={this.state.name||"Name"} onChange={this.handleChange}/>
							    </Col>
					    </Row>
							<div className="form-font name text-muted">
									This name is displayed in public.
							</div>
				    </div>
			  	</Form.Group>

				  	<Button variant="success" type="submit" className="save-button" onClick={this.handleUpdate}>
				    	Save changes
				  	</Button>
				</Form>
			</Container>
		);
	}
}

export default ShowInformation;
