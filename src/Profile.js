import React, {useState} from 'react';
import UpdateProcess from'./UpdateProcess.js';
import AuthContext from './authentication/AuthContext'
class Profile extends React.Component {
	render(){
		return(
			<div>
				<AuthContext.Consumer>{
					auth => {
						console.log(auth.email+""+auth.uid)
					}
				}
				</AuthContext.Consumer>
				//-------------------------Profile-----------------------


				//-------------------------UpdateProcess-----------------
				<UpdateProcess />
			</div>
		);
	}
}

export default Profile;
