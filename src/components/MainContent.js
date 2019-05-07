import React from "react";
import { Card } from "semantic-ui-react";
import DriveCard from "./DriveCard";

const MainContent = props => {
  const { favorites } = props;
  const driveIds = favorites.map(favorite => favorite.drive_id);

  return (
    <div id="main-content">
      <div id="main-content-group">
        <Card.Group centered stackable itemsPerRow={3}>
          {props.drives.map((drive, i) => (
            <DriveCard
              key={i}
              drive={drive}
              handleView={props.handleView}
              handleSave={props.handleSave}
              handleUnsave={props.handleUnsave}
              saved={
                driveIds.includes(drive.id)
                  ? favorites.find(cur => cur.drive_id === drive.id)
                  : false
              }
              handleClick={props.handleClick}
            />
          ))}
        </Card.Group>
      </div>
    </div>
  );
};

export default MainContent;
