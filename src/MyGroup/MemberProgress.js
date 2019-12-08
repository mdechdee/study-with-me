import React from 'react';
import { db , storage} from '../firebase/firebase.js';
import { Carousel , Row, Col, Container} from 'react-bootstrap';
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
      userProfilePic: [],
      userGoal: [],
      userProgress: [],
      userStatus: [],
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
    var _userProfilePic = []
    var peopleName = this.state.peopleUID
    let _people = this.props.groupInfo.people
    console.log(_people)
    for(let i in peopleName)
    {
      //Fetch pictures
      storage.ref(`images/${peopleName[i]}`)
      .child(`work${_people[peopleName[i]].lastInterval}.jpg`).getDownloadURL()
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
          _userProfilePic[i] = val.CroppedImg;
          this.setState({userName: _username, userProfilePic:_userProfilePic},
            () => {this.checkUserInfoLoaded()})
        })
      //Fetch user profile pictures
    }
    //Fetch Goals
    var ppl = this.props.groupInfo.people
    let _goal = []
    let _progress = []
    let _status = []
    Object.keys(this.props.groupInfo.people).forEach(function (person){
        _goal.push(ppl[person].goal)
        _progress.push(ppl[person].progress)
        _status.push(ppl[person].status)
    });
    this.setState({userGoal: _goal, userProgress: _progress, userStatus: _status})
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
        if(this.state.userStatus[i]==='active'){
          progress.push(
            <Carousel.Item key={i}>
              <img
                className="carousel-img-1"
                src={this.state.pictureUrl[i]}
                alt="First slide"
              />

            <Container fluid className='caption' key={this.props.groupInfo.totalPeople+i} style={{zIndex: '1'}}>
                <Row>
                  <Col xs={3} className="d-flex justify-content-center p-0">
                    <img src={this.state.userProfilePic[i]} className='profile-img'/>
                  </Col>
                  <Col xs={9} className="d-flex flex-column justify-content-center p-0">
                    <div className='carousel-font'> {this.state.userName[i]}</div>
                    <div className='carousel-font-small'> Progress: {this.state.userProgress[i]} </div>
                  </Col>
                </Row>
              </Container>
            </Carousel.Item>
          )
        }
        else{
          progress.push(
            <Carousel.Item key={i}>
              <img
                className="carousel-img-2"
                src={this.state.pictureUrl[i]}
                alt="First slide"
              />

            <Container fluid className='caption' key={this.props.groupInfo.totalPeople+i} style={{zIndex: '1'}}>
                <Row>
                  <Col xs={3} className="d-flex justify-content-center p-0">
                    <img src={this.state.userProfilePic[i]} className='profile-img'/>
                  </Col>
                  <Col xs={9} className="d-flex flex-column justify-content-center p-0">
                    <div className='carousel-font'> {this.state.userName[i]}</div>
                    <div className='carousel-font-small'> Progress: {this.state.userProgress[i]} </div>
                  </Col>
                </Row>
              </Container>
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
      })
  }
  componentDidMount(){
    var _peopleName = []
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
