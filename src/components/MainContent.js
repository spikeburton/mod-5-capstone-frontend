import React from "react";
import { Card } from "semantic-ui-react";
import DriveCard from "./DriveCard";

const MainContent = props => {
  return (
    <div id="main-content">
      <div id="main-content-group">
        <Card.Group centered stackable itemsPerRow={3}>
          {props.drives.map((drive, i) => (
            <DriveCard key={i} drive={drive} handleView={props.handleView} />
          ))}
        </Card.Group>
      </div>
    </div>
  );
};

export default MainContent;
