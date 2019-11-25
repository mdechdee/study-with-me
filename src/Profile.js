import React from 'react';
import UpdateProgress from'./UpdateProgress.js';
import AuthContext from './authentication/AuthContext'
import TimerContext from './TimerContext.js'
import ProfileImage from './ProfileImage'
import ShowInformation from './ShowInformation'
import './scss/Profile.scss'
import { Scrollbars } from 'react-custom-scrollbars';
import Cheer from './Cheer'
class Profile extends React.Component {
	render(){
		return(
			<React.Fragment>
				<h2>Profile</h2>
				<Scrollbars horizontal={false}
						className="scroll"
						contentClassName="scroll-content"
						>
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
					<UpdateProgress/>
			</React.Fragment>
		);
	}
}

export default Profile;
