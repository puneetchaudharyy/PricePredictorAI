import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import "./Navbar.css";

const Navbar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const handleGoogleSuccess = async (tokenResponse) => {
    try {
      // Send token to Django backend
      const { data } = await axios.post(
        "http://localhost:8000/api/auth/google/",
        {
          access_token: tokenResponse.access_token,
        }
      );

      localStorage.setItem("token", data.key);
      setShowLoginModal(false);
      setShowSignupModal(false);

      // Redirect to dashboard or home
      window.location.href = "/";
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: () => console.log("Login Failed"),
  });

  const signup = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: () => console.log("Signup Failed"),
  });

  return (
    <div>
      <nav className="navbar">
        <h1>PricePredictorAI</h1>
        <ul className="nav-links">
          <li>
            <a href="">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
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
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                login();
              }}
            >
              Login
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                signup();
              }}
            >
              Sign Up
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
