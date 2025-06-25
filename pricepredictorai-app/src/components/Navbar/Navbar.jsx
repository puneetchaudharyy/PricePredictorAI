import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <div>
      <nav className="navbar">
        <h1>PricePredictorAI</h1>
        <ul className="nav-links">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">How to use?</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
        <ul className="auth-links">
          <li>
            <a href="#">Login</a>
          </li>
          <li>
            <a href="#">Sign Up</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar
