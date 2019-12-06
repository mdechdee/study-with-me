import React from 'react';
import { Container, Row, Col, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import { db } from './firebase/firebase.js';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'animate.css';

class Notification extends React.Component {
	constructor(props){
	    super(props);
			this.handleCheerReward=this.handleCheerReward.bind(this)
			this.handleUpdateReward=this.handleUpdateReward.bind(this)
			this.ClearCheerList=this.ClearCheerList.bind(this)
	    this.state = {
	        cheererName:[],
					cheerType:[],
					length: 0
	    }
	}
	handleCheerReward(){
		db.ref("users/"+this.props.uid+"/task/voteTask/rewardReceived").set(true)
		db.ref("users/"+this.props.uid+"/task/remainedTask").once('value',(snapshot)=>{
			let remainedTask = snapshot.val();
			remainedTask = remainedTask -1;
			db.ref("users/"+this.props.uid+"/task/remainedTask").set(remainedTask)
		})

	}

	handleUpdateReward(){
		db.ref("users/"+this.props.uid+"/task/updateTask/rewardReceived").set(true)
		db.ref("users/"+this.props.uid+"/task/remainedTask").once('value',(snapshot)=>{
			let remainedTask = snapshot.val();
			remainedTask = remainedTask -1;
			db.ref("users/"+this.props.uid+"/task/remainedTask").set(remainedTask)
		})
	}

	CheerReward(voteNum){
		if(voteNum>=3){
			return(
				<Button variant="success" onClick={this.handleCheerReward}>Claim point</Button>
			)
		}
		else
		return null
	}

	UpdateReward(updateNum){
		if(updateNum>=1){
			return(
				<Button variant="success" onClick={this.handleUpdateReward}>Claim point</Button>
			)
		}
		else
		return null

	}

	ClearCheerList(){
		db.ref("users/"+this.props.uid+"/cheer").set(null)
	}

	CheerNotification(){
		let cheerList=[]
		db.ref("users/"+this.props.uid+"/cheer").on('value',(snapshot)=>{
			var cheer = snapshot.val()
			if((cheer!==null) &&(cheer!="")){
			Object.keys(cheer).forEach((item)=>{
				cheerList.push(
					<div>
						<Row>
							<Col>
								{cheer[item].cheererName} gave you a {cheer[item].cheerType}
							</Col>
						</Row>
					</div>
				)
			})
			cheerList.push(<Button onClick={this.ClearCheerList}>Clear your cheer list notification</Button>)
		}
		else cheerList.push(
			<div>
								<Row>
									<Col>
										No cheer
	</Col>
								</Row>
							</div>)
	})
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
			updateTaskStatus = task.updateTask.rewardReceived
			voteTaskStatus = task.voteTask.rewardReceived
			updateNum = task.updateTask.number
			voteNum = task.voteTask.number
		})
		if(updateTaskStatus===false){
			if(voteTaskStatus===false){
				return(
					<container style={{
      backgroundColor: 'white'
    }}>

					<Row><Col><p>Task: Update your progress<br/>Progress: {updateNum}/1</p></Col><Col xs sm={4}>{this.UpdateReward(updateNum)}</Col></Row>
					<Row><Col><p>Task: Cheer others<br/>Progress: {voteNum}/3</p></Col><Col xs sm={4}>{this.CheerReward(voteNum)}</Col></Row>
				</container>
			)
			}
			else{
				return(
					<div align="left" style={{
      backgroundColor: 'white'
    }}>
		<p>Task: Update your progress<br/>Progress: {updateNum}/1{this.UpdateReward(updateNum)}</p>
			</div>
		)
			}
		}
		else{
		if(voteTaskStatus===false){
			return(
				<div align="left" style={{
			backgroundColor: 'white'
			}}>
			<p>Task: Cheer others<br/>Progress: {voteNum}/3{this.CheerReward(voteNum)}</p>
</div>
		)
		}
		else{
			return(
				<div align="left" style={{
			backgroundColor: 'white'
			}}>

			</div>
		)
		}
	}
	}




	componentDidMount(){
		db.ref("users/"+this.props.uid+"/cheer").on('value',(snapshot)=>{
			var cheer = snapshot.val()
			console.log(cheer)})
	}



	render() {
		var popover =
			<Popover id="popover-notification" >
				<Popover.Content>
					{this.MyNotification()}
					{this.CheerNotification()}
				</Popover.Content>
			</Popover>

		return(
			<React.Fragment>
				<OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
					<FontAwesomeIcon icon="bell" />
				</OverlayTrigger>
			</React.Fragment>
		)}
}

export default Notification;
