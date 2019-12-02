import React from 'react';
import { db } from './firebase/firebase.js';
import TimerContext from './TimerContext'
import MemberProgress from './MemberProgress.js';
import UpdateProgress from './UpdateProgress.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Modal, Row, Col } from 'react-bootstrap';
import './scss/MyGroup.scss';
import AllMember from './AllMember';
import { Scrollbars } from 'react-custom-scrollbars';

class MyGroup extends React.Component {
	static contextType = TimerContext
	constructor(props){
		super(props);
		this.state = {
			startTime :  Date.now(),
			stopTime: Date.now() + 100000,
			currentTime : Date.now(),
			intervalTime: 0,
			intervalNum: 0,
			offset: 0,
			//Boss part
			rank:0 ,
			totalPeople: 0,
			people: null,
			groupName:"",
			uid: "",
			mapPeopleWithNumber: null,
			isGroupLoaded: false,
			isDone:false,
			showNoti:false,

		};
		this.handleLeft = this.handleLeft.bind(this);
		this.handleRight = this.handleRight.bind(this);
		this.handleIntervalChange = this.handleIntervalChange.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}
	// bring data from database

	collectPeople(){
		db.ref(`groups/${this.props.timer.groupName}/people`).once('value',(snapshot) =>{
			this.setState({
				people: snapshot.val()
				}, () => {
					let num = 0;
					let temp = {};
					Object.keys(this.state.people).forEach(function (person){
							temp[num]=person;
					    num=num+1;
					});
					this.setState({
						mapPeopleWithNumber:temp,
						totalPeople:num,
						isGroupLoaded:true
					});
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

	showMemberProgress(){
		if(this.state.isGroupLoaded)
		{
			return(<MemberProgress groupInfo={this.state}/>)
		}
		else {
			return(<React.Fragment/>)
		}
	}

	handleIntervalChange(){
		this.setState({showNoti: true})
	}

	handleClose(){
		this.setState({showNoti: false})
	}

	componentDidMount(){
		console.log("MOUNT")
		this.setState({intervalNum: this.props.timer.intervalNum})
		this.setState({groupName: this.props.timer.groupName})
		this.setState({uid: this.props.timer.uid})
		this.collectPeople()
	}

	render(){
		var cur_time = new Date(this.props.timer.currentTime).toString()
		var start_time = new Date(this.props.timer.startTime).toString()
		var stop_time = new Date(this.props.timer.stopTime).toString()
		if(this.state.intervalNum!==this.props.timer.intervalNum){
			this.setState({intervalNum: this.props.timer.intervalNum},()=>{
				this.handleIntervalChange();
			})
		}
		return(
			<Scrollbars hideTracksWhenNotNeeded={true}
					className="scroll"
					renderView={props => <div {...props} className="scroll-content"/>}>
				<Container className="my-group-wrap">
					<div className="my-group-title"> Group: {this.props.timer.groupName} </div>
					<Container>
						<Row className="info-wrap top-border">
							<Col className="time-col">
								<Row className="time-row">
									<div className="info-font">Time</div>
								</Row>
								<Row className="time-row">
									<div className="info-font-small"> {cur_time.substring(0, cur_time.length - 32)} </div>
								</Row>
							</Col>
							<Col className="time-col">
								<Row className="time-row">
									<div className="info-font">Start time</div>
								</Row>
								<Row className="time-row">
									<div className="info-font-small"> {start_time.substring(0, cur_time.length - 32)} </div>
								</Row>
							</Col>
							<Col className="time-col">
								<Row className="time-row">
									<div className="info-font">End time</div>
								</Row>
								<Row className="time-row">
									<div className="info-font-small"> {stop_time.substring(0, cur_time.length - 32)} </div>
								</Row>
							</Col>
							<Col className="time-col">
								<Row className="time-row">
									<div className="info-font">Interval</div>
								</Row>
								<Row className="time-row">
									<div className="info-font-small"> {new Date(this.props.timer.intervalTime).getMinutes() + ' Min.'} </div>
								</Row>
							</Col>
						</Row>
					</Container>
				</Container>

				<Modal size="sm" show={this.state.showNoti} onHide={this.handleClose}>
		            <Modal.Header>
		              <Modal.Title>
		                <div sm={10} className="update-title"> Notification </div>
		                <FontAwesomeIcon icon='times-circle'className='update-close-icon' onClick={this.handleClose}/>
		              </Modal.Title>
		            </Modal.Header>
					<Modal.Body>
						New interval !
						It's time to update your {this.state.intervalNum} progress
					</Modal.Body>
				</Modal>

				{this.showMemberProgress()}

				<div className="buttons-wrap">
					<UpdateProgress uid={this.props.uid} groupName={this.props.timer.groupName} intervalNum={this.props.timer.intervalNum}/>
					<AllMember people={this.state.people} intervalNum={this.props.timer.intervalNum}/>
				</div>
			</Scrollbars>
		);
	}
}


export default MyGroup;
