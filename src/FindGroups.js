import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import CreateGroup from'./CreateGroup.js';
//import ShowAllGroups from'./ShowAllGroups.js';
import { db } from './firebase/firebase.js';
import MyComponent from './MyComponent.js'
class FindGroups extends React.Component {
	constructor(props){
	    super(props);
	    this.state = {
	        loading: null,
	        groups: [],
					usergroup: "",
	    }
	}

	fetchGroupsData(){
		db.ref(`groups`).once('value',(snapshot) => {
			let val = snapshot.val();
			Object.keys(val).forEach((item) => {
				console.log(val[item])
				this.setState({groups: [...this.state.groups, val[item]]});
			})
		})
	}

	checkUserGroup()
	{
		let userHasGroup = true
		db.ref(`users/${this.props.uid}`).once('value').then(snapshot => {
			let a = snapshot.val()
			console.log(a.group)
			this.setState({usergroup: a.group})
		});
	}

	componentDidMount(){
		this.fetchGroupsData()
		this.checkUserGroup()
	}

	showAllGroups(){
		let groupsComponent = []
		for(let i=0; i<this.state.groups.length; i+=1){
				groupsComponent.push(<MyComponent one={this.state.groups[i]} key={i}> </MyComponent>);
		}
		return groupsComponent
	}

	render() {

		return(
			<div>
				<div>Groups in SWM</div>
				<div>
					<Row>
						<Col>NAME</Col>
						<Col>START AT</Col>
						<Col>TIME</Col>
						<Col>MEMBER</Col>
					</Row>
				</div>

				<div>
					<Scrollbars style={{ width: 500, height: 400 }}>
						{this.showAllGroups()}
					</Scrollbars>
				</div>

				<div>
					<CreateGroup disabled={this.state.usergroup !== ""} uid={this.props.uid}/>
				</div>

			</div>
		)}


}

export default FindGroups;
