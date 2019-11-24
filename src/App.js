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
import withAuthentication from './authentication/WithAuthentication.js';
import withTimer from './WithTimer.js';
import { ToastContainer, toast } from 'react-toastify';

class App extends React.Component{
  render() {
    return(
      <Container fluid className>
        <Row className='justify-content-sm-center outer-wrap'>
          <AuthContext.Consumer>{ auth => { return(
              <TimerContext.Consumer>{ timer => { return(
                    <Col xs={12} sm={8} md={6} lg={4} className='page-wrap'>
                      <div className='horizontal-div-above' style= {{background :base_styles.primary, zIndex: '1'}}>
                         <Hamburger/>
                         <div className='title'>Study With Me</div>
                      </div>
                      <div className='horizontal-div-above' style = {{zIndex: '-2'}}/>
                      <Page authUser = {auth} timer={timer}/>
                      <div className='horizontal-div-below'/>
                    </Col>
                  )}
              }
              </TimerContext.Consumer>
              )}
          }
          </AuthContext.Consumer>
        </Row>
        <ToastContainer />
      </Container>
    );
  }
}

const Page = (auth) => {
  if(auth.authUser){
    return(
      <Switch>
        <Route exact path='/' />
        <Route path='/find_group' component={FindGroups} />
        <Route path='/my_group' component={MyGroup} />
        <Route path='/profile'  component={Profile} />
        <Route path='/login' render={() => (<Redirect to='/' />)}/>
        <Route component={Unmatched} />
      </Switch>
    );
  }
  else
  {
    console.log('no user')
    return(
      <Switch>
        <Route path='/login' component={Signin} />
        <Route render = {() => (
            <Redirect to='/login' />
        )}/>
      </Switch>
    );
  }
}

export default withRouter(withTimer(withAuthentication(App)));
