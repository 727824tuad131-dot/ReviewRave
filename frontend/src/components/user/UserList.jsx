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