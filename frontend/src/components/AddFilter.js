import React from "react";
// import { useNavigate, generatePath, useParams } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { API_URL } from "../utils/constants";
// import add from "../reducers/add";
import Box from "@mui/material/Box";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from "@mui/material/Button";

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
    <Box>
    <FormControl variant="standard" sx={{ m: 1, width: '160px' }}>
        <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={filter}
          onChange={onFilterChange}
          label="Category"
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

      <FormControl variant="standard" sx={{ m: 1, width: '160px' }}>
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
          <MenuItem value="Oldest">Oldest to newest</MenuItem>
          <MenuItem value="Newest">Newest to oldest</MenuItem>
          <MenuItem value="AZ">A - Z</MenuItem>
          <MenuItem value="ZA">Z - A</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="standard" sx={{ m: 1, width: '160px' }}>
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
      <Button variant="contained" onClick={onFilterReset}>Reset</Button>
    </Box>
  );
};

export default AddFilter;
