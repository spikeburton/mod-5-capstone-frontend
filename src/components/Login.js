import React, { Component } from "react";
import { Form, Button, Segment, Message } from "semantic-ui-react";

class Login extends Component {
  state = {
    username: "",
    password: ""
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = () => {
    console.log(this.state)
  }

  render() {
    return (
      <Segment id="login-container">
        <Message attached header="Welcome" content="Please Log In" />
        <Form id="login-form" className="attached fluid segment" onSubmit={this.handleSubmit}>
          <Form.Input
            fluid
            label="Username"
            placeholder="Username"
            type="text"
            name="username"
            onChange={this.handleChange}
          />
          <Form.Input
            fluid
            label="Password"
            placeholder="Password"
            type="password"
            name="password"
            onChange={this.handleChange}
          />
          <Button type="submit">Login</Button>
        </Form>
      </Segment>
    );
  }
}

export default Login;
