import React from 'react';
import { db , storage} from '../firebase/firebase.js';
import { Carousel } from 'react-bootstrap';
import '../scss/MemberProgress.scss'
import Cheer from './Cheer.js'

class MemberProgress extends React.Component {

  constructor(props){
    super(props)
    this.state ={
      pictureUrl: [],
      pictureUrlLoaded: false,
      pictureNumLoaded: 0,
      userName: [],
      userGoal: [],
      userInfoLoaded: false,
      peopleUID: [],
      currentPersonView: '',
      isCurrentPersonViewLoaded: false,
    }
    this.handlePicChange = this.handlePicChange.bind(this)
    this.checkUserInfoLoaded = this.checkUserInfoLoaded.bind(this)
  }

  getData(){
    var _username = []
    var peopleName = this.state.peopleUID
    for(let i in peopleName)
    {
      //Fetch pictures
      storage.ref(`images/${peopleName[i]}`)
      .child(`work${this.props.groupInfo.intervalNum}.jpg`).getDownloadURL()
        .then(url => {
          this.setState({pictureUrl: [...this.state.pictureUrl, url],
            pictureNumLoaded: this.state.pictureNumLoaded +1}, () =>{
            this.checkPictureLoaded()
          })})
        .catch(error => {
            this.setState({pictureUrl: [...this.state.pictureUrl, 'https://via.placeholder.com/400'],
              pictureNumLoaded: this.state.pictureNumLoaded +1}, () =>{
              this.checkPictureLoaded()
            })});
      //Fetch username
       db.ref(`users/${peopleName[i]}`).once('value',(snapshot) =>{
          let val = snapshot.val()
          _username.push(val.name)
          this.setState({userName: _username}, () => {this.checkUserInfoLoaded()})
        })
    }
    //Fetch Goals
    var ppl = this.props.groupInfo.people
    var _goal = []
    Object.keys(this.props.groupInfo.people).forEach(function (person){
        _goal.push(ppl[person].goal)
    });
    this.setState({userGoal: _goal})
    ///
  }

  checkPictureLoaded(){
      if(this.state.pictureNumLoaded >= this.props.groupInfo.totalPeople)
      {
        this.setState({pictureUrlLoaded: true})
      }
  }
  checkUserInfoLoaded(){
    if(this.state.userName.length >= this.props.groupInfo.totalPeople)
    {
      this.setState({userInfoLoaded: true})
    }
  }
  showAllProgress(){
    if(this.state.pictureUrlLoaded && this.state.userInfoLoaded)
    {
      var progress = []
      for(var i = 0;i < this.props.groupInfo.totalPeople;i++)
      {
        progress.push(
        <Carousel.Item key={i}>
          <img
            style = {{ objectFit: 'cover'}}
            className="d-block w-100 h-100"
            src={this.state.pictureUrl[i]}
            alt="First slide"
          />
          <Carousel.Caption key={this.props.groupInfo.totalPeople+i} style={{zIndex: '1'}}>
            <div className="carousel-font">UserName: {this.state.userName[i]} </div>
            <div className="carousel-font">Goal: {this.state.userGoal[i]}</div>
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
            style = {{ objectFit: 'cover'}}
            className="d-block w-100 h-100"
            src="https://via.placeholder.com/400"
            alt="First slide"
          />
        </Carousel.Item>
      )
    }

  }
  showCheer(){
    if(this.state.isCurrentPersonViewLoaded){
      return(<Cheer groupName={this.props.groupInfo.groupName} uid={this.state.currentPersonView} />)
    }
    else {
      return(<React.Fragment/>)
    }
  }
  handlePicChange(event){
    this.setState({isCurrentPersonViewLoaded: false})
    this.setState({currentPersonView: this.props.groupInfo.mapPeopleWithNumber[event]},
      ()=>{this.setState({isCurrentPersonViewLoaded: true})})
  }
  componentDidMount(){
    var _peopleName = []
    console.log(this.props.groupInfo)
    Object.keys(this.props.groupInfo.people).forEach(function (person){
      _peopleName.push(person)
    });
    this.setState({peopleUID: _peopleName, currentPersonView: this.props.groupInfo.mapPeopleWithNumber[0]},
      () => {
        this.setState({isCurrentPersonViewLoaded: true})
        this.getData()
      })
  }

  render(){
    return(
      <React.Fragment>
        <Carousel className='carousel-custom' interval={0} onSelect={this.handlePicChange}>
          {this.showAllProgress()}
        </Carousel>
        {this.showCheer()}
      </React.Fragment>
    )
  }
}


export default MemberProgress
