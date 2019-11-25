//https://dev.to/clintdev/simple-firebase-image-uploader-display-with-reactjs-3aoo
//https://stackoverflow.com/questions/13955813/how-to-store-and-view-images-on-firebase
import React from 'react';
import {Modal} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import {Form} from 'react-bootstrap'
import ProgressImage from './ProgressImage.js'
import ProgressDescription from './ProgressDescription.js'
import AuthContext from './authentication/AuthContext';
import TimerContext from './TimerContext.js'
import { Scrollbars } from 'react-custom-scrollbars';
import './scss/UpdateProgress.scss'

class UpdateProgress extends React.Component{
	constructor(props){
		super(props);
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.state = {
			show: false,
			uid: props.uid,
			groupName: props.groupName,
			intervalNum: props.intervalNum
		};
	}
	handleClose(){
		this.setState({ show: false});
	}
	handleShow(){
		this.setState({show : true});
	}
	render(){
		return(
			<div>
				<div>
					<Button variant = "success" onClick = {this.handleShow} className="upload-button"> Update Progress </Button>
					<Modal size="sm" dialogClassName = 'custom-dialog' show={this.state.show} onHide={this.handleClose} centered>
			         	<Modal.Header closeButton>
			            	<Modal.Title> <h3>Update progress</h3></Modal.Title>
			          	</Modal.Header>
			          	<Scrollbars style={{ width: 400, height: 700 }}>
				          	<Modal.Body>
			          			<div className="componentToUpdate">
				          			<ProgressImage
				          				uid={this.state.uid}
				          				intervalNum={this.state.intervalNum}
				          				groupName = {this.state.groupName}/>
									<ProgressDescription
										uid = {this.state.uid}
										intervalNum = {this.state.intervalNum}
										groupName = {this.state.groupName}
										setStatus = {this.handleClose}/>
								</div>
				          	</Modal.Body>
			          	</Scrollbars>
					</Modal>
				</div>	
      		</div>
		);
	}
}


export default UpdateProgress;
