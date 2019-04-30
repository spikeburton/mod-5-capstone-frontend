import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const Navbar = props => {
  const { active } = props;

  return (
    <Menu inverted>
      <Link to="/" className={active === "main" ? "item active" : "item"}>
        <div className="content">Home</div>
      </Link>
      <Menu.Menu position="right">
        {localStorage.getItem("token") ? (
          <Fragment>
            <Link
              to="/settings"
              className={active === "settings" ? "item active" : "item"}
            >
              <div className="content">Settings</div>
            </Link>
            <Link
              to="/login"
              className="item"
              onClick={() => localStorage.clear()}
            >
              <div className="content">Log Out</div>
            </Link>
          </Fragment>
        ) : (
          <Fragment>
            <Link
              to="/signup"
              className={active === "signup" ? "item active" : "item"}
            >
              <div className="content">Sign Up</div>
            </Link>
            <Link
              to="/login"
              className={active === "login" ? "item active" : "item"}
            >
              <div className="content">Log In</div>
            </Link>
          </Fragment>
        )}
      </Menu.Menu>
    </Menu>
  );
};

export default Navbar;
