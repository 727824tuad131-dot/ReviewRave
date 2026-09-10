// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchTickets,
//   fetchOpenTickets,
//   assignTicket,
//   resolveTicket,
// } from "../../store/slices/ticketSlice";
// import EmptyState from "../common/EmptyState";

// const TicketList = () => {
//   const dispatch = useDispatch();

//   const {
//     items = [],
//     openTickets = [],
//     loading,
//     error,
//   } = useSelector(
//     (state) => state.tickets || state.ticket || {}
//   );

//   const [showResolveModal, setShowResolveModal] =
//     useState(false);

//   const [selectedTicket, setSelectedTicket] =
//     useState(null);

//   const [resolutionNote, setResolutionNote] =
//     useState("");

//   const role = localStorage.getItem("role");

//   useEffect(() => {
//     dispatch(fetchTickets());

//     if (
//       role === "RESOLUTION_AGENT" ||
//       role === "PLATFORM_ADMIN"
//     ) {
//       dispatch(fetchOpenTickets());
//     }
//   }, [dispatch, role]);

//   const handleAssign = async (ticket) => {
//     try {
//       await dispatch(
//         assignTicket(ticket.id)
//       ).unwrap();

//       dispatch(fetchTickets());

//       if (
//         role === "RESOLUTION_AGENT" ||
//         role === "PLATFORM_ADMIN"
//       ) {
//         dispatch(fetchOpenTickets());
//       }
//     } catch (err) {
//       console.error(
//         "Ticket assignment failed:",
//         err
//       );
//     }
//   };

//   const handleOpenResolveModal = (ticket) => {
//     setSelectedTicket(ticket);
//     setResolutionNote("");
//     setShowResolveModal(true);
//   };

//   const handleCloseResolveModal = () => {
//     setShowResolveModal(false);
//     setSelectedTicket(null);
//     setResolutionNote("");
//   };

//   const handleResolve = async (e) => {
//     e.preventDefault();

//     if (!selectedTicket) return;

//     try {
//       await dispatch(
//         resolveTicket({
//           id: selectedTicket.id,
//           resolutionNote,
//         })
//       ).unwrap();

//       dispatch(fetchTickets());

//       if (
//         role === "RESOLUTION_AGENT" ||
//         role === "PLATFORM_ADMIN"
//       ) {
//         dispatch(fetchOpenTickets());
//       }

//       handleCloseResolveModal();
//     } catch (err) {
//       console.error(
//         "Ticket resolution failed:",
//         err
//       );
//     }
//   };

//   const getPriorityClass = (priority) => {
//     switch (priority) {
//       case "CRITICAL":
//         return "critical";
//       case "HIGH":
//         return "high";
//       case "MEDIUM":
//         return "medium";
//       case "LOW":
//         return "low";
//       default:
//         return "medium";
//     }
//   };

//   const getStatusClass = (status) => {
//     switch (status) {
//       case "OPEN":
//         return "open";
//       case "INVESTIGATING":
//         return "investigating";
//       case "RESOLVED":
//         return "resolved";
//       default:
//         return "open";
//     }
//   };

//   const displayTickets =
//     role === "RESOLUTION_AGENT"
//       ? items
//       : role === "PLATFORM_ADMIN"
//       ? items
//       : items;

//   return (
//     <div className="page-container ticket-page">
//       {/* HEADER */}
//       <div className="page-header">
//         <div>
//           <span className="page-eyebrow">
//             RESOLUTION WORKFLOW
//           </span>

//           <h1>Tickets</h1>

//           <p>
//             Review, assign and resolve customer issues
//             generated from sentiment insights.
//           </p>
//         </div>

//         <div className="ticket-header-icon">
//           ◇
//         </div>
//       </div>

//       {/* ERROR */}
//       {error && (
//         <div
//           className="inline-error"
//           role="alert"
//         >
//           <span className="inline-error-icon">
//             !
//           </span>

//           <span>{error}</span>
//         </div>
//       )}

//       {/* OPEN TICKET SUMMARY */}
//       {(role === "RESOLUTION_AGENT" ||
//         role === "PLATFORM_ADMIN") && (
//         <div className="ticket-summary-card">
//           <div className="ticket-summary-icon">
//             ◇
//           </div>

//           <div>
//             <span className="summary-label">
//               OPEN TICKETS
//             </span>

//             <strong>
//               {openTickets.length}
//             </strong>

//             <p>
//               Tickets currently requiring attention
//             </p>
//           </div>
//         </div>
//       )}

//       {/* TICKET LIST */}
//       {loading && displayTickets.length === 0 ? (
//         <div className="products-loading">
//           <div className="loading-spinner"></div>

//           <p>
//             Loading tickets...
//           </p>
//         </div>
//       ) : displayTickets.length === 0 ? (
//         <EmptyState message="No tickets found." />
//       ) : (
//         <div className="ticket-list">
//           {displayTickets.map((ticket) => (
//             <article
//               className="ticket-card"
//               key={ticket.id}
//             >
//               {/* TOP */}
//               <div className="ticket-card-header">
//                 <div className="ticket-id">
//                   <span className="ticket-icon">
//                     ◇
//                   </span>

//                   <div>
//                     <span className="ticket-label">
//                       TICKET
//                     </span>

//                     <strong>
//                       #{ticket.id}
//                     </strong>
//                   </div>
//                 </div>

//                 <div className="ticket-badges">
//                   <span
//                     className={`priority-badge ${getPriorityClass(
//                       ticket.priority
//                     )}`}
//                   >
//                     {ticket.priority}
//                   </span>

//                   <span
//                     className={`status-badge ${getStatusClass(
//                       ticket.ticketStatus
//                     )}`}
//                   >
//                     {ticket.ticketStatus}
//                   </span>
//                 </div>
//               </div>

//               {/* CONTENT */}
//               <div className="ticket-card-content">
//                 <div className="ticket-main-info">
//                   <h2>
//                     {ticket.title ||
//                       ticket.subject ||
//                       "Customer Issue"}
//                   </h2>

//                   <p>
//                     {ticket.description ||
//                       ticket.reviewText ||
//                       ticket.message ||
//                       "No description available."}
//                   </p>
//                 </div>

//                 <div className="ticket-meta-grid">
//                   <div className="ticket-meta-item">
//                     <span>Priority</span>
//                     <strong>
//                       {ticket.priority ||
//                         "MEDIUM"}
//                     </strong>
//                   </div>

//                   <div className="ticket-meta-item">
//                     <span>Status</span>
//                     <strong>
//                       {ticket.ticketStatus ||
//                         "OPEN"}
//                     </strong>
//                   </div>

//                   <div className="ticket-meta-item">
//                     <span>Assignee</span>
//                     <strong>
//                       {ticket.assigneeName ||
//                         ticket.assigneeId ||
//                         "Unassigned"}
//                     </strong>
//                   </div>
//                 </div>
//               </div>

//               {/* ACTIONS */}
//               <div className="ticket-card-actions">
//                 {ticket.ticketStatus === "OPEN" && (
//                   <button
//                     type="button"
//                     className="secondary-button"
//                     onClick={() =>
//                       handleAssign(ticket)
//                     }
//                     disabled={loading}
//                   >
//                     Assign
//                   </button>
//                 )}

//                 {ticket.ticketStatus !==
//                   "RESOLVED" && (
//                   <button
//                     type="button"
//                     className="primary-button"
//                     onClick={() =>
//                       handleOpenResolveModal(
//                         ticket
//                       )
//                     }
//                     disabled={loading}
//                   >
//                     Resolve
//                   </button>
//                 )}
//               </div>
//             </article>
//           ))}
//         </div>
//       )}

//       {/* RESOLVE MODAL */}
//       {showResolveModal &&
//         selectedTicket && (
//           <div
//             className="modal-overlay"
//             role="presentation"
//             onMouseDown={(e) => {
//               if (
//                 e.target === e.currentTarget
//               ) {
//                 handleCloseResolveModal();
//               }
//             }}
//           >
//             <div
//               className="modal-card resolve-modal"
//               role="dialog"
//               aria-modal="true"
//               aria-labelledby="resolve-ticket-title"
//             >
//               <div className="modal-header">
//                 <div>
//                   <span className="modal-eyebrow">
//                     TICKET #{selectedTicket.id}
//                   </span>

//                   <h2 id="resolve-ticket-title">
//                     Resolve Ticket
//                   </h2>

//                   <p>
//                     Add a resolution note before
//                     closing this ticket.
//                   </p>
//                 </div>

//                 <button
//                   type="button"
//                   className="modal-close-button"
//                   onClick={
//                     handleCloseResolveModal
//                   }
//                   aria-label="Close"
//                 >
//                   ×
//                 </button>
//               </div>

//               <form
//                 className="modal-form"
//                 onSubmit={handleResolve}
//               >
//                 <div className="form-group">
//                   <label htmlFor="resolutionNote">
//                     Resolution note
//                   </label>

//                   <textarea
//                     id="resolutionNote"
//                     name="resolutionNote"
//                     value={resolutionNote}
//                     onChange={(e) =>
//                       setResolutionNote(
//                         e.target.value
//                       )
//                     }
//                     placeholder="Describe how the issue was resolved..."
//                     rows={6}
//                     required
//                     disabled={loading}
//                   />
//                 </div>

//                 <div className="modal-actions">
//                   <button
//                     type="button"
//                     className="secondary-button"
//                     onClick={
//                       handleCloseResolveModal
//                     }
//                     disabled={loading}
//                   >
//                     Cancel
//                   </button>

//                   <button
//                     type="submit"
//                     className="primary-button"
//                     disabled={loading}
//                   >
//                     {loading ? (
//                       <>
//                         <span className="button-spinner"></span>
//                         <span>
//                           Resolving...
//                         </span>
//                       </>
//                     ) : (
//                       <>
//                         <span>
//                           Resolve
//                         </span>

//                         <span className="button-arrow">
//                           →
//                         </span>
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//     </div>
//   );
// };

// export default TicketList;


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyTickets, assignTicket } from '../../store/slices/ticketSlice';
import EmptyState from '../common/EmptyState';
import TicketForm from './TicketForm';

const TicketList = ({ tickets: ticketsProp }) => {
  const dispatch = useDispatch();
  const { items = [] } = useSelector((state) => state.tickets || {});
  const [resolvingTicketId, setResolvingTicketId] = useState(null);
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    dispatch(getMyTickets());
  }, [dispatch]);

  const rawTickets = ticketsProp !== undefined ? ticketsProp : items;

  const filteredTickets = rawTickets.filter((t) => {
    if (statusFilter === 'ALL') return true;
    return t.status === statusFilter;
  });

  const handleAssign = (id) => {
    dispatch(assignTicket(id));
  };

  const handleResolve = (id) => {
    setResolvingTicketId(id);
  };

  return (
    <div className="ticket-list" data-testid="ticket-list">
      <div style={{ marginBottom: '1.5rem' }}>
        <h1>Resolution Management</h1>
        <p style={{ margin: '0.25rem 0 0 0', color: '#64748b', fontSize: '0.95rem' }}>
          Process customer escalation tickets, assign ownership, and record resolution notes
        </p>
      </div>

      <div
        className="ticket-filter-bar"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          background: '#ffffff',
          padding: '0.875rem 1.25rem',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
          marginBottom: '1.5rem',
        }}
      >
        <label htmlFor="ticket-status-filter" style={{ fontSize: '0.875rem', fontWeight: 600, color: '#475569' }}>
          Filter by Status:
        </label>
        <select
          id="ticket-status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="form-input"
          style={{ width: 'auto', minWidth: '180px' }}
          data-testid="status-filter-select"
        >
          <option value="ALL">ALL</option>
          <option value="PENDING">PENDING</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="RESOLVED">RESOLVED</option>
        </select>
      </div>

      {resolvingTicketId && (
        <TicketForm ticketId={resolvingTicketId} onClose={() => setResolvingTicketId(null)} />
      )}

      {filteredTickets.length === 0 ? (
        <EmptyState message="No tickets scheduled." />
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="tickets-table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Review Snippet</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((t) => (
                <tr key={t.id}>
                  <td style={{ fontWeight: 600, color: '#0f172a' }}>#{t.id}</td>
                  <td>{t.customer || t.customerName || 'John Doe'}</td>
                  <td>
                    <span className={`status-badge status-${(t.status || '').toLowerCase()}`}>
                      {t.status}
                    </span>
                  </td>
                  <td style={{ maxWidth: '320px', color: '#475569', fontSize: '0.85rem' }}>
                    {t.reviewSnippet || t.snippet || t.reviewContent || t.content || 'Customer reported a product dissatisfaction issue requiring remediation.'}
                  </td>
                  <td>
                    {t.status === 'PENDING' && (
                      <button
                        onClick={() => handleAssign(t.id)}
                        className="btn-assign"
                        data-testid={`assign-ticket-${t.id}`}
                      >
                        Assign
                      </button>
                    )}
                    {t.status === 'IN_PROGRESS' && (
                      <button
                        onClick={() => handleResolve(t.id)}
                        className="btn-resolve"
                        data-testid={`resolve-ticket-${t.id}`}
                      >
                        Resolve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TicketList;