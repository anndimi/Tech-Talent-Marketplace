import React from "react";

export const SearchBar = ({ searchValue, setSearchValue }) => {
  return (
    <>
      <label>This is the searchbar</label>
      <input
        type="text"
        value={searchValue}
        palceholder="Search 🔎"
        onChange={(event) => setSearchValue(event.target.value)}
      />
    </>
  );
};
