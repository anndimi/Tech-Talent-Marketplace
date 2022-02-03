import React from "react";
import HeroImage from "../components/elements/HeroImage";
import { Box } from "@mui/material";

export const Startpage = () => {
  return (
    <Box sx={{display: "block"}}>
      <HeroImage />
      <Box
        sx={{
          width: "50%",
          padding: 5,
          position: "relative",

          top: "100vh",
        }}
      >
        <h1>Find your next dream team</h1>
        <p>
          When people come together they'll find inspiration, best practices and
          fellowship. At Tech Talent Marketplace you can connect with the
          talents you need to move your project or skills forward.{" "}
        </p>
      </Box>
    </Box>
  );
};
