import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { auth } from '../firebase';
import '../scss/Signin.scss';
import {NavLink } from 'react-router-dom';

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
          toast('Please fill in email and password.', {
            position: toast.POSITION.TOP_CENTER
      		});
        else
          toast(error.message, {
      			position: toast.POSITION.TOP_CENTER
      		});
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
          <Form.Group className='signin form-wrapper form-font'>
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

          </Form.Group>
          <Form.Group as = {Row}>
            <Col/>
            <Col> <Button variant='warning' type='submit'>Login</Button> </Col>
            <Col/>
          </Form.Group>
        </Form>
        <NavLink to='/Signup' activeClassName='icon-active'>
          <div>Sign up</div>
        </NavLink>
      </div>
    )
  }
}

export default Signin;
