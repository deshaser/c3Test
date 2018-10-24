import React from 'react';
import { Link } from 'react-router-dom'

const Layout = ({ children }) => (
  <div>
    <nav>
      <Link to='/'> Home </Link>|
      <Link to='/new'> New User </Link>
    </nav>
    { children }
  </div>
);

export default Layout;