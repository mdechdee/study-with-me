import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import CreateGroup from'./CreateGroup.js';
import { db } from './firebase/firebase.js';

class FindGroups extends React.Component {
	constructor(props){
	    super(props);
	    this.state = {
	        loading: null,
	        groups: [],
	    }
	}

	render(){
		return(

			<div>
				<div>
				Groups in SWM
				</div>
				<div>
					<Row>
						<Col>NAME</Col>
						<Col>START AT</Col>
						<Col>TIME</Col>
						<Col>MEMBER</Col>
					</Row>
				</div>

				<div>
					<Scrollbars style={{ width: 400, height: 400 }}>
						<p> Hello </p>
						<p> Hello </p>
						<p> Hello </p>
						<p> Hello </p>
						<p> Hello </p>
						<p> Hello </p>
						<p> Hello </p>
						<p> Hello </p>
						<p> Hello </p>
						<p> Hello </p>
						<p> Hello </p>
						<p> Hello </p>
					</Scrollbars>
				</div>

				<div>
					<CreateGroup />
				</div>


			</div>
		)}

	fetchGroupsData(){
		db.ref(`groups`).once('value',(snapshot) => {
			let val = snapshot.val();
			Object.keys(val).forEach((item) => {
      	this.setState({groups: [...this.state.groups, item]});
      })

		})

	}

	componentDidMount(){
		this.fetchGroupsData()
	}

	showAllGroups(){
		let groupsComponent = []
		for(let i = 0;i<this.state.groups.length;i++){
			//replace paragraph with a cool component!
			groupsComponent.push(<p key={i}> {this.state.groups[i]} </p>);
		}
		return groupsComponent
	}

}

export default FindGroups;
