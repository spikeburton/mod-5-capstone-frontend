import React from "react";
import { Button, Icon } from "semantic-ui-react";

const UnsaveButton = props => {
  return (
    <Button color="red" onClick={() => props.handleUnsave(props.id)}>
      <Icon name="heart outline" />
      Saved
    </Button>
  );
};

export default UnsaveButton;
