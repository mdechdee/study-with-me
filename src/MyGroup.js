import React from 'react';
import {Button} from 'react-bootstrap';
import { db } from './firebase/firebase.js';
import TimerContext from './TimerContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import progress from './camera.jpg';
import Carousel from './Carousel.js';
import { Scrollbars } from 'react-custom-scrollbars';

function makePersonalCard(props){
	return(
		<div>
			<Carousel uid={props.rank}/>
			{props.rank}
		</div>
	)
}

class MyGroup extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			startTime :  Date.now(),
			stopTime: Date.now() + 100000,
			currentTime : Date.now(),
			intervalTime: 0,
			offset: 0,
			//Boss part
			rank:0 ,
			totalPeople: 0,
			people: null,
			mapPeopleWithNumber: null
		};
		this.handleLeft = this.handleLeft.bind(this);
		this.handleRight = this.handleRight.bind(this);
	}
	collectPeople(){
		db.ref('groups/study/people').once('value',(snapshot) =>{
			this.setState({
				people: snapshot.val()
			})
		})
	}
	countPeople(){
		//it doesn't work
		Array.from(this.state.people).map((person)=>{
			console.log("A");
			this.setState({mapPeopleWithNumber: Object.assign({},this.state.mapPeopleWithNumber,{[this.state.totalPeople]: person.uid})}) //asynchronous
			this.setState({totalPeople: this.state.totalPeople+1})
			}
		);
	}
	handleLeft(){
		if (this.state.rank>0) this.setState({rank:this.state.rank-1})
	}
	handleRight(){
		if (this.state.rank<this.state.totalPeople) this.setState({rank:this.state.rank+1})
		console.log(this.state);
	}
	//Fetch group start/stop/interval time (Now start with current time)
	fetchGroupData(){
		db.ref('groups/study').once('value', (snapshot) => {
			let val = snapshot.val();
			this.setState({
	        	intervalTime: val.interval,
	        	startTime: this.state.currentTime,
        		stopTime: this.state.currentTime + val.interval
	    	});
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

	componentWillMount(){
		this.collectPeople();
		setTimeout(function(){this.countPeople()}.bind(this),1000)
	}

	componentDidMount(){
		this.fetchCurrentTime()
		this.fetchGroupData()
		console.log(this.state.totalPeople);
		setInterval(() => {
			this.setState({
				currentTime : this.state.offset + Date.now()
			})
			this.checkTimeUp()
		}, 100)
		//Boss part
	}

	render(){

		return(
			<div>
				<Scrollbars style={{ width: 400, height: 700}}>
					<div> {new Date(this.state.currentTime).getSeconds()} </div>
					<div> {new Date(this.state.startTime).getSeconds()} </div>
					<div> {new Date(this.state.stopTime).getSeconds()} </div>
					<div> {this.state.intervalTime} </div>
					<div>
						Group: Study Marathon
					</div>
					<div>
						<p>Progress</p>
						<p>-username</p>
						<button onClick={this.handleLeft}><FontAwesomeIcon icon='chevron-circle-left'/></button>
						{makePersonalCard(this.state)}
						<button onClick={this.handleRight}><FontAwesomeIcon icon='chevron-circle-right'/></button>
					</div>
					<div>
						<button><FontAwesomeIcon icon='comment'/></button>
						<button><FontAwesomeIcon icon='star'/></button>
					</div>
					<div>
						<button> Join Group </button>
					</div>
				</Scrollbars>
			</div>
		);
	}
}

export default MyGroup;
