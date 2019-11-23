import React from 'react'
import { Row, Col } from 'react-bootstrap';
// import Moment from 'moment';

class MyComponent extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div>
				<Row className='justify-content-sm-center'>
					<Col>
						<Row className='justify-content-sm-center'> {this.props.one.name} </Row>
					</Col>

					<Col>
						<Row className='justify-content-sm-center'> {this.props.one.baseStartDate} </Row>
						<Row className='justify-content-sm-center'> {this.props.one.baseStartTime} </Row>
					</Col>

					<Col>
						<Row className='justify-content-sm-center'> {this.props.one.totalTime} {this.props.one.totalTimeUnit} </Row>
						<Row className='justify-content-sm-center'> ({this.props.one.interval} {this.props.one.intervalUnit} x {this.props.one.roundNum}) </Row>
					</Col>

					<Col>
						<Row className='justify-content-sm-center'> {this.props.one.peopleNum} </Row>
					</Col>

				</Row>
			</div>
		)}


}

export default MyComponent;
