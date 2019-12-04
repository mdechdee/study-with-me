import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import { db } from './firebase/firebase.js';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

class Notification extends React.Component {
	constructor(props){
	    super(props);
	    this.state = {
	        loading: null,
	        groups: [],
					usergroup: "",
	    }
	}

	MyNotification(){
		var taskRef = db.ref("users/"+this.props.uid+"/task")
		var updateTaskStatus = false
		var updateNum = 0
		var voteNum = 0
		var voteTaskStatus = false
		taskRef.on("value",(snapshot)=>{
			var task = snapshot.val()
			updateTaskStatus = task.updateTask.rewardReceived
			voteTaskStatus = task.voteTask.rewardReceived
			updateNum = task.updateTask.number
			voteNum = task.voteTask.number
			console.log(task);
			console.log(task.updateTask.rewardReceived)
		})
		if(updateTaskStatus===false){
			if(voteTaskStatus===false){
				return(
					<div align="left" style={{
			width: 250,
      backgroundColor: 'yellow',
      borderRadius: 5
    }}>
					<h2>Notification</h2>
					<p>Remained Task:2</p>
					<p>Update your progress ({updateNum}/1)
					<br/>Vote others ({voteNum}/3)</p>
				</div>
			)
			}
			else{
				return(
				<div align="left" style={{
			width: 250,
      backgroundColor: 'yellow',
      borderRadius: 5
    }}>
				<h2>Notification</h2>
				<p>Remained Task:1</p>
				<p>Update your progress ({updateNum}/)</p>
			</div>
		)
			}
		}
		else{
		if(voteTaskStatus===false){
			return(
				<div align="left" style={{
			width: 250,
      backgroundColor: 'yellow',
      borderRadius: 5
    }}>
				<h2>Notification</h2>
				<p>Remained Task:1</p>
				<p>Vote others ({voteNum}/3)</p>
			</div>)
		}
		else{
			return(
				<div align="left" style={{
			width: 250,
      backgroundColor: 'yellow',
      borderRadius: 5
    }}>
					<h2>Notification</h2>
					<p>Update your progress ({updateNum}/1)
					<br/>Vote others ({voteNum}/3){voteTaskStatus}{updateTaskStatus}</p>
				<p>No Task Remained</p>
				</div>
		)
		}
	}
	}

	fetchGroupsData(){
		db.ref(`groups`).once('value',(snapshot) => {
			let val = snapshot.val();
			Object.keys(val).forEach((item) => {
				this.setState({groups: [...this.state.groups, val[item]]});
			})
		})
	}

	checkUserGroup()
	{
		db.ref(`users/${this.props.uid}`).on('value', (snapshot) => {
			let a = snapshot.val()
			this.setState({usergroup: a.group})
		});
	}

	componentDidMount(){

	}



	render() {
		return(
			<React.Fragment>
					<Button
						onClick={()=> {
							store.addNotification({
								title: 'Notification',
								content:this.MyNotification(),
								type:'info',
								container: 'top-center',
								animationIn: ["animated", "fadeIn"],
								animationOut: ["animated", "fadeOut"],
								dismiss:{
									duration: 10000
								}
							})
						}}
						>
						Notification
					</Button>
			</React.Fragment>
		)}
}

export default Notification;
