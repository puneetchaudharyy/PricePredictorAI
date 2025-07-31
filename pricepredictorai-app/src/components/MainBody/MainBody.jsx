import React, { useState } from "react";
import "./MainBody.css";

const MainBody = () => {
  const [formData, setFormData] = useState({
    area: "",
    unit: "sq m",
    location: "",
    bedrooms: "",
    bathrooms: "",
    propertyAge: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  return (
    <section id="main-body" className="main-body">
      <div className="container">
        <h1 className="main-title">Estimate Price</h1>

        <form className="estimate-form" onSubmit={handleSubmit}>
          {/* Area Input */}
          <div className="form-group">
            <label htmlFor="area" className="form-label">
              How big of a house are you looking for?
            </label>
            <div className="input-group">
              <input
                type="number"
                id="area"
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                placeholder="Enter area"
                className="form-input area-input"
                required
              />
              <select
                name="unit"
                value={formData.unit}
                onChange={handleInputChange}
                className="unit-select"
              >
                <option value="sq m">sq m</option>
                <option value="sq ft">sq ft</option>
              </select>
            </div>
          </div>

          {/* Location Input */}
          <div className="form-group">
            <label htmlFor="location" className="form-label">
              Where exactly are you looking for a house?
            </label>
            <p className="form-hint">
              (make it as precise as possible for most accurate results)
            </p>
            <textarea
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Enter specific location, address, or area"
              className="form-textarea"
              rows="3"
              required
            />
          </div>

          {/* Optional Properties Section */}
          <div className="optional-section">
            <h3 className="section-title">
              Other optional properties{" "}
              <span className="section-hint">(helps narrow down results)</span>
            </h3>

            {/* Bedrooms */}
            <div className="form-group">
              <label htmlFor="bedrooms" className="form-label">
                Number of bed rooms
              </label>
              <input
                type="number"
                id="bedrooms"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleInputChange}
                placeholder="Number of bedrooms"
                className="form-input"
                min="0"
              />
            </div>

            {/* Bathrooms */}
            <div className="form-group">
              <label htmlFor="bathrooms" className="form-label">
                Number of bathrooms
              </label>
              <input
                type="number"
                id="bathrooms"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleInputChange}
                placeholder="Number of bathrooms"
                className="form-input"
                min="0"
              />
            </div>

            {/* Property Age */}
            <div className="form-group">
              <label htmlFor="propertyAge" className="form-label">
                Age of the property
              </label>
              <input
                type="number"
                id="propertyAge"
                name="propertyAge"
                value={formData.propertyAge}
                onChange={handleInputChange}
                placeholder="Age of the property (in years)"
                className="form-input"
                min="0"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="estimate-button">
            Get Estimate
          </button>
        </form>
      </div>
    </section>
  );
};

export default MainBody;
