import React from "react";
import { Card } from "semantic-ui-react";
import NoUserDriveCard from "./NoUserDriveCard";

const NoUserContent = props => {
  return (
    <div id="main-content">
      <div id="main-content-group">
        <Card.Group centered stackable itemsPerRow={3}>
          {props.drives.map((drive, i) => (
            <NoUserDriveCard key={i} drive={drive} />
          ))}
        </Card.Group>
      </div>
    </div>
  );
};

export default NoUserContent;
