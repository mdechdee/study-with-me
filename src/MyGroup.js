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
import { Route, Switch, Redirect } from 'react-router-dom';
import FindGroups from './FindGroups.js';

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
			groupName:this.props.timer.groupName,
			uid: "",
			mapPeopleWithNumber: null,
			isGroupLoaded: false,
			isDone:false,
			showNoti:false,
			clearGroup: false,

		};
		this.handleLeft = this.handleLeft.bind(this);
		this.handleRight = this.handleRight.bind(this);
		this.handleIntervalChange = this.handleIntervalChange.bind(this);
		this.handleCloseNoti = this.handleCloseNoti.bind(this);
		this.handleCloseClearGroup = this.handleCloseClearGroup.bind(this);
	}
	// bring data from database

	collectPeople(){
		db.ref(`groups/${this.props.timer.groupName}/people`).once('value',(snapshot) =>{
			this.setState({
				people: snapshot.val()
				}, () => {
					let num = 0;
					let temp = {};
					Object.keys(snapshot.val()).forEach(function (person){
							temp[num]=person;
					    num=num+1;
					});
					this.setState({
						mapPeopleWithNumber:temp,
						totalPeople:num,
						isGroupLoaded:true
					}, () => {
						this.checkEndTime()
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
		if(this.state.isGroupLoaded && !this.state.clearGroup)
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

	handleCloseNoti(){
		this.setState({showNoti: false})
	}

	handleCloseClearGroup(){
		this.setState({clearGroup: false})

	}

	checkEndTime(){
		if(this.props.timer.currentTime>this.props.timer.baseStopTime){
			this.setState({clearGroup: true})
			// change everyone's group to ""
			var _peopleName = []
			Object.keys(this.state.people).forEach(function (person){
		      	db.ref(`/users/`).child(`${person}`).update({group:""})
		    });
			// delete the group
			db.ref(`/groups/`).child(`${this.props.timer.groupName}`).remove().then(()=>{
				console.log("Remove succeeded.")
				  })
			 	.catch(function(error) {
			 	   console.log("Remove failed: " + error.message)
			  	});
		}
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

		var intervalNum = ""
		var self = this;
		if(this.state.intervalNum==1){
			intervalNum = "first"
		}
		else if(this.state.intervalNum==2){
			intervalNum = "second"
		}
		else if(this.state.intervalNum==3){
			intervalNum = "third"
		}
		else{
			intervalNum = `${self.state.intervalNum}th`;
		}

		var changePage;
		if(this.state.clearGroup){
			changePage = <Switch>
				    		<Redirect to='/find_group' render={(routeProps) => (<FindGroups uid = {this.props.timer.uid}{...routeProps} />)} />
		        		</Switch>
		}
		console.log(this.props.timer)
		if(!this.state.groupName){
			return(
				<Switch>
				    <Redirect to='/find_group' render={(routeProps) => (<FindGroups uid = {this.props.timer.uid}{...routeProps} />)} />
		        </Switch>
		    )
		}
		else{
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
					<Modal size="sm" show={this.state.showNoti} onHide={this.handleCloseNoti}>
			            <Modal.Header>
			              <Modal.Title>
			                <div sm={10} className="update-title"> Notification </div>
			                <FontAwesomeIcon icon='times-circle'className='update-close-icon' onClick={this.handleCloseNoti}/>
			              </Modal.Title>
			            </Modal.Header>
						<Modal.Body>
							New interval !
							It's time to update your {intervalNum} progress
						</Modal.Body>
					</Modal>
				
				    {this.showMemberProgress()}
				    {changePage}

					<div className="buttons-wrap">
						<UpdateProgress uid={this.props.uid} groupName={this.props.timer.groupName} intervalNum={this.props.timer.intervalNum}/>
						<AllMember people={this.state.people} intervalNum={this.props.timer.intervalNum}/>
					</div>
				</Scrollbars>
			);
		}
	}
}


export default MyGroup;
