import React from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './scss/Redeem.scss';

class Redeem extends React.Component {
	constructor(props){
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      show: false
    };
	}

  handleClose(){
    this.setState({show: false});
  }

  handleShow(){
    this.setState({show: true});
  }

  handleClick() {

  }

	render() {

		return(
			<React.Fragment>
        <Container className="redeem-title-wrap">
          <Row>
            <Col xs sm={3}><div className="redeem-title">Redeem</div></Col>
            <Col xs sm={8}><div className="balance">Balance: 80 points</div></Col>
          </Row>
        </Container>


        <Container>
          <Row>
            <Col xs sm={4}>
              <div>picture</div>
            </Col>
            <Col xs sm={4}>
              <Row><div className="sticker-name">Smiley Face</div></Row>
              <Row><div className="sticker-price">Cost: 50 points</div></Row>
            </Col>
            <Col xs sm={4}><div>
              <Button variant="warning" size="lg" className="redeem-button"
              disabled={this.props.disabled}
              onClick={this.handleShow}> Redeem </Button></div>
            </Col>
          </Row>
        </Container>

          <Modal size="sm" show={this.state.show} onHide={this.handleClose}>

            <Modal.Header>
              <Modal.Title>
                <div sm={10} className="confirm-title"> Are you sure you want to redeem? </div>
                <FontAwesomeIcon icon='times-circle' className='custom-close-icon' onClick={this.handleClose}/>
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>

              <Button variant="success" offset={100} className="yes-button"
              onClick={this.handleClick}>   Yes </Button>

              <Button variant="danger" offset={100} className="cancel-button"
              onClick={this.handleClose}> Cancel </Button>
            </Modal.Body>

          </Modal>

			</React.Fragment>
		)}


}

export default Redeem;
