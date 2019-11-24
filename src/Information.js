import React from 'react';
import {storage,db} from './firebase/firebase.js';
import {Form} from 'react-bootstrap';
import {Button,Col,Row} from 'react-bootstrap';
import './scss/Profile.scss';
class Information extends React.Component {
	constructor(props) {
	    super(props);
	    this.handleChange=this.handleChange.bind(this)
		this.handleUpdate = this.handleUpdate.bind(this)
	    this.state = {
	      uid: props.uid,
	      name: ""
	    };
	}
	handleChange(e){
		this.setState({name:e.target.value});
	}
	handleUpdate(e){
		e.preventDefault();
		const { uid } = this.state;
		const userRef = db.ref(`users`);
		const uploadProgress = userRef.child(`${uid}`).set({'name': this.state.name})
	}
	render(){
		return(
			<div className="information">
				<Form>
					<Form.Group controlId="name">
						<div className="name">
							<Row className="name">
								<Form.Label column sm ="4">Name</Form.Label>
								<Col sm="7">
						    		<Form.Control type="name" placeholder={this.state.name} onChange={this.handleChange}/>
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
			</div>
		);
	}
}

export default Information;
