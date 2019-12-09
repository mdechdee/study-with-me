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
            <Row className="row-wrap d-flex flex-row align-items-stretch">
              <Col>
                <div className="redeem-title">Redeem</div>
							</Col>
              <Col className="balance-container justify-content-end">
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
