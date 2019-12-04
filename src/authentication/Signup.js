import React from 'react';
import { Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { auth, db } from '../firebase/firebase.js';
import * as Yup from 'yup';
import {NavLink } from 'react-router-dom';

const INITIAL_VALUE = {
  username: '',
  email: '',
  password: '',
  error: null,
};


class Signup extends React.Component {
  constructor(props){
    super(props);
    this.state = { ...INITIAL_VALUE };
  }

  handleSubmit = event => {
    auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(authUser => {
        console.log(authUser)
          db.ref(`users/${authUser.user.uid}`).set({
            name: this.state.username,
            group: "",
            point: 0,
            groupJoined: 0,
            groupCreated: 0,
            sticker: '',
            tasks: '',
            cheer: ''
          })
          .then(() => {
            this.setState(() => ({ ...INITIAL_VALUE }));
          })
          .catch(error => {
            alert(error)
            this.setState({ error });
          });
      })
      .catch(error => {
        alert(error)
        this.setState({ error });
      });
  }

  handleChange = event => {
    console.log(event.target.name)
    this.setState({ [event.target.name]: event.target.value });
  }

  render(){
    const SCHEMA = Yup.object({
      username: Yup.string()
        .required("Required"),
      email: Yup.string()
        .email("Please enter a valid email.")
        .required("Required"),
      password: Yup.string()
        .length(6, "Password must be at least 6 characters long")
        .required("Required")
    });

    return(
      <div style = {{margin:"auto"}}>
        <Formik
          initialValues={INITIAL_VALUE}
          validationSchema = {SCHEMA}
          onSubmit={this.handleSubmit}
          >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Label > Sign up </Form.Label>
            <Form.Group as = {Row}>
              <Form.Label column xs={4} sm={4}> Username </Form.Label>
              <Col xs={8} sm={8}>
                <Form.Control value={values.username} name="username" placeholder="Enter your username"
                  type="text" onChange={(e) => {this.handleChange(e); handleChange(e)}}/>
              </Col>
            </Form.Group>
            <Form.Group as = {Row}>
              <Form.Label column xs={4} sm={4}> Email </Form.Label>
              <Col xs={8} sm={8}>
                <Form.Control value={values.email} name="email" placeholder="Enter your email"
                  type="email" onChange={(e) => {this.handleChange(e); handleChange(e)}}/>
              </Col>
            </Form.Group>
            <Form.Group as = {Row}>
              <Form.Label column xs={4} sm={4}> Password </Form.Label>
              <Col xs={8} sm={8}>
                <Form.Control value={values.password} name="password" placeholder="Enter your password"
                  type="password" onChange={(e) => {this.handleChange(e); handleChange(e)}}/>
              </Col>
            </Form.Group>
            <Form.Group as = {Row}>
              <Col/>
              <Col xs={4} sm={4}> <NavLink to='/signin'> <Button block variant='secondary'> Cancel </Button>  </NavLink> </Col>
              <Col xs={4} sm={4}> <Button block variant='warning' type='submit'> Sign up! </Button> </Col>
              <Col/>
            </Form.Group>
          </Form>
          )}
        </Formik>
      </div>
    )
  }
}

export default Signup;
