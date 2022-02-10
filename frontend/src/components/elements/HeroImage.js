import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Button } from "@mui/material";
import heroBg from "../../assets/images/hero-image.jpg";
import UserBg from "../../assets/images/user-bg.jpg";
// import { Box } from "@mui/material";

export const StyledHeaderImage = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(${UserBg});
  background-color: #342c42;
  height: 200px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const StyledHeroImage = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${heroBg});
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const HeroTitle = styled.h1`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #f8c53a;
  font-size: 40px;
  font-family: Spartan, sans-serif;
  @media (min-width: 768px) {
    font-size: 50px;
  }
`;

const HeroImage = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ height: "80vh" }}>
      <StyledHeroImage>
        <HeroTitle>Welcome to Tech Talent Marketplace!</HeroTitle>
        <Button
          variant="contained"
          sx={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            position: "absolute",
            top: "75%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "secondary.main",
            borderRadius: 12,
          }}
          onClick={() => {
            navigate("signup");
          }}
        >
          <Typography
            sx={{
              fontFamily: "primary.fontFamily",
              fontSize: 17,
              fontWeight: 400,
              letterSpacing: 1.5,
              marginTop: "3px",
            }}
          >
            Get started!
          </Typography>
        </Button>
      </StyledHeroImage>
    </Box>
  );
};

export default HeroImage;
