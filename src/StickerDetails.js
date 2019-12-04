import React, { Component } from 'react';
import {StickerConsumer} from "./Context";
import {Link} from "react-router-dom"
import StickerTitle from "./StickerTitle";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
import './scss/Redeem.scss';

export class StickerDetails extends Component {
	render() {
		return (

			<StickerConsumer>
				{(value) =>{
					const {
						id,
						company,
						img,
						info,
						price,
						title,
					} = value.detailSticker;
					const user_point = value.user_point
					return(
						<div className='detail-wrap'>
							{/*show title*/}
							<StickerTitle name="Redeem" title={user_point}/>
							{/*product info*/}
							<div className="row">
								<div className="col-10 mx-auto col-md-10 my-3">
									<img src={img} className="img-fluid" alt="product"/>
								</div>
								{/* product text */}
								<div className="col-12 mx-auto col-md-12 my-3 text-capitalize">
									<h2>{title}</h2>
									<h4 className="text-title text-uppercase text-mutate mt-3 mb-2">
										by : <span className="text-uppercase">{company}</span>
									</h4>
									<h4 className="text-gold">
										<strong>
										 {price} points
										</strong>
									</h4>
									<p className="text-capitalize font-weight-bold mt-3 mb-0">
										information
									</p>
									<p className="text-muted lead">{info}</p>
								{/*button*/}
								<div>

									<div style={{textAlign: 'center'}}>
    								<Button cart="true"
        										variant="yellow"
        										disabled={(user_point < price)? true:false}
        										onClick={()=>{
														value.openModal(id);
											}}>
											<FontAwesomeIcon icon='check-circle'/> {(user_point < price)?'Not Enough Point': "Redeem"}
    								</Button>

											<div className='divider' />
    								<Link to='/redeem' className='redeem_link'>
    									<Button className='black-button' variant="black"><FontAwesomeIcon icon='times-circle'/> Go Back</Button>
    								</Link>
    							</div>
								</div>
								</div>
							</div>
					</div>
					)
				}}
			</StickerConsumer>

		);
	}
}

export default StickerDetails;
