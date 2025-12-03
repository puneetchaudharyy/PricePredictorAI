import React, { useState } from "react";
import axios from "axios";
import "./MainBody.css";  

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";
console.log("API_BASE:", API_BASE);

const YesNoInput = ({ label, name, value, onChange, required }) => {
  return (
    <div className="form-group">
      <label className="form-label">
        {label} {required && "*"}
      </label>
      <div className="radio-group">
        <label className="radio-label">
          <input
            type="radio"
            name={name}
            value="yes"
            checked={value === "yes"}
            onChange={onChange}
            required={required}
          />
          Yes
        </label>
        <label className="radio-label">
          <input
            type="radio"
            name={name}
            value="no"
            checked={value === "no"}
            onChange={onChange}
            required={required}
          />
          No
        </label>
      </div>
    </div>
  );
};

const MainBody = () => {
  const [formData, setFormData] = useState({
    area: "",
    unit: "sq m",
    bedrooms: "",
    bathrooms: "",
    stories: "",
    onMainRoad: "",
    hasGuestroom: "",
    hasBasement: "",
    hasHotWaterHeating: "",
    hasAirConditioning: "",
    hasPrefareArea: "",
    hasParkingSpace: "",
    furnished: "",
  });

  // Add these three state variables for handling API response
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update handleSubmit to use axios
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous results
    setLoading(true);
    setError(null);
    setResult(null);

    // TEMPORARY: Mock response for testing without backend
    // try {
    //   console.log("Form Data:", formData);

    //   // Simulate API delay
    //   await new Promise((resolve) => setTimeout(resolve, 1000));

    //   // Mock successful response
    //   const mockResponse = {
    //     success: true,
    //     message: "Property data received (MOCK)",
    //     property_id: 123,
    //     predicted_price: 450000,
    //   };

    //   console.log("Mock Success:", mockResponse);
    //   setResult(mockResponse);
    // } catch (err) {
    //   console.error("Error:", err);
    //   setError("An error occurred");
    // } finally {
    //   setLoading(false);
    // }

    try {
      // Send data to Django backend
      const response = await axios.post(
        `${API_BASE}/api/predict/`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Success:", response.data);
      setResult(response.data); // Store the result
    } catch (err) {
      console.error("Error:", err);

      // Handle different error types
      if (err.response) {
        // Server responded with error
        setError(
          err.response.data.errors ||
            err.response.data.message ||
            "Server error occurred"
        );
      } else if (err.request) {
        // Request made but no response
        setError("No response from server. Please check if Django is running.");
      } else {
        // Something else went wrong
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="main-body" className="main-body">
      <div className="container">
        <h1 className="main-title">Estimate Price</h1>

        <form className="estimate-form" onSubmit={handleSubmit}>
          {/* Area Input */}
          <div className="form-group">
            <label htmlFor="area" className="form-label">
              How big of a house are you looking for? *
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
                min="1"
                required
              />
              <div className="unit-display">
                <span className="unit-text">sq ft</span>
                <input type="hidden" name="unit" value="sq ft" />
              </div>
            </div>
          </div>

          {/* Number of bedrooms */}
          <div className="form-group">
            <label htmlFor="bedrooms" className="form-label">
              Number of bedrooms *
            </label>
            <input
              type="number"
              id="bedrooms"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleInputChange}
              placeholder="Number of bedrooms"
              className="form-input"
              min="1"
              required
            />
          </div>

          {/* Number of bathrooms */}
          <div className="form-group">
            <label htmlFor="bathrooms" className="form-label">
              Number of bathrooms *
            </label>
            <input
              type="number"
              id="bathrooms"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleInputChange}
              placeholder="Number of bathrooms"
              className="form-input"
              min="1"
              required
            />
          </div>

          {/* Number of stories*/}
          <div className="form-group">
            <label htmlFor="stories" className="form-label">
              Number of stories
            </label>
            <input
              type="number"
              id="stories"
              name="stories"
              value={formData.stories}
              onChange={handleInputChange}
              placeholder="Number of stories"
              className="form-input"
              min="1"
            />
          </div>

          {/* Yes/No Questions */}
          <YesNoInput
            label="Is it on the main road?"
            name="onMainRoad"
            value={formData.onMainRoad}
            onChange={handleInputChange}
          />

          <YesNoInput
            label="Does it have a guest room?"
            name="hasGuestroom"
            value={formData.hasGuestroom}
            onChange={handleInputChange}
          />

          <YesNoInput
            label="Does it have a basement?"
            name="hasBasement"
            value={formData.hasBasement}
            onChange={handleInputChange}
          />

          <YesNoInput
            label="Does it have hot water heating?"
            name="hasHotWaterHeating"
            value={formData.hasHotWaterHeating}
            onChange={handleInputChange}
          />

          <YesNoInput
            label="Does it have air conditioning?"
            name="hasAirConditioning"
            value={formData.hasAirConditioning}
            onChange={handleInputChange}
          />

          <YesNoInput
            label="Does it have a perfare area?"
            name="hasPrefareArea"
            value={formData.hasPrefareArea}
            onChange={handleInputChange}
          />

          <YesNoInput
            label="Does it have a parking space?"
            name="hasParkingSpace"
            value={formData.hasParkingSpace}
            onChange={handleInputChange}
          />

          {/* Furnished toggle */}
          <div className="form-group">
            <label className="form-label">Is the property furnished?</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="furnished"
                  value="unfurnished"
                  checked={formData.furnished === "unfurnished"}
                  onChange={handleInputChange}
                />
                Unfurnished
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="furnished"
                  value="semi-furnished"
                  checked={formData.furnished === "semi-furnished"}
                  onChange={handleInputChange}
                />
                Semi-furnished
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="furnished"
                  value="furnished"
                  checked={formData.furnished === "furnished"}
                  onChange={handleInputChange}
                />
                Furnished
              </label>
            </div>
          </div>

          {/* Submit Button with loading state */}
          <button type="submit" className="estimate-button" disabled={loading}>
            {loading ? "Loading..." : "Get Estimate"}
          </button>
        </form>

        {/* Display Success Result */}
        {result && (
          <div className="result-success">
            <h2>✅ Prediction Result</h2>
            {result.predicted_price && (
              <div className="price-display">
                <h3>
                  Estimated Price: ${result.predicted_price.toLocaleString()}
                </h3>
              </div>
            )}
          </div>
        )}

        {/* Display Error */}
        {error && (
          <div className="result-error">
            <h2>Error</h2>
            <p>{typeof error === "string" ? error : JSON.stringify(error)}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MainBody;
