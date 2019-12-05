//https://dev.to/clintdev/simple-firebase-image-uploader-display-with-reactjs-3aoo
//https://stackoverflow.com/questions/13955813/how-to-store-and-view-images-on-firebase
import React from 'react';
import {Container, Modal, Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProgressImage from './ProgressImage.js'
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
import ProgressDescription from './ProgressDescription.js'
import { Scrollbars } from 'react-custom-scrollbars';
import '../scss/UpdateProgress.scss'
import TimerContext from '../TimerContext.js';
import MyGroup from './MyGroup.js';

class UpdateProgress extends React.Component{
	constructor(props){
		super(props);
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.state = {
			show: false,
			redirect: false,
			//uid: props.uid,
			//groupName: props.groupName,
			//intervalNum: props.intervalNum
		};
	}
	handleClose(){
		this.setState({ show: false, redirect: true});
		window.location.reload(false);
	}
	handleShow(){
		this.setState({show : true});
	}
	renderRedirect(){
    	if (this.state.redirect) {
    		console.log("redirect")
      		return(
      			<TimerContext.Consumer>
    				{ timer => {return(
    					<Switch>
    						<Redirect to='/my_group' render={(routeProps) => (<MyGroup uid = {this.props.uid} timer = {timer} {...routeProps} />)} />
    					</Switch>	
					)}}
				</TimerContext.Consumer>
      		)
    	}
	}
	render(){
		return(
			<React.Fragment>
				{this.renderRedirect()}
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
