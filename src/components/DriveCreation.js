import React, { Component } from "react";
import {
  Container,
  Segment,
  Grid,
  Loader,
  Modal,
  Form,
  Button
} from "semantic-ui-react";

class DriveCreation extends Component {
  render() {
    return (
      <Container>
        <Segment>
          <Grid columns="2" stackable reversed="mobile">
            <Grid.Column>
              <Form>
                <Form.Input
                  fluid
                  label="Enter a name:"
                  type="text"
                  placeholder="Name..."
                  onChange={this.props.handleChange}
                  value={this.props.name}
                />
                <Form.TextArea
                  label="Enter a short description:"
                  placeholder="Description..."
                  onChange={this.props.handleChange}
                  value={this.props.description}
                />
                <p>
                  <strong>Starting Location:</strong> {this.props.geolocationA}
                </p>
                <p>
                  <strong>Ending Location:</strong> {this.props.geolocationB}
                </p>
                <Grid>
                  <Grid.Column textAlign="center">
                    <Button
                      type="submit"
                      color="black"
                      onClick={this.props.handleSubmit}
                    >
                      Add Drive
                    </Button>
                  </Grid.Column>
                </Grid>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <div
                id="create-map-container"
                style={{ width: "100%", height: "400px", borderRadius: "7px" }}
              />
            </Grid.Column>
          </Grid>
          <Modal open={!(this.props.lat && this.props.lng)}>
            <Loader active size="massive" />
          </Modal>
        </Segment>
      </Container>
    );
  }
}

export default DriveCreation;
