import React from 'react';
import { db , storage} from './firebase/firebase.js';
import TimerContext from './TimerContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col, Carousel} from 'react-bootstrap';
import './scss/MemberProgress.scss'

class MemberProgress extends React.Component {

  constructor(props){
    super(props)
    this.state ={
      pictureUrl: [],
      pictureUrlLoaded: false,
      pictureNumLoaded: 0,
      userName: [],
      userGroup: [],
      userInfoLoaded: false,
      userInfoNumLoaded: 0,
      peopleUID: [],
    }
  }

  getData(peopleName){
    console.log(peopleName)
    for(let i in peopleName)
    {
      storage.ref(`images/${peopleName[i]}`)
      .child(`work0.jpg`).getDownloadURL()
        .then(url => {
          this.setState({pictureUrl: [...this.state.pictureUrl, url]}, () =>{
            this.checkPictureLoaded()
          });
        })
      db.ref(`users/${peopleName[i]}`).once('value',(snapshot) =>{
        let val = snapshot.val()
        this.setState({
          userName: [...this.state.userName, val.name],
          usergroup: [...this.state.userGroup, val.group]}, ()=> {
            this.checkUserInfoLoaded()
          })
      })
    }
  }

  checkPictureLoaded(){
    this.setState({pictureNumLoaded: this.state.pictureNumLoaded +1},() =>
      {
        if(this.state.pictureNumLoaded >= this.props.groupInfo.totalPeople)
        {
          console.log("Pics Loaded: "+this.state.pictureNumLoaded)
          this.setState({pictureUrlLoaded: true})
        }
      }
    )
  }
  checkUserInfoLoaded(){
    this.setState({userInfoNumLoaded: this.state.userInfoNumLoaded +1},() =>
      {
        if(this.state.userInfoNumLoaded >= this.props.groupInfo.totalPeople)
        {
          console.log("Infos Loaded: "+this.state.userInfoNumLoaded)
          this.setState({userInfoLoaded: true})
        }
      }
    )
  }
  showAllProgress(){
    if(this.state.pictureUrlLoaded && this.state.userInfoLoaded)
    {
      var progress = []
      for(var i = 0;i<this.props.groupInfo.totalPeople;i++)
      {
        progress.push(
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={this.state.pictureUrl[i]}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>UserName: {this.state.userName[i]} </h3>
            <p>Goal: {this.state.userGroup[i]}</p>
          </Carousel.Caption>
          </Carousel.Item>
        )
      }
      return progress
    }
    else {
      return(
        <Carousel.Item>
          <img
            className="d-block w-80"
            src="https://via.placeholder.com/300"
            alt="First slide"
          />
        </Carousel.Item>
      )
    }

  }

  componentDidMount(){
    var _peopleName = []
    console.log(this.props.groupInfo)
    Object.keys(this.props.groupInfo.people).forEach(function (person){
      _peopleName.push(person)
    });
    this.setState({peopleUID: _peopleName})
    this.getData(_peopleName)
  }

  render(){
    return(
      <Carousel className='carousel-custom' interval={0}>
        {this.showAllProgress()}
      </Carousel>
    )
  }
}


export default MemberProgress
