import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';

const INITIAL_STATE = {
  email: '',
  password: '',
};

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  handleSubmit = event => {
    const { email, password } = this.state;

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({ error });
        if (email === '' || password === '')
          console.log('please fill in email and password')
        else
          console.log('wrong email or password')
      });

      event.preventDefault();
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render(){
    const { email, password } = this.state;
    return(
      <div style = {{margin: 'auto'}}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className='signin form-wrapper'>
            <Form.Control
              type="email" placeholder="email@example.com"
              name="email" value={email}
              onChange={this.handleChange}
            />
            <Form.Control
              type="password" placeholder="password"
              name="password" value={password}
              onChange={this.handleChange}
            />
            <Button variant='yellow' type='submit'>Login</Button>
          </Form.Group>
        </Form>
      </div>
    )
  }
}

export default Signin;
