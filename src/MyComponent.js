import React from 'react'
import { Row, Col } from 'react-bootstrap';
// import Moment from 'moment';
import './scss/FindGroups.scss';
import {db} from './firebase/firebase.js'
import JoinGroup from'./JoinGroup.js';

class MyComponent extends React.Component {
	constructor(props) {
		super(props);
		this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
		this.state = {
      show: false,
    };
	}

	handleClose(){
    this.setState({show: false});
  }

  handleShow(){
    this.setState({show: true});
  }

	render() {
		return(
			<div>
				<Row className='group-row'>

					<Col sm={3}>
						<Row><div className='group-name' onClick={this.handleShow}> {this.props.one.name} </div></Row>
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

					<JoinGroup uid={this.props.uid} show={this.state.show} handleClose={this.handleClose} name={this.props.one.name}/>
				</Row>
			</div>
		)}


}

export default MyComponent;
