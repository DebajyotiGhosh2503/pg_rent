import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './nav.css';
import pic1 from '../Img/dg logo.webp';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div id="nav" className={isOpen ? 'open' : ''}>
      <div id="logo">
        <Link to='/'>
          <img src={pic1} alt='Logo' />
        </Link>
      </div>
      <div id="menu-toggle" onClick={toggleMenu}></div>
      <div id="modules">
        <Link to='/'>Home</Link>
        <Link to='/createtenants'>Create Tenant</Link>
        <Link to='/rentrecords'>Rent Details</Link>
      </div>
    </div>
  );
};

export default Nav;
