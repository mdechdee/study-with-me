import React from 'react';
import { db , storage} from '../firebase/firebase.js';
import { Carousel } from 'react-bootstrap';
import '../scss/MemberProgress.scss'
import Cheer from './Cheer.js'
import Report from './Report.js'

class MemberProgress extends React.Component {

  constructor(props){
    super(props)
    this.state ={
      pictureUrl: [],
      typePictureUrl: [],
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
          const {pictureUrl} = this.state;
          pictureUrl[i] = url


          const {typePictureUrl} = this.state;

          var _img = new Image();
          _img.src = url;
          _img.onload = function(){
            if(this.width>this.height) typePictureUrl[i]=2
            else typePictureUrl[i] = 1
          }

          this.setState({pictureUrl,typePictureUrl,
            pictureNumLoaded: this.state.pictureNumLoaded +1}, () =>{
            this.checkPictureLoaded()
          })
        })
        .catch(error => {
            const {pictureUrl} = this.state;
            pictureUrl[i] = 'idle-progress.png'
            const {typePictureUrl} = this.state;
            typePictureUrl[i] = 1
            this.setState({pictureUrl, typePictureUrl,
              pictureNumLoaded: this.state.pictureNumLoaded +1}, () =>{
              this.checkPictureLoaded()
            })});
      //Fetch username
       db.ref(`users/${peopleName[i]}`).once('value',(snapshot) =>{
          let val = snapshot.val()
          _username[i] = val.name;
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
        if(this.state.typePictureUrl[i]===1){
          progress.push(
            <Carousel.Item key={i}>
              <img
                style = {{ objectFit: 'cover'}}
                className="carousel-img-1"
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
        else{
          progress.push(
            <Carousel.Item key={i}>
              <img
                style = {{ objectFit: 'cover'}}
                className="carousel-img-2"
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
  showCheerAndReport(){
    if(this.state.isCurrentPersonViewLoaded){
      if(this.state.currentPersonView !== this.props.cheererUid){
        return(<div>
          <Cheer groupName={this.props.groupInfo.groupName} uid={this.state.currentPersonView} cheererUid={this.props.cheererUid} />
          <Report uid = {this.state.currentPersonView}/>
          </div>)
      }
    }
    else {
      return(<React.Fragment/>)
    }
  }
  handlePicChange(event){
    this.setState({isCurrentPersonViewLoaded: false})
    this.setState({currentPersonView: this.props.groupInfo.mapPeopleWithNumber[event]},
      ()=>{
        this.setState({isCurrentPersonViewLoaded: true})
        this.props.handlePicChange(event)
        console.log('from MemPro : '+event)
      })
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
        <Carousel className='carousel-custom' interval={0} onSelect={this.handlePicChange} defaultActiveIndex={this.props.activeIndex}
          nextIcon={<div className="circle-button"><span aria-hidden="true" className="carousel-control-next-icon"/></div>}
          prevIcon={<div className="circle-button"><span aria-hidden="true" className="carousel-control-prev-icon" />	</div>}>
          {this.showAllProgress()}
        </Carousel>
        {this.showCheerAndReport()}
      </React.Fragment>
    )
  }
}


export default MemberProgress
