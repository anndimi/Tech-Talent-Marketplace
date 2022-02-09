import React from "react";
import styled from "styled-components";
import logo from "../assets/icons/logo.png";
import { Link } from "react-router-dom";

const FooterWrapper = styled.div`
  background-color: #342c42;
  color: white;
  margin-top: 20px;
  text-align: center;
  padding: 30px;
`;

const GroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  max-width: 600px;
  margin: auto;
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
  text-decoration: underline;
`;

const Title = styled.h2`
  color: white;
  margin: 10px;
  font-weight: 400;
`;

const Year = styled.p`
  margin: 10px 0px 0px 0px;
  padding: 0;
  font-size: 10px;
`;

const LogoTitleAligner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media (min-width: 600px) {
    flex-direction: row;
    margin-bottom: 10px;
  }
`;

const Footer = () => {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        display: "block",
      }}
    >
      <FooterWrapper>
        <LogoTitleAligner>
          <img src={logo} style={{ width: 75, height: 75 }} />
          <Title>Tech Talent Marketplace</Title>
        </LogoTitleAligner>

        <LinkWrapper>
          <GroupWrapper>
            <Heading>Company</Heading>
            <Links href="#">Terms of use</Links>
            <Links href="#">About us</Links>
            <Links href="#">Press</Links>
            <Links href="#">Contact</Links>
          </GroupWrapper>

          <GroupWrapper>
            <Heading>Product</Heading>
            <Links href="#">Partner with us</Links>
            <StyledLink to="/signup">Sign in</StyledLink>
            <Links href="#">Help</Links>
            <Links href="#">Business</Links>
          </GroupWrapper>

          <GroupWrapper>
            <Heading>Socials</Heading>
            <Links href="#">Twitter</Links>
            <Links href="#">Facebook</Links>
            <Links href="#">Instagram</Links>
            <Links href="#">Github</Links>
          </GroupWrapper>
        </LinkWrapper>
        <Year>© 2022</Year>
      </FooterWrapper>
    </div>
  );
};
export default Footer;
