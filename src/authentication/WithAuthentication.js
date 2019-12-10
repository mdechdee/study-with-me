import React from 'react';
import { firebase } from '../firebase';
import AuthContext from './AuthContext.js'

const withAuthentication = (Component) =>
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        authUser: null,
      };
    }

    componentDidMount() {
      this.listener = firebase.auth.onAuthStateChanged(authUser => {
      	
        authUser
          ? this.setState(() => ({ authUser }))
          : this.setState(() => ({ authUser: null }));
      });
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      const { authUser } = this.state;

      return (
        <AuthContext.Provider value={authUser}>
          <Component {...this.props} />
        </AuthContext.Provider>
      );
    }
}

export default withAuthentication;
