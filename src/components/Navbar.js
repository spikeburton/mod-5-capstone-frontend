import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react';

const Navbar = props => {
  return (
    <Menu inverted>
      <Link to="/" className="item">
        <div className="content">Home</div>
      </Link>
    </Menu>
  )
}

export default Navbar
