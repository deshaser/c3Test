import React from 'react';
import { Link } from 'react-router-dom'

const Layout = ({ children }) => (
  <div>
    <nav>
      <Link to='/'> Home </Link>|
    </nav>
    { children }
  </div>
);

export default Layout;