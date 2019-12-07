import React from 'react';
import {db} from '../firebase/firebase.js';
import {Form} from 'react-bootstrap';
import {Container, Button, Col, Row} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../scss/Profile.scss';

class EditProfileInfo extends React.Component {
	constructor(props) {
	    super(props);
	    this.handleChange=this.handleChange.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
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
	      		//numberGroupJoined: snapshot.val().n,
	      		//numberGroupCreated: ,
	    	});
	  	});
	}
	handleChange(e){
		this.setState({name:e.target.value});
	}
	handleUpdate(e){
		e.preventDefault();
		var nameRef = db.ref(`users/`);
		nameRef.child(`${this.props.uid}`).update({name: this.state.name})
	}
	render(){
		return(
			<Container className="info">
				<Form>
					<Form.Group controlId="name">
						<div className="content-center">
							<Row>
								<Form.Label column sm={2}
											className="form-font"
											> Name </Form.Label>
								<Col sm={10}>
						    	<Form.Control className="form-font"
											type="name"
											placeholder={this.state.name||"Name"}
											onChange={this.handleChange}/>
							  </Col>
					    </Row>
				   </div>
					 <div className="content-center">
						 <Row className="form-label text-muted">
									This name is displayed in public.
						 </Row>
					 </div>

			  </Form.Group>

						<div className="content-center">
					  	<Button variant="success"
										type="submit"
										className="save-button"
										onClick={this.handleUpdate}
							> <FontAwesomeIcon icon='save'/>
					    	Save changes
					  	</Button>
						</div>
				</Form>
			</Container>
		);
	}
}

export default EditProfileInfo;
