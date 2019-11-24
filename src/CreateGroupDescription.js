import React from 'react';
import {Row, Col, Button} from 'react-bootstrap'
import {Form} from 'react-bootstrap'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {db} from './firebase/firebase.js'

class CreateGroupDescription extends React.Component{
	constructor(props){
		super(props);
		this.group_name_change=this.group_name_change.bind(this)
		this.group_start_date_change=this.group_start_date_change.bind(this)
		this.group_start_time_change=this.group_start_time_change.bind(this)
		this.group_interval_change=this.group_interval_change.bind(this)
		this.group_total_time_change=this.group_total_time_change.bind(this)
		this.unit_interval_change=this.unit_interval_change.bind(this)
		this.unit_total_time_change=this.unit_total_time_change.bind(this)
		this.writeToDatabase = this.writeToDatabase.bind(this)
		this.handleClick = this.handleClick.bind(this)
		this.fillAll = this.fillAll.bind(this)
		this.fillTime = this.fillTime.bind(this)
		this.state = {
			group_name:"",
			group_start_date:"",
			group_start_time:"",
			group_interval:"",
			group_total_time:"",
			unit_interval:"minutes",
			unit_total_time:"minutes"
		};
	}


	group_name_change(e){
		this.setState({group_name: e.target.value})
	}

	group_start_date_change(e){
		this.setState({group_start_date: e.target.value})
	}

	group_start_time_change(e){
		this.setState({group_start_time: e.target.value})
	}

	group_interval_change(e){
		this.setState({group_interval: e.target.value})
	}

	group_total_time_change(e){
		this.setState({group_total_time: e.target.value})
	}

	unit_interval_change(e){
		this.setState({unit_interval: e.target.value})
	}

	unit_total_time_change(e){
		this.setState({unit_total_time: e.target.value})
	}

	// time interval (minutes, hours, days) into milliseconds
	timeToNum(e, f) {
		if (f==="minutes") { return(e*60*1000) }
		else if (f==="hours") { return(e*1000*60*60) }
		else { return(e*1000*60*60*24) }
	}

	// date and time into milliseconds w.r.t. to 1970
	dateToNum(e, f) {
		var [y, m, d] = e.split("-");
		var [h, n] = f.split(":");
		var date = new Date(y, m-1, d);
		var s = (((parseInt(h)*60)+parseInt(n))*60000);
		var t = date.getTime()+s;
		return(t)
	}

	handleClick() {
		if(this.isEmpty()) { this.fillAll() }
		else if(this.isCorrectFormat()) {
			this.writeToDatabase();
			this.props.handleClose();
		}
		else { this.fillTime()}
	}

	// check if at least one of the forms is empty
	isEmpty() {
		return(this.state.group_name==="" ||
		this.state.group_start_date==="" ||
		this.state.group_start_time==="" ||
		this.state.group_interval==="" ||
		this.state.group_total_time==="")
	}

	// check if the interval is not more than total time
	isCorrectFormat() {
		var a = this.state.unit_interval;
		var b = this.state.unit_total_time;
		var c = this.state.group_interval;
		var d = this.state.group_total_time;
		if((a===b && c>d) ||
		(a==="minutes" && b==="hours" && c>d*60) ||
		(a==="minutes" && b==="days" && c>d*60*24) ||
		(a==="hours" && b==="days" && c>d*24) ||
		(a!=="minutes" && b==="minutes") ||
		(a==="days" && b!=="days")) {
			return false
		}
		return true
	}

	fillAll() {
		toast("Please fill out all necessary information.", {
			position: toast.POSITION.TOP_CENTER
		});
	}

	fillTime() {
		toast("Please fill out correct interval and total time.", {
			position: toast.POSITION.TOP_CENTER
		});
	}

	writeToDatabase() {
	    var newRef = db.ref('groups').push();
			var people = []
			people[this.props.uid] = 1
			var startTime = this.dateToNum(this.state.group_start_date, this.state.group_start_time);
			var intervalTime = this.timeToNum(this.state.group_interval, this.state.unit_interval);
			var totalTime = this.timeToNum(this.state.group_total_time, this.state.unit_total_time);
			newRef.set(
	    {
				'name': this.state.group_name,
				'baseStartDate': this.state.group_start_date,
				'baseStartTime': this.state.group_start_time,
				'baseStopTime': startTime + totalTime,

				'totalTime': this.state.group_total_time,
				'totalTimeUnit': this.state.unit_total_time,

				'interval': this.state.group_interval,
				'intervalUnit': this.state.unit_interval,
				'roundNum': totalTime/intervalTime,

	      'startTime': startTime,
				'stopTime': startTime + intervalTime,
				'intervalTime': intervalTime,
				'intervalNum': 0,
				'peopleNum': 1,
				'people': people
			})
			var userRef = db.ref(`users/${this.props.uid}`);
			userRef.update({
				'group': newRef.key
			})

	}

	render(){
		return(
			<div>
				<Row>
					<Col xs={3}> Name: </Col>
					<Col xs={8}>
						<Form>
						  	<Form.Group controlId="group-name">
							    <Form.Control onChange={this.group_name_change} />
						  	</Form.Group>
						</Form>
					</Col>
				</Row>

				<Row>
					<Col xs={3}> Start Date: </Col>
					<Col xs={8}>
						 <Form>
						 	<Form.Group controlId="group-start-date">
						 		<Form.Control type="date" onChange={this.group_start_date_change}/>
					 		</Form.Group>
						</Form>
					</Col>
				</Row>

				<Row>
					<Col xs={3}> Start Time: </Col>
					<Col xs={8}>
						<Form>
								<Form.Group controlId="group-time">
		 						 	<Form.Control type="time" onChange={this.group_start_time_change} />
		 					 	</Form.Group>
						</Form>
					</Col>
				</Row>

				<Row>
					<Col xs={3}> Interval: </Col>
					<Col xs={4}>
						<Form>
								<Form.Group controlId="group-interval">
		 						 	<Form.Control type="number" min="1" max="999" step="1" pattern="[0-9]*" onChange={this.group_interval_change} />
		 					 	</Form.Group>
						</Form>
					</Col>
					<Col xs={4}>
						<select value={this.state.value} onChange={this.unit_interval_change}>
							<option value="minutes">minutes</option>
							<option value="hours">hours</option>
							<option value="days">days</option>
						</select>
					</Col>
				</Row>

				<Row>
					<Col xs={{offset: 3}}>
						<Form.Text className="text-muted">
								*Time units can only be minutes, hours and days,
						</Form.Text>
						<Form.Text className="text-muted">
								e.g. 1 minute, 10 days
						</Form.Text>
					</Col>
				</Row>

				<Row>
					<Col xs={3}> Total Time: </Col>
					<Col xs={4}>
						<Form>
								<Form.Group controlId="group-total-time">
		 						 	<Form.Control type="date-time" min="1" max="999" step="1" pattern="[0-9]*" onChange={this.group_total_time_change} />
		 					 	</Form.Group>
						</Form>
					</Col>
					<Col xs={4}>
						<select value={this.state.value} onChange={this.unit_total_time_change}>
							<option value="minutes">minutes</option>
							<option value="hours">hours</option>
							<option value="days">days</option>
						</select>
					</Col>
				</Row>

				<Row>
					<Col xs={{offset: 3}}>
						<Form.Text className="text-muted">
								*Time units can only be minutes, hours and days,
						</Form.Text>
						<Form.Text className="text-muted">
								e.g. 1 minute, 10 days
						</Form.Text>
					</Col>
				</Row>

				<Button variant="warning" offset={100}
				onClick={this.handleClick}> Create </Button>

				<Button variant="danger" offset={100}
				onClick={this.props.handleClose}> Cancel </Button>
	  	</div>
		);
	}
}


export default CreateGroupDescription;
