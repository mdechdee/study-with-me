//https://dev.to/clintdev/simple-firebase-image-uploader-display-with-reactjs-3aoo
//https://stackoverflow.com/questions/13955813/how-to-store-and-view-images-on-firebase
import React from 'react';
import {Button} from 'react-bootstrap'
import {Form} from 'react-bootstrap'
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
			groupName:props.groupName,
			setStatus:props.setStatus
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
