//https://dev.to/clintdev/simple-firebase-image-uploader-display-with-reactjs-3aoo
//https://stackoverflow.com/questions/13955813/how-to-store-and-view-images-on-firebase
import React from 'react';
import {Modal} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import {Form} from 'react-bootstrap'
import ImageUpload from './ImageUpload/index.js'
import ProgressDescription from './ProgressDescription.js'
import AuthContext from './authentication/AuthContext';
import './scss/UpdateProcess.scss'
class UpdateProcess extends React.Component{
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
				<Button variant = "primary" onClick = {this.handleShow}> Update Process </Button>
		        <Modal show={this.state.show} onHide={this.handleClose} dialogClassName="modal-90w" centered>
		         	<Modal.Header closeButton>
		            	<Modal.Title> <h3>Update progress</h3> {this.props.popup_id} </Modal.Title>
		          	</Modal.Header>
		          	<Modal.Body>
		          	<AuthContext.Consumer>
			          	{ auth => {
			          		return(
			          			<div className="componentToUpdate">
				            		<ImageUpload uid={auth.uid}/>
		            				<ProgressDescription uid = {auth.uid}/>
		            			</div>
		            		);}
			        	}
			        </AuthContext.Consumer>
		          	</Modal.Body>
		        </Modal>
		        //update on database
		        
      		</div>
		);
	}
}


export default UpdateProcess;
