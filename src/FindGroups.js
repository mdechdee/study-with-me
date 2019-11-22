import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


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
					<Row>
					</Row>


					<div>
						<Row>
							<Col>
								<Link to='/CreateGroup'>
									<Button>Create a group</Button>
								</Link>
							</Col>
						</Row>
					</div>
				</div>


			</div>
		);
	}
}

export default FindGroups;
