//https://dev.to/clintdev/simple-firebase-image-uploader-display-with-reactjs-3aoo
//https://stackoverflow.com/questions/13955813/how-to-store-and-view-images-on-firebase
import React from 'react';
import {Modal} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import ProgressImage from './ProgressImage.js'
import ProgressDescription from './ProgressDescription.js'
import AuthContext from './authentication/AuthContext';
import TimerContext from './TimerContext.js'
import './scss/UpdateProgress.scss'
import { Scrollbars } from 'react-custom-scrollbars';
class UpdateProgress extends React.Component{
	constructor(props){
		super(props);
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);

		this.state = {
			show: false
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
				<AuthContext.Consumer>
		          	{ auth => {
		          		return(
  							<div>
  								<Button variant = "primary" onClick = {this.handleShow}> Update Process </Button>
  								<Modal dialogClassName = 'custom-dialog' show={this.state.show} onHide={this.handleClose} centered>
						         	<Modal.Header closeButton>
						            	<Modal.Title> <h3>Update progress</h3> {this.props.popup_id} </Modal.Title>
						          	</Modal.Header>
						          	<Scrollbars style={{ width: 400, height: 700 }}>
						          	<Modal.Body>
					          				<TimerContext.Consumer>
									          	{ timer => {
									          		return(
									          			<div className="componentToUpdate">
										          			<ProgressImage
										          				uid={auth.uid}
										          				interval={timer.intervalNum}/>
					            							<ProgressDescription
					            								uid = {auth.uid}
					            								interval = {timer.intervalNum}
					            								setStatus = {this.handleClose}/>
					            						</div>
									          		);}
									          	}
									          </TimerContext.Consumer>
						          	</Modal.Body>
						          	</Scrollbars>
						        </Modal>
						    </div>
					    );}
		          	}
			    </AuthContext.Consumer>
      		</div>
		);
	}
}


export default UpdateProgress;
