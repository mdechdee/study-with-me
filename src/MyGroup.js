import React from 'react';
import { db } from './firebase/firebase.js';
import TimerContext from './TimerContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Carousel from './Carousel.js';
import UpdateProgress from './UpdateProgress.js';
import { Container, Row, Col } from 'react-bootstrap';
import './scss/MyGroup.scss';

class MyGroup extends React.Component {
	static contextType = TimerContext
	constructor(props){
		super(props);
		this.state = {
			startTime :  Date.now(),
			stopTime: Date.now() + 100000,
			currentTime : Date.now(),
			intervalTime: 0,
			offset: 0,
			//Boss part
			rank:0 ,
			totalPeople: 0,
			people: null,
			mapPeopleWithNumber: null,
			isLoaded: false,
			isDone:false,

		};
		this.handleLeft = this.handleLeft.bind(this);
		this.handleRight = this.handleRight.bind(this);
	}
	// bring data from database

	collectPeople(){
		db.ref(`groups/${this.props.timer.groupName}/people`).once('value',(snapshot) =>{
			this.setState({
				people: snapshot.val()
				}, () => {
				let num = 0;
				let temp = {};
				console.log(this.state.people)
				Object.keys(this.state.people).forEach(function (person){
					temp[num]=person;
				    num=num+1;
				});
				this.setState({
					mapPeopleWithNumber:temp,
					totalPeople:num,
					isLoaded:true
				});
				console.log("mygroup/countpeople : state");
				console.log(this.state);
			})
		})
	}
	// map uid to number and count total number of people

	handleLeft(){
		var self = this;
		if (this.state.rank>0){
			self.setState({rank:self.state.rank-1})
			console.log("-")
		}
	}
	handleRight(){
		var self = this;
		if (this.state.rank<this.state.totalPeople-1){
			self.setState({rank:self.state.rank+1})
			console.log("+")
		}
	}

	componentDidMount(){
		this.collectPeople()
	}

	render(){
		var cur_time = new Date(this.props.timer.currentTime).toString()
		var start_time = new Date(this.props.timer.startTime).toString()
		var stop_time = new Date(this.props.timer.stopTime).toString()
		return(
			<div>
				<Container>
					<div className="my-group-title"> Group: {this.props.timer.groupName} </div>
					<Container>
						<Row className="time">
							<Col className="time-col">
								<Row className="time-row">
									<div className="info-font">Time</div>
								</Row>
								<Row className="time-row">
									<div className="info-font"> {cur_time.substring(0, cur_time.length - 32)} </div>
								</Row>
							</Col>
							<Col className="time-col">
								<Row className="time-row">
									<div className="info-font">Start time</div>
								</Row>
								<Row className="time-row">
									<div className="info-font"> {start_time.substring(0, cur_time.length - 32)} </div>
								</Row>
							</Col>
							<Col className="time-col">
								<Row className="time-row">
									<div className="info-font">End time</div>
								</Row>
								<Row className="time-row">
									<div className="info-font"> {stop_time.substring(0, cur_time.length - 32)} </div>
								</Row>
							</Col>
							<Col className="time-col">
								<Row className="time-row">
									<div className="info-font">Interval</div>
								</Row>
								<Row className="time-row">
									<div className="info-font"> {new Date(this.props.timer.intervalTime).getMinutes() + 'Min.'} </div>
								</Row>
							</Col>
						</Row>
					</Container>
				</Container>
				<div className="member-progress">
					<Row>
						<Col className="button-slide">
					        <button onClick={this.handleLeft}><FontAwesomeIcon icon='chevron-circle-left'/></button>
					    </Col>
					    <Col>
				        	<div className="card">
							    {this.state.isLoaded ? (
							    	<Carousel groupName={this.props.timer.groupName}
							    	rank={this.state.rank}
							    	people={this.state.people}
							    	mapPeopleWithNumber={this.state.mapPeopleWithNumber}
							    	intervalNum={this.props.timer.intervalNum}/>
							    	) : (
							        <p> loading </p>
							    )}
						    </div>
						</Col>
						<Col className="button-slide">
					        <button onClick={this.handleRight}><FontAwesomeIcon icon='chevron-circle-right'/></button>
					    </Col>
				    </Row>
				</div>
				<div className="update-progress">
					<UpdateProgress uid={this.props.uid} groupName={this.props.timer.groupName} intervalNum={this.props.timer.intervalNum}/>
				</div>
				<div>
					<AllMember people={this.state.people} />
				</div>
			</div>
		);
	}
}

export default MyGroup;
