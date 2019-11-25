import React from 'react';
import {Button} from 'react-bootstrap';
import { db } from './firebase/firebase.js';
import TimerContext from './TimerContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import progress from './camera.jpg';
import Carousel from './Carousel.js';
import UpdateProgress from './UpdateProgress.js';
import { Scrollbars } from 'react-custom-scrollbars';
import { Container, Row, Col } from 'react-bootstrap';
import { MDBContainer, MDBCarousel ,MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
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
			groupName:""
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
		if (this.state.rank>0) this.setState({rank:this.state.rank-1})
	}
	handleRight(){
		if (this.state.rank<this.state.totalPeople-1) this.setState({rank:this.state.rank+1})
	}

	componentDidMount(){
		this.collectPeople()
	}

	render(){
		return(
			<div className="my-group">
				<div className="title-my-group">
					<div> <h3>Group: {this.props.timer.groupName}</h3> </div>
					<Row className="time">
						<Col className="time-col">
							<Row className="time-row">
								<div>Time</div>
							</Row>
							<Row className="time-row">
								<div> {new Date(this.props.timer.currentTime).toString()} </div>
							</Row>
						</Col>
						<Col className="time-col">
							<Row className="time-row">
								<div>Start time</div>
							</Row>
							<Row className="time-row">
								<div> {new Date(this.props.timer.startTime).toString()} </div>
							</Row>
						</Col>
						<Col className="time-col">
							<Row className="time-row">
								<div>End time</div>
							</Row>
							<Row className="time-row">
								<div> {new Date(this.props.timer.stopTime).toString()} </div>
							</Row>
						</Col>
						<Col className="time-col">
							<Row className="time-row">
								Interval
							</Row>
							<Row className="time-row">
								<div> {this.props.timer.intervalTime} </div>
							</Row>
						</Col>
					</Row>
				</div>
				<div className="member-progress">
					<Row>
						<Col className="button-slide">
					        <button onClick={this.handleLeft}><FontAwesomeIcon icon='chevron-circle-left'/></button>
					    </Col>
					    <Col>
				        	<div className="card">
							    {this.state.isLoaded ? (
							    	<Carousel props={this.state}/>
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
					<UpdateProgress uid={this.props.uid} groupName={this.state.groupName}/>
				</div>
			</div>
		);
	}
}

export default MyGroup;
