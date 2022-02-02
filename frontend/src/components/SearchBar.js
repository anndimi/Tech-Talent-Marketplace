import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
// import InputLabel from '@mui/material/InputLabel';
// import InputAdornment from '@mui/material/InputAdornment';

export const SearchBar = ({ searchValue, setSearchValue }) => {
  return (
      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '160px' },
        fontWeight: 600,
        fontFamily: "primary.fontFamily"
          }}
      noValidate
      autoComplete="off"
    >
        {/* <InputAdornment position="start">
              <p>🔎</p>
          </InputAdornment> */}
      <TextField 
      id="standard-basic" 
      label="🔎 Search " 
      variant="standard" 
      value={searchValue}
      onChange={(event) => setSearchValue(event.target.value)} 
      />
    </Box>
  );
};
