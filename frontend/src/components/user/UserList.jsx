// import React, { useState } from "react";
// import "./UserList.css";

// const UserList = ({ users = [], onStatusToggle, onDeleteUser, onEditUser }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [roleFilter, setRoleFilter] = useState("ALL");
//   const [statusFilter, setStatusFilter] = useState("ALL");

//   // Filtering Logic
//   const filteredUsers = users.filter((user) => {
//     const matchesSearch =
//       user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.email?.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesRole = roleFilter === "ALL" || user.role === roleFilter;

//     const matchesStatus =
//       statusFilter === "ALL" ||
//       (statusFilter === "ACTIVE" && user.isActive) ||
//       (statusFilter === "INACTIVE" && !user.isActive);

//     return matchesSearch && matchesRole && matchesStatus;
//   });

//   return (
//     <div className="user-list-container">
//       {/* Controls Header */}
//       <div className="user-list-toolbar">
//         <div className="search-box">
//           <input
//             type="text"
//             placeholder="Search users by name or email..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="user-search-input"
//           />
//         </div>

//         <div className="filter-controls">
//           <select
//             value={roleFilter}
//             onChange={(e) => setRoleFilter(e.target.value)}
//             className="user-filter-select"
//           >
//             <option value="ALL">All Roles</option>
//             <option value="ADMIN">Admin</option>
//             <option value="USER">User</option>
//             <option value="MODERATOR">Moderator</option>
//           </select>

//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             className="user-filter-select"
//           >
//             <option value="ALL">All Statuses</option>
//             <option value="ACTIVE">Active</option>
//             <option value="INACTIVE">Inactive</option>
//           </select>
//         </div>
//       </div>

//       {/* Users Table */}
//       {filteredUsers.length === 0 ? (
//         <div className="no-users-state">
//           <p>No users found matching your search or filter criteria.</p>
//         </div>
//       ) : (
//         <div className="user-table-wrapper">
//           <table className="user-table">
//             <thead>
//               <tr>
//                 <th>User</th>
//                 <th>Role</th>
//                 <th>Status</th>
//                 <th>Joined</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredUsers.map((user) => (
//                 <tr key={user.id || user._id}>
//                   <td className="user-info-cell">
//                     <div className="user-avatar">
//                       {user.avatarUrl ? (
//                         <img src={user.avatarUrl} alt={user.name} />
//                       ) : (
//                         <span>{(user.name || "U")[0].toUpperCase()}</span>
//                       )}
//                     </div>
//                     <div className="user-details">
//                       <span className="user-name">{user.name || "N/A"}</span>
//                       <span className="user-email">{user.email}</span>
//                     </div>
//                   </td>

//                   <td>
//                     <span className={`role-badge role-${user.role?.toLowerCase() || "user"}`}>
//                       {user.role || "USER"}
//                     </span>
//                   </td>

//                   <td>
//                     <span
//                       className={`status-pill ${
//                         user.isActive ? "status-active" : "status-inactive"
//                       }`}
//                     >
//                       {user.isActive ? "Active" : "Inactive"}
//                     </span>
//                   </td>

//                   <td className="user-date-cell">
//                     {user.createdAt
//                       ? new Date(user.createdAt).toLocaleDateString()
//                       : "N/A"}
//                   </td>

//                   <td className="user-actions-cell">
//                     {onStatusToggle && (
//                       <button
//                         className="btn-action btn-toggle"
//                         onClick={() => onStatusToggle(user.id || user._id)}
//                       >
//                         {user.isActive ? "Deactivate" : "Activate"}
//                       </button>
//                     )}

//                     {onEditUser && (
//                       <button
//                         className="btn-action btn-edit"
//                         onClick={() => onEditUser(user)}
//                       >
//                         Edit
//                       </button>
//                     )}

//                     {onDeleteUser && (
//                       <button
//                         className="btn-action btn-delete"
//                         onClick={() => onDeleteUser(user.id || user._id)}
//                       >
//                         Delete
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserList;


// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getUsers, deleteUser } from '../../store/slices/userSlice';
// import { addNotification } from '../../store/slices/notificationSlice';
// import ErrorHandler from './ErrorHandler';
// import './Login.css';

// const UserList = () => {
//   const dispatch = useDispatch();
//   const { items = [], isLoading, isError } = useSelector((state) => state.users || {});
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     dispatch(getUsers());
//   }, [dispatch]);

//   const handleDelete = async (id, email) => {
//     if (window.confirm(`Are you sure you want to delete user ${email}?`)) {
//       const resultAction = await dispatch(deleteUser(id));
//       if (deleteUser.fulfilled.match(resultAction)) {
//         dispatch(addNotification({ type: 'success', message: `User ${email} deleted` }));
//       }
//     }
//   };

//   const userList = Array.isArray(items) && items.length > 0 ? items : [
//     { id: 1, name: 'Admin User', email: 'admin@platform.com', role: 'PLATFORM_ADMIN' },
//     { id: 2, name: 'Brand Lead', email: 'manager@brand.com', role: 'BRAND_MANAGER' },
//     { id: 3, name: 'Support Rep', email: 'agent@resolve.com', role: 'RESOLUTION_AGENT' },
//   ];

//   const filteredUsers = userList.filter((user) => {
//     const term = searchTerm.toLowerCase();
//     const nameMatch = (user.name || '').toLowerCase().includes(term);
//     const emailMatch = (user.email || '').toLowerCase().includes(term);
//     const roleMatch = (user.role || '').toLowerCase().includes(term);
//     return nameMatch || emailMatch || roleMatch;
//   });

//   const getRoleBadgeClass = (role) => {
//     switch (role) {
//       case 'PLATFORM_ADMIN':
//         return 'badge-admin';
//       case 'BRAND_MANAGER':
//         return 'badge-manager';
//       case 'RESOLUTION_AGENT':
//         return 'badge-agent';
//       default:
//         return '';
//     }
//   };

//   return (
//     <div className="user-list-container" data-testid="user-list-container">
//       <div className="user-list-header">
//         <div>
//           <h1 className="user-list-title" style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0 0 0.35rem 0', color: '#0f172a' }}>
//             User Management
//           </h1>
//           <p style={{ color: '#64748b', margin: 0, fontSize: '0.95rem' }}>
//             Manage registered platform users, roles, and administrative security privileges
//           </p>
//         </div>

//         <input
//           type="text"
//           className="user-search-input"
//           placeholder="Search by name, email or role..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           data-testid="user-search-input"
//         />
//       </div>

//       <ErrorHandler error={isError ? 'Failed to fetch users' : null} />

//       {isLoading && items.length === 0 ? (
//         <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }} data-testid="loading-state">
//           Loading platform users...
//         </div>
//       ) : filteredUsers.length === 0 ? (
//         <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }} data-testid="empty-state">
//           No users found.
//         </div>
//       ) : (
//         <div className="users-table-card">
//           <table className="users-table" data-testid="users-table">
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Role / Status</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredUsers.map((user) => (
//                 <tr key={user.id} data-testid={`user-row-${user.id}`}>
//                   <td style={{ fontWeight: 600, color: '#0f172a' }}>#{user.id}</td>
//                   <td style={{ fontWeight: 600 }}>{user.name || user.fullName || user.email.split('@')[0]}</td>
//                   <td style={{ color: '#475569' }}>{user.email}</td>
//                   <td>
//                     <span className={`badge ${getRoleBadgeClass(user.role)}`}>
//                       {user.role}
//                     </span>
//                   </td>
//                   <td>
//                     <button
//                       className="btn-delete"
//                       onClick={() => handleDelete(user.id, user.email)}
//                       data-testid={`delete-user-${user.id}`}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserList;

import React, { useState } from "react";

const initialUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "BRAND_MANAGER", status: "Active" },
  { id: 2, name: "Sarah Smith", email: "sarah@example.com", role: "RESOLUTION_AGENT", status: "Active" },
  { id: 3, name: "Alex Johnson", email: "alex@example.com", role: "PLATFORM_ADMIN", status: "Inactive" },
];

const UserList = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");

  const toggleStatus = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" }
          : user
      )
    );
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "ALL" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>User Management</h3>
      
      {/* Controls */}
      <div style={styles.toolbar}>
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.input}
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          style={styles.select}
        >
          <option value="ALL">All Roles</option>
          <option value="BRAND_MANAGER">Brand Manager</option>
          <option value="RESOLUTION_AGENT">Resolution Agent</option>
          <option value="PLATFORM_ADMIN">Platform Admin</option>
        </select>
      </div>

      {/* Table */}
      <table style={styles.table}>
        <thead>
          <tr style={styles.thRow}>
            <th style={styles.th}>User</th>
            <th style={styles.th}>Role</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id} style={styles.tr}>
                <td style={styles.td}>
                  <div style={styles.userName}>{user.name}</div>
                  <div style={styles.userEmail}>{user.email}</div>
                </td>
                <td style={styles.td}>
                  <span style={styles.badge}>{user.role}</span>
                </td>
                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.status,
                      backgroundColor: user.status === "Active" ? "#059669" : "#64748b",
                    }}
                  >
                    {user.status}
                  </span>
                </td>
                <td style={styles.td}>
                  <button
                    onClick={() => toggleStatus(user.id)}
                    style={styles.actionBtn}
                  >
                    Toggle Status
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ ...styles.td, textAlign: "center" }}>
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: { color: "#f8fafc" },
  title: { marginBottom: "16px", fontSize: "18px" },
  toolbar: { display: "flex", gap: "12px", marginBottom: "16px" },
  input: {
    flex: 1,
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid #334155",
    backgroundColor: "#0f172a",
    color: "#fff",
  },
  select: {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid #334155",
    backgroundColor: "#0f172a",
    color: "#fff",
  },
  table: { width: "100%", borderCollapse: "collapse" },
  thRow: { borderBottom: "1px solid #334155" },
  th: { textAlign: "left", padding: "12px", color: "#94a3b8", fontSize: "13px" },
  tr: { borderBottom: "1px solid #334155" },
  td: { padding: "12px", fontSize: "14px" },
  userName: { fontWeight: "600" },
  userEmail: { fontSize: "12px", color: "#94a3b8" },
  badge: { fontSize: "11px", backgroundColor: "#334155", padding: "4px 8px", borderRadius: "4px" },
  status: { fontSize: "11px", color: "#fff", padding: "3px 8px", borderRadius: "10px" },
  actionBtn: {
    padding: "6px 12px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
  },
};

export default UserList;