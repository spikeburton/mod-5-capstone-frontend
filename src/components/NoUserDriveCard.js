import React from "react";
import { Card, Image } from "semantic-ui-react";

const NoUserDriveCard = props => {
  const { drive } = props;
  return (
    <Card raised>
      <Image
        src={require("../images/fence.jpg")}
        alt="bridge"
        style={{ height: "200px", width: "100%" }}
      />
      <Card.Content>
        <Card.Header>{drive.name}</Card.Header>
        <Card.Meta>{drive.state}</Card.Meta>
      </Card.Content>
    </Card>
  );
};

export default NoUserDriveCard;
