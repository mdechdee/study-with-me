import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {StickerConsumer} from "../Context";
import '../scss/Redeem.scss';

export class Sticker extends Component {
	render() {
		const {id, title, img, price} = this.props.sticker;
		return (

				<StickerConsumer>
					{(value)=>(
						<div className="card mb-2"
							onClick={() =>
							value.handleDetail(id)
							}
						>
							<Link className="product_link" to="/details" >

								<div className='reward-wrap'>
									<div
										//this is for making the image bigger
										className="img-container p-6"
									>
										<img src={img} alt="sticker" className="card-img-top img-thumbnail img-responsive " />
									</div>
									{/*card footer */}
									{/*card-footer from boostrap card*/}
									<div className="card-footer d-flex justify-content-between ">
										<p className="align-self-center mb-0 text-capitalize">
											{title}
										</p>
										<h5 className="text-gold mb-0">
											{price} points
										</h5>
									</div>
								</div>
							</Link>

						</div>
					)}
				</StickerConsumer>
		);
	}
}


export default Sticker;
