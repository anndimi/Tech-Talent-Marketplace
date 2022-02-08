import React from "react";
import styled from "styled-components";
import { Divider } from "@mui/material";

import HeroImage from "../components/elements/HeroImage";
import teamImg from "../assets/images/team-image.jpg";
import img1 from "../assets/images/img1.jpg";
import img2 from "../assets/images/img2.jpg";
import img3 from "../assets/images/img3.jpg";
import { UpArrow } from "../components/elements/UpArrow";

const StartPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 50px;
  margin-top: -130px;
  margin-bottom: 50px;
`;

const StartPageCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 350px;
  &.second-card {
    @media (min-width: 768px) {
      flex-direction: row-reverse;
    }
  }
  @media (min-width: 768px) {
    flex-direction: row;
    width: 675px;
    gap: 20px;
  }
  @media (min-width: 992px) {
    width: 900px;
  }
`;

const CardTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width 100%;
  h3 {
    font-size: 24px;
    font-weight: 600;
    font-family: "Urbanist";
    margin-bottom: 2px;
    padding-bottom: 2px;
    color: #704462;
  }
  p {
    font-size: 16px;
    font-weight: 400;
    padding: 0;
    color: #4C4C4C;
  }
  @media (min-width: 768px) {
    width: 50%;
    h3 {
      font-size: 27px;
    }
    p {
      font-size: 17px;
  }
  }
`;

const CardImageContainer = styled.div`
  display: flex;
  justify-content: center;
  width 100%;
  img {
    width: 100%;
    border-radius: 3px;
  }
  @media (min-width: 768px) {
    width: 50%;
  }
`;

const StartPageSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 350px;
  border-top: 1px solid #704462;
  h2 {
    font-size: 35px;
    font-weight: 600;
    font-family: "Urbanist";
    color: #f8c53a;
  }
  p {
    font-size: 16px;
    font-weight: 400;
    padding: 0;
    color: #4c4c4c;
  }
  img {
    width: 75%;
    border-radius: 3px;
  }
  @media (min-width: 768px) {
    width: 650px;
    h2 {
      font-size: 40px;
    }
    p {
      font-size: 18px;
    }
  }
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
            <CardImageContainer>
              <img src={teamImg} />
            </CardImageContainer>
          </StartPageCard>
          <StartPageCard className="second-card">
            <CardTextContainer>
              <h3>Find your next dream team</h3>
              <p>
                When people come together they'll find inspiration, best
                practices and fellowship. At Tech Talent Marketplace you can
                connect with the talents you need to move your project or skills
                forward.
              </p>
            </CardTextContainer>
            <CardImageContainer>
              <img src={img1} />
            </CardImageContainer>
          </StartPageCard>

          <StartPageSection>
            <h2>The idea</h2>
            <p>
              When people come together they'll find inspiration, best practices
              and fellowship. At Tech Talent Marketplace you can connect with
              the talents you need to move your project or skills forward.
            </p>
          </StartPageSection>
          <StartPageSection>
            <h2>About us</h2>
            <p>
              When people come together they'll find inspiration, best practices
              and fellowship. At Tech Talent Marketplace you can connect with
              the talents you need to move your project or skills forward.
            </p>
            <img src={img2} />
          </StartPageSection>
        </StartPageContainer>
      </div>
      <UpArrow />
    </>
  );
};
