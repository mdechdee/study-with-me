import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
import 'react-bootstrap/dist/react-bootstrap.min.js';
import './App.css';
import base_styles from './scss/_base.scss';
import Hamburger from './Hamburger.js';
import Profile from './Profile/Profile.js';
import FindGroups from './FindGroups/FindGroups.js';
import MyGroup from './MyGroup/MyGroup.js';
import Redeem from './Redeem/Redeem.js'
import StickerDetails from './Redeem/StickerDetails';
import AuthContext from './authentication/AuthContext.js';
import TimerContext from './TimerContext.js';
import Signin from './authentication/Signin.js';
import Signup from './authentication/Signup.js';
import Signout from './authentication/Signout.js';
import withAuthentication from './authentication/WithAuthentication.js';
import withTimer from './WithTimer.js';
import { ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import ReactNotification from 'react-notifications-component';
import Notification from './Notification';
import 'react-toastify/dist/ReactToastify.css';
//import { fas } from '@fortawesome/free-solid-svg-icons';
//import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faSearch, faUsers, faGift, faUserCircle, faChevronCircleLeft,
  faChevronCircleRight, faComment, faStar, faTimesCircle, faBell, faCircle,
  faCheckCircle, faPencilAlt, faUpload, faSave
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faSearch, faUsers, faGift, faUserCircle, faChevronCircleLeft,
  faChevronCircleRight, faComment, faStar, faTimesCircle, faBell, faCircle,
  faCheckCircle, faPencilAlt, faUpload, faSave
);

class App extends React.Component{
  render() {
    return(
      <Container fluid className>
        <Row className='justify-content-sm-center outer-wrap'>
          <AuthContext.Consumer>
          { auth => {
              if(auth)
                return(<Page auth={auth}/>)
              else {
                return(<UnAuthPage/>)
              }
            }
          }
          </AuthContext.Consumer>
        </Row>
        <ToastContainer toastClassName="custom-toast" />
      </Container>
    );
  }
}

const Page = (auth) => {
  return(
    <TimerContext.Consumer>
    { timer => {return(
      <Col xs={12} sm={8} md={6} lg={4} className='page-wrap'>
        <div className='horizontal-div-above' style= {{background :base_styles.primary}}>
           <Hamburger/>
           <div className='burger-layout-adjust'></div>
           <div className='title'>Study With Me</div>
           <Notification uid={auth.auth.uid}/>
        </div>
        <div className='horizontal-div-mid' />
        <div className='div-content'>
        <Switch>
            <Route exact path='/' render = {() => (
                <Redirect to='/find_group' />
            )}/>
          <Route path='/find_group' render={(routeProps) => (<FindGroups uid = {auth.auth.uid}{...routeProps} />)} />
            <Route path='/my_group' render={(routeProps) => (<MyGroup uid = {auth.auth.uid} timer={timer} {...routeProps} />)} />
            <Route path='/profile'  component={Profile} />
            <Route path='/redeem' render={(routeProps) => (<Redeem uid = {auth.auth.uid}{...routeProps} />)} />
            <Route path='/details' component={StickerDetails}/>
            <Route path='/logout' render={() => (<Signout auth/>)}/>
            <Route  path='/login' render = {() => (
                <Redirect to='/find_group' />
            )}/>
            <Route render = {() => (
                <Redirect to='/find_group' />
            )}/>
        </Switch>
        </div>
        <div className='horizontal-div-below' style= {{background :base_styles.primary, zIndex: '1'}}>
          <Container className='container-fluid d-flex h-100 flex-column'>
            <Row className='flex-grow-1 flex-fill d-flex justify-content-start'>
              <Col className='align-items-center align-middle' style={{display:'grid'}} >
                <NavLink to='/find_group' className='icon-default'activeClassName='icon-active'>
                  <FontAwesomeIcon
                    icon='search'
                  />
                </NavLink>
              </Col>
              <Col className='align-items-center align-middle' style={{display:'grid'}}>
                <NavLink to='/my_group' className='icon-default'activeClassName='icon-active'>
                  <FontAwesomeIcon
                    icon='users'
                  />
                </NavLink>
              </Col>
              <Col className='align-items-center align-middle' style={{display:'grid'}}>
                <NavLink to='/redeem' className='icon-default'activeClassName='icon-active'>
                  <FontAwesomeIcon
                    icon='gift'
                  />
                </NavLink>
              </Col>
              <Col className='align-items-center align-middle' style={{display:'grid'}}>
                <NavLink to='/profile' className='icon-default'activeClassName='icon-active'>
                  <FontAwesomeIcon
                    icon='user-circle'
                  />
                </NavLink>
              </Col>
            </Row>
          </Container>
        </div>
      </Col>)
    }}
    </TimerContext.Consumer>
  );
}

const UnAuthPage = () => {
  return(
    <Col xs={12} sm={8} md={6} lg={4} className='page-wrap'>
      <div className='horizontal-div-above' style= {{background :base_styles.primary, zIndex: '1'}}>
         <div className='title'>Study With Me</div>
      </div>
      <div className='div-content'>
        <Switch>
          <Route path='/login' component={Signin} />
          <Route path='/signup' component={Signup} />
          <Route render = {() => (
              <Redirect to='/login' />
          )}/>
        </Switch>
      </div>
      <div className='horizontal-div-below'/>

    </Col>
  );
}

export default withAuthentication(withTimer(App));
