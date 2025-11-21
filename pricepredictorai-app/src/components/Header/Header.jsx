import "./Header.css";
import React from "react";

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

const Header = () => {
  const scrollToMainBody = () => {
    const section = document.getElementById("main-body");
    if (section) {
      smoothScrollTo(section, 1500); // 1500ms = 1.5 seconds
    }
  };

  return (
    <header className="header">
      <h1 className="header-title">
        WANT TO BUY A HOUSE? BUT DON'T KNOW WHERE, HOW AND IF IT EVEN FITS YOUR
        BUDGET?
        <br />
        <br />
        Use PricePredictorAI to weigh out your options!
      </h1>
      <button onClick={scrollToMainBody} className="get-estimate-button">
        Get your estimate!
      </button>
      <h3 className="how-to-text">
        First time using PricePredictor? Click here 👇🏻
      </h3>
      <button
        onClick={() =>
          smoothScrollTo(document.getElementById("how-to-use"), 3500)
        }
        className="how-to-button"
      >
        How to use?
      </button>
    </header>
  );
};

export default Header;
