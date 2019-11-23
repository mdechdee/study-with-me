import React from 'react';
import {Row, Col, Button} from 'react-bootstrap'
import {Form} from 'react-bootstrap'

class CreateGroupDescription extends React.Component{
	constructor(props){
		super(props);
		this.group_name_change=this.group_name_change.bind(this)
		this.group_start_date_change=this.group_start_date_change.bind(this)
		this.group_time_change=this.group_time_change.bind(this)
		this.group_interval_change=this.group_interval_change.bind(this)
		this.group_total_time_change=this.group_total_time_change.bind(this)
		this.state = {
			group_name:"",
			group_start_date:"",
			group_time:"",
			group_interval:"",
			group_total_time:""
		};
	}

	group_name_change(e){
		this.setState({group_name: e.target.value})
	}

	group_start_date_change(e){
		this.setState({group_start_date: e.target.value})
	}

	group_time_change(e){
		this.setState({group_time: e.target.value})
		console.log(this.state.group_time)
	}

	group_interval_change(e){
		this.setState({group_interval: e.target.value})
	}

	group_total_time_change(e){
		this.setState({group_total_time: e.target.value})
	}

	render(){
		return(
			<div>
				<Row>
					<Col xs={3}> Name: </Col>
					<Col xs={8}>
						<Form>
						  	<Form.Group controlId="group-name">
							    <Form.Control onChange={this.group_name_change} />
						  	</Form.Group>
						</Form>
					</Col>
				</Row>

				<Row>
					<Col xs={3}> Start Date: </Col>
					<Col xs={8}>
						<Form>
							<Form.Group controlId="group-start-date">
								<Form.Control type="date" onChange={this.group_start_date_change}/>
					 		</Form.Group>
						</Form>
					</Col>
				</Row>

				<Row>
					<Col xs={3}> Start Time: </Col>
					<Col xs={4}>
						<Form>
								<Form.Group controlId="group-time">
		 						 	<Form.Control type="time" onChange={this.group_time_change} />
		 					 	</Form.Group>
						</Form>
					</Col>
				</Row>

				<Row>
					<Col xs={3}> Interval: </Col>
					<Col xs={4}>
						<Form>
								<Form.Group controlId="group-interval">
		 						 	<Form.Control type="number" onChange={this.group_interval_change} />
		 					 	</Form.Group>
						</Form>
					</Col>
					<Col xs={4}>
						<Form.Control as="select">
							<option>minutes</option>
							<option>hours</option>
							<option>days</option>
						</Form.Control>
					</Col>
				</Row>

				<Row>
					<Col xs={{offset: 3}}>
						<Form.Text className="text-muted">
								*Time units can only be minutes, hours and days,
						</Form.Text>
						<Form.Text className="text-muted">
								e.g. 1 minute, 10 days
						</Form.Text>
					</Col>
				</Row>

				<Row>
					<Col xs={3}> Total Time: </Col>
					<Col xs={4}>
						<Form>
								<Form.Group controlId="group-total-time">
		 						 	<Form.Control type="number" onChange={this.group_total_time_change} />
		 					 	</Form.Group>
						</Form>
					</Col>
					<Col xs={4}>
						<Form.Control as="select">
							<option>minutes</option>
							<option>hours</option>
							<option>days</option>
						</Form.Control>
					</Col>
				</Row>

				<Row>
					<Col xs={{offset: 3}}>
						<Form.Text className="text-muted">
								*Time units can only be minutes, hours and days,
						</Form.Text>
						<Form.Text className="text-muted">
								e.g. 1 minute, 10 days
						</Form.Text>
					</Col>
				</Row>
	  	</div>
		);
	}
}


export default CreateGroupDescription;