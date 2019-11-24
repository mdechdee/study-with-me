import React from 'react';
import UpdateProgress from'./UpdateProgress.js';
import AuthContext from './authentication/AuthContext'
import TimerContext from './TimerContext.js'
import ProfileImage from './ProfileImage'
import ShowInformation from './ShowInformation'
import { Scrollbars } from 'react-custom-scrollbars';
import Cheer from './Cheer'
import './scss/Profile.scss'

class Profile extends React.Component {
	render(){
		return(
			<div className="profile">
				<br/>
				<div className="prof-title"> Profile </div>
				<div className="profile-info">
					<Scrollbars style={{ width: 400, height: 700}}>
						<AuthContext.Consumer>{
							auth => {
								console.log(auth.email+""+auth.uid)
								return(
									<div>
										<ProfileImage uid={auth.uid} />
										<ShowInformation uid={auth.uid}/>
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
					</Scrollbars>
				</div>
				<UpdateProgress/>
			</div>
		);
	}
}

export default Profile;
