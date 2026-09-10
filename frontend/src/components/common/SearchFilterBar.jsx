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

import React from 'react';

const SearchFilterBar = ({
  searchTerm = '',
  onSearchChange,
  category = '',
  onCategoryChange,
  categories = ['ELECTRONICS', 'FASHION', 'SOFTWARE', 'FOOD'],
}) => {
  return (
    <div className="search-filter-bar" data-testid="search-filter-bar">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
        data-testid="search-input"
      />
      <select
        value={category}
        onChange={(e) => onCategoryChange && onCategoryChange(e.target.value)}
        data-testid="category-select"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchFilterBar;