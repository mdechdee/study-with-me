//https://dev.to/clintdev/simple-firebase-image-uploader-display-with-reactjs-3aoo
//https://stackoverflow.com/questions/13955813/how-to-store-and-view-images-on-firebase
import React from 'react';
import {Modal} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import ImageUpload from './ImageUpload/index.js'
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
		        <Modal show={this.state.show} onHide={this.handleClose} size = 'xl'>
		         	<Modal.Header closeButton>
		            	<Modal.Title> <h3>Update progress</h3> {this.props.popup_id} </Modal.Title>
		          	</Modal.Header>
		          	<Modal.Body>
		            	<ImageUpload/>
		            	<h4>Popover in a modal</h4>
		            	<p>
			              	there is a{' '}
			              	here
			            </p>

		            	<h4>Tooltips in a modal</h4>
		            	<p>
		              		there is a{' '}
		              		here
		            	</p>  

		           	 	<hr />

		            	<h4>Overflowing text to show scroll behavior</h4>
		            	<p>
		              		Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
		              		dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
		              		ac consectetur ac, vestibulum at eros.
		            	</p>
		          	</Modal.Body>
		          	<Modal.Footer>
		            	<Button onClick={this.handleClose}>Close</Button>
		          	</Modal.Footer>
		        </Modal>
      		</div>
		);
	}
}


export default UpdateProcess;
