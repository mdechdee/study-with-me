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
import { library } from '@fortawesome/fontawesome-svg-core';
//import { fas } from '@fortawesome/free-solid-svg-icons';
//import { fab } from '@fortawesome/free-brands-svg-icons';
import { faChevronCircleLeft,faChevronCircleRight,faComment,faStar } from '@fortawesome/free-solid-svg-icons';
library.add(faChevronCircleLeft,faChevronCircleRight,faComment,faStar);
class App extends React.Component{
  render() {
    return(
      <Container fluid className>
        <Row className='justify-content-sm-center outer-wrap'>
          <Col xs={12} sm={8} md={6} lg={4} className='page-wrap'>
            <div className='horizontal-div-above' style= {{background :base_styles.primary}}>
               <Hamburger/>
               <div className='title'>Study With Me</div>
            </div>
            <div className='horizontal-div-above'>

            </div>
            <Page/>
            <div className='horizontal-div-below'>

            </div>

          </Col>
        </Row>
      </Container>
    );
  }
}

const Page = () => (
  <Switch>
      <Route exact path='/' />
      <Route path='/find_group' component={FindGroups} />
      <Route path='/my_group' component={MyGroup} />
      <Route path='/profile'  component={Profile} />
      <Route component={Unmatched} />
  </Switch>
)

export default App;
