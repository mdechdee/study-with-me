import React from 'react'
import { Row, Col } from 'react-bootstrap';
// import Moment from 'moment';
import './scss/FindGroups.scss';
import {db} from './firebase/firebase.js'
import JoinGroup from'./JoinGroup.js';

class MyComponent extends React.Component {
	constructor(props) {
		super(props);
	}

	handleClick() {
		// var userRef = db.ref(`users/${this.props.uid}`);
		// <JoinGroup />
	}

	render() {
		return(
			<div>
				<Row className='group-row'>

					<Col sm={3}>
						<Row><div className='group-name' onClick={this.handleClick}>{this.props.one.name} </div></Row>
					</Col>

					<Col sm={3}>
						<Row><div className='group-info'> {this.props.one.baseStartDate} </div></Row>
						<Row><div className='group-info'> {this.props.one.baseStartTime} </div></Row>
					</Col>

					<Col sm={3}>
						<Row><div className='group-info'> {this.props.one.totalTime} {this.props.one.totalTimeUnit} </div></Row>
						<Row><div className='group-info'> ({this.props.one.interval} {this.props.one.intervalUnit} x {this.props.one.roundNum}) </div></Row>
					</Col>

					<Col sm={2}>
						<Row><div className='group-info'> {this.props.one.peopleNum} </div></Row>
					</Col>

				</Row>
			</div>
		)}


}

export default MyComponent;
