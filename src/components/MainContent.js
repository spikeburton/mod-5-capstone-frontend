import React from "react";
import { CardGroup, Card } from "semantic-ui-react";

const MainContent = () => {
  return (
    <div id="main-content">
      <CardGroup stackable centered itemsPerRow={4}>
        <Card content="Hello, World!" />
      </CardGroup>
    </div>
  );
};

export default MainContent;
