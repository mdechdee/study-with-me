//https://codesandbox.io/s/iconbutton-hover-focus-cnexr?fontsize=14
//https://material-ui.com/customization/components/#pseudo-classes
import React from 'react';
import {Button, OverlayTrigger, Popover, Container,Row, Col} from 'react-bootstrap'
import Scrollbars from 'react-scrollbars-custom';
import {db} from '../firebase/firebase.js';
import IconButton from "@material-ui/core/IconButton";
import Smile from "@material-ui/icons/SentimentSatisfiedAlt";
import LargeSmile from "@material-ui/icons/InsertEmoticon";
import Like from "@material-ui/icons/ThumbUpAlt";
import Love from "@material-ui/icons/Favorite";
import More from "@material-ui/icons/MoreHoriz"
import '../scss/MyGroup.scss'

class Cheer extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			disable: false,
			numberCheer: {},
			isLoaded: true,
			isStickerLoaded: false,
			cheererUid:'',
			sticker:{},
		}
		this.handleCheer = this.handleCheer.bind(this);
	}
	componentDidMount(){
		this.fetchCheerAmount()
		this.fetchStickerAmount()
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
	fetchStickerAmount(){
		var Ref = db.ref(`users/${this.props.cheererUid}/sticker`)
		Ref.once('value', (snapshot) =>{
			var val = snapshot.val()
			this.setState({
				sticker: val
			}, () => {
				this.setState({isStickerLoaded: true})
			})
		})
	}
	handleCheer(cheerType){
		console.log('HANDLE')
		var Ref = db.ref(`groups/${this.props.groupName}/people`)
		let _numberCheer = this.state.numberCheer
		let _cheererUid = this.props.cheererUid

		if(_numberCheer === undefined){
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
		db.ref(`users/${this.props.uid}/cheer/${this.props.cheererUid}`).once('value',(snapshot)=>{
			let cheerer = snapshot.val()
			if (cheerer===null){
				db.ref("users/"+this.props.uid+"/remainedCheer").once('value',(snapshot)=>{
					let remainedCheer = snapshot.val()
					if(remainedCheer===null){
						remainedCheer =0
					}
					remainedCheer = remainedCheer+1
					db.ref("users/"+this.props.uid+"/remainedCheer").set(remainedCheer)
				})
			}
		})
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
		db.ref('users/'+this.props.uid+'/remainedCheer').once('value',(snapshot)=>{
			let CheerNumber = snapshot.val()
			if(CheerNumber===null){
				CheerNumber = 0
			}
			console.log(CheerNumber)
		})
	}

	useSticker(sticker){
		var _stickers = this.state.sticker
		_stickers[sticker] -= 1
		var Ref = db.ref(`users/${this.props.cheererUid}/sticker`)
		Ref.set(_stickers)
	}

	getSticker(_stickerList, i){
		return(
			<Col className="px-0 sticker-wrap">
				<img
					style = {{ objectFit: 'cover', height:'40px'}}
					className="m-auto sticker-img"
					src={_stickerList[i]+'.png'}
					onClick={()=>{this.handleCheer(_stickerList[i]); this.useSticker(_stickerList[i])}}
				/>
			</Col>
		)
	}

	showMoreCheers(){
		if(!this.state.isStickerLoaded)
			return(<h3> Loading </h3>);
		if(this.state.sticker === '')
			return(<h3> You have no special cheer yet, Do some tasks and redeem it :) </h3>);
		var _moreCheers = []
		var _stickers = this.state.sticker
		var _stickerList = []
		var totalSticker = 0
		Object.keys(_stickers).forEach(function(sticker) {
			totalSticker += _stickers[sticker]
			for(var m = 0; m < _stickers[sticker] ; m++)
				_stickerList.push(sticker)
		});
		for(let i=0; i < totalSticker;i+=2)
		{
			if(i+1 < totalSticker){
			_moreCheers.push(
					<Row className="my-1">
						{this.getSticker(_stickerList,i)}
						{this.getSticker(_stickerList,i+1)}
					</Row>
				)
			}
			else {
			_moreCheers.push(
					<Row className="my-1">
						{
							this.getSticker(_stickerList,i)
						}
						<Col className="px-0"/>
					</Row>
				)
			}
		}
		return(_moreCheers)
	}

	popover(){
		var _popover =
			<Popover id="popover-basic" className = "more-cheers-popover">
			<Popover.Title as="h3">Special Cheers!</Popover.Title>
				<Popover.Content className = "more-cheers-content">
					<Scrollbars>
						<Container>
							{this.showMoreCheers()}
						</Container>
					</Scrollbars>
				</Popover.Content>
			</Popover>
			return _popover
	}

	render(){
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
				<OverlayTrigger rootClose={true} trigger="click" placement="top" overlay={this.popover()}>
					<IconButton aria-label="Delete">
						<More />
					</IconButton>
				</OverlayTrigger>
			   </div>
	  	);
	}
}

export default Cheer;
