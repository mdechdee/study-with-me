//https://codesandbox.io/s/iconbutton-hover-focus-cnexr?fontsize=14
//https://material-ui.com/customization/components/#pseudo-classes
import React from 'react';
import {Button, Modal, Form} from 'react-bootstrap'
import {db} from '../firebase/firebase.js';
import ReporT from "@material-ui/icons/Report";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from "@material-ui/core/IconButton";

class Report extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			numberReport: 0,
			isLoaded: false,
			showModal: false,
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleShow = this.handleShow.bind(this)
		this.handleClose = this.handleClose.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	fetchReportAmount(){
		var Ref = db.ref(`users/${this.props.uid}`)
		Ref.once('value', (snapshot) =>{
			var val = snapshot.val()

			if(val.numberReport === undefined){
				this.setState({numberReport: 0},() => {
					this.setState({isLoaded: true})
				})
			}
			else{
				this.setState({
					numberReport: val.numberReport
				}, () => {
					this.setState({isLoaded: true})
				})
			}
		})
	}

	handleShow(){
		this.setState({showModal:true})
	}

	handleClose(){
		this.setState({showModal:false})
	}

	handleSubmit(){
		this.setState({numberReport: this.state.numberReport+1, showModal: false}, () =>{
			db.ref(`/users/${this.props.uid}`).update({numberReport: this.state.numberReport})
		})
	}
	
	handleChange(e){
		this.setState({message: e.target.value})
	}
	componentDidMount(){
		this.fetchReportAmount()
	}
	render(){
		return(
			<div>
		      	<IconButton aria-label="Delete" onClick={() => this.handleShow()}>
		        	<ReporT />
		       	</IconButton>
		       	<Modal size="sm" show={this.state.showModal} onHide={this.handleClose}>
			          <Modal.Header>
			            <Modal.Title>
			              <div sm={10} className="update-title"> Report {this.props.popup_id} </div>
			              <FontAwesomeIcon icon='times-circle'className='update-close-icon' onClick={this.handleClose}/>
			            </Modal.Title>
			          </Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group controlId="report">
								<Form.Label column sm={2} className="form-font">What's wrong:</Form.Label>
								<Form.Control className="form-font" type="name" onChange={this.handleChange}/>
							</Form.Group>
						</Form>
						<Button variant="success"
							className="submit-button"
							type="submit"
							onClick = {this.handleSubmit}
						> Submit </Button>
					</Modal.Body>
				</Modal>
		    </div>
		)
	}
}

export default Report;