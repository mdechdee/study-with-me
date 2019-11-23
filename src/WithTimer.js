import React from 'react';
import { db } from './firebase/firebase.js';
import TimerContext from './TimerContext.js'

const withTimer = (Component) =>
	class WithTimer extends React.Component {
		constructor(props){
			super(props);
			this.state = {
				startTime :  Date.now(),
				stopTime: Date.now() + 100000,
				currentTime : Date.now(),
				intervalTime: 0,
				intervalNum: 0,
				offset: 0,
				stopwatchID: 0,
			};
		}
		//Fetch group start/stop/interval time (Now start with current time)
		fetchGroupData(){
			db.ref('groups/study').once('value', (snapshot) => {
				let val = snapshot.val();
				this.setState({
        	intervalTime: val.intervalTime,
        	intervalNum: val.intervalNum
        })
				if(val.startTime === -1){
					this.setState({
				  	startTime: this.state.currentTime,
						stopTime: this.state.currentTime + val.intervalTime
				})
				db.ref("groups/study/startTime").set(this.state.startTime)
				db.ref("groups/study/stopTime").set(this.state.stopTime)
				}
				else
				{
					this.setState({
				  	startTime: val.startTime,
						stopTime: val.stopTime
					})
				}
			})

		}
		// Fetch current server's time
		fetchCurrentTime(){
	      db.ref('/.info/serverTimeOffset').on('value', (data) => {
		    	this.setState({
					offset : data.val(),
					currentTime: data.val() + Date.now()
					})
		  	});
		}


		pushNewStartTime(){
			this.setState({
		        startTime: this.state.startTime + this.state.intervalTime,
	        	stopTime: this.state.stopTime + this.state.intervalTime,
	        	intervalNum: this.state.intervalNum+1
	        })
			db.ref("groups/study/startTime").set(this.state.startTime)
			db.ref("groups/study/stopTime").set(this.state.stopTime)
			db.ref("groups/study/intervalNum").set(this.state.intervalNum)

		}

		checkTimeUp(){
			if(this.state.currentTime > this.state.stopTime){
				this.pushNewStartTime()
				console.log("Time's up!, "+this.state.intervalNum +" intervals passed")
			}
		}

		componentDidMount(){
			//First, store current time to match server's time
			this.fetchCurrentTime()
			//Next, store start&stop time for the group
			this.fetchGroupData()
			//Countdown every 100ms to update local current time
			let stopwatch = setInterval(() => {
				this.setState({
					currentTime : this.state.offset + Date.now()
				})
				this.checkTimeUp()
			}, 1000)
			this.setState({stopwatchID: stopwatch})
		}

		componentWillUnmount(){
			clearInterval(this.state.stopwatchID)
		}
					//<div> {new Date(this.state.currentTime).getMilliseconds()} </div>
					//<div> {new Date(this.state.startTime).getMilliseconds()} </div>
					//<div> {new Date(this.state.stopTime).getMilliseconds()} </div>
		render(){
			return(
				<TimerContext.Provider value={this.state}>
					<Component {...this.props} />
				</TimerContext.Provider>
			);
		}
	}

export default withTimer;
