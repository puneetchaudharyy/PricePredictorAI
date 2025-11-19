import React from "react";
import "./About.css";

const About = () => {
  return (
    <section className="about-wrapper">
      <section id="about" className="about-section container">
        <header>
          <h2>About PricePredictorAI</h2>
        </header>

        <p>
          PricePredictorAI is an innovative web platform leveraging advanced
          machine learning models to estimate house prices in based on market
          data and property characteristics. The system analyzes factors such as
          location, square footage, number of bedrooms and bathrooms, property
          age, and prevailing market trends to generate an estimated
          value—helping users make informed decisions on negotiations and
          financial planning.
        </p>

        <p>
          The mission is to make pricing insights accessible to all by
          transforming complex real-estate data into clear, actionable
          estimates. Whether you're a first-time homebuyer, an investor
          comparing multiple properties, or a homeowner exploring selling
          options, PricePredictorAI makes it easier to understand how a property
          might be priced in today’s market.
        </p>

        <section>
          <h3>How it works</h3>
          <ul className="feature-list">
            <li>
              Enter key property details including location, size, number of
              rooms, age, and other features.
            </li>
            <li>
              Our AI model processes these inputs, compares them with historical
              and current housing data, and generates a reliable price estimate.
            </li>
            <li>
              Results are displayed in a clean, user-friendly interface with
              clear explanations and supporting context.
            </li>
          </ul>
        </section>

        <section>
          <h3>Features</h3>
          <ul className="feature-list">
            <li>
              Price predictions powered by modern AI models tailored to the
              housing market data.
            </li>
            <li>
              Intuitive, mobile-friendly interface that lets you compare
              different scenarios by quickly adjusting property details.
            </li>
            <li>
              Engine continuously improves as more data and enhanced models
              become available.
            </li>
            <li>
              Transparent, easy-to-understand breakdown of which property
              features most influence the predicted price.
            </li>
          </ul>
        </section>

        <section>
          <h3>Who it’s for</h3>
          <ul className="feature-list">
            <li>
              Homebuyers who want a fast, data-driven sense of fair listing
              prices.
            </li>
            <li>
              Sellers seeking a baseline before consulting with real estate
              professionals or setting a listing price.
            </li>
            <li>
              Students, analysts, and enthusiasts interested in how AI is
              transforming real estate analytics.
            </li>
          </ul>
        </section>
      </section>
    </section>
  );
};

export default About;
