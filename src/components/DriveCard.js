import React from "react";
import { Card, Image } from "semantic-ui-react";
import SaveButton from "./SaveButton";
import ViewButton from "./ViewButton";
import UnsaveButton from "./UnsaveButton";

const DriveCard = props => {
  console.log(props.saved)
  const { drive } = props;
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
        {props.saved ? (
          <UnsaveButton handleUnsave={props.handleUnsave} id={props.saved.id} />
        ) : (
          <SaveButton handleSave={props.handleSave} id={drive.id} />
        )}
      </Card.Content>
    </Card>
  );
};

export default DriveCard;
