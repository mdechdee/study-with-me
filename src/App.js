import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';

class App extends React.Component{
  render() { 
    return(
      <Container fluid>
        <Row className='justify-content-sm-center outer-wrap'>
          <div className="App">
            <h1> "HI" </h1>
          </div>
        </Row>
      </Container>
    );
  }
}

export default App;
