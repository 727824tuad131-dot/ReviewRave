// import React from "react";

// const SearchFilterBar = ({
//   searchVal = "",
//   onSearchChange,
//   filterVal = "",
//   onFilterChange,
//   filterOptions = [],
// }) => {
//   return (
//     <div className="search-filter-bar">
//       {/* SEARCH */}
//       <div className="search-box">
//         <span className="search-icon">⌕</span>

//         <input
//           type="text"
//           value={searchVal}
//           onChange={(e) =>
//             onSearchChange(e.target.value)
//           }
//           placeholder="Search..."
//           aria-label="Search"
//         />

//         {searchVal && (
//           <button
//             type="button"
//             className="search-clear"
//             onClick={() => onSearchChange("")}
//             aria-label="Clear search"
//           >
//             ×
//           </button>
//         )}
//       </div>

//       {/* FILTER */}
//       <div className="filter-box">
//         <span className="filter-icon">≡</span>

//         <select
//           value={filterVal}
//           onChange={(e) =>
//             onFilterChange(e.target.value)
//           }
//           aria-label="Filter"
//         >
//           <option value="">
//             All
//           </option>

//           {filterOptions.map((option, index) => {
//             const value =
//               typeof option === "string"
//                 ? option
//                 : option.value;

//             const label =
//               typeof option === "string"
//                 ? option
//                 : option.label;

//             return (
//               <option
//                 value={value}
//                 key={`${value}-${index}`}
//               >
//                 {label}
//               </option>
//             );
//           })}
//         </select>

//         <span className="filter-arrow">
//           ▾
//         </span>
//       </div>
//     </div>
//   );
// };

// export default SearchFilterBar;

