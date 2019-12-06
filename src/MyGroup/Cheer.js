//https://codesandbox.io/s/iconbutton-hover-focus-cnexr?fontsize=14
//https://material-ui.com/customization/components/#pseudo-classes
import React from 'react';
import {Button, OverlayTrigger, Popover} from 'react-bootstrap'
import {db} from '../firebase/firebase.js';
import IconButton from "@material-ui/core/IconButton";
import Smile from "@material-ui/icons/SentimentSatisfiedAlt";
import LargeSmile from "@material-ui/icons/InsertEmoticon";
import Like from "@material-ui/icons/ThumbUpAlt";
import Love from "@material-ui/icons/Favorite";
import More from "@material-ui/icons/MoreHoriz"


class Cheer extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			disable: false,
			numberCheer: '',
			isLoaded: true,
			cheererUid:''
		}
		this.handleCheer = this.handleCheer.bind(this);
	}
	componentDidMount(){
		this.fetchCheerAmount()
	}
	fetchCheerAmount(){
		var Ref = db.ref(`groups/${this.props.groupName}/people/${this.props.uid}`)
		Ref.once('value', (snapshot) =>{
			var val = snapshot.val()
			this.setState({
				numberCheer: val.numberCheer
			}, () => {
				this.setState({isLoaded: true})
			})
		})
	}
	handleCheer(cheerType){
		var Ref = db.ref(`groups/${this.props.groupName}/people`)
		let _numberCheer = this.state.numberCheer
		let _cheererUid = this.props.cheererUid
		if(_numberCheer === ''){
			_numberCheer = {}
			_numberCheer[cheerType] = 1
		}
		else{
			if(_numberCheer[cheerType] === undefined)
					_numberCheer[cheerType] = 1
			else
				_numberCheer[cheerType] += 1
		}
		this.setState({numberCheer: _numberCheer})
		Ref.child(`${this.props.uid}`).update({numberCheer: _numberCheer});
		db.ref(`users/${this.props.uid}/cheer/${this.props.cheererUid}/cheerType`).set(cheerType)
		db.ref(`users/${this.props.cheererUid}/name`).once('value',(snapshot)=>{
			let cheererName = snapshot.val()
			db.ref(`users/${this.props.uid}/cheer/${this.props.cheererUid}/cheererName`).set(cheererName)
		})
		db.ref(`users/${this.props.cheererUid}/task/voteTask/number`).once('value',(snapshot)=>{
				var cheerTaskNum = snapshot.val()
				console.log(cheerTaskNum)
				cheerTaskNum = cheerTaskNum+1
				db.ref(`users/${this.props.cheererUid}/task/voteTask/number`).set(cheerTaskNum)
		})
		db.ref("users/"+this.props.uid+"/cheer").once('value',(snapshot)=>{
			let check = snapshot.val()
			console.log(check)
		})
	}

	render(){
		var popover =
			<Popover id="popover-basic" >
			<Popover.Title as="h3">Cheers</Popover.Title>
				<Popover.Content>
					"And here's some" <strong> "amazing" </strong> "content. It's very engaging.
					right?"
				</Popover.Content>
			</Popover>

		return(
		    <div>
			      <IconButton aria-label="Delete" onClick={() => this.handleCheer('LargeSmile')}>
			        <LargeSmile />
			      </IconButton>
			      <IconButton aria-label="Delete" onClick={() => this.handleCheer('Smile')}>
			        <Smile />
			      </IconButton>
			      <IconButton aria-label="Delete" onClick={() => this.handleCheer('Like')}>
			        <Like />
			      </IconButton>
						<OverlayTrigger trigger="click" placement="top" overlay={popover}>
							<IconButton aria-label="Delete">
								<More />
							</IconButton>
						</OverlayTrigger>
			   </div>
	  	);
	}
}

export default Cheer;
