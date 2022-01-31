import React from "react";

export const SearchBar = ({ searchValue, setSearchValue }) => {
  return (
    <>
      <p>This is the searchbar</p>
      <input
        type="text"
        value={searchValue}
        palceholder="Search"
        onChange={(event) => setSearchValue(event.target.value)}
      />
    </>
  );
};
