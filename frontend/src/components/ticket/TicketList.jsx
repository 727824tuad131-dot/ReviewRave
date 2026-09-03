import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTickets,
  fetchOpenTickets,
  assignTicket,
  resolveTicket,
} from "../../store/slices/ticketSlice";
import EmptyState from "../common/EmptyState";

const TicketList = () => {
  const dispatch = useDispatch();

  const {
    items = [],
    openTickets = [],
    loading,
    error,
  } = useSelector(
    (state) => state.tickets || state.ticket || {}
  );

  const [showResolveModal, setShowResolveModal] =
    useState(false);

  const [selectedTicket, setSelectedTicket] =
    useState(null);

  const [resolutionNote, setResolutionNote] =
    useState("");

  const role = localStorage.getItem("role");

  useEffect(() => {
    dispatch(fetchTickets());

    if (
      role === "RESOLUTION_AGENT" ||
      role === "PLATFORM_ADMIN"
    ) {
      dispatch(fetchOpenTickets());
    }
  }, [dispatch, role]);

  const handleAssign = async (ticket) => {
    try {
      await dispatch(
        assignTicket(ticket.id)
      ).unwrap();

      dispatch(fetchTickets());

      if (
        role === "RESOLUTION_AGENT" ||
        role === "PLATFORM_ADMIN"
      ) {
        dispatch(fetchOpenTickets());
      }
    } catch (err) {
      console.error(
        "Ticket assignment failed:",
        err
      );
    }
  };

  const handleOpenResolveModal = (ticket) => {
    setSelectedTicket(ticket);
    setResolutionNote("");
    setShowResolveModal(true);
  };

  const handleCloseResolveModal = () => {
    setShowResolveModal(false);
    setSelectedTicket(null);
    setResolutionNote("");
  };

  const handleResolve = async (e) => {
    e.preventDefault();

    if (!selectedTicket) return;

    try {
      await dispatch(
        resolveTicket({
          id: selectedTicket.id,
          resolutionNote,
        })
      ).unwrap();

      dispatch(fetchTickets());

      if (
        role === "RESOLUTION_AGENT" ||
        role === "PLATFORM_ADMIN"
      ) {
        dispatch(fetchOpenTickets());
      }

      handleCloseResolveModal();
    } catch (err) {
      console.error(
        "Ticket resolution failed:",
        err
      );
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "CRITICAL":
        return "critical";
      case "HIGH":
        return "high";
      case "MEDIUM":
        return "medium";
      case "LOW":
        return "low";
      default:
        return "medium";
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "OPEN":
        return "open";
      case "INVESTIGATING":
        return "investigating";
      case "RESOLVED":
        return "resolved";
      default:
        return "open";
    }
  };

  const displayTickets =
    role === "RESOLUTION_AGENT"
      ? items
      : role === "PLATFORM_ADMIN"
      ? items
      : items;

  return (
    <div className="page-container ticket-page">
      {/* HEADER */}
      <div className="page-header">
        <div>
          <span className="page-eyebrow">
            RESOLUTION WORKFLOW
          </span>

          <h1>Tickets</h1>

          <p>
            Review, assign and resolve customer issues
            generated from sentiment insights.
          </p>
        </div>

        <div className="ticket-header-icon">
          ◇
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <div
          className="inline-error"
          role="alert"
        >
          <span className="inline-error-icon">
            !
          </span>

          <span>{error}</span>
        </div>
      )}

      {/* OPEN TICKET SUMMARY */}
      {(role === "RESOLUTION_AGENT" ||
        role === "PLATFORM_ADMIN") && (
        <div className="ticket-summary-card">
          <div className="ticket-summary-icon">
            ◇
          </div>

          <div>
            <span className="summary-label">
              OPEN TICKETS
            </span>

            <strong>
              {openTickets.length}
            </strong>

            <p>
              Tickets currently requiring attention
            </p>
          </div>
        </div>
      )}

      {/* TICKET LIST */}
      {loading && displayTickets.length === 0 ? (
        <div className="products-loading">
          <div className="loading-spinner"></div>

          <p>
            Loading tickets...
          </p>
        </div>
      ) : displayTickets.length === 0 ? (
        <EmptyState message="No tickets found." />
      ) : (
        <div className="ticket-list">
          {displayTickets.map((ticket) => (
            <article
              className="ticket-card"
              key={ticket.id}
            >
              {/* TOP */}
              <div className="ticket-card-header">
                <div className="ticket-id">
                  <span className="ticket-icon">
                    ◇
                  </span>

                  <div>
                    <span className="ticket-label">
                      TICKET
                    </span>

                    <strong>
                      #{ticket.id}
                    </strong>
                  </div>
                </div>

                <div className="ticket-badges">
                  <span
                    className={`priority-badge ${getPriorityClass(
                      ticket.priority
                    )}`}
                  >
                    {ticket.priority}
                  </span>

                  <span
                    className={`status-badge ${getStatusClass(
                      ticket.ticketStatus
                    )}`}
                  >
                    {ticket.ticketStatus}
                  </span>
                </div>
              </div>

              {/* CONTENT */}
              <div className="ticket-card-content">
                <div className="ticket-main-info">
                  <h2>
                    {ticket.title ||
                      ticket.subject ||
                      "Customer Issue"}
                  </h2>

                  <p>
                    {ticket.description ||
                      ticket.reviewText ||
                      ticket.message ||
                      "No description available."}
                  </p>
                </div>

                <div className="ticket-meta-grid">
                  <div className="ticket-meta-item">
                    <span>Priority</span>
                    <strong>
                      {ticket.priority ||
                        "MEDIUM"}
                    </strong>
                  </div>

                  <div className="ticket-meta-item">
                    <span>Status</span>
                    <strong>
                      {ticket.ticketStatus ||
                        "OPEN"}
                    </strong>
                  </div>

                  <div className="ticket-meta-item">
                    <span>Assignee</span>
                    <strong>
                      {ticket.assigneeName ||
                        ticket.assigneeId ||
                        "Unassigned"}
                    </strong>
                  </div>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="ticket-card-actions">
                {ticket.ticketStatus === "OPEN" && (
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() =>
                      handleAssign(ticket)
                    }
                    disabled={loading}
                  >
                    Assign
                  </button>
                )}

                {ticket.ticketStatus !==
                  "RESOLVED" && (
                  <button
                    type="button"
                    className="primary-button"
                    onClick={() =>
                      handleOpenResolveModal(
                        ticket
                      )
                    }
                    disabled={loading}
                  >
                    Resolve
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      {/* RESOLVE MODAL */}
      {showResolveModal &&
        selectedTicket && (
          <div
            className="modal-overlay"
            role="presentation"
            onMouseDown={(e) => {
              if (
                e.target === e.currentTarget
              ) {
                handleCloseResolveModal();
              }
            }}
          >
            <div
              className="modal-card resolve-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="resolve-ticket-title"
            >
              <div className="modal-header">
                <div>
                  <span className="modal-eyebrow">
                    TICKET #{selectedTicket.id}
                  </span>

                  <h2 id="resolve-ticket-title">
                    Resolve Ticket
                  </h2>

                  <p>
                    Add a resolution note before
                    closing this ticket.
                  </p>
                </div>

                <button
                  type="button"
                  className="modal-close-button"
                  onClick={
                    handleCloseResolveModal
                  }
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <form
                className="modal-form"
                onSubmit={handleResolve}
              >
                <div className="form-group">
                  <label htmlFor="resolutionNote">
                    Resolution note
                  </label>

                  <textarea
                    id="resolutionNote"
                    name="resolutionNote"
                    value={resolutionNote}
                    onChange={(e) =>
                      setResolutionNote(
                        e.target.value
                      )
                    }
                    placeholder="Describe how the issue was resolved..."
                    rows={6}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="modal-actions">
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={
                      handleCloseResolveModal
                    }
                    disabled={loading}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="primary-button"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="button-spinner"></span>
                        <span>
                          Resolving...
                        </span>
                      </>
                    ) : (
                      <>
                        <span>
                          Resolve
                        </span>

                        <span className="button-arrow">
                          →
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
    </div>
  );
};

export default TicketList;