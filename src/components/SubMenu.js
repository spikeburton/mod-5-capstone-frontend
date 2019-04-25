import React from "react";
import { Menu } from "semantic-ui-react";

const SubMenu = () => {
  return (
    <div id="sub-menu" style={{padding: "0 60px"}}>
      <Menu inverted pointing secondary>
        <Menu.Item active>All</Menu.Item>
        <Menu.Item>Recent</Menu.Item>
      </Menu>
    </div>
  );
};

export default SubMenu;
