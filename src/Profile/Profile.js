import React from 'react';
import AuthContext from '../authentication/AuthContext'
import ProfileImage from './ProfileImage'
import ShowInformation from './ShowInformation'
import '../scss/Profile.scss'
import { Scrollbars } from 'react-custom-scrollbars';

class Profile extends React.Component {
	render(){
		return(
			<React.Fragment>
				<div className="prof-title">Edit Profile</div>
				<Scrollbars hideTracksWhenNotNeeded={true}
						className="scroll"
						renderView={props => <div {...props} className="scroll-content"/>}>
						<AuthContext.Consumer>{
							auth => {
								console.log(auth.email+""+auth.uid)
								return(
									<React.Fragment>
										<ProfileImage uid={auth.uid} />
										<ShowInformation uid={auth.uid}/>
									</React.Fragment>
								);
							}
						}
						</AuthContext.Consumer>
					</Scrollbars>
			</React.Fragment>
		);
	}
}

export default Profile;
