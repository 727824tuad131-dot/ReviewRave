import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTicket } from "../../store/slices/ticketSlice"; // Adjust path as needed
import "./TicketForm.css";

const TicketForm = ({ productId, onSuccess }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(
    (state) => state.tickets || state.ticket || {}
  );

  const [formData, setFormData] = useState({
    title: "",
    category: "ISSUE",
    priority: "MEDIUM",
    description: "",
    contactEmail: "",
  });

  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!formData.title.trim() || !formData.description.trim()) {
      setFormError("Please fill out both the summary and description fields.");
      return;
    }

    const ticketPayload = {
      ...formData,
      productId: productId || null,
      status: "OPEN",
      createdAt: new Date().toISOString(),
    };

    try {
      await dispatch(createTicket(ticketPayload)).unwrap();

      // Reset form
      setFormData({
        title: "",
        category: "ISSUE",
        priority: "MEDIUM",
        description: "",
        contactEmail: "",
      });

      if (onSuccess) onSuccess();
    } catch (err) {
      setFormError(err.message || "Failed to submit ticket. Please try again.");
    }
  };

  return (
    <div className="ticket-form-container">
      <div className="ticket-form-header">
        <h3>Submit a Support Ticket</h3>
        <p>Describe your issue or request and our team will get back to you.</p>
      </div>

      {(formError || error) && (
        <div className="error-message">{formError || error}</div>
      )}

      <form onSubmit={handleSubmit} className="ticket-form">
        {/* Ticket Summary */}
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Issue Summary *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            placeholder="Brief description of the problem"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Category & Priority Grid */}
        <div className="form-row">
          <div className="form-group half-width">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              id="category"
              name="category"
              className="form-select"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="ISSUE">Technical Issue</option>
              <option value="BUG">Bug Report</option>
              <option value="FEATURE">Feature Request</option>
              <option value="BILLING">Billing / Account</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div className="form-group half-width">
            <label htmlFor="priority" className="form-label">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              className="form-select"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>
          </div>
        </div>

        {/* Contact Email */}
        <div className="form-group">
          <label htmlFor="contactEmail" className="form-label">
            Contact Email
          </label>
          <input
            type="email"
            id="contactEmail"
            name="contactEmail"
            className="form-control"
            placeholder="your.email@example.com"
            value={formData.contactEmail}
            onChange={handleChange}
          />
        </div>

        {/* Full Description */}
        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Detailed Description *
          </label>
          <textarea
            id="description"
            name="description"
            rows="5"
            className="form-control"
            placeholder="Provide step-by-step details or error messages..."
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="submit-ticket-btn"
            disabled={loading}
          >
            {loading ? "Submitting Ticket..." : "Submit Ticket"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TicketForm;