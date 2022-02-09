import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export const SearchBar = ({ searchValue, setSearchValue }) => {
  return (
    <Box
      component="form"
      sx={{
        marginTop: 10,
        width: "100%",
        fontWeight: 600,
        fontFamily: "primary.fontFamily",
        display: "flex",
        justifyContent: "center",
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        sx={{ maxWidth: "400px", width: "70%" }}
        id="standard-basic"
        label="🔎 Search adds"
        variant="standard"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
      />
    </Box>
  );
};
