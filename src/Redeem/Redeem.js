import React, { Component } from 'react';
import StickerTitle from "./StickerTitle";
import Sticker from "./Sticker";
import {StickerConsumer} from "../Context.js";
import Scrollbars from 'react-scrollbars-custom';
import '../scss/Redeem.scss';

export class Redeem extends Component {
	render() {
		return(
			<React.Fragment>
				<div>
					<StickerConsumer>
						{(value)=>{
							//value.getUserPoint_once(firebase.auth().currentUser.uid)
							return (<StickerTitle name="Redeem" title={value.user_point}/>)

						}}
					</StickerConsumer>
				</div>

				<Scrollbars noScrollX  ={true}>
						<StickerConsumer>
								{(value)=>{
									return value.stickers.map( sticker => {
										return <Sticker key={sticker.id} sticker={sticker} />
									})
								}}

						</StickerConsumer>
				</Scrollbars>

			</React.Fragment>
		);
	}
}

export default Redeem;

/*
	constructor(props){
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      user: {
        point: 100,
        stickerOne: false,
				stickerTwo: false,
				stickerThree: false,
				stickerFour: false
      },
			show: false,
			choice: 1
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

	}

  handleClose(){
    this.setState({show: false});
  }

  handleShow(id, price, point){
		if(price>point){
			toast("You don't have enough points.", {
				position: toast.POSITION.TOP_CENTER
			});
		}
		else this.setState({show: true, choice: id});
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
							onClick={() => this.handleShow(1,50,point)}> Redeem </Button></div>
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
							<Row><div className="sticker-price">Cost: 100 points</div></Row>
						</Col>
						<Col xs sm={3}><div>
							<Button variant="warning" size="lg" className="redeem-button"
							disabled={this.props.disabled}
							onClick={() => this.handleShow(2,100,point)}> Redeem </Button></div>
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
							onClick={() => this.handleShow(3,150,point)}> Redeem </Button></div>
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
							onClick={() => this.handleShow(4,200,point)}> Redeem </Button></div>
						</Col>
					</Row>
				</Container>

				<StickerModal show={this.state.show} choice={this.state.choice} handleClose={this.handleClose}/>

			</React.Fragment>
		)}

	*/

	/*
	<Modal size="sm" show={this.props.show} onHide={this.props.handleClose}>

		<Modal.Header>
			<Modal.Title>
				<div sm={10} className="confirm-title"> Are you sure you want to redeem? </div>
				<FontAwesomeIcon icon='times-circle' className='custom-close-icon' onClick={this.props.handleClose}/>
			</Modal.Title>
		</Modal.Header>

		<Modal.Body>
			<Col xs sm={5}>
				<div>picture</div>
			</Col>
			<Col xs sm={4}>
				<Row><div className="sticker-name">Smiley Face</div></Row>
				<Row><div className="sticker-price">Cost: 50 points</div></Row>
			</Col>

			<Button variant="success" offset={100} className="yes-button"
			onClick={this.handleClick}>   Yes </Button>

			<Button variant="danger" offset={100} className="cancel-button"
			onClick={this.props.handleClose}> Cancel </Button>
		</Modal.Body>

	</Modal>
	*/
