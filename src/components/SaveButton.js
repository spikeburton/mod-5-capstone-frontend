import React from "react";
import { Button, Icon } from "semantic-ui-react";

const SaveButton = () => {
  return (
    <Button onClick={() => console.log("clicked")}>
      <Icon name="heart" />
      Save
    </Button>
  );
};

export default SaveButton;
