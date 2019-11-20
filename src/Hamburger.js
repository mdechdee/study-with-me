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

  render(){
    return (
      <Menu>
        <NavLink exact to="/find_group" className="menu-item" >Find Groups</NavLink>
        <NavLink exact to="/my_group" className="menu-item" >My Group</NavLink>
        <NavLink exact to="/profile" className="menu-item" >Profile</NavLink>
      </Menu>
    );
  };

}

export default Hamburger;
