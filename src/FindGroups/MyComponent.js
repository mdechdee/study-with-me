import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
// import Moment from 'moment';
import JoinGroup from'./JoinGroup.js';
import {toast} from 'react-toastify';
import '../scss/FindGroups.scss';

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
		if(this.props.usergroup === ''){
    	this.setState({show: true});
		}
		else {
			toast("You're already in a group.", {
				position: toast.POSITION.TOP_CENTER,
			});
		}
  }

	render() {
		return(
			<Container fluid className="group-wrap">
				<Row className='group-row'>

					<Col xs sm md lg xl={3}>
						<Row><div className='group-name' onClick={this.handleShow}> {this.props.one.name} </div></Row>
					</Col>

					<Col xs sm md lg xl={3} className="group-column">
						<Row><div className='group-info'> {this.props.one.baseStartDate} </div></Row>
						<Row><div className='group-info'> {this.props.one.baseStartTime} </div></Row>
					</Col>

					<Col xs sm md lg xl={3} className="group-column">
						<Row><div className='group-info'> {this.props.one.totalTime} {this.props.one.totalTimeUnit} </div></Row>
						<Row><div className='group-info-small'> ({this.props.one.interval} {this.props.one.intervalUnit} x {this.props.one.roundNum}) </div></Row>
					</Col>

					<Col xs sm md lg xl={3} className="group-column">
						<div className='group-info'> {this.props.one.peopleNum} </div>
					</Col>

					<JoinGroup uid={this.props.uid} show={this.state.show} handleClose={this.handleClose} name={this.props.one.name}/>
				</Row>
			</Container>

		)}


}

export default MyComponent;
