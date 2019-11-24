import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
// import Moment from 'moment';
import './scss/FindGroups.scss';
import {db} from './firebase/firebase.js'

class MyComponent extends React.Component {
	constructor(props) {
		super(props);
	}

	handleClick() {
		var userRef = db.ref(`users/${this.props.uid}`);

	}

	render() {
		return(
			<Container>
				<Row className='group-row'>
					<Col xs={3} sm={3} className="group-column">
						<div className='group-name' onClick={this.handleClick}>{this.props.one.name} </div>
					</Col>

					<Col xs={3} sm={3} className=" group-column">
						<Row><div className='group-info'> {this.props.one.baseStartDate} </div></Row>
						<Row><div className='group-info'> {this.props.one.baseStartTime} </div></Row>
					</Col>

					<Col xs={3} sm={3} className="group-column">
						<Row><div className='group-info'> {this.props.one.totalTime} {this.props.one.totalTimeUnit} </div></Row>
						<Row><div className='group-info'> ({this.props.one.interval} {this.props.one.intervalUnit} x {this.props.one.roundNum}) </div></Row>
					</Col>

					<Col xs={3} sm={3} className="group-column">
						<div className='group-info'> {this.props.one.peopleNum} </div>
					</Col>

				</Row>
			</Container>

		)}


}

export default MyComponent;
