import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {StickerConsumer} from "../Context";
import '../scss/Redeem.scss';


export default function StickerTitle({name, title}){
	return(
		<StickerConsumer>
			{(value)=>{
				return(
          <Container>
            <Row className="row-wrap">
              <Col xs sm={3}>
                <div className="redeem-title">Redeem</div>
							</Col>
              <Col className="balance-wrap">
                <div className="balance-label">Balance:&nbsp;
                  <div className="balance"> {title} points</div>
                </div>
              </Col>
            </Row>
          </Container>
				)
			}}
		</StickerConsumer>
	)
};
