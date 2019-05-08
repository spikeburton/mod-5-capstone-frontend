import React from "react";
import { Card, Image } from "semantic-ui-react";
import SaveButton from "./SaveButton";
import ViewButton from "./ViewButton";
import UnsaveButton from "./UnsaveButton";

const DriveCard = props => {
  const { drive } = props;
  return (
    <Card raised>
      {/* NOTE: If the drive has any photos, render the first one. Otherwise, render a generic image. */}
      <Image
        src={
          drive.photos.length > 0
            ? drive.photos[0].image_url
            : require("../images/default.jpeg")
        }
        alt="bridge"
        style={{ height: "240px" }}
        fluid
        // centered
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
