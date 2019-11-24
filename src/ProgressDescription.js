//https://dev.to/clintdev/simple-firebase-image-uploader-display-with-reactjs-3aoo
//https://stackoverflow.com/questions/13955813/how-to-store-and-view-images-on-firebase
import React from 'react';
import {Button} from 'react-bootstrap'
import {Form} from 'react-bootstrap'
import {db} from './firebase/firebase.js';
import './scss/UpdateProgress.scss'

class ProgressDescription extends React.Component{
	constructor(props){
		super(props);
		this.progress_description_change=this.progress_description_change.bind(this)
		this.goal_description_change=this.goal_description_change.bind(this)
		this.handleUpload = this.handleUpload.bind(this)
		this.state = {
			progress_description:"",
			goal_description:"",
			uid:props.uid,
			interval:props.interval,
			setStatus:props.setStatus,
			groupName:props.groupName
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
		const { uid,groupName } = this.state;
		const userRef = db.ref(`groups/${groupName}/people/`);
		const uploadProgress = userRef.child(`${uid}`).set({'progress': this.state.progress_description,'goal': this.state.goal_description,'numberLargeSmile':0,'numberSmile':0,'numberLove':0,'numberLike':0});
		this.state.setStatus();
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
