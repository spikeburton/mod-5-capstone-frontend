import React, { Component } from 'react'
import Navbar from '../components/Navbar';
import DriveCreation from '../components/DriveCreation';

class DriveCreationContainer extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <DriveCreation />
      </div>
    )
  }
}

export default DriveCreationContainer
