import React from "react";
import { Menu, Segment } from "semantic-ui-react";

const SubMenu = props => {
  const { active } = props;
  return (
    <div id="sub-menu" style={{ padding: "0 60px" }}>
      {/* <Segment inverted> */}
      <Menu inverted pointing secondary>
        <Menu.Item
          active={active === "all"}
          onClick={() => props.handleMenuChange("all")}
        >
          All
        </Menu.Item>
        <Menu.Item
          active={active === "favorites"}
          onClick={() => props.handleMenuChange("favorites")}
        >
          Favorites
        </Menu.Item>
      </Menu>
      {/* </Segment> */}
    </div>
  );
};

export default SubMenu;
