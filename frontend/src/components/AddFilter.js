import React, { useEffect, useState } from "react";
// import { useNavigate, generatePath, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { API_URL } from "../utils/constants";
import add from "../reducers/add";
import { StyledButton } from "./Buttons/StyledButtons";

const AddFilter = ({
  filter,
  type,
  sort,
  onFilterChange,
  onFilterReset,
  onTypeChange,
  onSortByTimeChange,
  sortedAddItems,
}) => {
  return (
    <>
      <p>This is where we filter our adds</p>
      <label>Filter</label>

      <select value={filter} onChange={onFilterChange}>
        <option hidden>Category..</option>
        <option value="Frontend">Frontend</option>
        <option value="Backend">Backend</option>
        <option value="Graphics and Design">Graphics and Design</option>
        <option value="Fullstack">Fullstack</option>
        <option value="App Developer">App Developer</option>
        <option value="Chatbots">Chatbots</option>
        <option value="Project Lead">Project Lead</option>
        <option value="QA">QA</option>
        <option value="Legal Consulting">Legal Consulting</option>
        <option value="Financial Consulting">Financial Consulting</option>
        <option value="Analytics">Analytics</option>
        <option value="Game Developer">Game Developer</option>
      </select>
      <label>Time</label>
      <select value={sort} onChange={onSortByTimeChange}>
        <option hidden>Time..</option>
        <option value="Oldest">Oldest to newest</option>
        <option value="Newest">Newest to oldest</option>
        <option value="AZ">A - Z</option>
        <option value="ZA">Z - A</option>
      </select>

      <label>Type</label>
      <select value={type} onChange={onTypeChange}>
        <option hidden>Type..</option>
        <option value="Looking for">Looking for</option>
        <option value="Join as">Join as</option>
      </select>
      <StyledButton onClick={onFilterReset}>Reset</StyledButton>
    </>
  );
};

export default AddFilter;
