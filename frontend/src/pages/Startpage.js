import React from "react";
import HeroImage from "../components/elements/HeroImage";
import { Box } from "@mui/material";
import teamImg from "../assets/images/team-image.jpg";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Typography } from "@mui/material";

export const Startpage = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <HeroImage />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          marginTop: -20,
          gap: 5,
          width: {
            mobile: 375,
            tablet: 600,
            laptop: 800,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              mobile: "column",
              tablet: "row-reverse",
            },
            width: {
              mobile: 375,
              tablet: 600,
              laptop: 800,
            },
            gap: 5,
            // paddingLeft: 7,
            // paddingRight: 7,
          }}
        >
          <Box
            sx={{
              width: {
                mobile: 375,
                tablet: 600,
                laptop: 800,
              },
            }}
          >
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
              When people come together they'll find inspiration, best practices
              and fellowship. At Tech Talent Marketplace you can connect with
              the talents you need to move your project or skills forward.
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
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              mobile: "column-reverse",
              tablet: "row-reverse",
            },
            width: {
              mobile: 375,
              tablet: 600,
              laptop: 800,
            },
            gap: 5,
            // paddingLeft: 7,
            // paddingRight: 7,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <img
              src={teamImg}
              style={{ width: 300, height: "auto", borderRadius: "10px" }}
            />
          </Box>
          <Box
            sx={{
              width: {
                mobile: 375,
                tablet: 600,
                laptop: 800,
              },
            }}
          >
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
              When people come together they'll find inspiration, best practices
              and fellowship. At Tech Talent Marketplace you can connect with
              the talents you need to move your project or skills forward.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
