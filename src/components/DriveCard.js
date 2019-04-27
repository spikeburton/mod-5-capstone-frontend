import React from "react";
import { Card, Image } from "semantic-ui-react";
import SaveButton from "./SaveButton";
import ViewButton from "./ViewButton";

const DriveCard = props => {
  const { drive } = props
  return (
    <Card raised>
      <Image
        src={require("../images/bridge.jpg")}
        alt="bridge"
        style={{ height: "200px" }}
      />
      <Card.Content>
        <Card.Header>{drive.name}</Card.Header>
        <Card.Meta>{drive.state}</Card.Meta>
        {/* <Card.Description>{props.description}</Card.Description> */}
      </Card.Content>
      <Card.Content extra textAlign="center">
        <ViewButton handleView={props.handleView} current={drive} />
        <SaveButton />
      </Card.Content>
    </Card>
  );
};

export default DriveCard;
