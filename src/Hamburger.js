import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { NavLink } from 'react-router-dom';
import './scss/Hamburger.scss';
class Hamburger extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      open: false,
    }
  }

  closeMenu (){
    this.setState({
      open: false,
    })
  }

  handleStateChange(state){
    this.setState({
      open: state.open,
    })
  }

  render(){
    return (
      <Menu isOpen={this.state.open} onStateChange={(state) => this.handleStateChange(state)}>
        <NavLink onClick={() => this.closeMenu()} exact to="/find_group">Find Groups</NavLink>
        <NavLink onClick={() => this.closeMenu()} exact to="/my_group">My Group</NavLink>
        <NavLink onClick={() => this.closeMenu()} exact to="/profile">Profile</NavLink>
        <NavLink onClick={() => this.closeMenu()} exact to="/logout">Logout</NavLink>
      </Menu>
    );
  };

}

export default Hamburger;
