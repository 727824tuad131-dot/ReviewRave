import React from "react";

const SearchFilterBar = ({
  searchVal,
  onSearchChange,
  filterVal,
  onFilterChange,
  filterOptions = []
}) => {
  return (
    <div className="search-filter-bar">

      <div className="search-box">

        <input
          type="text"
          placeholder="Search..."
          value={searchVal}
          onChange={(e) =>
            onSearchChange(
              e.target.value
            )
          }
        />

      </div>

      <div className="filter-box">

        <select
          value={filterVal}
          onChange={(e) =>
            onFilterChange(
              e.target.value
            )
          }
        >

          <option value="">
            All
          </option>

          {filterOptions.map(
            (option, index) => {

              const value =
                typeof option === "string"
                  ? option
                  : option.value;

              const label =
                typeof option === "string"
                  ? option
                  : option.label;

              return (
                <option
                  key={index}
                  value={value}
                >
                  {label}
                </option>
              );
            }
          )}

        </select>

      </div>

    </div>
  );
};

export default SearchFilterBar;