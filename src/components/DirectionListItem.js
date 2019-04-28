import React, { Component } from "react";
import { List, Image } from "semantic-ui-react";

class DirectionListItem extends Component {
  render() {
    // console.log(this.props.distance)

    // Parse file name from object properties
    let { type, modifier } = this.props.maneuver;
    type = type ? `_${type.split(" ").join("_")}` : "";
    modifier = modifier ? `_${modifier.split(" ").join("_")}` : "";
    const icon = `direction${type}${modifier}`;
    console.log(icon);

    return (
      <List.Item>
        {/* <List.Icon name={icon} /> */}
        <Image avatar src={require(`../icons/png/light/${icon}.png`)} />
        <List.Content>
          {/* <List.Header>{this.props.maneuver.type}</List.Header> */}
          <List.Header>{this.props.maneuver.instruction}</List.Header>
          <List.Description>distance</List.Description>
        </List.Content>
      </List.Item>
    );
  }
}

export default DirectionListItem;
