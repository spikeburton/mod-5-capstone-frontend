import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Menu, Image, Dropdown, Icon } from "semantic-ui-react";

const Navbar = props => {
  const { active } = props;
  const avatar = localStorage.getItem("avatar");
  const username = localStorage.getItem("username");

  return (
    <Menu secondary>
      <Link to="/" className={active === "main" ? "item active" : "item"}>
        <div className="content">Home</div>
      </Link>
      <Menu.Menu position="right">
        {localStorage.getItem("token") ? (
          <Fragment>
            <Dropdown
              item
              // icon={null}
              trigger={username}
              pointing
            >
              <Dropdown.Menu>
                <Dropdown.Item
                  disabled
                  text={
                    <span>
                      {/* <Image src={avatar} avatar circular /> */}
                      Signed in as <strong>{username}</strong>
                    </span>
                  }
                />
                <Dropdown.Divider />
                <Link
                  to="/create"
                  className={active === "create" ? "item active" : "item"}
                >
                  <div className="content">
                  <Icon name="upload" />
                  Add a drive
                  </div>
                </Link>
                <Link
                  to="/settings"
                  className={active === "settings" ? "item active" : "item"}
                  // className="item"
                >
                  <div className="content">
                    <Icon name="settings" />
                    Settings
                  </div>
                </Link>
                <Link
                  to="/"
                  className="item"
                  onClick={() => localStorage.clear()}
                >
                  <div className="content">
                    <Icon name="log out" />
                    Log Out
                  </div>
                </Link>
              </Dropdown.Menu>
            </Dropdown>
            {avatar ? (
              <Menu.Item>
                <Image src={avatar} avatar circular />
              </Menu.Item>
            ) : null}
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
