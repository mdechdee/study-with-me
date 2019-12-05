import React from 'react';
import { db } from './firebase/firebase.js';
import TimerContext from './TimerContext.js'
import AuthContext from './authentication/AuthContext.js'

const withTimer = (Component) =>
	class WithTimer extends React.Component {
		static contextType = AuthContext
		constructor(props){
			super(props);
			this.state = {
				uid: null,
				groupName: null,
				startTime :  Date.now(),
				stopTime: Date.now() + 100000,
				baseStartTime: Date.now(),
				baseStopTime:  Date.now() + 100000,
				currentTime : Date.now(),
				intervalTime: 0,
				intervalNum: 0,
				offset: 0,
				stopwatchID: 0,
				people: [],
				progressUpdateFlag: 0,
			};
		}
		//Fetch group start/stop/interval time (Now start with current time)
		fetchGroupData(){
			db.ref(`users/${this.state.uid}/group`).on('value', (snap) =>{
				let _group = snap.val();
				this.setState({groupName: _group})
				db.ref(`groups/${_group}`).on('value', (snapshot) => {
					let val = snapshot.val();
					this.setState({
						intervalTime: val.intervalTime,
						intervalNum: val.intervalNum,
						startTime: val.startTime,
						stopTime: val.stopTime,
						baseStartTime: val.baseStartTime,
						baseStopTime: val.baseStopTime,
						people: val.people,
						progressUpdateFlag: val.progressUpdateFlag,
					})
				})
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
			if(this.state.groupName === "")
				return
			var _startTime = this.state.startTime
			var _stopTime = this.state.stopTime
			var _intervalNum = this.state.intervalNum
			while(_stopTime < this.state.currentTime)
			{
				_startTime += this.state.intervalTime
				_stopTime += this.state.intervalTime
				_intervalNum += 1
			}
			this.setState({
		        startTime: _startTime,
	        	stopTime: _stopTime,
	        	intervalNum: _intervalNum
	        }, () => {
					console.log(this.state.startTime)
					db.ref(`groups/${this.state.groupName}/startTime`).set(this.state.startTime)
					db.ref(`groups/${this.state.groupName}/stopTime`).set(this.state.stopTime)
					db.ref(`groups/${this.state.groupName}/intervalNum`).set(this.state.intervalNum)
			})
			this.setPeopleStatus()
		}

		setPeopleStatus(){
				var _people = this.state.people
				Object.keys(_people).forEach((person) =>{
					_people[person].status = 'inactive'
				})
				console.log(_people)
				this.setState({people: _people})
				db.ref(`groups/${this.state.groupName}/people`).update(_people)
				db.ref(`groups/${this.state.groupName}/progressUpdateFlag`).set(0)
		}

		checkTimeUp(){
			if(this.state.currentTime > this.state.stopTime){
				this.pushNewStartTime()
				console.log("Time's up!, "+this.state.intervalNum +" intervals passed")
			}
		}

		setupTimer(){
			console.log("Setting up timer, uid: "+this.state.uid)
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

		componentDidUpdate(){
			const auth = this.context
			if(auth === null)
				return
			if (auth.uid !== this.state.uid)
			{
				this.setState({uid: auth.uid}, () => {
					clearInterval(this.state.stopwatch)
					this.setupTimer()
				});
			}

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
