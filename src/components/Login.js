import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'

class Login extends Component {
  render() {
    return (
      // <div>Hello</div>
      <Form className="attached fluid segment">
        <Form.Input fluid label='Username' placeholder="Username" type="text" />
        <Form.Input fluid label='Password' placeholder="Password" type="text" />
        <Button>Submit</Button>
      </Form>
    )
  }
}

export default Login
