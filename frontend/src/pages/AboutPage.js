import React from "react";
import styled from "styled-components";
import { UpArrow } from "../components/elements/UpArrow";
import { StyledHeaderImage } from "../components/elements/HeroImage";

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 120px;
  p {
    max-width: 60vw;
    @media (min-width: 768px) {
      width: 400px;
    }
  }
`;
const HeadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 20px;
  max-width: 800px;
  h2 {
    color: #704462;
    font-size: 40px;
    margin: 0px 0px 20px 0px;
    padding: 0px 0px 0px 60px;
    text-align: left;
    font-weight: 800;
  }
  p {
    font-size: 15px;
    margin: 0 auto;
    text-align: left;
    width: 100%;
    padding: 0px 0px 0px 20px;
  }
  @media (min-width: 768px) {
    flex-direction: row;
    h2 {
      font-size: 50px;
    }
  }
`;

const Title = styled.h2`
  color: #704462;
  font-size: 30px;
  margin: 30px 0px 0px 0px;
  font-weight: 600;
  @media (min-width: 768px) {
    font-size: 35px;
    font-weight: 900;
    width: 200px;
  }
`;

const Text = styled.p`
  font-size: 15px;
  margin: 0;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 20px;
  max-width: 500px;
  border-top: 3px solid #704462;
  text-align: left;
  @media (min-width: 768px) {
    flex-direction: row-reverse;
    max-width: 800px;
    width: 80%;
  }
`;
const AboutPage = () => {
  return (
    <>
      <StyledHeaderImage />
      <AboutContainer>
        {/* <h1>About</h1> */}
        <HeadingContainer>
          <h2>This is Tech Talent Marketplace</h2>

          <p>
            At Tech Talent Marketplace we believe that when people come together
            they'll find inspiration, best practices and fellowship. Here you
            can connect with the talents you need to move your project or skills
            forward.
          </p>
        </HeadingContainer>
        <InfoContainer>
          <Title>The idea</Title>
          <Text>
            With experience in working at larger organizations where specific
            skills and talent often was spread over countries and regions we
            realized that best practices was often hard to streamline. Leading
            projects ended up in contacting many colleagues to find that
            valuable input you needed to move forward (or being invited in too
            many Teams groups). Instead we thought that talent would be easier
            to reach by creating communities where it were requested. But
            instead of creating an internal platform we saw the possibility to
            make this available for everyone. No matter the size, seniority or
            type of project.
          </Text>
        </InfoContainer>
        <InfoContainer>
          <Title>The vision</Title>
          <Text>
            We believe in when people are brought together they can accomplish
            more. We can learn and complete eachoter by being the missing piece
            in the puzzle. At Tech Talent Marketplace your project can be small,
            complex, hobby or professional. No matther type, you can either be
            the talent or search the talent.
          </Text>
        </InfoContainer>
      </AboutContainer>
      <UpArrow />
    </>
  );
};

export default AboutPage;
