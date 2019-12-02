import React from 'react';
import { Form, Button } from 'react-bootstrap';
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
          toast('Wrong email or password.', {
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
            <Button variant='warning' className='login-button' type='submit'>Login</Button>
          </Form.Group>
        </Form>
        <NavLink to='/Signup' className='icon-default'activeClassName='icon-active'>
          <Button variant='warning' className='signup-button'>Sign up</Button>
        </NavLink>
      </div>
    )
  }
}

export default Signin;
