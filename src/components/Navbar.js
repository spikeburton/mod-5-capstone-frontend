import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const Navbar = props => {
  return (
    <Menu inverted>
      <Link to="/" className="item">
        <div className="content">Home</div>
      </Link>
      <Menu.Menu position="right">
        <Link to="/signup" className="item">
          <div className="content">Sign Up</div>
        </Link>
        <Link to="/login" className="item">
          <div className="content">Log In</div>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};

export default Navbar;
