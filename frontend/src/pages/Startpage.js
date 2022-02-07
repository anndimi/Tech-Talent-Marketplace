import React from "react";
import HeroImage from "../components/elements/HeroImage";
import { Box } from "@mui/material";
import teamImg from "../assets/images/team-image.jpg";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Typography } from "@mui/material";
import { UpArrow } from "../components/elements/UpArrow";

export const Startpage = () => {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <HeroImage />
        <Box>
          <Box>
            <Box>
              <Typography
                sx={{
                  fontFamily: "primary.fontFamily",
                  fontWeight: 700,
                  fontSize: 26,
                  padding: 0,
                }}
              >
                Find your next dream team
              </Typography>
              <Typography>
                When people come together they'll find inspiration, best
                practices and fellowship. At Tech Talent Marketplace you can
                connect with the talents you need to move your project or skills
                forward.
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <img
                src={teamImg}
                style={{
                  maxWidth: 300,
                  height: "auto",
                  borderRadius: "10px",
                }}
              />
            </Box>
          </Box>
          <Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <img
                src={teamImg}
                style={{ width: 300, height: "auto", borderRadius: "10px" }}
              />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontFamily: "primary.fontFamily",
                  fontWeight: 700,
                  fontSize: 26,
                  padding: 0,
                }}
              >
                Find your next dream team
              </Typography>
              <Typography>
                When people come together they'll find inspiration, best
                practices and fellowship. At Tech Talent Marketplace you can
                connect with the talents you need to move your project or skills
                forward.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <UpArrow />
    </>
  );
};
