import React from 'react';
import { db } from './firebase/firebase.js';
import TimerContext from './TimerContext'

class MyGroup extends React.Component {
	//<div> {new Date(this.state.stopTime).getMilliseconds()} </div>
	render(){
		return(
			<div>
				<TimerContext.Consumer>{
						timer => {return(
							<div>
								<div> {timer.startTime} </div>
								<div> {timer.stopTime} </div>
							</div>
						)}
					}
				</TimerContext.Consumer>
			</div>
		);
	}
}

export default MyGroup;
