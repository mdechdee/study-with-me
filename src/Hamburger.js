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
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    this.setState({
      open: false,
    })
  }

  render(){
    return (
      <Menu>
        <NavLink onClick={() => this.handleClick} exact to="/find_group">Find Groups</NavLink>
        <NavLink onClick={() =>this.handleClick} exact to="/my_group">My Group</NavLink>
        <NavLink onClick={() =>this.handleClick} exact to="/profile">Profile</NavLink>
        <NavLink onClick={() =>this.handleClick} exact to="/logout">Logout</NavLink>
      </Menu>
    );
  };

}

export default Hamburger;
