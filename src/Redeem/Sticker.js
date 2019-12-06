import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {StickerConsumer} from "../Context";
import { Container, Row, Col } from 'react-bootstrap';
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
									<Row>
										<Col xs sm={3}>
											<div
												//this is for making the image bigger
												className="img-container p-6"
											>
												<img src={img} alt="sticker" className="card-img-top img-thumbnail img-responsive " />
											</div>
										</Col>
										{/*card footer */}
										{/*card-footer from bootstrap card*/}
										<Col xs sm={9}>
											<div className="card-footer d-flex justify-content-between ">
												<p className="align-self-center text-capitalize mb-0 sticker-name">
													{title}
												</p>
												<h5 className="text-gold mb-0 sticker-price">
													{price} points
												</h5>
											</div>
										</Col>
									</Row>
								</div>
							</Link>

						</div>
					)}
				</StickerConsumer>
		);
	}
}


export default Sticker;
