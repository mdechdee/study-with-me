import React, { Component } from 'react';
import { storeStickers, detailSticker } from "./StickerData"
import { firebase, db } from './firebase/firebase';

const StickerContext = React.createContext();
//Provider: Provide all the informaiton
//value: Can be string or object that can be access later

//Consumer: Access the loaded information

class StickerProvider extends Component {
	state = {
		stickers: [],
		detailSticker: detailSticker,
		cart: [],
		user_point: 0,
		modalOpen: false,
		modalOpenCongrat: false,
		modalSticker: detailSticker,

		user_id: ""
	}

	componentDidMount(){
		this.setStickers();
		//we need to change this value base on the user id

		firebase.auth().onAuthStateChanged(user => {
  		if (user) {
    		// User is signed in.
    		 this.setState(() => {

    			return {user_id: firebase.auth().currentUser.uid}
    		})
    		this.getUserPoint(firebase.auth().currentUser.uid);


  		} else {
    		// No user signs in.
  		}
		});


	}
	//we need to initialize the sticker as empty string first because we want to copy not reference the real data
	setStickers = () =>{
		let tempStickers = [];
		storeStickers.forEach(item =>{
			const singleItem = {...item};
			tempStickers = [...tempStickers, singleItem];

		} );
		this.setState(() => {
			return {stickers: tempStickers}
		})
	};

	//use the id to find the item and find will return only the element that match
	getItem = (id) =>{
		const sticker = this.state.stickers.find(item => item.id === id);
		return sticker
	}

	//we would change the detailSticker according to the sticker that we want to show the detail
	handleDetail = (id) =>{
		const sticker = this.getItem(id);
		console.log("the previous detail sticker: ", this.detailSticker)
		this.setState(() =>{
			return {detailSticker: sticker}
		})
	}

	//we don't want to mutate the state first, then we use index
	//we get the item change value and return in setState.
	addToCart = (id) =>{
		//console.log("hello from add to cart: ", id);
		let tempStickers = [...this.state.stickers];
		const index = tempStickers.indexOf(this.getItem(id))
		const sticker = tempStickers[index]
		sticker.inCart = true;
		sticker.count = 1;
		const price = sticker.price;
		sticker.total = price;

		this.setState(() =>{
			return {stickers: tempStickers,
					cart: [...this.state.cart, sticker]}
			},() => {console.log(this.state)})
	}

  openModal = id => {
		const sticker = this.getItem(id);
		this.setState(() => {
			return {modalSticker: sticker, modalOpen: true}
		},() => {console.log(this.state)})
	}

	closeModal = (remainPoints, price, title) => {
		db.ref("/users/"+this.state.user_id).update({ point: remainPoints });
		var newKey = firebase.database().ref('/redeem_hist/').push()
		newKey.set({
			point_used: price,
		    rewardName: title,
		    uid: this.state.user_id
		  });
		this.setState(() => {

			return {modalOpen: false, user_point: remainPoints, modalOpenCongrat: true }
		})
	}
	closeModalCongrat = (remainPoints, price, title) => {

		this.setState(() => {

			return {modalOpenCongrat: false }
		})
	}
	//this for click confirm in modal: should show the congratulation modal after
	closeModal_cancel = (remainPoints) => {
			this.setState(() => {

			return {modalOpen: false, user_point: remainPoints }
		})
	}

	getUserPoint = id => {
		let ref = db.ref("users/"+id)
		ref.on('value', snapshot =>{
			const cur_point = snapshot.val().point
			this.setState(() =>{
				return {user_point: cur_point}
			})
		});
	}

	getUserPoint_once = id => {
		let ref = db.ref("users/"+id)
		ref.once('value', snapshot =>{
			const cur_point = snapshot.val().point
			this.setState(() =>{
				return {user_point: cur_point}
			})
		});
	}


	render() {
		return (
			<StickerContext.Provider value={{
				...this.state,
				handleDetail: this.handleDetail,
				addToCart: this.addToCart,
				openModal: this.openModal,
				closeModal: this.closeModal,
				closeModal_cancel: this.closeModal_cancel,
				getUserPoint: this.getUserPoint,
				getUserPoint_once: this.getUserPoint_once,


				closeModalCongrat: this.closeModalCongrat
			}}>
				{this.props.children}
			</StickerContext.Provider>

		);
	}
}

const StickerConsumer = StickerContext.Sticker;

export {StickerProvider, StickerConsumer};
