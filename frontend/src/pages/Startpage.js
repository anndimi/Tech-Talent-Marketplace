import React from "react";
import styled from "styled-components";

import HeroImage from "../components/elements/HeroImage";
// import { Box } from "@mui/material";
import teamImg from "../assets/images/team-image.jpg";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import { Typography } from "@mui/material";
import { UpArrow } from "../components/elements/UpArrow";

const StartPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 25px;
  margin-top: -100px;
`;

const StartPageCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
`;

const CardTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  h3 {
    font-size: 20px;
    margin-bottom: 2px;
    padding-bottom: 2px;
  }
  p {
    padding: 0;
  }
`;

const CardImageContainer = styled.div`
  display: flex;
`;

export const Startpage = () => {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <HeroImage />
        <StartPageContainer>
          <StartPageCard>
            <CardTextContainer>
              <h3>Find your next dream team</h3>
              <p>
                When people come together they'll find inspiration, best
                practices and fellowship. At Tech Talent Marketplace you can
                connect with the talents you need to move your project or skills
                forward.
              </p>
            </CardTextContainer>
            <CardImageContainer
              style={{ display: "flex", justifyContent: "center" }}
            >
              <img
                src={teamImg}
                style={{
                  maxWidth: 300,
                  height: "auto",
                  borderRadius: "10px",
                }}
              />
            </CardImageContainer>
          </StartPageCard>
          <StartPageCard>
            <CardTextContainer>
              <h3>Find your next dream team</h3>
              <p>
                When people come together they'll find inspiration, best
                practices and fellowship. At Tech Talent Marketplace you can
                connect with the talents you need to move your project or skills
                forward.
              </p>
            </CardTextContainer>
            <CardImageContainer
              style={{ display: "flex", justifyContent: "center" }}
            >
              <img
                src={teamImg}
                style={{ width: 300, height: "auto", borderRadius: "10px" }}
              />
            </CardImageContainer>
          </StartPageCard>
        </StartPageContainer>
      </div>
      <UpArrow />
    </>
  );
};
