import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import CreateGroup from'./CreateGroup.js';
import MyComponent from './MyComponent.js'
import { db } from './firebase/firebase.js';
import './scss/FindGroups.scss';

class FindGroups extends React.Component {
	constructor(props){
	    super(props);
	    this.state = {
	        loading: null,
	        groups: [],
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

	componentDidMount(){
		this.fetchGroupsData()
	}

	showAllGroups(){
		let groupsComponent = []
		for(let i=0; i<this.state.groups.length; i+=1){
				groupsComponent.push(<div className='each-group-row'><MyComponent one={this.state.groups[i]} key={i}> </MyComponent></div>);
		}
		return groupsComponent
	}

	render() {
		return(
			<div>
				<div className="find-title">Groups in SWM</div>
				<div className="find-outer-wrap">
					<Row className="row-line">
						<Col sm={3} ><div className="col-title">NAME</div></Col>
						<Col sm={3} ><div className="col-title">START AT</div></Col>
						<Col sm={3} ><div className="col-title">TIME</div></Col>
						<Col sm={3} ><div className="col-title">MEMBER</div></Col>
					</Row>
				</div>

				<div className ="group-list">
					<Scrollbars style={{ height: 400 }}>
						<div className = "group-component">
							{this.showAllGroups()}
						</div>
					</Scrollbars>
				</div>

				<div>
					<CreateGroup />
				</div>

			</div>
		)}


}

export default FindGroups;
