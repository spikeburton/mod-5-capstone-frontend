import React from "react";
import { Button, Icon } from "semantic-ui-react";

const CloseButton = props => {
  return (
    <Button onClick={() => props.handleClose()}>
      <Icon name="close" />
      Close
    </Button>
  );
};

export default CloseButton;
