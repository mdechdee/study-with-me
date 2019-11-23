import React from 'react';
import UpdateProcess from'./UpdateProcess.js';
import AuthContext from './authentication/AuthContext'
import TimerContext from './TimerContext.js'
import ProfileImage from './ProfileImage'
import Information from './Information'
class Profile extends React.Component {
	render(){
		return(
			<div>
				<AuthContext.Consumer>{
					auth => {
						console.log(auth.email+""+auth.uid)
						return(
							<div>
								<ProfileImage uid={auth.uid} />
								<Information uid={auth.uid}/>
							</div>
						);
					}
				}
				</AuthContext.Consumer>
				<br/>
				<br/>
				<UpdateProcess />
			</div>
		);
	}
}

export default Profile;
