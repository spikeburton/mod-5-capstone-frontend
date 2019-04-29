import React from "react";
import { Button, Icon } from "semantic-ui-react";

const UnsaveButton = props => {
  return (
    <Button color="red">
      <Icon name="heart outline" />
      Save
    </Button>
  );
};

export default UnsaveButton;
