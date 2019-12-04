import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {StickerConsumer} from "./Context";
import './scss/Redeem.scss';


export default function StickerTitle({name, title}){
	return(
		<StickerConsumer>
			{(value)=>{
				return(
          <Container>
            <Row>
              <Col xs sm={3}>
                <div className="redeem-title">Redeem</div>
							</Col>
              <Col xs sm={8}>
                <div className="balance">Balance:&nbsp;
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
