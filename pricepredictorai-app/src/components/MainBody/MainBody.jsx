import React, { useState } from "react";
import "./MainBody.css";

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

          {/* Furnished toggle: Furnished vs Semi-furnished */}
          <div className="form-group">
            <label className="form-label">Is the property furnished?</label>
            <div className="radio-group">
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
