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
			disable: false,
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
		var Ref = db.ref(`groups/${this.props.groupName}/people/${this.props.uid}`)
		console.log("Cheer/componentDidMount : snapshot")
	}
	handleLargeSmile(){
		var Ref = db.ref(`groups/${this.props.groupName}/people/${this.props.uid}`)
		console.log(this.state.numberLargeSmile+"A");
		Ref.child(`${this.props.intervalNum}`).update({numberLargeSmile: this.state.numberLargeSmile+1});
		this.setState({numberLargeSmile: this.state.numberLargeSmile+1})
	}
	handleSmile(){
		var Ref = db.ref(`groups/${this.props.groupName}/people/${this.props.uid}`)
		console.log(this.state.numberSmile+"B");
		Ref.child(`${this.props.intervalNum}`).update({numberSmile: this.state.numberSmile+1});
		this.setState({numberSmile: this.state.numberSmile+1})
	}
	handleLike(){
		var Ref = db.ref(`groups/${this.props.groupName}/people/${this.props.uid}`)
		console.log(this.state.numberLike+"C");
		Ref.child(`${this.props.intervalNum}`).update({numberLike: this.state.numberLike+1});
		this.setState({numberLike: this.state.numberLike+1})
	}
	handleLove(){
		var Ref = db.ref(`groups/${this.props.groupName}/people/${this.props.uid}`)
		console.log(this.state.numberLove+"D");
		Ref.child(`${this.props.intervalNum}`).update({numberLove: this.state.numberLove+1});
		this.setState({numberLove: this.state.numberLove+1})
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
