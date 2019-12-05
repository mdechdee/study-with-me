import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import CreateGroup from'./CreateGroup.js';
import MyComponent from './MyComponent.js'
import { db } from '../firebase/firebase.js';
import '../scss/FindGroups.scss';

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
		this.fetchGroupsData()
		this.checkUserGroup()
	}

	showAllGroups(){
		let groupsComponent = []
		for(let i=0; i<this.state.groups.length; i+=1){
				groupsComponent.push(<MyComponent usergroup={this.state.usergroup} one={this.state.groups[i]} uid={this.props.uid} key={i}> </MyComponent>);
		}
		return groupsComponent
	}

	render() {

		return(
			<React.Fragment>
					<div className="find-title">Groups in SWM</div>

						<Container className="find-title-wrap">
							<Row className="row-line">
								<Col xs sm={3}><div className="col-title">NAME</div></Col>
								<Col xs sm={3}><div className="col-title">START AT</div></Col>
								<Col xs sm={3}><div className="col-title">TIME</div></Col>
								<Col xs sm={3}><div className="col-title">MEMBER</div></Col>
							</Row>
						</Container>

						<Scrollbars hideTracksWhenNotNeeded={true}
							className="scroll"
							>
							{this.showAllGroups()}
						</Scrollbars>


				<div className="create-group-button">
					<CreateGroup disabled={this.state.usergroup !== ""} uid={this.props.uid}/>
				</div>

			</React.Fragment>
		)}


}

export default FindGroups;
