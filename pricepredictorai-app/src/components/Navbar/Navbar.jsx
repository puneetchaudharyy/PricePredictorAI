import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import "./Navbar.css";

const smoothScrollTo = (target, duration = 1500) => {
  const start = window.scrollY;
  const end = target.getBoundingClientRect().top + window.scrollY;
  const change = end - start;
  const startTime = performance.now();

  function animateScroll(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, start + change * easeInOutQuad(progress));
    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  }

  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  requestAnimationFrame(animateScroll);
};

const Navbar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const scrollToMainBody = () => {
    const section = document.getElementById("main-body");
    if (section) {
      smoothScrollTo(section, 1500); // 1500ms = 1.5 seconds
    }
  };

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
            <button
              onClick={() =>
                smoothScrollTo(document.getElementById("about"), 2500)
              }
            >
              About
            </button>
          </li>
          <li>
            <button
              onClick={() =>
                smoothScrollTo(document.getElementById("how-to-use"), 3500)
              }
            >
              How to use?
            </button>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
        <ul className="auth-links">
          {/* <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                login();
              }}
            >
              Sign In
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
          </li> */}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
