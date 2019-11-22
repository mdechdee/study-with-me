import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import CreateGroup from'./CreateGroup.js';

class FindGroups extends React.Component {

	render(){
		return(

			<div>
				<div>
				Groups in SWM
				</div>
				<div>
					<Row>
						<Col>
						NAME
						</Col>
						<Col>
						START AT
						</Col>
						<Col>
						TIME
						</Col>
						<Col>
						MEMBER
						</Col>
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
		);
	}
}

export default FindGroups;
