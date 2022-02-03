import React from "react";
import styled from "styled-components";
import logo from "../assets/icons/logo.png";
import { Link } from "react-router-dom";

const FooterWrapper = styled.div`
  background-color: #342c42;
  color: white;

  text-align: center;
  padding: 30px;
`;

const LogoContainer = styled.img`
  height: 100px;
  width: 100px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${logo});
  object-fit: cover;
  border: none;
`;

const GroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const Links = styled.a`
  color: white;
  font-size: 10px;
  text-decoration: none;
  margin: 10px;
  &:hover {
    text-decoration: underline;
    color: #f8c53a;
  }
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 10px;
  margin: 10px;
  &:hover {
    text-decoration: underline;
    color: #f8c53a;
  }
`;

const Heading = styled.h3`
  color: #f8c53a;
  margin: 10px;
`;

const Title = styled.h2`
  color: white;
  margin: 10px;
  font-weight: 400;
`;

const Year = styled.p`
  margin: 10px 0px 0px 0px;
  padding: 0;
`;

export const Footer = () => {
  return (
    <FooterWrapper>
      <div>
        <LogoContainer />
        <Title>Tech Talent Marketplace</Title>
      </div>

      <LinkWrapper>
        <GroupWrapper>
          <Heading>Company</Heading>
          <Links href="#">Terms of use</Links>
          <Links href="#">About us</Links>
          <Links href="#">Press</Links>
          <Links href="#">Contact</Links>
        </GroupWrapper>

        <GroupWrapper>
          <Heading>Our service</Heading>
          <Links href="#">About TTM</Links>
          <StyledLink to="/signup">Sign in</StyledLink>
          <Links href="#">Terms of use</Links>
          <Links href="#">Terms of use</Links>
        </GroupWrapper>

        <GroupWrapper>
          <Heading>Socials</Heading>
          <Links href="#">Twitter</Links>
          <Links href="#">Facebook</Links>
          <Links href="#">Instagram</Links>
          <Links href="#">Github</Links>
        </GroupWrapper>
      </LinkWrapper>
      <Year>2022</Year>
    </FooterWrapper>
  );
};
