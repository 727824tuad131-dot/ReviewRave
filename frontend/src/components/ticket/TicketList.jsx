import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchAgentTickets,
  assignTicket,
  resolveTicket,
} from "../store/slices/ticketSlice";

import EmptyState from "./EmptyState";

import {
  addNotification,
} from "../store/slices/notificationSlice";

const TicketList = () => {
  const dispatch = useDispatch();

  const {
    items,
    loading,
    error,
  } = useSelector((state) => state.tickets);

  const [
    isResolveModalOpen,
    setIsResolveModalOpen,
  ] = useState(false);

  const [
    selectedTicket,
    setSelectedTicket,
  ] = useState(null);

  const [
    resolutionNotes,
    setResolutionNotes,
  ] = useState("");

  useEffect(() => {
    dispatch(fetchAgentTickets());
  }, [dispatch]);

  const handleAssign = async (id) => {
    const result = await dispatch(assignTicket(id));

    if (result.meta.requestStatus === "fulfilled") {
      dispatch(fetchAgentTickets());

      dispatch(
        addNotification({
          message: "Ticket assigned successfully",
          type: "success",
        })
      );
    }
  };

  const openResolveModal = (ticket) => {
    setSelectedTicket(ticket);
    setResolutionNotes("");
    setIsResolveModalOpen(true);
  };

  const handleResolve = async (e) => {
    e.preventDefault();

    if (!resolutionNotes.trim()) {
      dispatch(
        addNotification({
          message: "Resolution notes are required",
          type: "warning",
        })
      );

      return;
    }

    const result = await dispatch(
      resolveTicket({
        id: selectedTicket.id,
        data: {
          resolutionNotes: resolutionNotes.trim(),
        },
      })
    );

    if (result.meta.requestStatus === "fulfilled") {
      setIsResolveModalOpen(false);
      setSelectedTicket(null);
      setResolutionNotes("");

      dispatch(fetchAgentTickets());

      dispatch(
        addNotification({
          message: "Ticket resolved successfully",
          type: "success",
        })
      );
    }
  };

  return (
    <section className="ticket-page">

      {/* Page Header */}
      <div className="ticket-page-header">
        <div>
          <span className="page-eyebrow">
            SUPPORT MANAGEMENT
          </span>

          <h1>Resolution Center</h1>

          <p>
            Manage support tickets and resolve customer issues.
          </p>
        </div>

        <div className="ticket-header-icon">
          🎫
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="ticket-loading">
          <div className="loading-spinner"></div>
          <span>Loading tickets...</span>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="error-message ticket-error">
          {error}
        </div>
      )}

      {/* Tickets */}
      {!loading && items.length === 0 ? (
        <EmptyState message="No tickets found." />
      ) : (
        <div className="ticket-list">

          {items.map((ticket) => {
            const status =
              ticket.ticketStatus ||
              ticket.status;

            const isOpen =
              status === "OPEN";

            const isActive =
              status !== "RESOLVED" &&
              status !== "CLOSED";

            return (
              <div
                className="ticket-card"
                key={ticket.id}
              >

                {/* Ticket Top */}
                <div className="ticket-card-top">

                  <div className="ticket-id-wrapper">

                    <div className="ticket-icon">
                      #
                    </div>

                    <div>
                      <span className="ticket-label">
                        SUPPORT TICKET
                      </span>

                      <h3>
                        Ticket #{ticket.id}
                      </h3>
                    </div>

                  </div>

                  <span
                    className={`status-badge status-${status?.toLowerCase()}`}
                  >
                    <span className="status-dot"></span>
                    {status}
                  </span>

                </div>

                {/* Product */}
                <div className="ticket-product">
                  <span className="ticket-product-icon">
                    📦
                  </span>

                  <div>
                    <span>Product</span>

                    <strong>
                      {ticket.insight?.product?.name ||
                        ticket.productName ||
                        "Product"}
                    </strong>
                  </div>
                </div>

                {/* Details */}
                <div className="ticket-details">

                  <div className="ticket-detail-item">
                    <span className="detail-label">
                      Priority
                    </span>

                    <span
                      className={`priority-badge priority-${(
                        ticket.priority || "NORMAL"
                      ).toLowerCase()}`}
                    >
                      {ticket.priority || "NORMAL"}
                    </span>
                  </div>

                  <div className="ticket-summary">
                    <span className="detail-label">
                      Summary
                    </span>

                    <p>
                      {ticket.summary ||
                        ticket.description ||
                        "No description"}
                    </p>
                  </div>

                </div>

                {/* Actions */}
                <div className="ticket-actions">

                  {isOpen && (
                    <button
                      className="ticket-assign-btn"
                      onClick={() =>
                        handleAssign(ticket.id)
                      }
                    >
                      <span>✓</span>
                      Assign
                    </button>
                  )}

                  {isActive && (
                    <button
                      className="primary-btn ticket-resolve-btn"
                      onClick={() =>
                        openResolveModal(ticket)
                      }
                    >
                      Resolve
                      <span>→</span>
                    </button>
                  )}

                </div>

              </div>
            );
          })}

        </div>
      )}

      {/* Resolve Modal */}
      {isResolveModalOpen && (
        <div className="modal-overlay">

          <div className="modal ticket-resolve-modal">

            <div className="resolve-modal-header">

              <div>
                <span className="page-eyebrow">
                  TICKET RESOLUTION
                </span>

                <h2>
                  Resolve Ticket #{selectedTicket?.id}
                </h2>
              </div>

              <button
                type="button"
                className="close-btn"
                onClick={() =>
                  setIsResolveModalOpen(false)
                }
              >
                ×
              </button>

            </div>

            <div className="resolve-modal-info">
              <span>🎫</span>

              <p>
                Add resolution notes describing how this
                customer issue was handled.
              </p>
            </div>

            <form onSubmit={handleResolve}>

              <div className="form-group">

                <label htmlFor="resolution-notes">
                  Resolution Notes
                </label>

                <textarea
                  id="resolution-notes"
                  value={resolutionNotes}
                  onChange={(e) =>
                    setResolutionNotes(e.target.value)
                  }
                  rows="6"
                  placeholder="Enter resolution notes..."
                  required
                />

              </div>

              <div className="resolve-modal-actions">

                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() =>
                    setIsResolveModalOpen(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-btn"
                >
                  Resolve Ticket
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </section>
  );
};

export default TicketList;