import React, { Component } from "react";
import { List, Image } from "semantic-ui-react";

class DirectionListItem extends Component {
  render() {
    // Parse file name from object properties
    // FORMAT: direction_type_modifier
    let { type, modifier } = this.props.maneuver;
    type = type ? `_${type.split(" ").join("_")}` : "";
    modifier = modifier ? `_${modifier.split(" ").join("_")}` : "";
    const icon = `direction${type}${modifier}`;

    let { distance } = this.props;
    // Convert meters to kilometers
    // ROUND to 2 decimal places: round((distance / 1000) * 100) / 100
    distance =
      distance >= 1000
        ? `${Math.round(distance / 10) / 100} km`
        : `${distance} m`;

    const { location } = this.props.maneuver

    return (
      <List.Item
        onMouseEnter={() => this.props.handleMouseEnter(location)}
        // onMouseLeave={() => console.log("mouse leave")}
      >
        <Image
          avatar
          src={require(`../icons/png/light/${icon}.png`)}
          verticalAlign="middle"
        />
        <List.Content>
          <List.Header
            as="a"
            onClick={() =>
              this.props.handleZoomToStep(location)
            }
          >
            {this.props.maneuver.instruction}
          </List.Header>
          <List.Description>{distance}</List.Description>
        </List.Content>
      </List.Item>
    );
  }
}

export default DirectionListItem;
