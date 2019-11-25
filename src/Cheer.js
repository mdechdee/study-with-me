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
			intervalNum: props.intervalNum,
			disable: false,
			groupName: props.groupName,
			Ref: db.ref(`groups/${props.groupName}/people/${props.uid}`),
			numberLargeSmile: 0,
			numberSmile: 0,
			numberLike: 0,
			numberLove: 0
		}
		this.handleLargeSmile = this.handleLargeSmile.bind(this);
		this.handleSmile = this.handleSmile.bind(this);
		this.handleLike = this.handleLike.bind(this);
		this.handleLove = this.handleLove.bind(this);
	}
	componentDidMount(){
		console.log("Cheer/componentDidMount : snapshot")
		this.state.Ref.on('value', function(snapshot) {
			console.log(snapshot.val())
		})
	}
	handleLargeSmile(){
		this.setState({numberLargeSmile: this.state.numberLargeSmile+1})
		console.log(this.state.numberLargeSmile+"A");
		this.state.Ref.child(`${this.state.intervalNum}`).update({numberLargeSmile: this.state.numberLargeSmile});
	}
	handleSmile(){
		this.setState({numberSmile: this.state.numberSmile+1})
		console.log(this.state.numberSmile+"B");
		this.state.Ref.child(`${this.state.intervalNum}`).update({numberSmile: this.state.numberSmile});
	}
	handleLike(){
		this.setState({numberLike: this.state.numberLike+1})
		console.log(this.state.numberLike+"C");
		this.state.Ref.child(`${this.state.intervalNum}`).update({numberLike: this.state.numberLike});
	}
	handleLove(){
		this.setState({numberLove: this.state.numberLove+1})
		console.log(this.state.numberLove+"D");
		this.state.Ref.child(`${this.state.intervalNum}`).update({numberLove: this.state.numberLove});
	}
	render(){
		return(
		    <div>
		      <IconButton aria-label="Delete" onClick={this.handleLargeSmile}>
		        <LargeSmile />
		      </IconButton>
		      <IconButton aria-label="Delete" onClick={this.handleSmile}>
		        <Smile />
		      </IconButton>
		      <IconButton aria-label="Delete" onClick={this.handleLike}>
		        <Like />
		      </IconButton>
		      <IconButton aria-label="Delete" onClick={this.handleLove}>
		        <Love />
		      </IconButton>
		    </div>
	  	);
	}
}

export default Cheer;
