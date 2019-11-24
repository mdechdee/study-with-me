import React from 'react';
import {Button} from 'react-bootstrap';
import { db } from './firebase/firebase.js';
import TimerContext from './TimerContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import progress from './camera.jpg';
import JoinGroup from './JoinGroup.js';
import AllMember from './AllMember.js';
import Carousel from './Carousel.js';
import UpdateProgress from './UpdateProgress.js';
import { Scrollbars } from 'react-custom-scrollbars';
import { Container, Row, Col } from 'react-bootstrap';
import { MDBContainer, MDBCarousel ,MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';

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
			mapPeopleWithNumber: null,
			isLoaded: false,
			isDone:false,
			usergroup:''
		};
		this.handleLeft = this.handleLeft.bind(this);
		this.handleRight = this.handleRight.bind(this);
	}
	// bring data from database
	checkUserGroup(){
		db.ref(`users/${this.props.uid}`).on('value', (snapshot) => {
			let a = snapshot.val()
			console.log(a.group)
			this.setState({usergroup: a.group})
		});
	}
	collectPeople(){
		db.ref('groups/'+ this.state.usergroup +'/people').once('value',(snapshot) =>{
			this.setState({
				people: snapshot.val()
			})
		})
	}
	// map uid to number and count total number of people
	countPeople(){
		let num = 0;
		let temp = {};
		Object.keys(this.state.people).forEach(function (person){
			temp[num]=person;
		    num=num+1;
		});
		this.setState({mapPeopleWithNumber:temp});
		this.setState({totalPeople:num});
		this.setState({isLoaded:true});
		console.log("state");
		console.log(this.state);
	}
	handleLeft(){
		if (this.state.rank>0) this.setState({rank:this.state.rank-1})
	}
	handleRight(){
		if (this.state.rank<this.state.totalPeople-1) this.setState({rank:this.state.rank+1})
	}
	//Fetch group start/stop/interval time (Now start with current time)
	fetchGroupData(){
		db.ref('groups/'+this.state.usergroup).once('value', (snapshot) => {
			let val = snapshot.val();
			this.setState({
	        	intervalTime: val.interval,
	        	startTime: this.state.currentTime,
        		stopTime: this.state.currentTime + val.interval
	    	});
        })

	}
	// Fetch current servers time
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
		db.ref("groups/"+this.state.usergroup+"/startTime").set(this.state.startTime)
		db.ref("groups/"+this.state.usergroup+"/stopTime").set(this.state.stopTime)
	}

	checkTimeUp(){
		if(this.state.currentTime > this.state.stopTime){
			this.pushNewStartTime()
			console.log("Time's up!")
		}
	}
	componentDidMount(){
		this.checkUserGroup()
		this.fetchCurrentTime()
		this.fetchGroupData()
		setInterval(() => {
			this.setState({
				currentTime : this.state.offset + Date.now()
			})
			this.checkTimeUp()
		}, 100)
		//Boss part
		this.collectPeople();
		setTimeout(function(){
			this.countPeople()
			}.bind(this),1000);
	}

	render(){
		console.log("This is from myGroup");
		return(
			<div>
				<Scrollbars style={{ width: 600, height: 500}}>
					<div>
						Group: this.state.usergroup
					</div>
					<div className="member-progress">
						<p>Progress</p>
						<Container>
							<Col>
						        <Row md={4}><button onClick={this.handleLeft}><FontAwesomeIcon icon='chevron-circle-left'/></button></Row>
						    </Col>
						    <Col>
						        <Row md={4}>
						        	<div className="card">
									    {this.state.isLoaded ? (
									    	<Carousel props={this.state}/>
									    	) : (
									        <p> loading </p>
									    )}
								    </div>
								</Row>
							</Col>
							<Col>
						        <Row md={4}><button onClick={this.handleRight}><FontAwesomeIcon icon='chevron-circle-right'/></button></Row>
						    </Col>
					    </Container>
					</div>
				<UpdateProgress />
		<JoinGroup uid={this.props.uid}/>
			//Temporary join group
				</Scrollbars>


			</div>
		);
	}
}

export default MyGroup;
