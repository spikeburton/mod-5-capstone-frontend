import React from "react";
import { Card, Image, Button, Icon } from "semantic-ui-react";

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
        <Button>
          <Icon name="heart" />
          Save
        </Button>
      </Card.Content>
    </Card>
  );
};

export default DriveCard;
