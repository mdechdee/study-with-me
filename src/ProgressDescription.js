//https://dev.to/clintdev/simple-firebase-image-uploader-display-with-reactjs-3aoo
//https://stackoverflow.com/questions/13955813/how-to-store-and-view-images-on-firebase
import React from 'react';
import {Button} from 'react-bootstrap'
import {Form} from 'react-bootstrap'
import {db} from './firebase/firebase.js';
import './scss/UpdateProcess.scss'
class ProgressDescription extends React.Component{
	constructor(props){
		super(props);
		this.progress_description_change=this.progress_description_change.bind(this)
		this.goal_description_change=this.goal_description_change.bind(this)
		this.handleUpload = this.handleUpload.bind(this)
		this.state = {
			progress_description:"",
			goal_description:"",
			uid:props.uid
		};
	}
	progress_description_change(e){
		this.setState({progress_description: e.target.value})
	}
	goal_description_change(e){
		this.setState({goal_description: e.target.value})
	}
	handleUpload(e){
		e.preventDefault();
		const { uid } = this.state;
		const ref = db.ref(`groups/study/people/${uid}`)
		// Bug here can't read propety uid
		const uploadProgress = ref.child(`progress`).putString(this.state.progress_description).then(function(snapshot){
			console.log("progress uploaded.");
		});
		const uploadGoal = ref.child(`goal`).putString(this.state.goal_description).then(function(snapshot){
			console.log("goal uploaded.");
		});
	}
	render(){
		return(
			<div>
				<Form>
				  	<Form.Group controlId="form-progress-description">
					    <Form.Label><h5>My progress</h5></Form.Label>
					    <Form.Control onChange={this.progress_description_change} />
					    <Form.Text className="text-muted">
					      	This is what you have done recently.
					    </Form.Text>
				  	</Form.Group>
				  	<Form.Group controlId="form-progress-next">
					    <Form.Label><h5>My next goal</h5></Form.Label>
					    <Form.Control onChange={this.goal_description_change}/>
					 </Form.Group>
				  	<Button variant="primary" type="submit" onClick = {this.handleUpload}>
				   	 	Submit
				  	</Button>
				</Form>
	  		</div>
		);
	}
}


export default ProgressDescription;
