import React from 'react';
import { db } from './firebase/firebase.js';

class MyGroup extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			startTime :  Date.now(),
			stopTime: Date.now() + 100000,
			currentTime : Date.now(),
			intervalTime: 0,
			offset: 0,
		};
	}
	//Fetch group start/stop/interval time (Now start with current time)
	fetchGroupData(){
		db.ref('groups/study').once('value', (snapshot) => {
			let val = snapshot.val();
			this.setState({
	        	intervalTime: val.interval,
	        	startTime: this.state.currentTime,
        		stopTime: this.state.currentTime + val.interval
	    	})
        })

	}
	// Fetch current server's time
	fetchCurrentTime(){
        db.ref('/.info/serverTimeOffset').on('value', (data) => {
	    	this.setState({	
				offset : data.val(),
				currentTime: this.state.offset + Date.now()
			})
	  	});
	}


	pushNewStartTime(){
		this.setState({
	        startTime: this.state.startTime + this.state.intervalTime,
        	stopTime: this.state.stopTime + this.state.intervalTime
        })
		db.ref("groups/study/startTime").set(this.state.startTime)
		db.ref("groups/study/stopTime").set(this.state.stopTime)
	}

	checkTimeUp(){
		if(this.state.currentTime > this.state.stopTime){
			this.pushNewStartTime()
			console.log("Time's up!")
		}
	}

	componentDidMount(){
		this.fetchCurrentTime()
		this.fetchGroupData()
		setInterval(() => {
			this.setState({	
				currentTime : this.state.offset + Date.now()
			})
			this.checkTimeUp()
		}, 100)
		
	}

	render(){
		return(
			<div>
				<div> {new Date(this.state.currentTime).getSeconds()} </div>
				<div> {new Date(this.state.startTime).getSeconds()} </div>
				<div> {new Date(this.state.stopTime).getSeconds()} </div>
				<div> {this.state.intervalTime} </div>
			</div>
		);
	}
}

export default MyGroup;
