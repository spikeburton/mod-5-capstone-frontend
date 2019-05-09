import React, { Component } from "react";
import {
  Container,
  Segment,
  Grid,
  Loader,
  Modal,
  Form,
  Button,
  Message
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
                  name="name"
                  label="Enter a name:"
                  type="text"
                  placeholder="Name..."
                  onChange={this.props.handleChange}
                  value={this.props.name}
                />
                <Form.TextArea
                  name="description"
                  label="Enter a short description:"
                  placeholder="Description..."
                  onChange={this.props.handleChange}
                  value={this.props.description}
                />
                <p>
                  <strong>Starting Location:</strong> {this.props.geolocationA}
                </p>
                <p>
                  <strong>Ending Location:</strong>{" "}
                  {this.props.geolocationB ? (
                    this.props.geolocationB
                  ) : (
                    <strong>NOT SET</strong>
                  )}
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
                style={{
                  width: "100%",
                  height: "400px",
                  borderRadius: "7px"
                }}
              />
            </Grid.Column>
          </Grid>
          <Modal open={!this.props.loaded}>
            <Loader active size="massive" />
          </Modal>
          {this.props.errors.length > 0 ? (
            <Message
              error
              header="Invalid Submission:"
              list={this.props.errors}
            />
          ) : null}
        </Segment>
      </Container>
    );
  }
}

export default DriveCreation;
