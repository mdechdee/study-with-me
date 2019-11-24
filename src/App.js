import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import 'react-bootstrap/dist/react-bootstrap.min.js';
import './App.css';
import base_styles from './scss/_base.scss';
import Hamburger from './Hamburger.js';
import Profile from './Profile.js';
import FindGroups from './FindGroups.js';
import MyGroup from './MyGroup.js';
import Unmatched from './Unmatched.js';
import AuthContext from './authentication/AuthContext.js';
import TimerContext from './TimerContext.js';
import Signin from './authentication/Signin.js';
import Signout from './authentication/Signout.js';
import withAuthentication from './authentication/WithAuthentication.js';
import withTimer from './WithTimer.js';
import { ToastContainer, toast } from 'react-toastify';
import { library } from '@fortawesome/fontawesome-svg-core';
//import { fas } from '@fortawesome/free-solid-svg-icons';
//import { fab } from '@fortawesome/free-brands-svg-icons';
import { faChevronCircleLeft,faChevronCircleRight,faComment,faStar,faSearch } from '@fortawesome/free-solid-svg-icons';
library.add(faChevronCircleLeft,faChevronCircleRight,faComment,faStar,faSearch);
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
        <ToastContainer />
      </Container>
    );
  }
}

const Page = (auth) => {
  return(
    <Col xs={12} sm={8} md={6} lg={4} className='page-wrap'>
      <div className='horizontal-div-above' style= {{background :base_styles.primary}}>
         <Hamburger/>
         <div className='title'>Study With Me</div>
      </div>
      <div className='horizontal-div-mid' />
      <div className='div-content'>
        <Switch>
            <Route exact path='/' render = {() => (
                <Redirect to='/find_group' />
            )}/>
          <Route path='/find_group' render={(routeProps) => (<FindGroups uid = {auth.auth.uid} {...routeProps} />)} />
            <Route path='/my_group' component={MyGroup} />
            <Route path='/profile'  component={Profile} />
            <Route path='/logout' render={() => (<Signout auth/>)}/>
            <Route  path='/login' render = {() => (
                <Redirect to='/find_group' />
            )}/>
        </Switch>
      </div>
      <div className='horizontal-div-below'/>
    </Col>
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
          <Route render = {() => (
              <Redirect to='/login' />
          )}/>
        </Switch>
      </div>
      <div className='horizontal-div-below' style= {{background :base_styles.primary, zIndex: '1'}}/>
    </Col>
  );
}

export default withAuthentication(withTimer(App));
