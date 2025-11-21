import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ACTUAL SEND FUNCTION
  async function sendContactMessage(e) {
    e.preventDefault();
    setSending(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8000/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      // DEBUG STATEMENT
      console.log("Response:", res);

      if (!res.ok) {
        throw new Error("Could not send message. Try again later.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err.message);
      setSending(false);
    }
  }

  return (
    <section id="contact" className="contact-section container">
      <h2 className="section-title">Contact ME!</h2>
      {!submitted ? (
        <form
          className="contact-form"
          autoComplete="off"
          onSubmit={sendContactMessage}
        >
          <div className="input-row">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-row">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-row">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="send-btn" disabled={sending}>
            {sending ? "Sending..." : "Send Message"}
          </button>
          {error && <p style={{ color: "#e00", marginTop: "1em" }}>{error}</p>}
        </form>
      ) : (
        <div className="thank-you-message">
          <h3>Thank you!</h3>
          <p>Your message has been sent. We’ll get back to you soon.</p>
        </div>
      )}
    </section>
  );
};

export default Contact;
