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
			Ref: db.ref(`groups/study/people/${props.uid}`),
			numberLargeSmile: 0,
			numberSmile: 0,
			numberLike: 0,
			numberLove: 0
		}
		this.handleLargeSmile = this.handleLargeSmile.bind(this);
		this.handleSmile = this.handleSmile.bind(this);
		this.handleLike = this.handleLike.bind(this);
		this.handleLove = this.handleLove.bind(this);
		var numberLargeSmile = 0;
		var numberSmile = 0;
		var numberLike = 0;
		var numberLove = 0;
		this.state.Ref.on('value', function(snapshot) {
			numberLargeSmile = (snapshot.val() && snapshot.val().largeSmile)|| 0;
			numberSmile = (snapshot.val() && snapshot.val().smile)|| 0;
			numberLike = (snapshot.val() && snapshot.val().like)|| 0;
			numberLove = (snapshot.val() && snapshot.val().love)|| 0;
			console.log("------------------");
			console.log("LargeSmile = "+ numberLargeSmile);
			console.log("Smile = "+ numberSmile);
			console.log("Like = "+ numberLike);
			console.log("Love = "+ numberLove);
			console.log("------------------");
		});
		this.setState({numberLargeSmile: numberLargeSmile,
			numberSmile: numberSmile,
			numberLike: numberLike,
			numberLove: numberLove
		});
	}
	handleLargeSmile(){
		this.setState({numberLargeSmile: this.state.numberLargeSmile+1})
		console.log(this.state.numberLargeSmile+"A");
		this.state.Ref.child(`${this.state.interval}`).set({numberLargeSmile: this.state.numberLargeSmile});
	}
	handleSmile(){
		this.setState({numberSmile: this.state.numberSmile+1})
		console.log(this.state.numberSmile+"B");
		this.state.Ref.child(`${this.state.interval}`).set({numberSmile: this.state.numberSmile});
	}
	handleLike(){
		this.setState({numberLike: this.state.numberLike+1})
		console.log(this.state.numberLike+"C");
		this.state.Ref.child(`${this.state.interval}`).set({numberLike: this.state.numberLike});
	}
	handleLove(){
		this.setState({numberLove: this.state.numberLove+1})
		console.log(this.state.numberLove+"D");
		this.state.Ref.child(`${this.state.interval}`).set({numberLove: this.state.numberLove});
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