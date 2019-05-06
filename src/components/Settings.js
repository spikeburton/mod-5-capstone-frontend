import React, { Component, Fragment } from "react";
import { API } from "../data";
import {
  Segment,
  Grid,
  Form,
  Button,
  Message,
  Container,
  Image,
  Loader,
  Modal,
  Icon
} from "semantic-ui-react";
import Navbar from "./Navbar";

class Settings extends Component {
  state = {
    first_name: "",
    last_name: "",
    email: "",
    avatar_url: "",
    loading: false,
    delete: false
  };

  componentDidMount() {
    fetch(`${API}/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json"
      }
    })
      .then(response => response.json())
      .then(({ user }) => {
        this.setState({
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          avatar_url: user.avatar_url
        });
      });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    fetch(`${API}/settings`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(response => response.json())
      .then(json => {
        if (json.errors) this.setState({ errors: json.errors });
        else {
          if (this.state.avatar_url) localStorage.setItem("avatar", this.state.avatar_url);
          this.props.history.push("/");
        }
      });
  };

  handleDelete = () => {
    const confirmation = window.confirm(
      "Are you sure? This action cannot be reversed!"
    );
    if (confirmation) {
      fetch(`${API}/purge`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }).then(response => {
        if (response.ok) {
          window.alert(
            "We're sad to see you go! Your account has been deleted."
          );
          localStorage.clear();
          this.props.history.push("/signup");
        }
      });
    }
  };

  handleUpload = () => {
    this.setState({ loading: true, avatar_url: "" });
    const file = this.avatarInput.files[0];

    fetch(`${API}/signed_s3`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(response => response.json())
      .then(data => {
        const url = data.url;
        const formData = new FormData();

        Object.keys(data.form_data).forEach(key =>
          formData.append(key, data.form_data[key])
        );
        formData.append("file", file);

        fetch(url, {
          method: "POST",
          body: formData
        })
          .then(response => response.text())
          .then(str => {
            const imageURL = new DOMParser().parseFromString(
              str,
              "application/xml"
            );
            this.setState({
              loading: false,
              avatar_url: imageURL.getElementsByTagName("Location")[0]
                .textContent
            });
          });
      });
  };

  render() {
    return (
      <Fragment>
        <Navbar active="settings" />
        <Segment attached id="settings-container">
          <Grid columns="2" verticalAlign="middle" stackable>
            <Grid.Column>
              <Container>
                <Form
                  // className="attached fluid segment"
                  onSubmit={this.handleSubmit}
                >
                  <Form.Input
                    fluid
                    type="text"
                    label="First Name"
                    placeholder="First Name"
                    name="first_name"
                    value={this.state.first_name}
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    fluid
                    type="text"
                    label="Last Name"
                    placeholder="Last Name"
                    name="last_name"
                    value={this.state.last_name}
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    fluid
                    type="email"
                    label="Email"
                    placeholder="Email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                  <Grid textAlign="center" verticalAlign="bottom">
                    <Grid.Column>
                      <Button color="black" type="submit">
                        Update
                      </Button>
                    </Grid.Column>
                  </Grid>
                </Form>
              </Container>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Container>
                <input
                  type="file"
                  hidden
                  ref={el => (this.avatarInput = el)}
                  onChange={this.handleUpload}
                />
                {this.state.loading ? (
                  // <Message header={this.avatarInput.files[0].name} />
                  <Segment placeholder>
                    <Loader active size="small" />
                  </Segment>
                ) : null}
                {this.state.avatar_url ? (
                  <Segment placeholder>
                    <Image
                      src={this.state.avatar_url}
                      // avatar
                      // circular
                      size="small"
                      bordered
                      centered
                    />
                  </Segment>
                ) : (
                  <Segment placeholder />
                )}
                <br />
                <Button
                  fluid
                  content={this.state.avatar_url ? "Change Photo" : "Add Photo"}
                  icon="image"
                  color="black"
                  onClick={() => this.avatarInput.click()}
                />
                <br />
                <Button
                  fluid
                  negative
                  onClick={() => this.setState({ delete: true })}
                >
                  Delete Account
                </Button>
              </Container>
            </Grid.Column>
          </Grid>
          {this.state.errors ? (
            <Message
              // attached
              error
              header="There were errors with your submission:"
              list={this.state.errors}
            />
          ) : null}
        </Segment>
        <Modal open={this.state.delete}>
          <Modal.Header>
            <Icon name="warning sign" />
            WARNING
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              This action is permanent and cannot be reversed. Are you sure you
              wish to continue?
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={this.handleDelete}>
              <Icon name="check" />
              Confirm
            </Button>
            <Button onClick={() => this.setState({ delete: false })}>
              <Icon name="cancel" />
              Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </Fragment>
    );
  }
}

export default Settings;
