import React from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { firebase, db } from './firebase';
import './scss/Redeem.scss';

class Redeem extends React.Component {
	constructor(props){
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      user: {
        point: 123456,
        stickerOne: false,
				stickerTwo: false,
				stickerThree: false,
				stickerFour: false
      },
			show: false
    }
	}

	componentDidMount() {
		this.fetchUserData()
	}

	fetchUserData(){
		db.onceGetOneUser(firebase.auth.currentUser.uid).then(snapshot =>
		{
			var user = {
				point: snapshot.val().point,
				stickerOne: snapshot.val().stickerOne,
				stickerTwo: snapshot.val().stickerTwo,
				stickerThree: snapshot.val().stickerThree,
				stickerFour: snapshot.val().stickerFour
			}
		}).catch((err)=> {
			console.log("fetch user error",err);});
	}

  handleClose(){
    this.setState({show: false});
  }

  handleShow(){
		// if(mybalance>point) toast else
		this.setState({show: true});
  }

  handleClick() {

  }

	render() {
		const { point, stickerOne, stickerTwo, stickerThree, stickerFour} = this.state.user;

		return(
			<React.Fragment>
        <Container>
          <Row>
            <Col xs sm={3}><div className="redeem-title">Redeem</div></Col>
            <Col xs sm={8}><div className="balance">Balance: {point.toLocaleString(navigator.language, { minimumFractionDigits: 0 })} points</div></Col>
          </Row>
        </Container>


        <Container className="redeem-item-wrap">
          <Row>
            <Col xs sm={5}>
              <div>picture</div>
            </Col>
            <Col xs sm={4}>
              <Row><div className="sticker-name">Smiley Face</div></Row>
              <Row><div className="sticker-price">Cost: 50 points</div></Row>
            </Col>
            <Col xs sm={3}><div>
              <Button variant="warning" size="lg" className="redeem-button"
              disabled={this.props.disabled}
              onClick={this.handleShow}> Redeem </Button></div>
            </Col>
          </Row>
        </Container>

				<Container className="redeem-item-wrap">
          <Row>
            <Col xs sm={5}>
              <div>picture</div>
            </Col>
            <Col xs sm={4}>
              <Row><div className="sticker-name">Sunney Face</div></Row>
              <Row><div className="sticker-price">Cost: 10 points</div></Row>
            </Col>
            <Col xs sm={3}><div>
              <Button variant="warning" size="lg" className="redeem-button"
              disabled={this.props.disabled}
              onClick={this.handleShow}> Redeem </Button></div>
            </Col>
          </Row>
        </Container>

				<Container className="redeem-item-wrap">
          <Row>
            <Col xs sm={5}>
              <div>picture</div>
            </Col>
            <Col xs sm={4}>
              <Row><div className="sticker-name">Hexagoney Face</div></Row>
              <Row><div className="sticker-price">Cost: 150 points</div></Row>
            </Col>
            <Col xs sm={3}><div>
              <Button variant="warning" size="lg" className="redeem-button"
              disabled={this.props.disabled}
              onClick={this.handleShow}> Redeem </Button></div>
            </Col>
          </Row>
        </Container>

				<Container className="redeem-item-wrap">
          <Row>
            <Col xs sm={5}>
              <div>picture</div>
            </Col>
            <Col xs sm={4}>
              <Row><div className="sticker-name">Cloudey Face</div></Row>
              <Row><div className="sticker-price">Cost: 200 points</div></Row>
            </Col>
            <Col xs sm={3}><div>
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
