import React, { Component } from "react";
import { List } from "semantic-ui-react";

class DirectionListItem extends Component {
  render() {
    // console.log(this.props.distance)

    let icon = "";
    const { type } = this.props.maneuver

    if (type === "depart" || type === "arrive") {
      icon = "marker"
    } else if (type === "turn") {
      // console.log(this.props.maneuver)
      const { modifier } = this.props.maneuver
      console.log(modifier)
      switch(modifier) {
        case "left":

      }
    } else {
      console.log(this.props.maneuver.type)
    }

    return (
      <List.Item>
        <List.Icon name={icon} />
        <List.Content>
          {/* <List.Header>{this.props.maneuver.type}</List.Header> */}
          <List.Description>{this.props.maneuver.instruction}</List.Description>
        </List.Content>
      </List.Item>
    );
  }
}

export default DirectionListItem;
