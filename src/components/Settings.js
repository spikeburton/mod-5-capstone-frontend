import React, { Component } from 'react'
import { API } from '../data';

class Settings extends Component {
  state = {
    first_name: "",
    last_name: "",
    email: ""
  }

  componentDidMount() {
    fetch(`${API}/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json"
      }
    })
    .then(response => response.json())
    .then(({user}) => {
      this.setState({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
      })
    })
  }

  render() {
    return (
      <div></div>
    )
  }
}

export default Settings
