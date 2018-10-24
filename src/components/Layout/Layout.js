import React from 'react';
import { Link } from 'react-router-dom'

import './Layout.css';

const Layout = ({ children }) => (
  <div className="layout">
    <nav className="navigation">
      <Link className="navigation__link" to='/'> Home </Link>|
      <Link className="navigation__link" to='/new'> New User </Link>
    </nav>
    { children }
  </div>
);

export default Layout;