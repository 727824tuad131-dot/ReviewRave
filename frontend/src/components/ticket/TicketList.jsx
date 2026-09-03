import React, {
  useEffect,
  useState
} from "react";

import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  fetchAgentTickets,
  assignTicket,
  resolveTicket
} from "../store/slices/ticketSlice";

import EmptyState from "./EmptyState";

import {
  addNotification
} from "../store/slices/notificationSlice";

const TicketList = () => {
  const dispatch = useDispatch();

  const {
    items,
    loading,
    error
  } = useSelector(
    (state) => state.tickets
  );

  const [
    isResolveModalOpen,
    setIsResolveModalOpen
  ] = useState(false);

  const [
    selectedTicket,
    setSelectedTicket
  ] = useState(null);

  const [
    resolutionNotes,
    setResolutionNotes
  ] = useState("");

  useEffect(() => {
    dispatch(fetchAgentTickets());
  }, [dispatch]);

  const handleAssign = async (id) => {
    const result = await dispatch(
      assignTicket(id)
    );

    if (
      result.meta.requestStatus === "fulfilled"
    ) {
      dispatch(fetchAgentTickets());

      dispatch(
        addNotification({
          message:
            "Ticket assigned successfully",
          type: "success"
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
          message:
            "Resolution notes are required",
          type: "warning"
        })
      );

      return;
    }

    const result = await dispatch(
      resolveTicket({
        id: selectedTicket.id,
        data: {
          resolutionNotes:
            resolutionNotes.trim()
        }
      })
    );

    if (
      result.meta.requestStatus === "fulfilled"
    ) {
      setIsResolveModalOpen(false);
      setSelectedTicket(null);
      setResolutionNotes("");

      dispatch(fetchAgentTickets());

      dispatch(
        addNotification({
          message:
            "Ticket resolved successfully",
          type: "success"
        })
      );
    }
  };

  return (
    <section className="page-container">

      <div className="page-header">

        <div>
          <h1>
            Resolution Center
          </h1>

          <p>
            Manage support tickets
          </p>
        </div>

      </div>

      {loading && (
        <div className="loading">
          Loading tickets...
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {!loading && items.length === 0 ? (

        <EmptyState
          message="No tickets found."
        />

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

                <div className="ticket-header">

                  <div>
                    <h3>
                      Ticket #{ticket.id}
                    </h3>

                    <p>
                      {ticket.insight?.product
                        ?.name ||
                        ticket.productName ||
                        "Product"}
                    </p>
                  </div>

                  <span className="status-badge">
                    {status}
                  </span>

                </div>

                <div className="ticket-details">

                  <p>
                    <strong>
                      Priority:
                    </strong>{" "}
                    {ticket.priority || "NORMAL"}
                  </p>

                  <p>
                    <strong>
                      Summary:
                    </strong>{" "}
                    {ticket.summary ||
                      ticket.description ||
                      "No description"}
                  </p>

                </div>

                <div className="ticket-actions">

                  {isOpen && (
                    <button
                      onClick={() =>
                        handleAssign(
                          ticket.id
                        )
                      }
                    >
                      Assign
                    </button>
                  )}

                  {isActive && (
                    <button
                      className="primary-btn"
                      onClick={() =>
                        openResolveModal(
                          ticket
                        )
                      }
                    >
                      Resolve
                    </button>
                  )}

                </div>

              </div>
            );
          })}

        </div>

      )}

      {isResolveModalOpen && (
        <div className="modal-overlay">

          <div className="modal">

            <button
              type="button"
              className="close-btn"
              onClick={() =>
                setIsResolveModalOpen(false)
              }
            >
              ×
            </button>

            <h2>
              Resolve Ticket #
              {selectedTicket?.id}
            </h2>

            <form onSubmit={handleResolve}>

              <div className="form-group">

                <label>
                  Resolution Notes
                </label>

                <textarea
                  value={resolutionNotes}
                  onChange={(e) =>
                    setResolutionNotes(
                      e.target.value
                    )
                  }
                  rows="6"
                  placeholder="Enter resolution notes..."
                  required
                />

              </div>

              <button
                type="submit"
                className="primary-btn"
              >
                Resolve Ticket
              </button>

            </form>

          </div>

        </div>
      )}

    </section>
  );
};

export default TicketList;