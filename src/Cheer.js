//https://codesandbox.io/s/iconbutton-hover-focus-cnexr?fontsize=14
//https://material-ui.com/customization/components/#pseudo-classes
import React from 'react';
import {db} from './firebase/firebase.js';
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Smile from "@material-ui/icons/SentimentSatisfiedAlt";
import LargeSmile from "@material-ui/icons/InsertEmoticon";
import Like from "@material-ui/icons/ThumbUpAlt";
import Love from "@material-ui/icons/Favorite";


class Cheer extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			uid: props.uid,
			interval: props.interval,
			disable: false,
			Ref: db.ref(`groups/study/people/${props.uid}/${props.interval}`),
			numberLargeSmile: 0
		}
		this.handleLargeSmile = this.handleLargeSmile.bind(this);
	}
	handleLargeSmile(){
		this.setState({this.state.numberLargeSmile+1})
	}
	render(){
		return(
		    <div>
		      <IconButton aria-label="Delete" onClick={this.handleLargeSmile}>
		        <LargeSmile />
		      </IconButton>
		    </div>
	  	);
	}
}

export default Cheer;