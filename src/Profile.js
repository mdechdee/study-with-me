import React from 'react';
import UpdateProcess from'./UpdateProcess.js';
import AuthContext from './authentication/AuthContext'
import TimerContext from './TimerContext.js'
import ProfileImage from './ProfileImage'
import Information from './Information'
import './scss/_base.scss'
import Cheer from './Cheer'
class Profile extends React.Component {
	render(){
		return(
			<div className="body">
				<br/>
				<h2>Profile</h2>
				<AuthContext.Consumer>{
					auth => {
						console.log(auth.email+""+auth.uid)
						return(
							<div>
								<ProfileImage uid={auth.uid} />
								<Information uid={auth.uid}/>
								<TimerContext.Consumer>{
									timer => {
										return(
											<div>
												<Cheer uid={auth.uid} interval = {timer.intervalNum}/>
											</div>
										);
									}
								}
								</TimerContext.Consumer>
							</div>
						);
					}
				}
				</AuthContext.Consumer>
			</div>
		);
	}
}

export default Profile;
