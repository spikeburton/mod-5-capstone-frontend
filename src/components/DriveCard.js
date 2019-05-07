import React from "react";
import { Card, Image } from "semantic-ui-react";
import SaveButton from "./SaveButton";
import ViewButton from "./ViewButton";
import UnsaveButton from "./UnsaveButton";

const DriveCard = props => {
  const { drive } = props;
  return (
    <Card raised onClick={() => props.handleClick(drive)}>
      <Image
        src={require("../images/fence.jpg")}
        alt="bridge"
        style={{ height: "220px", width: "100%" }}
        centered
        // wrapped
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
