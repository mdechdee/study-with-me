//https://codesandbox.io/s/iconbutton-hover-focus-cnexr?fontsize=14
//https://material-ui.com/customization/components/#pseudo-classes
import React from 'react';
import {Button} from 'react-bootstrap'
import {db} from '../firebase/firebase.js';
import Report from "@material-ui/icons/Report";

class Report extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			numberReport: 0,
		}
		this.handleReport = this.handleReport.bind(this)
	}

	fetchReportAmount(){
		var Ref = db.ref(`users/${this.props.uid}`)
		Ref.on('value', (snapshot) =>{
			var val = snapshot.val()
			this.setState({
				numberReport: val.numberReport
			}, () => {
				this.setState({isLoaded: true})
			})
		})
	}

	componentDidMount(){
		this.fetchReportAmount()
	}
	render(){
		return(
			<div>
		      	<IconButton aria-label="Delete" onClick={() => this.handleReport()}>
		        	<Report />
		       	</IconButton>
		    </div>
		)
	}
}

export default Report;