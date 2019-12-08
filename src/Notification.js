import React from 'react';
import {  Row, Col, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { db } from './firebase/firebase.js';
// import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
// import IconButton from "@material-ui/core/IconButton";
import Smile from "@material-ui/icons/SentimentSatisfiedAlt";
import LargeSmile from "@material-ui/icons/InsertEmoticon";
import Like from "@material-ui/icons/ThumbUpAlt";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'animate.css';
import './scss/Notification.scss';

class Notification extends React.Component {
	constructor(props){
	    super(props);
			this.handleCheerReward=this.handleCheerReward.bind(this)
			this.handleUpdateReward=this.handleUpdateReward.bind(this)
			this.ClearCheerList=this.ClearCheerList.bind(this)
	    this.state = {
	        cheererName:[],
					cheerType:[],
					length: 0,
					remainedTask:0,
					remainedCheer:0
	    }
	}
	handleCheerReward(){
		db.ref("users/"+this.props.uid+"/task/voteTask/rewardReceived").set(true)
		db.ref("users/"+this.props.uid+"/task/remainedTask").once('value',(snapshot)=>{
			let remainedTask = snapshot.val();
			remainedTask = remainedTask -1;
			db.ref("users/"+this.props.uid+"/task/remainedTask").set(remainedTask)
		})
		db.ref("users/"+this.props.uid+"/point").once('value',(snapshot)=>{
			let point = snapshot.val()
			point = point+10
			db.ref("users/"+this.props.uid+"/point").set(point)
})
	}

	handleUpdateReward(){
		db.ref("users/"+this.props.uid+"/task/updateTask/rewardReceived").set(true)
		db.ref("users/"+this.props.uid+"/task/remainedTask").once('value',(snapshot)=>{
			let remainedTask = snapshot.val();
			remainedTask = remainedTask -1;
			db.ref("users/"+this.props.uid+"/task/remainedTask").set(remainedTask)
		})
		db.ref("users/"+this.props.uid+"/point").once('value',(snapshot)=>{
			let point = snapshot.val()
			point = point+25
			db.ref("users/"+this.props.uid+"/point").set(point)
})
	}

	CheerReward(voteNum){
		if(voteNum>=3){
			return(
				<Button variant="success" onClick={this.handleCheerReward}>
					<FontAwesomeIcon icon="gift"/>
				</Button>
			)
		}
		else
		return null
	}

	UpdateReward(updateNum){
		if(updateNum>=1){
			return(
				<Button variant="success" onClick={this.handleUpdateReward}>
					<FontAwesomeIcon icon="gift"/>
				</Button>
			)
		}
		else
		return null

	}

	ClearCheerList(){
		db.ref("users/"+this.props.uid+"/cheer").set(null)
		db.ref("users/"+this.props.uid+"/remainedCheer").set(0)
	}

	CheerPic(cheerType){
		if(cheerType==='Smile'){
			return(<Smile/>)
		}
		else if (cheerType==='LargeSmile') {
			return(<LargeSmile/>)
		}
		else if(cheerType==='Like'){
			return(<Like/>)
		}
		else return <img style = {{ objectFit: 'cover', height:'40px'}}
			src={cheerType+'.png'} alt="sticker"
		/>
	}

	CheerNotification(){
		let cheerList=[]
		db.ref("users/"+this.props.uid+"/cheer").on('value',(snapshot)=>{
			var cheer = snapshot.val()
			if((cheer!==null) && (cheer!=="")){
			Object.keys(cheer).forEach((item)=>{
				if((cheer[item].cheerType==='Smile')||(cheer[item].cheerType==='LargeSmile')||(cheer[item].cheerType==='Like')){
				cheerList.push(
					<div className="noti-label">
						<Row>
							<Col>
								{cheer[item].cheererName} gave you a <span style={{color:'red'}}>{cheer[item].cheerType}</span>
							&nbsp;&nbsp;&nbsp;&nbsp;<span style={{color:'red'}}>{this.CheerPic(cheer[item].cheerType)}</span>
							</Col>
						</Row>
					</div>
				)}
				else{
					cheerList.push(
						<div>
							<Row>
								<Col>
									{cheer[item].cheererName} gave you a sticker
								&nbsp;&nbsp;&nbsp;&nbsp;{this.CheerPic(cheer[item].cheerType)}
								</Col>
							</Row>
						</div>
					)
				}
			})
			cheerList.push(<div className="noti-label"><p></p><Button variant="danger" onClick={this.ClearCheerList}>
				Clear your cheer list notification
			</Button></div>)
		}
		else cheerList.push(
			<div className="noti-label">
				<Row>
					<Col>
						No cheer
					</Col>
				</Row>
			</div>)
	})
//		this.setState({
//			remainedCheer:remainedCheer
//		})
		return (cheerList)
	}

	MyNotification(){
		db.ref("users/"+this.props.uid+"/cheer").once('value',(snapshot)=>{
			let check = snapshot.val()
		})
		var taskRef = db.ref("users/"+this.props.uid+"/task")
		var updateTaskStatus = false;
		var updateNum = 0;
		var voteNum = 0;
		var tempNameList = [];
		var tempCheerTypeList = [];
		var voteTaskStatus = false;


		taskRef.on("value",(snapshot)=>{
			var task = snapshot.val()
			if(task.updateTask !== undefined){
				updateTaskStatus = task.updateTask.rewardReceived
			}
			if(task.voteTask !== undefined){
				voteTaskStatus = task.voteTask.rewardReceived
			}
			if(task.updateTask !== undefined){
				updateNum = task.updateTask.number
			}
			if(task.voteTask !== undefined){
				voteNum = task.voteTask.number
			}
		})
		if(updateTaskStatus===false){
			if(voteTaskStatus===false){
			//	this.setState({remainedTask:2})
				return(
					<div className="noti-label" style={{
				      backgroundColor: 'white'
				    }}>

						<Row>
							<Col xs sm={8}>
								<p><span style={{color:'red'}}>Task:</span><br/>Update your progress<br/>Progress: {updateNum}/1</p>
							</Col>
							<Col xs sm={4}>
								{this.UpdateReward(updateNum)}
							</Col>
						</Row>
						<Row>
							<Col xs sm={8}>
								<p><span style={{color:'red'}}>Task:</span> Cheer others<br/>Progress: {voteNum}/3</p>
							</Col>
							<Col xs sm={4}>
								{this.CheerReward(voteNum)}
							</Col>
						</Row>
					</div>
				)
			}
			else{
			//	this.setState({remainedTask:1})
				return(
					<div className="noti-label" style={{
				      backgroundColor: 'white'
				    }}>

						<Row>
							<Col xs sm={8}>
								<p><span style={{color:'red'}}>Task:</span><br/>Update your progress<br/>Progress: {updateNum}/1</p>
							</Col>
							<Col xs sm={4}>
								{this.UpdateReward(updateNum)}
							</Col>
						</Row>
					</div>
				)
			}
		}
		else{
			if(voteTaskStatus===false){
			//	this.setState({remainedTask:1})
				return(
					<div style={{
						backgroundColor: 'white'
					}}>
						<Row>
							<Col xs sm={8}>
								<p><span style={{color:'red'}}>Task:</span> Cheer others<br/>Progress: {voteNum}/3</p>
							</Col>
							<Col xs sm={4}>
								{this.CheerReward(voteNum)}
							</Col>
						</Row>
					</div>
				)
			}
			else{
			//	this.setState({remainedTask:0})
				return(
					<div className="noti-label" style={{
						backgroundColor: 'white'
					}}>
						No remain task
						<p></p>
					</div>
				)
			}
		}
	}
	NotificationNumber(){
		let NotificationNumber = 0
		db.ref('users/'+this.props.uid+'/remainedCheer').once('value',(snapshot)=>{
			let CheerNumber = snapshot.val()
			if(CheerNumber===null){
				CheerNumber = 0
			}
			NotificationNumber = NotificationNumber + CheerNumber
		})
		db.ref('users/'+this.props.uid+'/task/remainedTask').once('value',(snapshot)=>{
			let TaskNumber = snapshot.val()
			if(TaskNumber===null){
				TaskNumber = 0
			}
			NotificationNumber = NotificationNumber + TaskNumber
		})
		return (NotificationNumber)
	}

	componentDidMount(){
	}



	render() {
		var popover =
			<Popover id="popover-notification" style={{marginRight: '2%'}} >
				<Popover.Content >
					{this.MyNotification()}
					{this.CheerNotification()}
				</Popover.Content>
			</Popover>

		return(
			<React.Fragment>
				<OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
					<div style = {{width: '50px', height: '40px', margin: '13px'}}>
						<span className="fa-layers fa-fw icon-noti" align="right">
							<FontAwesomeIcon icon="bell"/>
							<span className="fa-layers-counter" style={{background:"Tomato"}}>
								{this.NotificationNumber()}
							</span>
						</span>
					</div>
				</OverlayTrigger>
			</React.Fragment>
		)}
}

export default Notification;
