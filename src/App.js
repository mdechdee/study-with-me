import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'react-bootstrap/dist/react-bootstrap.min.js';
import logo from './logo.svg';
import './App.css';
import './scss/_base.scss';

class App extends React.Component{
  render() { 
    return(
      <Container fluid className>
        <Row className='justify-content-sm-center outer-wrap'>
          <Col xs={12} sm={8} md={6} lg={4} className='page-wrap'>
            <div className='horizontal-div'>
              <Row className='justify-content-center'>
                <Col><h1>"HI"</h1></Col>
                <Col><h1>"HI"</h1></Col>
                <Col><h1>"HI"</h1></Col>
                <Col><h1>"HI"</h1></Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
