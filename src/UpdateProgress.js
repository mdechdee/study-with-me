//https://dev.to/clintdev/simple-firebase-image-uploader-display-with-reactjs-3aoo
//https://stackoverflow.com/questions/13955813/how-to-store-and-view-images-on-firebase
import React from 'react';
import {Container, Modal, Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProgressImage from './ProgressImage.js'
import ProgressDescription from './ProgressDescription.js'
import { Scrollbars } from 'react-custom-scrollbars';
import './scss/UpdateProgress.scss'

class UpdateProgress extends React.Component{
	constructor(props){
		super(props);
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.state = {
			show: false,
			//uid: props.uid,
			//groupName: props.groupName,
			//intervalNum: props.intervalNum
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
			<React.Fragment>
				<Button variant = "warning"
						onClick = {this.handleShow}
						className="upload-button"
				> Update Progress </Button>

				<Modal size="sm" show={this.state.show} onHide={this.handleClose}>
		            <Modal.Header>
		              <Modal.Title>
		                <div sm={10} className="update-title"> Update Progress {this.props.popup_id} </div>
		                <FontAwesomeIcon icon='times-circle'className='update-close-icon' onClick={this.handleClose}/>
		              </Modal.Title>
		            </Modal.Header>
					<Modal.Body>
						<ProgressImage
							uid={this.props.uid}
							intervalNum={this.props.intervalNum}
							groupName = {this.props.groupName}/>
						<ProgressDescription
							uid = {this.props.uid}
							intervalNum = {this.props.intervalNum}
							groupName = {this.props.groupName}
							setStatus = {this.handleClose}/>
					</Modal.Body>
				</Modal>
			</React.Fragment>
		);
	}
}


export default UpdateProgress;
