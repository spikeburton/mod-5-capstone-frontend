import React, { Component } from "react";
import { Modal } from "semantic-ui-react";

class ViewModal extends Component {
  handleMount = () => {
    console.log("Modal mounted")
  }

  render() {
    return (
      <Modal
        open={this.props.modalOpen}
        onClose={this.props.closeModal}
        onMount={this.handleMount}
      >
        <Modal.Content>
          <p>{`Card: ${this.props.viewed}`}</p>
        </Modal.Content>
      </Modal>
    );
  }
}

export default ViewModal;
