import React, { Component } from "react";
import { Modal, Header, Button, Icon } from "semantic-ui-react";

class CreateModal extends Component {
  render() {
    return (
      <Modal open={this.props.open}>
        <Modal.Header>Add Drive</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>Please verify the following information:</Header>
            <p>
              <strong>Name:</strong> {this.props.name}
            </p>
            <p>
              <strong>Description:</strong> {this.props.description}
            </p>
            <p>
              <strong>Starting Location:</strong> {this.props.geolocationA}
            </p>
            <p>
              <strong>Ending Location:</strong> {this.props.geolocationB}
            </p>
            <p>
              <strong>State:</strong> {this.props.region}
            </p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={this.props.handleConfirm}>
            <Icon name="check" />
            Create
          </Button>
          <Button onClick={this.props.handleCancel}>
            <Icon name="cancel" />
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default CreateModal;
