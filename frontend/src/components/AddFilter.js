import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import styled from "styled-components";

import RotateLeftOutlinedIcon from "@mui/icons-material/RotateLeftOutlined";

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const AddFilter = ({
  filter,
  type,
  sort,
  onFilterChange,
  onFilterReset,
  onTypeChange,
  onSortByTimeChange,
}) => {
  return (
    <FilterContainer>
      <FormControl variant="standard" sx={{ m: 1, width: "180px" }}>
        <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={filter}
          onChange={onFilterChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Frontend">Frontend</MenuItem>
          <MenuItem value="Backend">Backend</MenuItem>
          <MenuItem value="Graphics and Design">Graphics and Design</MenuItem>
          <MenuItem value="Fullstack">Fullstack</MenuItem>
          <MenuItem value="App Developer">App Developer</MenuItem>
          <MenuItem value="Chatbots">Chatbots</MenuItem>
          <MenuItem value="Project Lead">Project Lead</MenuItem>
          <MenuItem value="QA">QA</MenuItem>
          <MenuItem value="Legal Consulting">Legal Consulting</MenuItem>
          <MenuItem value="Financial Consulting">Financial Consulting</MenuItem>
          <MenuItem value="Analytics">Analytics</MenuItem>
          <MenuItem value="Game Developer">Game Developer</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="standard" sx={{ m: 1, width: "180px" }}>
        <InputLabel id="demo-simple-select-standard-label">Time</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={sort}
          onChange={onSortByTimeChange}
          label="Time"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Old">Oldest first</MenuItem>
          <MenuItem value="New">Newest first</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="standard" sx={{ m: 1, width: "180px" }}>
        <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={type}
          onChange={onTypeChange}
          label="Type"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Looking for">Looking for</MenuItem>
          <MenuItem value="Join as">Join as</MenuItem>
        </Select>
      </FormControl>

      <Button
        sx={{
          alignSelf: "center",
        }}
        variant="contained"
        onClick={onFilterReset}
      >
        <RotateLeftOutlinedIcon onClick={onFilterReset} />
      </Button>
    </FilterContainer>
  );
};

export default AddFilter;
