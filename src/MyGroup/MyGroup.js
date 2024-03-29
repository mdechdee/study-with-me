import React from 'react';
import { db,storage } from '../firebase/firebase.js';
import TimerContext from '../TimerContext'
import MemberProgress from './MemberProgress.js';
import UpdateProgress from './UpdateProgress.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Modal, Row, Col, ProgressBar } from 'react-bootstrap';
import '../scss/MyGroup.scss';
import AllMember from './AllMember';
import Scrollbars from 'react-scrollbars-custom';
import { Switch, Redirect } from 'react-router-dom';
import FindGroups from '../FindGroups/FindGroups.js';

class MyGroup extends React.Component {
	static contextType = TimerContext
	constructor(props){
		super(props);
		this.state = {
			intervalNum: 0,
			//Boss part
			totalPeople: 0,
			people: null,
			groupName:this.props.timer.groupName,
			uid: "",
			mapPeopleWithNumber: null,
			isGroupLoaded: false,
			isDone:false,
			showNoti:false,
			clearGroup: false,
			firstPassed: false,
			progressUpdateFlag: 0,
			activeIndex: 0,
		};
		this.handleIntervalChange = this.handleIntervalChange.bind(this);
		this.handleCloseNoti = this.handleCloseNoti.bind(this);
		this.handleCloseClearGroup = this.handleCloseClearGroup.bind(this);
		this.handlePicChange = this.handlePicChange.bind(this);
	}
	// bring data from database

	collectPeople(){
			this.setState({isGroupLoaded: false})
			this.setState({
				people: this.props.timer.people,
				progressUpdateFlag: this.props.timer.progressUpdateFlag
				}, () => {
					let num = 0;
					let temp = {};
					Object.keys(this.props.timer.people).forEach(function (person){
							temp[num]=person;
					    num=num+1;
					});
					this.setState({
						mapPeopleWithNumber:temp,
						totalPeople:num,
						isGroupLoaded:true,
					}, () => {
						this.checkEndTime()
					});
			})
	}
	// map uid to number and count total number of people

	showMemberProgress(){
		if(this.state.isGroupLoaded && !this.state.clearGroup)
		{
			return(<MemberProgress cheererUid={this.props.timer.uid} groupInfo={this.state}
				key={this.props.timer.progressUpdateFlag} activeIndex={this.state.activeIndex}
				handlePicChange={this.handlePicChange}/>)
		}
		else {
			return(<React.Fragment/>)
		}
	}

	handlePicChange(index){
		console.log('from group: '+index)
		this.setState({activeIndex: index})
	}

	handleIntervalChange(){
		this.setState({showNoti: true})
		var userRef = db.ref("users/"+this.state.uid)
		userRef.child("task").set({
			updateTask:{number:0,
				rewardReceived:false
			},
			voteTask:{number:0,
				rewardReceived:false
			},
			remainedTask:2
		})
	}

	handleCloseNoti(){
		this.setState({showNoti: false})
	}

	handleCloseClearGroup(){
		this.setState({clearGroup: false})

	}
	checkIntervalChange(){
		if(this.state.firstPassed){
			if(this.state.intervalNum !== this.props.timer.intervalNum){
				this.setState({intervalNum: this.props.timer.intervalNum},()=>{
					this.handleIntervalChange();
				})
			}
		}
		else{
			this.setState({firstPassed: true})
		}
	}
	checkPeopleChange(){
		if(this.state.groupName === '')
			return
		if(this.props.timer.progressUpdateFlag !== this.state.progressUpdateFlag)
		{
			this.collectPeople()
		}

	}
	checkEndTime(){
		if((this.props.timer.currentTime > this.props.timer.baseStopTime) && this.state.firstPassed && this.state.people!==null){
			this.setState({clearGroup: true})
			// change everyone's group to ""
			var _peopleName = []
			console.log(this.state.people)
			Object.keys(this.state.people).forEach(function (person){
				
		      	db.ref(`/users/`).child(`${person}`).update({group:""})
		      	console.log(person)
		      	storage.ref(`/images/${person}`).listAll().then( (res)=>{
		      		var items = res.items
		      		for(let i in items){
		      			if(items[i].authWrapper.name !== "profile.jpg"){
		      				storage.ref(items[i].location.path).delete().then(()=>{
		      				})
		      			}
		      		}
		      	})
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
	showUpdateProgress = () => {
		if(Date.now()>=this.props.timer.baseStartGroup){
			return (<UpdateProgress uid={this.props.uid} groupName={this.props.timer.groupName} intervalNum={this.props.timer.intervalNum}/>)
		}
		else{
			return (<React.Fragment/>)
		}
	}

	componentDidMount(){
		console.log("MOUNT")
		console.log(this.props.timer)
		this.setState({intervalNum: this.props.timer.intervalNum}, () =>{
			this.checkIntervalChange()
		})
		this.setState({groupName: this.props.timer.groupName})
		this.setState({uid: this.props.timer.uid})
		if(this.state.groupName !== '')
		{
			this.collectPeople()
			this.setState({activeIndex: Math.floor(Math.random() * (this.state.totalPeople+1))})
		}
	}

	render(){
		if(this.state.clearGroup){
			return(<h3 className = 'no-group'> You don't have a group yet! Join one! </h3>)
		}
		if(this.props.timer.groupName === ''){
			return(<h3 className = 'no-group'> You don't have a group yet! Join one! </h3>)
		}
		else{
			var changePage;
			var cur_time = this.props.timer.currentTime
			var start_time = this.props.timer.startTime
			var stop_time = this.props.timer.stopTime
			this.checkEndTime()
			this.checkIntervalChange()
			var intervalNum = ""
			var self = this;
			if(this.state.clearGroup){
				return(<h3 className = 'no-group'> You don't have a group yet! Join one! </h3>)
			}
			if(this.props.timer.groupName === ''){
				return(<h3 className = 'no-group'> You don't have a group yet! Join one! </h3>)
			}
			this.checkPeopleChange()
			if(this.state.intervalNum===1){
				intervalNum = "first"
			}
			else if(this.state.intervalNum===2){
				intervalNum = "second"
			}
			else if(this.state.intervalNum===3){
				intervalNum = "third"
			}
			else{
				intervalNum = `${self.state.intervalNum}th`;
			}
			return(
				<Scrollbars>
					<Container>
						<Row className="row-wrap">
							<Col className='flex-direction-column justify-content-center'>
								<div className="my-group-title">
									{this.props.timer.groupName}
								</div>
							</Col>

							<Col className='flex-direction-column justify-content-center'>
								<div className="time-label">Time Left:&nbsp;
									<div className="time"> {Math.ceil((stop_time-cur_time)/60000)} min </div>
								</div>
								<ProgressBar animated now = {(cur_time-start_time)/(stop_time-start_time)*100}/>
							</Col>
						</Row>
					</Container>

					<Modal size="sm" show={this.state.showNoti} onHide={this.handleCloseNoti}>
			            <Modal.Header>
			              <Modal.Title>
			                <div sm={10} className="update-title"> Notification </div>
			                <FontAwesomeIcon icon='times-circle' className='update-close-icon' onClick={this.handleCloseNoti}/>
			              </Modal.Title>
			            </Modal.Header>
						<Modal.Body className="noti-text">
							New interval!
							It's time to update your {intervalNum} progress.
						</Modal.Body>
					</Modal>
				    {this.showMemberProgress()}
					<div className="buttons-wrap">
						{this.showUpdateProgress()}
						<AllMember people={this.state.people} intervalNum={this.props.timer.intervalNum}/>
					</div>
				</Scrollbars>
			);
		}
	}
}


export default MyGroup;
