import React from 'react';
import AuthContext from '../authentication/AuthContext'
import EditProfile from './EditProfile.js'
import ProfileImage from './ProfileImage.js'
import ShowInformation from './ShowInformation.js'
import '../scss/Profile.scss'
import Scrollbars from 'react-scrollbars-custom';
import { db, storage} from '../firebase/firebase.js';

class Profile extends React.Component {
	render(){
		return(
			<React.Fragment>
				<div className="prof-title">Profile</div>
				<Scrollbars>
						<AuthContext.Consumer>{
							auth => {
								console.log(auth.email+""+auth.uid)
								return(
									<React.Fragment>
										<ProfileImage uid={auth.uid} />
										<ShowInformation uid={auth.uid} email = {auth.email}/>
										<EditProfile uid={auth.uid}/>
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
