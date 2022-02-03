import React from "react";
import styled from "styled-components";
import { Typography } from "@mui/material";
import heroBg from "../../assets/images/hero-image.jpg";
import { Box } from "@mui/material";

const StyledHeroImage = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${heroBg});
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const HeroImage = () => {
  return (
    <Box sx={{ height: "100%" }}>
      <StyledHeroImage>
        <Typography
          sx={{
            textAlign: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "secondary.main",
            fontSize: 40,
            fontWeight: 600,
            fontFamily: "primary.fontFamily",
          }}
        >
          Welcome to Tech Talent Marketplace!
        </Typography>
      </StyledHeroImage>
    </Box>
  );
};

export default HeroImage;
