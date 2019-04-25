import React from "react";
import { Card, Image } from "semantic-ui-react";
import SaveButton from "./SaveButton";

const DriveCard = props => {
  return (
    <Card raised>
      <Image
        src={require("../images/bridge.jpg")}
        alt="bridge"
        style={{ height: "200px" }}
      />
      <Card.Content>
        <Card.Header>{props.name}</Card.Header>
        <Card.Meta>{props.state}</Card.Meta>
        {/* <Card.Description>{props.description}</Card.Description> */}
      </Card.Content>
      <Card.Content extra textAlign="center">
        <SaveButton />
      </Card.Content>
    </Card>
  );
};

export default DriveCard;
