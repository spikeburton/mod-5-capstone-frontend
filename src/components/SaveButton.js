import React from "react";
import { Button, Icon } from "semantic-ui-react";

const SaveButton = props => {
  return (
    <Button onClick={() => props.handleSave(props.id)}>
      <Icon name="heart" />
      Save
    </Button>
  );
};

export default SaveButton;
