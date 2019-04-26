import React from 'react'
import { Button, Icon } from 'semantic-ui-react';

const ViewButton = props => {
  return (
    <Button onClick={() => props.handleView(props.id)}>
      <Icon name="map" />
      View
    </Button>
  )
}

export default ViewButton
