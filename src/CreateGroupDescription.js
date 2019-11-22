import React from 'react';
import {Button} from 'react-bootstrap'
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
				<Form>
				  	<Form.Group controlId="group-name">
					    <Form.Label><h6>Name :</h6></Form.Label>
					    <Form.Control onChange={this.group_name_change} />
				  	</Form.Group>

				  	<Form.Group controlId="group-start-date">
					    <Form.Label><h6>Start Date :</h6></Form.Label>
					    <Form.Control onChange={this.group_start_date_change}/>
					 </Form.Group>

					 <Form.Group controlId="group-time">
						 <Form.Label><h6>Time :</h6></Form.Label>
						 <Form.Control onChange={this.group_time_change} />
					 </Form.Group>

					 <Form.Group controlId="group-interval">
						 <Form.Label><h6>Interval :</h6></Form.Label>
						 <Form.Control onChange={this.group_interval_change} />
						 <Form.Text className="text-muted">
								 *Time units can be only minutes, hours and days, e.g. 1 minute, 10 days
						 </Form.Text>
					 </Form.Group>

					 <Form.Group controlId="group-total-time">
						 <Form.Label><h6>Total Time :</h6></Form.Label>
						 <Form.Control onChange={this.group_total_time_change} />
						 <Form.Text className="text-muted">
								 *Time units can be only minutes, hours and days, e.g. 1 minute, 10 days
						 </Form.Text>
					 </Form.Group>


				</Form>
	  	</div>
		);
	}
}


export default CreateGroupDescription;
