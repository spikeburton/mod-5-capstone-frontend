import React, { Component } from "react";
import { List } from "semantic-ui-react";

class DirectionListItem extends Component {
  render() {
    // console.log(this.props.maneuver)
    return (
      <List.Item>
        <List.Icon name="marker" />
        <List.Content>
          {/* <List.Header>{this.props.maneuver.type}</List.Header> */}
          <List.Description>{this.props.maneuver.instruction}</List.Description>
        </List.Content>
      </List.Item>
    );
  }
}

export default DirectionListItem;
