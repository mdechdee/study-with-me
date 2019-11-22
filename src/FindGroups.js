import React from 'react';
import Scrollbars from 'react-custom-scrollbars'
import { db } from './firebase/firebase.js';
class FindGroups extends React.Component {
	constructor(props){
	    super(props);
	    this.state = {
	        loading: null,
	        groups: [],
	    };
  	};

	fetchGroupsData(){
		db.ref(`groups`).once('value',(snapshot) => {
			let val = snapshot.val();
			Object.keys(val).forEach((item) => {
          		this.setState({groups: [...this.state.groups, item]});
        	})
        	console.log(this.state.groups)
		})
		
	}

	componentDidMount(){
		this.fetchGroupsData()
	}

	showAllGroups(){
		let groupsComponent = []
		for(let i = 0;i<this.state.groups.length;i++){
			//replace paragraph with a cool component!
			groupsComponent.push(<p>{this.state.groups[i]} </p>); 
		}
		return groupsComponent
	}

	render(){
		return(
			<Scrollbars style={{ width: 500, height: 200 }}>
        		{this.showAllGroups()}
      		</Scrollbars>
		);
	}
}

export default FindGroups;
