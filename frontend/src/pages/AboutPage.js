import React from "react";
import styled from "styled-components";
import UserBg from "../assets/images/user-bg.jpg";

const StyledImage = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(${UserBg});
  height: 250px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  p {
    max-width: 60vw;
    @media (min-width: 768px) {
      width: 400px;
    }
  }
`;

const AboutPage = () => {
  return (
    <>
      <StyledImage />
      <AboutContainer>
        <h1>About</h1>
        <p>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum."
        </p>
        <h2>The idea</h2>
        <h2>The idea</h2>
      </AboutContainer>
    </>
  );
};

export default AboutPage;
