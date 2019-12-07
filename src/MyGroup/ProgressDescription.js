//https://dev.to/clintdev/simple-firebase-image-uploader-display-with-reactjs-3aoo
//https://stackoverflow.com/questions/13955813/how-to-store-and-view-images-on-firebase
import React from 'react';
import {Button, Form} from 'react-bootstrap'
import {db} from '../firebase/firebase.js';
import '../scss/UpdateProgress.scss'

class ProgressDescription extends React.Component{
	constructor(props){
		super(props);
		this.progress_description_change=this.progress_description_change.bind(this)
		this.goal_description_change=this.goal_description_change.bind(this)
		this.handleUpload = this.handleUpload.bind(this)
		this.state = {
			progress_description:"",
			goal_description:""
			//uid = this.props.uid
			//intervalNum = this.props.intervalNum
			//groupName = this.props.groupName
			//setStatus = this.props.handleClose/>
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
		db.ref(`groups/${this.props.groupName}/people/`).child(`${this.props.uid}`).update({
			goal: this.state.goal_description,
			progress: this.state.progress_description,
			status: "active"
		})
		var progressUpdateFlag = 0;
		db.ref(`groups/${this.props.groupName}`).once('value',(snapshot) =>{progressUpdateFlag = snapshot.val().progressUpdateFlag})
		db.ref(`groups/${this.props.groupName}/progressUpdateFlag`).set(progressUpdateFlag+1)
		db.ref(`users/${this.props.uid}/task/updateTask/number`).set(1)
		this.props.setStatus();
	}
	render(){
		return(
			<div>
				<Form>
				  	<Form.Group controlId="form-progress-description">
					    <Form.Label className="form-font">My progress</Form.Label>
					    <Form.Control placeholder="What you have done recently" className="form-placeholder" onChange={this.progress_description_change} />
				  	</Form.Group>
				  	<Form.Group controlId="form-progress-next">
					    <Form.Label className="form-font">My next goal</Form.Label>
					    <Form.Control placeholder="What you will do next" className="form-placeholder" onChange={this.goal_description_change}/>
						</Form.Group>

					<Button variant="success"
							className="submit-button"
							type="submit"
							onClick = {this.handleUpload}
					> Submit </Button>

					<Button variant="danger"
								className="cancel-button"
								onClick = {this.props.handleClose}
					> Cancel </Button>
				</Form>
	  	</div>
		);
	}
}


export default ProgressDescription;
