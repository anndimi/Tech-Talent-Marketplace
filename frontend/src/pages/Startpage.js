import React from "react";
import styled from "styled-components";

import HeroImage from "../components/elements/HeroImage";
import teamImg from "../assets/images/team-image.jpg";
import img1 from "../assets/images/img1.jpg";
import img2 from "../assets/images/img2.jpg";
import img3 from "../assets/images/img3.jpg";
import UpArrow from "../components/elements/UpArrow";

import EmojiObjectsOutlinedIcon from "@mui/icons-material/EmojiObjectsOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";

const StartPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 40px;
  padding-top: 20px;
  margin-bottom: 50px;
`;

const StartPageBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 150px;
  text-align: center;
  background-color: #f8c53a;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const BarItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 225px;
  padding-top: 30px;
  p {
    margin-top: 0;
    color: #4c4c4c;
  }
`;

const StartPageCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 320px;
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
  width: 100%;
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
    color: #4c4c4c;
  }
  @media (min-width: 768px) {
    width: 50%;
    h3 {
      font-size: 40px;
    }
    p {
      font-size: 17px;
    }
  }
`;
const Quote = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span {
    font-weight: 900;
    color: #f8c53a;
    font-size: 28px;
    font-style: none;
  }
  .quote {
    font-size: 26px;
    font-weight: 500;
    padding: 0;
    margin: 0;
    width: 100%;
    max-width: 100%;
    line-height: 30px;
  }
  .quote-guy {
    font-style: italic;
    margin-bottom: 0;
    padding: 0;
  }
`;

const CardImageContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
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
  width: 320px;
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
    @media (min-width: 1200px) {
      width: 60%;
    }
  }
`;

const Startpage = () => {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <HeroImage />
        <StartPageContainer>
          <Quote>
            <p className="quote">
              <span>"</span>The bigger the dream, the more important the team
              <span>"</span>
            </p>
            <p className="quote-guy">- Robin Sharma, Author</p>
          </Quote>
          <StartPageBar>
            <BarItem>
              <LanguageOutlinedIcon sx={{ fontSize: 40 }} />
              <p>
                Super easy to connect with professionals all over the world!
              </p>
            </BarItem>
            <BarItem>
              <EmojiObjectsOutlinedIcon sx={{ fontSize: 40 }} />
              <p>
                Let the world know about your project ideas and find you perfect
                partner!
              </p>
            </BarItem>
            <BarItem>
              <ForumOutlinedIcon sx={{ fontSize: 35 }} />
              <p>Connect and start working together!</p>
            </BarItem>
          </StartPageBar>
          <StartPageCard>
            <CardTextContainer>
              <h3>Find your next dreamteam</h3>
              <p>
                When people come together they'll find inspiration, best
                practices and fellowship. At Tech Talent Marketplace you can
                connect with the talents you need to move your project or skills
                forward.
              </p>
            </CardTextContainer>
            <CardImageContainer>
              <img src={img3} />
            </CardImageContainer>
          </StartPageCard>
          <StartPageCard className="second-card">
            <CardTextContainer>
              <h3>Join exciting opportunities</h3>
              <p>
                Are you tired of doing the same project over and over again? At
                Tech Talent Marketplace you can join projects within areas where
                you want to evolve.
              </p>
            </CardTextContainer>
            <CardImageContainer>
              <img src={img1} />
            </CardImageContainer>
          </StartPageCard>

          <StartPageSection>
            <h2>The idea</h2>
            <p>
              We believe in when people are brought together they can accomplish
              more. We can learn and complete eachoter by being the missing
              piece in the puzzle. At Tech Talent Marketplace your project can
              be small, complex, hobby or professional. No matther type, you can
              either be the talent or search the talent.
            </p>
          </StartPageSection>
          <StartPageSection>
            <h2>About us</h2>
            <p>
              We are four frontend developers graduates creating a community
              where people can join forces and set their creativity free. Come
              as you are, take what you like and leave the rest!
            </p>
            <img src={img2} />
          </StartPageSection>
        </StartPageContainer>
      </div>
      <UpArrow />
    </>
  );
};

export default Startpage;
