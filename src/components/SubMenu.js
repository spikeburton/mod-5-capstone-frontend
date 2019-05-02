import React from "react";
import { Menu } from "semantic-ui-react";

const SubMenu = props => {
  const { active } = props;
  return (
    <div id="sub-menu" style={{ padding: "0 60px" }}>
      <Menu pointing secondary>
        <Menu.Item
          active={active === "all"}
          onClick={() => props.handleMenuChange("all")}
        >
          All
        </Menu.Item>
        {localStorage.getItem("token") ? (
          <Menu.Item
            active={active === "favorites"}
            onClick={() => props.handleMenuChange("favorites")}
          >
            Favorites
          </Menu.Item>
        ) : null}
      </Menu>
    </div>
  );
};

export default SubMenu;
