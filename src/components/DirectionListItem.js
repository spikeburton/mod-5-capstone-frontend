import React from "react";
import { List } from "semantic-ui-react";

const DirectionListItem = props => {
  // console.log(this.props.maneuver)
  return (
    <List.Item>
      <List.Icon name="marker" />
      <List.Content>
        {/* <List.Header>{this.props.maneuver.type}</List.Header> */}
        <List.Description>{props.maneuver.instruction}</List.Description>
      </List.Content>
    </List.Item>
  );
};

export default DirectionListItem;
