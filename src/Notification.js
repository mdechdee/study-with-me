import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import { db } from './firebase/firebase.js';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

class Notification extends React.Component {
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

	}



	render() {
		return(
			<React.Fragment>
					<Button
						onClick={()=> {
							store.addNotification({
								title: 'Notification',
								message:'Tumgdfgfgsggfdgsfdgfsgfdsgfdsgfdsgfsgfdsgfsgfsgfdsgfdsgfdsgfsgfsg',
								type:'default',
								container: 'top-center',
								animationIn: ["animated", "fadeIn"],
								animationOut: ["animated", "fadeOut"],
								dismiss:{
									duration: 3000
								}
							})
						}}
						>
						Notification
					</Button>
			</React.Fragment>
		)}
}

export default Notification;
