import React from 'react';
import { Link } from 'react-router-dom';
import '../style/navbar.css'; // Import CSS for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/simulation" className="navbar-link">Simulation</Link>
        </li>
        <li className="navbar-item">
          <Link to="/credits" className="navbar-link">Credits</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
