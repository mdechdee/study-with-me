import React, { Component } from 'react';
import styled from 'styled-components';
import {StickerConsumer} from '../Context';
import {Link} from 'react-router-dom'
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default class ModalRedeem extends Component {
	componentDidMount(){
		console.log("modal")
	}
	render() {
		return (
			<StickerConsumer>
				{(value) => {
					const {modalOpen, closeModal, closeModal_cancel} = value;
					const {img, title, price} = value.modalSticker
					const user_point= value.user_point

					if(!modalOpen){
						//already open
						return null;
					}
					else{
						return(
							<ModalContainer>
								<div className='row'>
									<div id="modal" className="col-6 mx-auto col-md-4 col-lg-4 text-center text-capitalize p-5">
										<h4 className="confirm-title text-capitalize">Confirm</h4>
										<img src={img} className="img-fluid" alt="product"/>
										<h4 className="redeem-success">{title}</h4>
										<h6 className="text-muted sticker-price">Available points : {user_point} points</h6>
										<h6 className="text-muted sticker-price">Price : {price} points</h6>
										<div style={{textAlign: 'center'}}>

										        <Button variant="success" className="sticker-detail"
										        		cart onClick={()=>closeModal((user_point - price),price,title,img)}>
										        	<FontAwesomeIcon icon='check-circle'/> Confirm
										        </Button>

											<div className='divider-ver' />

							        	<Link to='/details' className='redeem_link'>
									        <Button variant="danger" className="sticker-detail"
									        		onClick={()=>closeModal_cancel(user_point)}>
									        	<FontAwesomeIcon icon='times-circle'/> Cancel
									        </Button>
										    </Link>

									    </div>
									</div>
								</div>
							</ModalContainer>
						)
					}
				}}
			</StickerConsumer>
		);
	}
}

const ModalContainer = styled.div`
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
background:rgba(0,0,0,0.3);
display: flex;
align-items: center;
justify-content: center;
z-index: 2;
#modal {
	background: var(--mainWhite );
	width: 90vw;
	max-width: 90vw;
}
.redeem_link:hover{
	text-decoration: none;
   background: none;
}
`
