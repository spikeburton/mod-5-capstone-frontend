import React from 'react'
import { Button, Icon } from 'semantic-ui-react';

const ViewButton = () => {
  return (
    <Button onClick={() => console.log("view button clicked")}>
      <Icon name="map" />
      View
    </Button>
  )
}

export default ViewButton
