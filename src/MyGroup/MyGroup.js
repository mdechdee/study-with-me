import React from 'react';
import { db } from '../firebase/firebase.js';
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
		};
		this.handleIntervalChange = this.handleIntervalChange.bind(this);
		this.handleCloseNoti = this.handleCloseNoti.bind(this);
		this.handleCloseClearGroup = this.handleCloseClearGroup.bind(this);
	}
	// bring data from database

	collectPeople(){
			this.setState({isGroupLoaded: false})
			this.setState({
				people: this.props.timer.people
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
						isGroupLoaded:true
					}, () => {
						this.checkEndTime()
					});
			})
	}
	// map uid to number and count total number of people

	showMemberProgress(){
		if(this.state.isGroupLoaded && !this.state.clearGroup)
		{
			return(<MemberProgress cheererUid={this.props.timer.uid} groupInfo={this.state} key={this.props.timer.progressUpdateFlag}/>)
		}
		else {
			return(<React.Fragment/>)
		}
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
	checkEndTime(){
		if(this.props.timer.currentTime > this.props.timer.baseStopTime){
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
		this.setState({intervalNum: this.props.timer.intervalNum}, () =>{
			this.checkIntervalChange()
		})
		this.setState({groupName: this.props.timer.groupName})
		this.setState({uid: this.props.timer.uid})
		this.collectPeople()
	}

	render(){
		var cur_time = this.props.timer.currentTime
		var start_time = this.props.timer.startTime
		var stop_time = this.props.timer.stopTime
		this.checkIntervalChange()
		var intervalNum = ""
		var self = this;
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

		var changePage;
		if(this.state.clearGroup){
			changePage = <Switch>
				    		<Redirect to='/find_group' render={(routeProps) => (<FindGroups uid = {this.props.timer.uid}{...routeProps} />)} />
		        		</Switch>
		}
		if(!this.state.groupName){
			return(
				<Switch>
				    <Redirect to='/find_group' render={(routeProps) => (<FindGroups uid = {this.props.timer.uid}{...routeProps} />)} />
		        </Switch>
		    )
		}
		else{
			return(
				<Scrollbars>
					<Container>
						<Row className="row-wrap">
							<Col className='flex-direction-column justify-content-center'>
								<div className="my-group-title">
									Group: {this.props.timer.groupName}
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
