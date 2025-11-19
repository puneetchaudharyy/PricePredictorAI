import React from "react";
import "./HowToUse.css";

const HowToUse = () => {
  return (
    <section id="how-to-use" className="how-to-use-section container">
      <h2 className="section-title">How to Use PricePredictorAI</h2>
      <div className="steps">
        {/* <div className="step">
          <h3 className="step-title">1. Sign Up / Log In</h3>
          <p className="step-description">Create an account or log in using your Google credentials.</p>
        </div> */}
        <div className="step">
          <h3 className="step-title">1. Input Property Details</h3>
          <p className="step-description">
            Begin by entering all the important information about the property
            you want to analyze. Use the form to specify{" "}
            <strong>location</strong> (address or neighborhood),{" "}
            <strong>total area</strong> (square footage),{" "}
            <strong>number of bedrooms and bathrooms</strong>,{" "}
            <strong>property age</strong>, and highlight any unique features
            (such as a finished basement, garage, or recent renovations). Adding
            accurate details will improve your prediction results. The{" "}
            <strong>ONLY</strong> required fields are the{" "}
            <strong>
              area, location, and number of bedrooms and bathrooms
            </strong>
            . All other fields are optional but recommended for better accuracy.
          </p>
        </div>
        <div className="step">
          <h3 className="step-title">2. Get Price Prediction</h3>
          <p className="step-description">
            Once your property details are filled out, click the{" "}
            <strong>“Predict Price”</strong> button. The system uses advanced AI
            models—trained on market data—to instantly estimate the expected
            market price for your property. Review the prediction, which will
            appear along with a breakdown of how each detail may have influenced
            the result, for greater insight.
          </p>
        </div>
        {/* <div className="step">
          <h3 className="step-title">3. Review and Save</h3>
          <p className="step-description">Review the predicted price and save the results for future reference or comparison.</p>
        </div> */}
      </div>
    </section>
  );
};

export default HowToUse;
